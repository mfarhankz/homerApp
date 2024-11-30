import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';

const ListingsSection = ({ listings, onSort }) => {
    const [sortOption, setSortOption] = useState('All');
    const [filteredListings, setFilteredListings] = useState(listings);
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
    const [isSortingEnabled, setIsSortingEnabled] = useState(false);

    useEffect(() => {
        const filterAndSortListings = () => {
            console.log('Current sort direction:', sortDirection);
            console.log('Sorting enabled:', isSortingEnabled);

            // First filter the listings
            let filtered = [...listings];
            switch (sortOption) {
                case 'Sold':
                    filtered = listings.filter(listing => listing.uiStatus === 'Sold');
                    break;
                case 'Available':
                    filtered = listings.filter(listing => listing.uiStatus === 'Available');
                    break;
                default: // 'All'
                    filtered = listings;
                    break;
            }

            // Then sort by price if sorting is enabled
            if (isSortingEnabled) {
                filtered.sort((a, b) => {
                    const priceA = parseFloat(a.listPrice) || 0;
                    const priceB = parseFloat(b.listPrice) || 0;
                    console.log('Comparing prices:', priceA, priceB);
                    return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
                });
            }

            setFilteredListings(filtered);
            if (onSort) {
                onSort(filtered);
            }
        };

        filterAndSortListings();
    }, [sortOption, listings, sortDirection, isSortingEnabled]);

    const handleSortChange = (event) => {
        console.log('Sort option changed to:', event.target.value);
        setSortOption(event.target.value);
    };

    const toggleSort = () => {
        if (!isSortingEnabled) {
            setIsSortingEnabled(true);
            setSortDirection('asc');
        } else {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        }
        console.log('Toggle sort clicked', { isSortingEnabled, sortDirection });
    };

    return (
        <div className="h-full flex flex-col">
            {/* Mobile-optimized header */}
            <div className="flex-none flex flex-col sm:flex-row items-start sm:items-center  gap-3 sm:gap-4 mb-4">
                <h2 className="font-medium">Listings</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
                            className="border rounded px-2 py-1 text-sm text-blue-900 price-sort min-w-[120px]"
                        >
                            <option value="All">All</option>
                            <option value="Sold">Sold</option>
                            <option value="Available">Available</option>
                        </select>
                        <button
                            onClick={toggleSort}
                            className="flex items-center text-sm price-sort transition-colors 
                                     border rounded px-3 py-1 whitespace-nowrap min-w-[150px] justify-between"
                        >
                            <span>
                                Price: {!isSortingEnabled ? 'No Sort' : (sortDirection === 'asc' ? 'Low to High' : 'High to Low')}
                            </span>
                            {isSortingEnabled && (
                                <svg
                                    className={`w-4 h-4 transform ${sortDirection === 'desc' ? 'rotate-180' : ''} transition-transform ml-2`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M8 4l4 4 4-4M8 12l4 4 4-4" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <span className="text-sm text-gray-600 ml-auto sm:ml-0">
                        <b>{filteredListings.length} homes</b>
                    </span>
                </div>
            </div>

            {/* Listings Grid */}
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredListings.map(listing => (
                        <ListingCard
                            key={listing.listingKey}
                            listing={listing}
                            onHideToggle={() => {/* handle hide */ }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListingsSection;