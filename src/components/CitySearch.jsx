import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, LocateFixedIcon } from 'lucide-react';
import { useCityData } from '../hooks/useCityData';

const CitySearch = ({ onSelect, onClicked }) => {

    const { cityData, loading, error } = useCityData();
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Filter cities based on search term
    const filteredLocations = cityData
        .filter(location => location)
        .filter(location =>
            location.toLowerCase().includes(searchTerm.toLowerCase())
        );

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


    return (
        <div className="relative w-full">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                        setSelectedIndex(-1);
                        setSelectedLocation(null);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    placeholder={loading ? "Loading cities..." : "Start typing a city ..."}
                    className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                    autoComplete="off"
                />

                {/* Search Button */}
                <button
                    onClick={() => {
                        if (selectedLocation) {
                            onClicked(selectedLocation);
                        }
                    }}
                    disabled={!selectedLocation || loading}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 button-homer-search transition-colors ${selectedLocation && !loading
                        ? 'bg-pink-200 hover:bg-pink-300 cursor-pointer'
                        : 'bg-gray-100 cursor-not-allowed'
                        }`}>
                    <ArrowRight className='w-5 h-5 text-white' />
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-2 text-red-500 text-sm">
                    Error loading cities: {error}
                </div>
            )}

            {/* Dropdown */}
            {isOpen && !loading && filteredLocations.length > 0 && (
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
        </div>
    );
};

export default CitySearch;