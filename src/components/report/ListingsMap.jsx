import Map, {
    Marker,
    NavigationControl,
} from 'react-map-gl';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X , TrendingUp, TrendingDown } from 'lucide-react';
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

const ListingsMap = ({ listings = [], isMapExpanded }) => {
    const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const mapRef = useRef(null);
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

    // Effect to handle image loading when selected property changes
    useEffect(() => {
        if (selectedGroup) {
            const currentProperty = selectedGroup.properties[currentPropertyIndex];
            const cachedImageUrl = getCachedImage(currentProperty.listingKey);
            setCurrentImage(cachedImageUrl || fallbackImage);
        }
    }, [selectedGroup, currentPropertyIndex]);

    const handleMarkerClick = (group) => {
        setSelectedGroup(group);
        setCurrentPropertyIndex(0);
        const cachedImageUrl = getCachedImage(group.properties[0].listingKey);
        setCurrentImage(cachedImageUrl || fallbackImage);

        setViewState(prev => ({
            ...prev,
            latitude: group.coordinates.latitude,
            longitude: group.coordinates.longitude,
            transitionDuration: 500
        }));
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
                    <div className="text-lg font-bold text-gray-400 relative">
                        <span className="relative">
                            <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-900 transform -rotate-180"></span>
                            ${property.formattedListPrice}
                        </span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                       Sold: ${property.soldPrice.toLocaleString()}
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

    return (
        <div className="relative w-full h-full">
            <Map
                {...viewState}
                ref={mapRef}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            >
                <NavigationControl position="top-right" />

                {Object.values(groupedListings).map(group => (
                    <Marker
                        key={`${group.coordinates.latitude}-${group.coordinates.longitude}`}
                        latitude={group.coordinates.latitude}
                        longitude={group.coordinates.longitude}
                        onClick={() => handleMarkerClick(group)}
                    >
                        <div className="relative w-[60px] h-[60px]">
                            <div className={`absolute w-full h-full rounded-full ${group.properties.length > 1
                                ? 'bg-red-500/20 border-red-500'
                                : 'bg-blue-500/20 border-blue-500'
                                } border-2`}
                            />
                            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                ${group.properties.length > 1 ? 'bg-red-500' : 'bg-blue-500'}
                                text-white px-2 py-1 rounded font-bold cursor-pointer`}
                            >
                                {group.properties.length > 1
                                    ? group.properties.length
                                    : `$${group.properties[0].formattedListPrice}`
                                }
                            </div>
                        </div>
                    </Marker>
                ))}
            </Map>

            {/* Enhanced Bottom Sheet with Image */}
            {selectedGroup && (
                <div className="absolute bottom-10 left-0 right-0 bg-white shadow-lg rounded-t-xl transform transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col w-full">
                        {/* Header */}
                        <div className="p-2 border-b  flex justify-between items-center">
                            <h3 className="text-base font-bold text-gray-900">
                                Property Details
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

                                <div className="flex gap-2">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        {selectedGroup.properties[currentPropertyIndex].bedroomsTotal} beds
                                    </span>
                                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        {selectedGroup.properties[currentPropertyIndex].bathroomsTotalInteger} baths
                                    </span>
                                </div>

                                <div className="text-gray-600 text-sm">
                                    {selectedGroup.properties[currentPropertyIndex].uiCity},
                                    {selectedGroup.properties[currentPropertyIndex].province}
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                                        {selectedGroup.properties[currentPropertyIndex].uiStatus}
                                    </span>
                                    <span className="text-gray-500">
                                        {selectedGroup.properties[currentPropertyIndex].postalCode}
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