import React, { useEffect, useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import PropertyTypeOption from './PropertyTypeOption';
import CityRegionSearch from './CityRegionSearch';
import TimeRangeSelector from './TimeRangeSelector';
import { usePropertyTypeData } from '../hooks/usePropertyTypesData';
import { baseDataAPI } from '../services/api'

const NeighborhoodReportGenerator = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialLocation = location.state?.location || null;
    const DEFAULT_TIME_RANGE = 180;
    console.log('initial loc:', initialLocation);

    // Initialize report data with city as string
    const [reportData, setReportData] = useState({
        city: initialLocation, // Now handling as string
        cityRegion: null,
        propertyType: null,
        timeRange: DEFAULT_TIME_RANGE
    });

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { propertyTypeData, loading, error } = usePropertyTypeData();

    useEffect(() => {
        console.log(reportData);
    }, [reportData])

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


    const handleTimeRangeSelect = (value) => {
        setReportData(prev => ({
            ...prev,
            timeRange: value
        }));
    };

    const abortControllerRef = React.useRef(null);

    const handleCancel = () => {
        // Cancel any pending request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        // Reset loading state
        setIsLoading(false);
        // Navigate back to main content
        navigate('/');
    };

    const handleContinue = async () => {
        if (step === 1 && reportData.cityRegion) {
            setStep(2);
        } else if (step === 2 && reportData.propertyType) {
            setStep(3);
            abortControllerRef.current = new AbortController();
            const reportPayload = {
                city: reportData.city,
                region: reportData.cityRegion,
                propertyType: reportData.propertyType,
                timeRange: reportData.timeRange
            };

            try {
                console.log('Generating report with:', reportPayload);
                var response = await baseDataAPI.generateReportSignatureData(reportPayload, abortControllerRef.current.signal);
                if (!response.success) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const reportResponse = await response.data;
                navigate(`/report/${reportResponse.reportId}`);

            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Request was cancelled');
                } else {
                    console.error('Error generating report:', error);
                }
            } finally {
                setIsLoading(false);
                abortControllerRef.current = null;
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-8 mt-8">
            {step < 4 && (
                <button
                    onClick={handleBack}
                    className="flex items-center text-blue-900 hover:text-blue-700 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>
            )}

            {step === 1 && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl text-homer-blue-400">
                            {reportData.city ? `You've selected ${reportData.city}` : ''}
                        </h2>
                        <h1 className="text-2xl font-semibold text-blue-900 mt-2">
                            Which region do you need insights on?
                        </h1>
                    </div>
                    <CityRegionSearch
                        city={reportData.city}
                        currentValue={reportData.cityRegion || ''}
                        onSelect={handleCityRegionSelect}
                        onClicked={handleContinue}

                    />
                    <button
                        onClick={handleContinue}
                        disabled={!reportData.cityRegion}
                        className="px-6 py-2 button-blue text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl text-homer-blue-400">
                            You've selected {reportData.cityRegion}.
                        </h2>
                        <h1 className="text-2xl font-semibold text-blue-900 mt-2">
                            What types of properties do you want to include?
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {propertyTypeData.map((type) => (
                            <PropertyTypeOption
                                key={type}
                                icon={type === 'Other' ? '/images/property-type.png' : `/images/${type}.avif`}
                                label={type}
                                selected={reportData.propertyType === type}
                                onClick={() => handlePropertyTypeSelect(type)}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={!reportData.propertyType}
                        className="px-6 py-2 button-blue text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Generate my report
                    </button>
                </div>
            )}

            {/* {step === 3 && (
                <div className="max-w-xl space-y-8 text-center justify-center items-center">
                    <div>
                        <h2 className="text-sm text-blue-900">
                            Let's dive into <b>{propertyTypeData.find(t => t === reportData.propertyType)}</b>
                            {' '}properties in <b>{reportData.cityRegion}</b>.
                        </h2>
                        <h1 className="text-2xl font-semibold text-blue-900 mt-2">
                            How far back do you want to look?
                        </h1>
                    </div>

                    <TimeRangeSelector
                        selectedRange={reportData.timeRange}
                        onRangeSelect={handleTimeRangeSelect}
                        defaultValue={DEFAULT_TIME_RANGE}
                        searchCriteria={reportData}
                    />

                    <button
                        onClick={handleContinue}
                        className="px-6 py-2 button-blue text-white rounded-full"
                    >
                        Generate my report
                    </button>
                </div>
            )} */}

            {step === 3 && (
                <LoadingScreen
                    neighborhood={reportData.cityRegion}
                    onCancel={handleCancel}
                >
                    <div className="space-y-2 text-center">
                        <h2 className="text-xl text-blue-900 font-semibold">
                            Retrieving listings in {reportData.cityRegion}...
                        </h2>
                        <p className="text-gray-500">Fetching key metrics...</p>
                        <p className="text-gray-400">Preparing your customized report...</p>
                    </div>
                </LoadingScreen>
            )}
        </div>
    );
};

export default NeighborhoodReportGenerator;