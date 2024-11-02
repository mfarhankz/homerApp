import React from 'react';
import { useNavigate } from 'react-router-dom';
import CitySearch from './CitySearch'

export default function MainContent({ user, isOpen }) {

    const navigate = useNavigate();

    const handleCitySelect = (city) => {
        console.log('Selected city:', city);
        // Handle the selected city
    };

    const handleClick = (city) => {
        console.log('Selected city:', city);
        const encodedLocation = encodeURIComponent(city);
        navigate(`/report/generate/${encodedLocation}`, {
            state: { location: city }
        });
    }

    return (
        <div className="max-w-3xl mx-auto px-4 mt-32">

            <div className="max-w-3xl w-full px-4">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-blue-900 mb-2">
                            Which neighbourhood do you need insights on?
                        </h1>
                        <p className="text-gray-600">
                            We'll generate a real-time data report that you can easily share with your clients.
                        </p>
                    </div>

                    <CitySearch onSelect={handleCitySelect} onClicked={handleClick} />

                    {/* Reports Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-blue-900 mb-4">My reports</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium text-gray-900">{`(Neighbourhood), (City)`}</h3>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-sm text-gray-600">(Property type(s))</p>
                                        <p className="text-sm text-gray-600">(Month) (Day), - (Month)(Day), (Year)</p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-4">Created (Month) (Day), (Year)</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}