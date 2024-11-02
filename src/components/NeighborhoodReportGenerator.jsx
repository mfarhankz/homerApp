import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen'
import PropertyTypeOption from './PropertyTypeOption';
import TimeRangeSlider from './TimeRangeSlider';

const NeighborhoodReportGenerator = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    const [timeRange, setTimeRange] = useState(7);
    const [isLoading, setIsLoading] = useState(false);

    const neighborhood = "Clayton Heights"; // This would come from your route/props

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

    const handleContinue = () => {
        if (step === 1 && selectedPropertyType) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                // Navigate to report view or handle completion
            }, 3000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Back button */}
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
                        <h2 className="text-xl text-homer-blue-400">You've selected {neighborhood}.</h2>
                        <h1 className="text-2xl font-semibold text-blue-900 mt-2">
                            What types of properties do you want to include?
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {propertyTypes.map((type) => (
                            <PropertyTypeOption
                                key={type.id}
                                {...type}
                                selected={selectedPropertyType === type.id}
                                onClick={() => setSelectedPropertyType(type.id)}
                            />
                        ))}
                    </div>

                    <div className="flex space-x-4 items-center mt-8">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-coral-500" />
                            <span className="ml-2">Sold</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-coral-500" />
                            <span className="ml-2">For Sale</span>
                        </label>
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={!selectedPropertyType}
                        className="px-6 py-2 button-homer-orange text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-sm text-blue-900">
                            Let's dive into {selectedPropertyType} properties for sale in {neighborhood}.
                        </h2>
                        <h1 className="text-2xl font-semibold text-blue-900 mt-2">
                            How far back do you want to look?
                        </h1>
                    </div>

                    <TimeRangeSlider
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    />

                    <p className="text-gray-600 text-center mt-4">
                        {timeRange} new {selectedPropertyType} properties were listed for sale,
                        and {Math.floor(timeRange * 0.7)} were sold in {neighborhood} over the past {timeRange} days.
                    </p>

                    <button
                        onClick={handleContinue}
                        className="px-6 py-2 button-homer-orange text-white rounded-full"
                    >
                        Generate my report
                    </button>
                </div>
            )}

            {step === 3 && <LoadingScreen neighborhood={neighborhood} />}
        </div>
    );
};

export default NeighborhoodReportGenerator;