// components/report/ListingCard.jsx
import React from 'react';

const ListingCard = ({ listing, onHideToggle }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Image Section */}
            <div className="relative">
                <img
                    src={`/api/placeholder/400/300`}
                    alt={listing.address}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                    <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                        For Sale
                    </span>
                </div>
                <button
                    onClick={onHideToggle}
                    className="absolute top-2 right-2 px-3 py-1 bg-white text-gray-700 text-xs font-medium 
                             rounded-full shadow hover:bg-gray-50 transition-colors flex items-center gap-1"
                >
                    <span>Hide</span>
                </button>
            </div>

            {/* Content Section */}
            <div className="p-4">
                <div className="text-xl font-semibold mb-1">
                    ${listing.price.toLocaleString()}
                </div>

                <div className="text-gray-700 mb-2">
                    {listing.address}, {listing.city}
                </div>

                <div className="flex items-center gap-4 text-gray-600 text-sm mb-2">
                    <div className="flex items-center">
                        <span>{listing.beds}</span>
                        <span className="ml-1">beds</span>
                    </div>
                    <div className="flex items-center">
                        <span>{listing.baths}</span>
                        <span className="ml-1">baths</span>
                    </div>
                    <div className="flex items-center">
                        <span>{listing.sqft.toLocaleString()}</span>
                        <span className="ml-1">sqft</span>
                    </div>
                </div>

                <div className="text-xs text-gray-400">
                    MLS® {listing.mls}
                </div>
            </div>
        </div>
    );
};


export default ListingCard;