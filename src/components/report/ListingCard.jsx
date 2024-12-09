import React, { useEffect, useState } from 'react';
import { BedIcon, BathIcon } from 'lucide-react';
import { baseDataAPI } from '../../services/api';

// Constants
const CACHE_PREFIX = 'listing_img_';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const SOLD_OPACITY = 'opacity-75';
const OVERLAY_OPACITY = 'bg-opacity-20';

// Helper functions for localStorage management
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

const setCachedImage = (listingKey, url) => {
    try {
        const cacheData = {
            url,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_PREFIX + listingKey, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Error writing to cache:', error);
        // If localStorage is full, clear old entries
        clearOldCache();
    }
};

const clearOldCache = () => {
    try {
        const keys = Object.keys(localStorage);
        const listingKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));

        // Sort by timestamp and remove oldest entries until we have space
        const sortedEntries = listingKeys
            .map(key => ({
                key,
                timestamp: JSON.parse(localStorage.getItem(key)).timestamp
            }))
            .sort((a, b) => a.timestamp - b.timestamp);

        // Remove the oldest 20% of entries
        const entriesToRemove = Math.ceil(sortedEntries.length * 0.2);
        sortedEntries.slice(0, entriesToRemove).forEach(entry => {
            localStorage.removeItem(entry.key);
        });
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
};

const ListingCard = ({ listing, onHideToggle, isClient }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fallbackImage = '/images/listing-home.jpg';
    const isHidden = listing.hide === true;

    useEffect(() => {
        const loadImage = async () => {
            try {
                setIsLoading(true);
                const cachedUrl = getCachedImage(listing.listingKey);
                if (cachedUrl) {
                    setImageUrl(cachedUrl);
                    setIsLoading(false);
                    return;
                }

                const response = await baseDataAPI.fetchListingMedia(listing.listingKey);
                const mediaUrl = response.success ? await response.data : fallbackImage;

                if (mediaUrl !== fallbackImage) {
                    setCachedImage(listing.listingKey, mediaUrl);
                }

                setImageUrl(mediaUrl);
            } catch (error) {
                console.error('Error loading listing image:', error);
                setImageUrl(fallbackImage);
            } finally {
                setIsLoading(false);
            }
        };

        loadImage();
    }, [listing.listingKey]);

    return (
        <div className={`listing-card rounded-lg overflow-hidden shadow-sm relative `}>
            {/* Semi-transparent overlay for sold listings */}
            {isHidden && (
                <div className={`absolute inset-0 bg-gray-200 ${OVERLAY_OPACITY} z-10 pointer-events-none`} />
            )}

            {/* Image Section */}
            <div className="relative">
                {isLoading ? (
                    <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="text-gray-400">Loading...</div>
                    </div>
                ) : (
                    <img
                        src={imageUrl}
                        className={`w-full h-36 object-cover ${isHidden ? 'filter grayscale' : ''}`}
                        alt={`Listing ${listing.listingKey}`}
                    />
                )}
                <div className="absolute top-2 left-2 z-20">
                    <span className={`${isHidden ? 'sold' : 'for-sale'
                        } text-white px-3 py-1 text-xs font-medium rounded-full`}>
                        {listing.uiStatus}
                    </span>
                </div>
                {!isClient && <button
                    onClick={() => onHideToggle(listing.listingKey)}
                    className="absolute top-2 right-2 px-3 py-1 bg-white text-gray-700 text-xs font-medium 
                             rounded-full shadow hover:bg-gray-50 transition-colors flex items-center gap-1 z-20"
                >
                    <span>{isHidden ? 'Show' : 'Hide'}</span>
                </button>}
            </div>

            {/* Content Section */}
            <div className="p-1">
                <div className={`text-sm font-semibold mb-1 ${isHidden ? 'text-gray-600' : ''}`}>
                    ${listing.formattedListPrice}
                </div>

                <div className="text-xs mb-2">
                    {listing.uiCity}, {listing.postalCode}
                </div>

                <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                    <div className="flex items-center">
                        <BedIcon className={isHidden ? SOLD_OPACITY : ''} />
                        <span className="text-xs">{listing.bedroomsTotal}</span>
                        <span className="text-xs">beds</span>
                    </div>
                    <div className="flex items-center">
                        <BathIcon className={isHidden ? SOLD_OPACITY : ''} />
                        <span className="text-xs  ">{listing.bathroomsTotalInteger}</span>
                        <span className="text-xs  ml-1">baths</span>
                    </div>
                </div>

                <div className={`listing-card-mls-badge listing-card-mls-badge-label ${isHidden ? SOLD_OPACITY : ''}`}>
                    MLS® {listing.listingKey}
                </div>
            </div>
        </div>
    );
};

export default ListingCard;