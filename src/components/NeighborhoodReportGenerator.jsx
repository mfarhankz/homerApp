import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import PropertyTypeOption from './PropertyTypeOption';
import CityRegionSearch from './CityRegionSearch';
import TimeRangeSelector from './TimeRangeSelector';

const NeighborhoodReportGenerator = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialLocation = location.state?.location || null;

    const [reportData, setReportData] = useState({
        city: initialLocation,
        cityRegion: null,
        propertyType: null,
        timeRange: 180, // Default to 6 months
        listingTypes: {
            sold: false,
            forSale: false
        }
    });

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const propertyTypes = [
        { id: 'detached', label: 'Detached house', icon: '/images/property-type.png' },
        { id: 'semi', label: 'Semi-detached house', icon: '/images/property-type.png' },
        { id: 'townhouse', label: 'Freehold townhouse', icon: '/images/property-type.png' },
        { id: 'condo-town', label: 'Condo townhouse', icon: '/images/property-type.png' },
        { id: 'condo-apt', label: 'Condo apartment', icon: '/images/property-type.png' },
    ];

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate(-1);
        }
    };

    const handleCityRegionSelect = (cityRegion) => {
        setReportData(prev => ({
            ...prev,
            cityRegion
        }));
    };

    const handlePropertyTypeSelect = (propertyType) => {
        setReportData(prev => ({
            ...prev,
            propertyType
        }));
    };

    const handleListingTypeChange = (type) => {
        setReportData(prev => ({
            ...prev,
            listingTypes: {
                ...prev.listingTypes,
                [type]: !prev.listingTypes[type]
            }
        }));
    };

    // Handler for time range selection
    const handleTimeRangeSelect = (value) => {
        setReportData(prev => ({
            ...prev,
            timeRange: value
        }));
    };

    const handleContinue = () => {
        if (step === 1 && reportData.cityRegion) {
            setStep(2);
        } else if (step === 2 && reportData.propertyType) {
            setStep(3);
        } else if (step === 3) {
            setStep(4);
            setIsLoading(true);
            // Here you would typically make an API call with the complete reportData
            console.log('Final report data:', reportData);
            setTimeout(() => {
                setIsLoading(false);
                // Navigate to report view or handle completion
            }, 3000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 mt-8">
            <button
                onClick={handleBack}
                className="flex items-center text-blue-900 hover:text-blue-700 mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </button>

            {step === 1 && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl text-homer-blue-400">
                            {reportData.city?.value ? `You've selected ${reportData.city.value}` : ''}
                        </h2>
                        <h1 className="text-2xl font-semibold text-blue-900 mt-2">
                            Which region do you need insights on?
                        </h1>
                    </div>
                    <CityRegionSearch
                        onSelect={handleCityRegionSelect}
                        onClicked={() => { }}
                    />
                    <button
                        onClick={handleContinue}
                        disabled={!reportData.cityRegion}
                        className="px-6 py-2 button-homer-orange text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl text-homer-blue-400">
                            You've selected {reportData.cityRegion?.value}.
                        </h2>
                        <h1 className="text-2xl font-semibold text-blue-900 mt-2">
                            What types of properties do you want to include?
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {propertyTypes.map((type) => (
                            <PropertyTypeOption
                                key={type.id}
                                {...type}
                                selected={reportData.propertyType === type.id}
                                onClick={() => handlePropertyTypeSelect(type.id)}
                            />
                        ))}
                    </div>

                    <div className="flex space-x-4 items-center mt-8">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-coral-500"
                                checked={reportData.listingTypes.sold}
                                onChange={() => handleListingTypeChange('sold')}
                            />
                            <span className="ml-2">Sold</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-coral-500"
                                checked={reportData.listingTypes.forSale}
                                onChange={() => handleListingTypeChange('forSale')}
                            />
                            <span className="ml-2">For Sale</span>
                        </label>
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={!reportData.propertyType}
                        className="px-6 py-2 button-homer-orange text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-sm text-blue-900">
                            Let's dive into {propertyTypes.find(t => t.id === reportData.propertyType)?.label}
                            properties in {reportData.cityRegion?.value}.
                        </h2>
                        <h1 className="text-2xl font-semibold text-blue-900 mt-2">
                            How far back do you want to look?
                        </h1>
                    </div>

                    <TimeRangeSelector
                        selectedRange={reportData.timeRange}
                        onRangeSelect={handleTimeRangeSelect}
                    />

                    <p className="text-gray-600 text-center mt-4">
                        {reportData.timeRange} new {propertyTypes.find(t => t.id === reportData.propertyType)?.label}
                        properties were listed for sale, and {Math.floor(reportData.timeRange * 0.7)} were sold
                        in {reportData.cityRegion?.value} over the past {reportData.timeRange} days.
                    </p>

                    <button
                        onClick={handleContinue}
                        className="px-6 py-2 button-homer-orange text-white rounded-full"
                    >
                        Generate my report
                    </button>
                </div>
            )}

            {step === 4 && <LoadingScreen neighborhood={reportData.cityRegion?.value} />}
        </div>
    );
};

export default NeighborhoodReportGenerator;