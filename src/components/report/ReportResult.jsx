import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ReportHeader from './ReportHeader';
import MetricsCard from './MetricsCard';
import ListingsSection from './ListingsSection';
import PriceChart from './PriceChart';
import ListingsMap from './ListingsMap';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../../components/LoadingScreen'
import { baseDataAPI } from '../../services/api'



const ReportResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { reportId } = useParams();
    const { user } = useAuth();
    const [reportData, setReportData] = useState();
    const [loading, setLoading] = useState(true);
    const abortControllerRef = React.useRef(null);
    const [isMapExpanded, setIsMapExpanded] = useState(false);

    const handleCancel = () => {
        // Cancel any pending request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        // Reset loading state
        setLoading(false);
        // Navigate back to main content
        navigate('/');
    };

    useEffect(() => {
        const LoadReportData = async () => {
            try {
                abortControllerRef.current = new AbortController();
                var response = await baseDataAPI.fetchReportData(reportId, abortControllerRef.current.signal);
                if (!response.success) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const reportResponse = await response.data;
                setReportData(reportResponse);
                setLoading(false);
                console.log(reportResponse);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Request was cancelled');
                } else {
                    console.error('Error generating report:', error);
                }
            } finally {
                setLoading(false);
                abortControllerRef.current = null;
            }
        };

        LoadReportData();
    }, [reportId, location.state]);


    if (loading) {
        return (
            <LoadingScreen
                neighborhood='Loading...'
                onCancel={handleCancel}
            />
        );
    }

    return (

        <div className="min-h-screen bg-gray-50 mt-6">
            <div className="mx-auto px-4 py-8 space-y-8">
                {/* Header Section */}
                <ReportHeader
                    location={reportData.searchCriteria.city + ', ' + reportData.searchCriteria.region}
                    propertyType={reportData.searchCriteria.propertyType}
                    timeRange={reportData.searchCriteria.timeRange}
                    agent={{
                        name: user.firstName + ',' + user.lastName,
                        brokerage: user.brokerageName,
                        initials: ""
                    }}
                />
                {reportData.totalListings > 0 && (
                    <>
                        <div className="rounded-lg">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <MetricsCard
                                    title="Average List Price"
                                    value={reportData.priceAnalaysis.overallAveragePrice}
                                    highLow={{
                                        high: reportData.priceAnalaysis.overallHighestPrice,
                                        low: reportData.priceAnalaysis.overallLowestPrice,
                                    }}
                                    chart={<PriceChart data={reportData.priceAnalaysis.listingPriceAnalyses} />}
                                />
                                <MetricsCard
                                    title="Average Sell Price"
                                    value={reportData.priceAnalaysis.overallAveragePrice}
                                    highLow={{
                                        high: reportData.priceAnalaysis.overallHighestPrice,
                                        low: reportData.priceAnalaysis.overallLowestPrice,
                                    }}
                                    chart={<PriceChart data={reportData.priceAnalaysis.listingPriceAnalyses} />}
                                />
                            </div>
                        </div>


                        {/* Parent container with white background and rounded corners */}
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <div className="flex flex-col lg:flex-row gap-6 relative" style={{ height: 'calc(100vh - 240px)' }}>
                                {/* Listings Section */}
                                <div className={`h-full transition-all duration-300 ${isMapExpanded ? 'lg:w-0 lg:hidden' : 'lg:w-1/2'
                                    }`}>
                                    <div className="h-full">
                                        <ListingsSection
                                            listings={reportData.neighborhoodListings}
                                            onSort={(option) => console.log(option)}
                                            sortOption="price-low"
                                        />
                                    </div>
                                </div>

                                {/* Map Section */}
                                <div className={`h-full transition-all duration-300 ${isMapExpanded ? 'lg:w-full' : 'lg:w-1/2'
                                    }`}>
                                    <div className="h-full relative">
                                        <button
                                            onClick={() => setIsMapExpanded(!isMapExpanded)}
                                            className="absolute top-2 left-2 z-10 bg-white p-2 rounded-md shadow-md hover:bg-gray-50 transition-colors duration-200"
                                        >
                                          Hide listings
                                        </button>
                                        <ListingsMap
                                            listings={reportData.neighborhoodListings}
                                            isMapExpanded={isMapExpanded}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {reportData.totalListings == 0 && (
                    <div className="w-full justify-center items-center text-center text-red-400">No listings were found!</div>

                )}
            </div>
        </div>
    );
};

export default ReportResult;