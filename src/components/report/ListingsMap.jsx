import Map, { Marker, NavigationControl } from 'react-map-gl';
import { WebMercatorViewport } from '@math.gl/web-mercator';
import PropertyPopup from './PropertyPopup';
import ListingsSection from './ListingsSection';
import { ListFilter, X } from 'lucide-react';

import { useState, useEffect, useRef } from 'react';
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
    const [activeView, setActiveView] = useState('both');
    const [showFilters, setShowFilters] = useState(false);
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
                zoom: Math.min(zoom, 14), // Limit max zoom
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


    const handleClose = () => {
        setSelectedGroup(null);
        setCurrentPropertyIndex(0);
        setCurrentImage(null);
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
                    style={{'cursor':'pointer'}}
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

    const getVisibility = (component) => {
        switch (component) {
            case 'map':
                return activeView === 'map' || activeView === 'both';
            case 'list':
                return activeView === 'list' || activeView === 'both';
            default:
                return false;
        }
    };

    return (
        <div className="w-full h-[550px]">
            {/* Add Reset Button */}
            {/* <div className="hidden lg:flex absolute top-2 left-28 z-10">
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
 */}
            {/* iOS-style Toggle Buttons */}
            <div className="absolute top-1 left-1 transform z-20">
                <div className="flex flex-row bg-[grey] text-white rounded-lg md:space-y-0 md:space-x-1">
                    <button
                        onClick={() => setActiveView('map')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeView === 'map'
                                ? 'bg-blue-500 text-white'
                                : 'text-white-600'
                            }`}
                    >
                        Map
                    </button>
                    <button
                        onClick={() => setActiveView('list')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeView === 'list'
                                ? 'bg-blue-500 text-white'
                                : 'text-white-600'
                            }`}
                    >
                        List
                    </button>
                    <button
                        onClick={() => setActiveView('both')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeView === 'both'
                                ? 'bg-blue-500 text-white'
                                : 'text-white-600'
                            }`}
                    >
                        Both
                    </button>
                </div>
            </div>

            <div className="absolute top-1 right-0 transform -translate-x-11 z-20">
                <div className="flex bg-white rounded-lg shadow-md space-x-1">
                    <button
                        onClick={() => {
                            fitMapToBounds();
                            setExpandedClusters(new Set());
                        }}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-blue-500 text-white flex items-center gap-2`}
                    >
                        <ListFilter className="w-4 h-4" />
                        <span>Reset Map</span>
                    </button>
                </div>
                {showFilters && (
                    <div className="absolute top-full right-0 mt-1 w-80 bg-white rounded-lg shadow-xl z-40">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Filters</h2>
                                <button onClick={() => setShowFilters(false)} className="hover:bg-gray-100 p-1 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium mb-2">Price Range</h3>
                                    <div className="flex gap-2">
                                        <input type="number" placeholder="Min" className="w-1/2 p-2 border rounded" />
                                        <input type="number" placeholder="Max" className="w-1/2 p-2 border rounded" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Property Type</h3>
                                    <div className="space-y-2">
                                        {['Apartment', 'House', 'Studio', 'Loft'].map(type => (
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
                className={`absolute inset-0 transition-opacity duration-300 ${getVisibility('map') ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <Map
                    {...viewState}
                    ref={mapRef}
                    onMove={handleViewStateChange}
                    style={{ width: '100%', borderRadius: '0.5rem' }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    mapboxAccessToken={MAPBOX_ACCESS_TOKEN}>
                    <NavigationControl position="top-right" />
                    {renderMarkers()}
                </Map>
            </div>
            {/* Enhanced Bottom Sheet with Image */}
            {selectedGroup && (
                <PropertyPopup
                    selectedGroup={selectedGroup}
                    currentImage={currentImage}
                    currentPropertyIndex={currentPropertyIndex}
                    handleClose={handleClose} />
            )}


            {/* ListingsSection */}
            <div
                className={`bg-gray-100 rounded-lg transition-all duration-300 ${!getVisibility('list')
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100'
                    } ${activeView === 'list'
                        ? 'absolute inset-0' // Full screen when list only
                        : 'absolute bottom-1 left-4 right-4' // Overlay when both
                    } z-[5]`}
            >
                <div className={`rounded-lg overflow-hidden ${activeView === 'list'
                    ? 'h-full flex flex-col' // Add flex-col to allow inner content to scroll
                    : ''}`}
                >
                    <ListingsSection
                        listings={listings}
                        sortOption="price-low"
                        selectedListingKey={selectedGroup?.properties[0]?.listingKey}
                        activeView={activeView}
                        parentIsExpanded={isMapExpanded}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListingsMap;