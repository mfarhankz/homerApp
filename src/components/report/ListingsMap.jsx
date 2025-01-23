import Map, { Marker, NavigationControl } from "react-map-gl";
import { WebMercatorViewport } from "@math.gl/web-mercator";
import PropertyPopup from "./PropertyPopup";
import ListingsSection from "./ListingsSection";
import { ListFilter, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

// Reuse the cache constants and helper function from ListingCard
const CACHE_PREFIX = "listing_img_";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

const getCachedImage = (listingKey) => {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + listingKey);
    if (!cached) return null;

    const { url, timestamp } = JSON.parse(cached);
    // Check if cache has expired
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(CACHE_PREFIX + listingKey);
      return null;
    }
    return url;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
};

// Helper: half-up rounding to a fixed number of decimals
function roundHalfUp(value, decimals = 2) {
  const factor = 10 ** decimals;
  // Adding a tiny epsilon ensures we do half-away-from-zero (4.125 → 4.13).
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

// Helper: shorten values to K/M with two decimals
function shortenNumber(num) {
  if (num == null) return "";
  const absVal = Math.abs(num);

  if (absVal >= 1_000_000) {
    // Millions: 4.125M → 4.13M
    return roundHalfUp(num / 1_000_000, 2).toFixed(2) + "M";
  } else if (absVal >= 1_000) {
    // Thousands: 9999 → 9.99K, 10000 → 10.00K
    return Math.round(num / 1_000) + "K";
  } else {
    // Below 1K: show two decimals
    return roundHalfUp(num, 2).toFixed(2);
  }
}

const ListingsMap = ({
  listings = [],
  isMapExpanded,
  propagateClick,
  hideListingEvent,
  customClass,
  onDelete
}) => {
  const [activeView, setActiveView] = useState("both");
  const [propertyStatus, setPropertyStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const mapRef = useRef(null);
  const [expandedClusters, setExpandedClusters] = useState(new Set());
  const [selectedListingKey, setSelectedListingKey] = useState("");
  const [viewState, setViewState] = useState(() => {
    // Calculate initial bounds from listings if available
    const validListings = listings.filter(
      (property) =>
        property.location?.coordinates?.latitude &&
        property.location?.coordinates?.longitude
    );

    if (validListings.length > 0) {
      const bounds = validListings.reduce(
        (acc, property) => {
          const { latitude, longitude } = property.location.coordinates;
          return {
            minLng: Math.min(acc.minLng, longitude),
            maxLng: Math.max(acc.maxLng, longitude),
            minLat: Math.min(acc.minLat, latitude),
            maxLat: Math.max(acc.maxLat, latitude),
          };
        },
        {
          minLng: 180,
          maxLng: -180,
          minLat: 90,
          maxLat: -90,
        }
      );

      return {
        latitude: (bounds.maxLat + bounds.minLat) / 2,
        longitude: (bounds.maxLng + bounds.minLng) / 2,
        zoom: 13,
      };
    }

    // Fallback to a default view if no valid listings
    return {
      latitude: 43.8078,
      longitude: -79.2652,
      zoom: 13,
    };
  });

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const fallbackImage = "/images/listing-home.jpg";
  const [markerPosition, setMarkerPosition] = useState(null);

  // Group listings by coordinates
  const groupedListings = listings.reduce((acc, property) => {
    if (
      !property.location ||
      !property.location.coordinates ||
      !property.location.coordinates.latitude ||
      !property.location.coordinates.longitude
    ) {
      return acc; // skip
    }
    const key = `${property.location.coordinates.latitude},${property.location.coordinates.longitude}`;
    if (!acc[key]) {
      acc[key] = {
        coordinates: {
          latitude: property.location.coordinates.latitude,
          longitude: property.location.coordinates.longitude,
        },
        properties: [],
      };
    }
    acc[key].properties.push(property);
    return acc;
  }, {});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [isMapExpanded]);

  const getValidListings = () => {
    return listings.filter(
      (property) =>
        property.location?.coordinates?.latitude &&
        property.location?.coordinates?.longitude
    );
  };

  const fitMapToBounds = () => {
    const validListings = getValidListings();
    if (validListings.length === 0) return;

    // Get min/max coordinates with some padding
    const bounds = validListings.reduce(
      (acc, property) => {
        const { latitude, longitude } = property.location.coordinates;
        return {
          minLng: Math.min(acc.minLng, longitude),
          maxLng: Math.max(acc.maxLng, longitude),
          minLat: Math.min(acc.minLat, latitude),
          maxLat: Math.max(acc.maxLat, latitude),
        };
      },
      {
        minLng: 180,
        maxLng: -180,
        minLat: 90,
        maxLat: -90,
      }
    );

    // Add some padding
    const PADDING = 0.1; // 10% padding
    const lngDiff = bounds.maxLng - bounds.minLng;
    const latDiff = bounds.maxLat - bounds.minLat;

    const viewport = new WebMercatorViewport({
      width:
        mapRef.current?.getMap()?.getContainer()?.offsetWidth ||
        window.innerWidth,
      height:
        mapRef.current?.getMap()?.getContainer()?.offsetHeight ||
        window.innerHeight,
    });

    try {
      const { longitude, latitude, zoom } = viewport.fitBounds(
        [
          [
            bounds.minLng - lngDiff * PADDING,
            bounds.minLat - latDiff * PADDING,
          ],
          [
            bounds.maxLng + lngDiff * PADDING,
            bounds.maxLat + latDiff * PADDING,
          ],
        ],
        { padding: 20 }
      );

      setViewState((prev) => ({
        ...prev,
        longitude,
        latitude,
        zoom: Math.min(zoom, 14), // Limit max zoom
        transitionDuration: 1000,
      }));
    } catch (error) {
      console.error("Error fitting bounds:", error);
      // Fallback to center point if fitBounds fails
      if (validListings.length > 0) {
        const centerLat = (bounds.maxLat + bounds.minLat) / 2;
        const centerLng = (bounds.maxLng + bounds.minLng) / 2;
        setViewState((prev) => ({
          ...prev,
          latitude: centerLat,
          longitude: centerLng,
          zoom: 13,
          transitionDuration: 1000,
        }));
      }
    }
  };

  // Fit bounds when listings change or map is loaded
  useEffect(() => {
    if (mapRef.current && listings.length > 0) {
      fitMapToBounds();
    }
  }, [listings, isMapExpanded]);

  // Effect to handle image loading when selected property changes
  useEffect(() => {
    if (selectedGroup) {
      const currentProperty = selectedGroup.properties[currentPropertyIndex];
      const cachedImageUrl = getCachedImage(currentProperty.listingKey);
      setCurrentImage(cachedImageUrl || fallbackImage);
    }
  }, [selectedGroup, currentPropertyIndex]);

  const handleMarkerClick = (group, property = null) => {
    const key = `${group.coordinates.latitude}-${group.coordinates.longitude}`;
    // If it's a cluster (more than one property)
    if (group.properties.length > 1) {
      setExpandedClusters((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(key) && property === null) {
          newSet.delete(key);
        } else {
          newSet.add(key);
        }
        return newSet;
      });

      // Zoom in when expanding cluster
      setViewState((prev) => ({
        ...prev,
        latitude: group.coordinates.latitude,
        longitude: group.coordinates.longitude,
        zoom: 17,
        transitionDuration: 500,
      }));

      if (property && property.listingKey) {
        const cachedImageUrl = getCachedImage(property.listingKey);
        setCurrentImage(cachedImageUrl || fallbackImage);
        setSelectedProperty(property);
        setSelectedListingKey(property.listingKey);
        propagateClick(property.listingKey);
      }
    } else {
      // Single property behavior remains the same
      setSelectedGroup(group);
      setCurrentPropertyIndex(0);
      setSelectedProperty(group.properties[0]);
      const cachedImageUrl = getCachedImage(group.properties[0].listingKey);
      setCurrentImage(cachedImageUrl || fallbackImage);
      setViewState((prev) => ({
        ...prev,
        latitude: group.coordinates.latitude,
        longitude: group.coordinates.longitude,
        zoom: 15,
        transitionDuration: 500,
      }));

      if (propagateClick) {
        const listingKey = group.properties[0].listingKey;
        setSelectedListingKey(listingKey);
        propagateClick(listingKey);
      }
    }
  };

  // Add handler for zoom changes
  const handleViewStateChange = (evt) => {
    setViewState(evt.viewState);
    // Clear expanded clusters when zooming out
    if (evt.viewState.zoom < 15) {
      setExpandedClusters(new Set());
    }
  };

  const handleClose = () => {
    setSelectedGroup(null);
    setSelectedProperty(null);
    setCurrentPropertyIndex(0);
    setCurrentImage(null);
    setSelectedListingKey("");
    setMarkerPosition(null);
  };

  const findGroupByListingKey = (listingKey) => {
    const groups = Object.values(groupedListings);
    return groups.find((group) =>
      group.properties.some((property) => property.listingKey === listingKey)
    );
  };

  const handleListingCardClicked = (listingKey) => {
    const group = findGroupByListingKey(listingKey);
    if (group.properties.length > 1) {
      var property = group.properties.find(
        (property) => property.listingKey === listingKey
      );
      handleMarkerClick(group, property || null);
      return;
    }

    handleMarkerClick(group);
  };

  // Rendering Markers with shortened values
  const renderMarkers = () => {
    return Object.values(groupedListings).map((group) => {
      const key = `${group.coordinates.latitude}-${group.coordinates.longitude}`;
      const isGroupExpanded = expandedClusters.has(key);
      // If cluster is expanded, show individual markers
      if (isGroupExpanded && group.properties.length > 1) {
        return group.properties.map((property, index) => (
          <Marker
            key={`${key}-${index}`}
            latitude={group.coordinates.latitude + index * 0.0001}
            longitude={group.coordinates.longitude + index * 0.0001}
            onClick={() => handleMarkerClick(group, property)}
            style={{ cursor: "pointer" }}
          >
            <div className="relative">
              <div
                className={`transition-transform duration-200 hover:scale-105  
                                          ${
                                            selectedListingKey ===
                                            property.listingKey
                                              ? "rounded-full border border-blue-500 p-1"
                                              : ""
                                          }`}
              >
                <div className="px-3 py-1 rounded-full bg-white shadow-lg border border-gray-100">
                  <span className="text-sm font-semibold">
                    {`$${property.listPrice}`}
                  </span>
                </div>
              </div>
            </div>
          </Marker>
        ));
      }
      // Regular marker/cluster display
      return (
        <Marker
          key={key}
          latitude={group.coordinates.latitude}
          longitude={group.coordinates.longitude}
          onClick={() => handleMarkerClick(group, null)}
          style={{ cursor: "pointer" }}
        >
          <div className="relative marker-container">
            <div
              className={`transition-transform duration-200 hover:scale-105 
                                ${
                                  selectedListingKey ===
                                  group.properties[0].listingKey
                                    ? "rounded-full border border-blue-500 p-1"
                                    : ""
                                }`}
            >
              <div className="px-3 py-1 rounded-full bg-white shadow-lg border border-gray-100">
                <span
                  className={`text-sm font-semibold ${
                    group.properties.length > 1
                      ? "text-purple-600"
                      : group.properties[0].uiStatus === "Sold"
                      ? "text-red-600"
                      : "text-black"
                  }`}
                >
                  {group.properties.length > 1
                    ? `${group.properties.length} homes`
                    : group.properties[0].uiStatus === "Sold"
                    ? `$${group.properties[0].soldPrice}`
                    : `$${group.properties[0].listPrice}`}
                </span>
              </div>
            </div>
          </div>
        </Marker>
      );
    });
  };

  const getVisibility = (component) => {
    switch (component) {
      case "map":
        return activeView === "map" || activeView === "both";
      case "list":
        return activeView === "list" || activeView === "both";
      default:
        return false;
    }
  };

  const propagateHideListingEvent = (key) => {
    if (hideListingEvent) {
      hideListingEvent(key);
    }
  };

  return (
    <div className={`metric-card-new ${customClass}`}>
      {/* iOS-style View Toggle Buttons */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#eaeaea] border border-t-0 border-s-0 border-e-0 border-[#fff]">
        <div className="flex items-center">
          <button
            onClick={() => setActiveView("map")}
            className={`px-4 py-1.5 cursor-pointer rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === "map" ? "bg-blue-500 text-white" : "text-white-600"
            }`}
          >
            Map
          </button>

          <button
            onClick={() => setActiveView("list")}
            className={`px-4 py-1.5 hover:cursor-pointer rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === "list"
                ? "bg-blue-500 text-white"
                : "text-white-600"
            }`}
          >
            List
          </button>

          <button
            onClick={() => setActiveView("both")}
            className={`px-4 py-1.5 hover:cursor-pointer rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === "both"
                ? "bg-blue-500 text-white"
                : "text-white-600"
            }`}
          >
            Both
          </button>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setPropertyStatus("Sold")}
            className={`px-4 py-1.5 hover:cursor-pointer rounded-md text-sm font-medium transition-all duration-200 ${
              propertyStatus === "Sold"
                ? "bg-blue-500 text-white"
                : "text-white-600"
            }`}
          >
            Sold
          </button>

          <button
            onClick={() => setPropertyStatus("Available")}
            className={`px-4 py-1.5 hover:cursor-pointer rounded-md text-sm font-medium transition-all duration-200 ${
              propertyStatus === "Available"
                ? "bg-blue-500 text-white"
                : "text-white-600"
            }`}
          >
            Available
          </button>

          <button
            onClick={() => setPropertyStatus("All")}
            className={`px-4 py-1.5 hover:cursor-pointer rounded-md text-sm font-medium transition-all duration-200 ${
              propertyStatus === "All"
                ? "bg-blue-500 text-white"
                : "text-white-600"
            }`}
          >
            All
          </button>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => {
              fitMapToBounds();
              setExpandedClusters(new Set());
              handleClose();
            }}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-blue-500 text-white flex items-center gap-2`}
          >
            <span>Reset Map</span>
          </button>

          <i className="icon-close-circle text-2xl text-[rgb(223,88,74)] cursor-pointer flex ml-2" onClick={onDelete}></i>

        </div>

      </div>

      <div className="relative p-3 h-[700px]">
        {/* Reset Map Button & Filters (optional) */}
        <div className="absolute top-1 right-0 transform -translate-x-11 z-20">
          {showFilters && (
            <div className="absolute top-full right-0 mt-1 w-80 bg-white rounded-lg shadow-xl z-40">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="hover:bg-gray-100 p-1 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-1/2 p-2 border rounded"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-1/2 p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Property Type</h3>
                    <div className="space-y-2">
                      {["Apartment", "House", "Studio", "Loft"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map Component */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            getVisibility("map")
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <Map
            {...viewState}
            ref={mapRef}
            onMove={handleViewStateChange}
            style={{ width: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          >
            <NavigationControl position="top-right" />
            {renderMarkers()}
          </Map>
        </div>
      </div>

      {/* Bottom Sheet / Popup */}
      {selectedProperty && (
        <PropertyPopup
          property={selectedProperty}
          currentImage={currentImage}
          currentPropertyIndex={currentPropertyIndex}
          handleClose={handleClose}
        />
      )}

      {/* ListingsSection */}
      <div
        className={`bg-gray-100 rounded-lg transition-all duration-300 ${
          !getVisibility("list")
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        } ${
          activeView === "list"
            ? "absolute inset-0" // Full screen when list only
            : "absolute bottom-1 left-2 right-2" // Overlay when both
        } z-[5]`}
      >
        <div
          className={`rounded-lg overflow-hidden ${
            activeView === "list" ? "h-full flex flex-col" : ""
          }`}
        >
          <ListingsSection
            listings={listings}
            onHideListing={(key) => propagateHideListingEvent(key)}
            sortOption="price-low"
            selectedListingKey={selectedProperty?.listingKey}
            activeView={activeView}
            onListingCardClicked={(listingKey) =>
              handleListingCardClicked(listingKey)
            }
            selectedFilterOption={propertyStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingsMap;
