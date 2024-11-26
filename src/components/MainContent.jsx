import React from 'react';
import { useNavigate } from 'react-router-dom';
import CitySearch from './CitySearch';

export default function MainContent({ user, isOpen }) {
    const navigate = useNavigate();

    const handleCitySelect = (city) => {
        console.log('Selected city:', city);
        // Handle the selected city
    };

    const handleClick = (city) => {
        const encodedLocation = encodeURIComponent(city);
        navigate(`/report/generate/${encodedLocation}`, {
            state: { location: city }
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-0 sm:px-4 mt-32">
            <div className="w-full">
                <div className="content-center space-y-8 justify-center items-center">
                    <div className="start-report text-center flex flex-col">
                        <div className="flex-1 flex flex-col justify-center mb-12">
                            <h1 className="start-report-first-label">
                                Generate a neighbourhood report
                            </h1>
                            <p className="start-report-second-label mt-2">
                                Get instant market insights to share with your clients.
                            </p>
                        </div>
                        <div className="transform -translate-y-4 px-4 sm:px-0">
                            <CitySearch onSelect={handleCitySelect} onClicked={handleClick} />
                        </div>
                    </div>

                    <div className="mt-16 px-4 sm:px-0">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4">My reports</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            No Reports were found!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}