// import React, { useState, useEffect, useRef } from 'react';
// import { Search, ArrowRight, LocateFixedIcon } from 'lucide-react';
// import { useCityData } from '../hooks/useCityData';

// const CitySearch = ({ onSelect, onClicked }) => {

//     const { cityData, loading, error } = useCityData();
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedIndex, setSelectedIndex] = useState(-1);
//     const [selectedLocation, setSelectedLocation] = useState(null);
//     const dropdownRef = useRef(null);
//     const inputRef = useRef(null);

//     // Filter cities based on search term
//     const filteredLocations = cityData
//         .filter(location => location)
//         .filter(location =>
//             location.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//     const handleSelect = (location) => {
//         setSearchTerm(location);
//         setSelectedLocation(location);
//         setIsOpen(false);
//         if (onSelect) {
//             onSelect(location);
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (!isOpen) {
//             if (e.key === 'ArrowDown' || e.key === 'Enter') {
//                 setIsOpen(true);
//             }
//             return;
//         }

//         switch (e.key) {
//             case 'ArrowDown':
//                 e.preventDefault();
//                 setSelectedIndex(prev =>
//                     prev < filteredLocations.length - 1 ? prev + 1 : prev
//                 );
//                 break;
//             case 'ArrowUp':
//                 e.preventDefault();
//                 setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
//                 break;
//             case 'Enter':
//                 e.preventDefault();
//                 if (selectedIndex >= 0) {
//                     handleSelect(filteredLocations[selectedIndex]);
//                 }
//                 break;
//             case 'Escape':
//                 setIsOpen(false);
//                 break;
//             default:
//                 break;
//         }
//     };


//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//                 inputRef.current && !inputRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);


//     return (
//         <div className="w-full relative px-8 sm:px-12"> {/* Adjusted padding */}
//             <div className="relative">
//                 <input
//                     ref={inputRef}
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => {
//                         setSearchTerm(e.target.value);
//                         setIsOpen(true);
//                         setSelectedIndex(-1);
//                         setSelectedLocation(null);
//                     }}
//                     onKeyDown={handleKeyDown}
//                     onFocus={() => setIsOpen(true)}
//                     placeholder={loading ? "Loading cities..." : "Start typing a city ..."}
//                     className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg bg-white" /* Added bg-white */
//                     disabled={loading}
//                     autoComplete="off"
//                 />

//                 {/* Search Button */}
//                 <button
//                     onClick={() => {
//                         if (selectedLocation) {
//                             onClicked(selectedLocation);
//                         }
//                     }}
//                     disabled={!selectedLocation || loading}
//                     className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 button-homer-search transition-colors ${selectedLocation && !loading
//                         ? 'bg-pink-200 hover:bg-pink-300 cursor-pointer'
//                         : 'bg-gray-100 cursor-not-allowed'
//                         }`}>
//                     <ArrowRight className='w-5 h-5 text-white' />
//                 </button>
//             </div>

//             {/* Error Message */}
//             {error && (
//                 <div className="mt-2 text-red-500 text-sm">
//                     Error loading cities: {error}
//                 </div>
//             )}

//             {/* Dropdown */}
//             {isOpen && !loading && filteredLocations.length > 0 && (
//                 <div
//                     ref={dropdownRef}
//                     className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto"
//                 >
//                     <ul className="py-2">
//                         {filteredLocations.map((location, index) => (
//                             <li
//                                 key={`${location}`}
//                                 className={`px-4 py-2 cursor-pointer transition-colors ${selectedIndex === index
//                                     ? 'bg-blue-50 text-blue-900'
//                                     : 'hover:bg-gray-50 text-gray-700'
//                                     }`}
//                                 onClick={() => handleSelect(location)}
//                                 onMouseEnter={() => setSelectedIndex(index)}
//                             >
//                                 <div className="flex justify-between items-center">
//                                     <span>{location}</span>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>

//     );
// };

// export default CitySearch;

import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Star } from 'lucide-react';
import { useCityData } from '../hooks/useCityData';

const CitySearch = ({ onSelect, onClicked }) => {
    const { cityData, loading, error } = useCityData();
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favoriteCities');
        return saved ? JSON.parse(saved) : [];
    });
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('favoriteCities', JSON.stringify(favorites));
    }, [favorites]);

    // Get filtered and separated locations
    const getFilteredLocations = () => {
        const filtered = cityData
            .filter(location => location)
            .filter(location =>
                location.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const favoriteLocations = filtered.filter(location => favorites.includes(location));
        const otherLocations = filtered.filter(location => !favorites.includes(location));

        return { favoriteLocations, otherLocations };
    };

    const handleSelect = (location) => {
        setSearchTerm(location);
        setSelectedLocation(location);
        setIsOpen(false);
        if (onSelect) {
            onSelect(location);
        }
    };

    const handleFavoriteClick = (location, e) => {
        e.stopPropagation();
        setFavorites(prev => {
            if (prev.includes(location)) {
                return prev.filter(fav => fav !== location);
            } else {
                return [...prev, location];
            }
        });
    };

    // Updated handleKeyDown with favorites support
    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
            }
            return;
        }

        const { favoriteLocations, otherLocations } = getFilteredLocations();
        const totalLocations = [...favoriteLocations, ...otherLocations];

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < totalLocations.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < totalLocations.length) {
                    handleSelect(totalLocations[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    // Click outside handler
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

    const { favoriteLocations, otherLocations } = getFilteredLocations();

    return (
        <div className="w-full relative px-8 sm:px-12">
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
                    className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg bg-white"
                    disabled={loading}
                    autoComplete="off"
                />

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

            {error && (
                <div className="mt-2 text-red-500 text-sm">
                    Error loading cities: {error}
                </div>
            )}

            {isOpen && !loading && (favoriteLocations.length > 0 || otherLocations.length > 0) && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto"
                >
                    <ul className="py-2">
                        {favoriteLocations.length > 0 && (
                            <>
                                {favoriteLocations.map((location, index) => (
                                    <li
                                        key={`fav-${location}`}
                                        className={`px-4 py-2 cursor-pointer transition-colors ${selectedIndex === index
                                                ? 'bg-blue-50 text-blue-900'
                                                : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                        onClick={() => handleSelect(location)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{location}</span>
                                            <Star
                                                className="w-5 h-5 text-yellow-400 fill-yellow-400 cursor-pointer"
                                                onClick={(e) => handleFavoriteClick(location, e)}
                                            />
                                        </div>
                                    </li>
                                ))}
                                {otherLocations.length > 0 && (
                                    <li className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
                                        Other cities
                                    </li>
                                )}
                            </>
                        )}

                        {otherLocations.map((location, index) => (
                            <li
                                key={`other-${location}`}
                                className={`px-4 py-2 cursor-pointer transition-colors ${selectedIndex === index + favoriteLocations.length
                                        ? 'bg-blue-50 text-blue-900'
                                        : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                                onClick={() => handleSelect(location)}
                                onMouseEnter={() => setSelectedIndex(index + favoriteLocations.length)}
                            >
                                <div className="flex justify-between items-center">
                                    <span>{location}</span>
                                    <Star
                                        className={`w-5 h-5 cursor-pointer ${favorites.includes(location)
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300 hover:text-yellow-400'
                                            }`}
                                        onClick={(e) => handleFavoriteClick(location, e)}
                                    />
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