import React, { useState, useEffect, useRef } from 'react';
import { CrossIcon, X } from 'lucide-react';
import { baseDataAPI } from '../services/api';

const CityRegionSearch = ({ city, currentValue, onSelect, onClicked }) => {
    console.log('selected city is:', city);
    const [selectedCity, setSelectedCity] = useState(city || 'Toronto');
    const [searchTerm, setSearchTerm] = useState(currentValue);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [regionData, setRegionData] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true); // Start with loading true
    const [error, setError] = useState(null);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Filter locations and preserve type information
    const filteredLocations = regionData
        .filter(location => location) // Remove null values
        .filter(location =>
            location.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleSearchClick = () => {
        if (selectedLocation && onClicked) {
            onClicked(selectedLocation);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
        setSelectedIndex(-1);
    };

    const handleSelect = (location) => {
        setSearchTerm(location);
        setSelectedLocation(location);
        setIsOpen(false);
        if (onSelect) {
            onSelect(location);
        }
    };

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredLocations.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSelect(filteredLocations[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Fetch region data when city changes
    useEffect(() => {
        const fetchRegionData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await baseDataAPI.fetchRegionsByCity(selectedCity);
                if (result.success) {
                    setRegionData(result.data);
                } else {
                    setError(result.error);
                    setRegionData([]); // Reset to empty array on error
                }
            } catch (err) {
                setError(err.message);
                setRegionData([]); // Reset to empty array on error
            } finally {
                setLoading(false);
            }
        };

        if (selectedCity) {
            fetchRegionData();
        }
    }, [selectedCity]); // Dependency on selectedCity

    return (
        <div className="relative w-full">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    placeholder={loading ? "Loading regions..." : "Start typing a neighbourhood ..."}
                    className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="off"
                    disabled={loading}
                />
                <button
                    onClick={() => {
                        setSearchTerm('');
                        setSelectedLocation(null);
                        setIsOpen(false);
                        inputRef.current?.focus();
                        if (onSelect) {
                            onSelect(null);
                        }
                    }}
                    disabled={!searchTerm || loading}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 transition-colors`}>
                <X className="w-4 h-4 text-gray-500" />
                </button>

            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-2 text-red-500 text-sm">
                    {error}
                </div>
            )}

            {/* Loading Message */}
            {loading && (
                <div className="mt-2 text-gray-500 text-sm">
                    Loading regions...
                </div>
            )}

            {/* Dropdown */}
            {!loading && isOpen && filteredLocations.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto"
                >
                    <ul className="py-2">
                        {filteredLocations.map((location, index) => (
                            <li
                                key={`${location}`}
                                className={`px-4 py-2 cursor-pointer transition-colors ${selectedIndex === index
                                    ? 'bg-blue-50 text-blue-900'
                                    : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                                onClick={() => handleSelect(location)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <div className="flex justify-between items-center">
                                    <span>{location}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* No Results Message */}
            {!loading && isOpen && searchTerm && filteredLocations.length === 0 && (
                <div className="mt-2 text-gray-500 text-sm">
                    No regions found
                </div>
            )}
        </div>
    );
};

export default CityRegionSearch;