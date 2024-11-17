// components/report/ListingsSection.jsx
import React, { useState } from 'react';
import ListingCard from './ListingCard';

const ListingsSection = ({ listings, onSort, sortOption }) => {
    return (
        <div>
            {/* Header with Listings title, filters and count */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <h2 className="font-medium">Listings</h2>
                    <select
                        value={sortOption}
                        onChange={(e) => onSort(e.target.value)}
                        className="border rounded px-2 py-1 text-sm text-blue-900 bg-white"
                    >
                        <option value="for-sale">For Sale</option>
                    </select>
                    <button className="flex items-center text-sm text-blue-900">
                        <span className="mr-1">Sort by Price: Low to High</span>
                    </button>
                </div>
                <span className="text-sm text-gray-600">{listings.length} detached homes</span>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
                {listings.map(listing => (
                    <ListingCard
                        key={listing.listingKey}
                        listing={listing}
                        onHideToggle={() => {/* handle hide */ }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListingsSection;