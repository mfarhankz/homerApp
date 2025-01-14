import React, { useState, useEffect, useRef } from 'react';
import ListingCard from './ListingCard';
import { useFetcher } from 'react-router-dom';

const ListingsSection = ({ listings, onSort, isClientView = false,
    onHideListing, selectedListingKey, activeView = 'both', onListingCardClicked }) => {
    const [sortOption, setSortOption] = useState('All');
    const [filteredListings, setFilteredListings] = useState(listings);
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
    const [isSortingEnabled, setIsSortingEnabled] = useState(false);

    const listingsRef = useRef({});


    useEffect(() => {
        if (selectedListingKey && listingsRef.current[selectedListingKey]) {
            listingsRef.current[selectedListingKey].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [selectedListingKey]);

    useEffect(() => {
        const filterAndSortListings = () => {
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

    const onHideListingClicked = (key) => {
        if (onHideListing) {
            onHideListing(key);
        }

        setFilteredListings(prevListings => {
            const updatedListings = prevListings.map(listing => {
                if (listing.listingKey === key) {
                    return { ...listing, hide: !listing.hide };
                }
                return listing;
            });
            return updatedListings;
        });
    }

    return (
        <div className={`flex-1 h-full flex  flex-col ${activeView === 'list' ? 'mt-12' : 'pb-1'}`}>
            <div className={`flex-1 overflow-y-auto ${activeView === 'list'
                ? `grid grid-cols-2 md:grid-cols-3  auto-rows-min mb-6 pb-12 gap-1` : 'grid grid-flow-col gap-1'
                }`}>
                {filteredListings.map(listing => (
                    <div
                        key={listing.listingKey}
                        ref={el => listingsRef.current[listing.listingKey] = el}
                        className={`transition-all duration-300  ${activeView === 'list' ? 'md:m-1' : ''}`}
                    >
                        <ListingCard
                            listing={listing}
                            onHideToggle={(key) => onHideListingClicked(key)}
                            isClient={isClientView}
                            isActive={selectedListingKey === listing.listingKey}
                            cardClicked={(listingKey) => onListingCardClicked(listingKey)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListingsSection;