import Map, {
    Marker,
    NavigationControl
} from 'react-map-gl';
import { WebMercatorViewport } from '@math.gl/web-mercator';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, TrendingUp, TrendingDown, BedIcon, BathIcon } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Reuse the cache constants and helper function from ListingCard
const CACHE_PREFIX = 'listing_img_';
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
        console.error('Error reading from cache:', error);
        return null;
    }
};

const ListingsMap = ({ listings = [], isMapExpanded, propagateClick }) => {
    const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const mapRef = useRef(null);
    const [expandedClusters, setExpandedClusters] = useState(new Set());
    const [viewState, setViewState] = useState({
        latitude: 43.8078,
        longitude: -79.2652,
        zoom: 13
    });

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const fallbackImage = '/images/listing-home.jpg';

    // Group listings by coordinates
    const groupedListings = listings.reduce((acc, property) => {
        if (!property.location || !property.location.coordinates ||
            !property.location.coordinates.latitude || !property.location.coordinates.longitude) {
            return acc; // Return accumulator without adding this property
        }
        const key = `${property.location.coordinates.latitude},${property.location.coordinates.longitude}`;
        if (!acc[key]) {
            acc[key] = {
                coordinates: {
                    latitude: property.location.coordinates.latitude,
                    longitude: property.location.coordinates.longitude
                },
                properties: []
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
        return listings.filter(property =>
            property.location &&
            property.location.coordinates &&
            property.location.coordinates.latitude &&
            property.location.coordinates.longitude
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
            width: mapRef.current?.getMap()?.getContainer()?.offsetWidth || window.innerWidth,
            height: mapRef.current?.getMap()?.getContainer()?.offsetHeight || window.innerHeight
        });

        try {
            const { longitude, latitude, zoom } = viewport.fitBounds(
                [
                    [bounds.minLng - lngDiff * PADDING, bounds.minLat - latDiff * PADDING],
                    [bounds.maxLng + lngDiff * PADDING, bounds.maxLat + latDiff * PADDING]
                ],
                { padding: 20 }
            );

            setViewState(prev => ({
                ...prev,
                longitude,
                latitude,
                zoom: Math.min(zoom, 15), // Limit max zoom
                transitionDuration: 1000
            }));
        } catch (error) {
            console.error('Error fitting bounds:', error);
            // Fallback to center point if fitBounds fails
            if (validListings.length > 0) {
                const centerLat = (bounds.maxLat + bounds.minLat) / 2;
                const centerLng = (bounds.maxLng + bounds.minLng) / 2;
                setViewState(prev => ({
                    ...prev,
                    latitude: centerLat,
                    longitude: centerLng,
                    zoom: 13,
                    transitionDuration: 1000
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


    const handleMarkerClick = (group) => {
        const key = `${group.coordinates.latitude}-${group.coordinates.longitude}`;
        // If it's a cluster (more than one property)
        if (group.properties.length > 1) {
            setExpandedClusters(prev => {
                const newSet = new Set(prev);
                if (newSet.has(key)) {
                    newSet.delete(key);
                } else {
                    newSet.add(key);
                }
                return newSet;
            });

            // Zoom in when expanding cluster
            setViewState(prev => ({
                ...prev,
                latitude: group.coordinates.latitude,
                longitude: group.coordinates.longitude,
                zoom: 17,
                transitionDuration: 500
            }));
        } else {
            // Single property behavior remains the same
            setSelectedGroup(group);
            setCurrentPropertyIndex(0);
            const cachedImageUrl = getCachedImage(group.properties[0].listingKey);
            setCurrentImage(cachedImageUrl || fallbackImage);

            setViewState(prev => ({
                ...prev,
                latitude: group.coordinates.latitude,
                longitude: group.coordinates.longitude,
                zoom: 15,
                transitionDuration: 500
            }));

            if (propagateClick) {
                propagateClick(group.properties[0].listingKey)
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


    const handleNext = () => {
        setCurrentPropertyIndex((prev) => {
            const nextIndex = prev === selectedGroup.properties.length - 1 ? 0 : prev + 1;
            const cachedImageUrl = getCachedImage(selectedGroup.properties[nextIndex].listingKey);
            setCurrentImage(cachedImageUrl || fallbackImage);
            return nextIndex;
        });
    };

    const handlePrev = () => {
        setCurrentPropertyIndex((prev) => {
            const nextIndex = prev === 0 ? selectedGroup.properties.length - 1 : prev - 1;
            const cachedImageUrl = getCachedImage(selectedGroup.properties[nextIndex].listingKey);
            setCurrentImage(cachedImageUrl || fallbackImage);
            return nextIndex;
        });
    };

    const handleClose = () => {
        setSelectedGroup(null);
        setCurrentPropertyIndex(0);
        setCurrentImage(null);
    };

    const renderPrice = (property) => {
        const isSold = property.uiStatus === 'Sold';
        const hasClosePrice = property.soldPrice && property.listPrice !== property.soldPrice;

        if (isSold && hasClosePrice) {
            const soldHigher = property.soldPrice > property.listPrice;
            return (
                <div className="space-y-1">
                    <div className="text-sm font-bold text-gray-600 relative">
                        List:  <span className="relative">
                            <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-900 transform -rotate-180"></span>
                            ${property.formattedListPrice}
                        </span>
                    </div>
                    <div className="text-sm font-bold text-green-600 flex items-center gap-1">
                        <span>Sold: ${property.soldPrice.toLocaleString()}</span>
                        {soldHigher ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                    </div>

                </div>
            );
        }

        return (
            <div className="text-xl font-bold text-blue-600">
                ${property.formattedListPrice}
            </div>
        );
    };

    // Modify the marker rendering logic
    const renderMarkers = () => {
        return Object.values(groupedListings).map(group => {
            const key = `${group.coordinates.latitude}-${group.coordinates.longitude}`;
            const isExpanded = expandedClusters.has(key);
            // If cluster is expanded, show individual markers
            if (isExpanded && group.properties.length > 1) {
                return group.properties.map((property, index) => (
                    <Marker
                        key={`${key}-${index}`}
                        latitude={group.coordinates.latitude + (index * 0.0001)}
                        longitude={group.coordinates.longitude + (index * 0.0001)}
                        onClick={() => {
                            setSelectedGroup({ ...group, properties: [property] });
                            setCurrentPropertyIndex(0);
                            const cachedImageUrl = getCachedImage(property.listingKey);
                            setCurrentImage(cachedImageUrl || fallbackImage);
                            if (propagateClick) {
                                propagateClick(property.listingKey)
                            }

                        }}
                    >
                        <div className="transition-transform duration-200 hover:scale-105">
                            <div className="px-3 py-1 rounded-full bg-white shadow-lg border border-gray-100">
                                <span className="text-sm font-semibold">
                                    ${property.formattedListPrice}
                                </span>
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
                    onClick={() => handleMarkerClick(group)}
                >
                    <div className="transition-transform duration-200 hover:scale-105">
                        <div className={`px-3 py-1 rounded-full bg-white shadow-lg border border-gray-100`}>
                            <span className={`text-sm font-semibold ${group.properties.length > 1
                                ? 'text-purple-600'
                                : group.properties[0].uiStatus === 'Sold'
                                    ? 'text-red-600'
                                    : 'text-black'
                                }`}>
                                {group.properties.length > 1
                                    ? `${group.properties.length} homes`
                                    : group.properties[0].uiStatus === 'Sold' ? `$${group.properties[0].formattedSoldPrice}` : `$${group.properties[0].formattedListPrice}`
                                }
                            </span>
                        </div>
                    </div>
                </Marker>
            );
        });
    };

    return (
        <div className="relative w-full h-[600px]">
            {/* Add Reset Button */}
            <div className="hidden lg:flex absolute top-2 left-28 z-10">
                <button
                    onClick={() => {
                        fitMapToBounds();
                        setExpandedClusters(new Set());
                    }}
                    className="button-blue text-white p-2 rounded-md shadow-md hover:bg-gray-50 transition-colors duration-200"
                >
                    <div className="flex items-center">
                        <span className="text-sm">Reset View</span>
                    </div>
                </button>
            </div>

            <Map
                {...viewState}
                ref={mapRef}
                onMove={handleViewStateChange}
                style={{ width: '100%', borderRadius: '0.5rem' }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            >
                <NavigationControl position="top-right" />
                {renderMarkers()}
            </Map>

            {/* Enhanced Bottom Sheet with Image */}
            {selectedGroup && (
                <div className="absolute bottom-10 left-0 right-0 bg-white shadow-lg rounded-t-xl transform transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col w-full">
                        {/* Header */}
                        <div className="p-2 border-b  flex justify-between items-center">
                            <h3 className="text-base font-bold text-gray-900">
                                Property Details - MLS®{selectedGroup.properties[currentPropertyIndex].listingKey}
                            </h3>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Close dialog"
                            >
                                <X className="w-3 h-3 text-gray-500" />
                            </button>
                        </div>

                        {/* Content with Image */}
                        <div className="p-4 flex flex-row gap-4">
                            {/* Property Details */}
                            <div className="flex-1 space-y-3">
                                <div className="text-xl font-bold text-blue-600">
                                    {renderPrice(selectedGroup.properties[currentPropertyIndex])}

                                </div>

                                <div className="flex text-center">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-sm  text-center">
                                        <BedIcon />{selectedGroup.properties[currentPropertyIndex].bedroomsTotal} beds
                                    </span>
                                    <span className="bg-gray-100 px-2 py-1 rounded text-sm  text-center">
                                        <BathIcon />{selectedGroup.properties[currentPropertyIndex].bathroomsTotalInteger} baths
                                    </span>
                                </div>
                                <div className="text-gray-600 text-xs">
                                    {selectedGroup.properties[currentPropertyIndex].address}
                                </div>
                                <div className="text-gray-600 text-xs">
                                    {selectedGroup.properties[currentPropertyIndex].uiCity},
                                    {selectedGroup.properties[currentPropertyIndex].province}
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                                        {selectedGroup.properties[currentPropertyIndex].uiStatus}
                                    </span>

                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="flex-1">
                                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <img
                                        src={currentImage}
                                        alt={`Property ${selectedGroup.properties[currentPropertyIndex].listingKey}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer with Navigation */}
                        {selectedGroup.properties.length > 1 && (
                            <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                                <button
                                    onClick={handlePrev}
                                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 touch-manipulation"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span className="text-sm">Previous</span>
                                </button>
                                <span className="text-sm text-gray-500">
                                    {currentPropertyIndex + 1} of {selectedGroup.properties.length}
                                </span>
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 touch-manipulation"
                                >
                                    <span className="text-sm">Next</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingsMap;