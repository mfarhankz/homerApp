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
import { filter } from 'framer-motion/client';



const ReportResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { reportId } = useParams();
    const { user } = useAuth();
    const [reportData, setReportData] = useState();
    const [loading, setLoading] = useState(true);
    const abortControllerRef = React.useRef(null);
    const [isMapExpanded, setIsMapExpanded] = useState(false);
    const [mapData , setMapData] = useState();

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        setLoading(false);
        navigate('/');
    };

    const handleListingFiltered = (filtered)=>{
        setMapData(filtered);
    }

    useEffect(() => {
        if (reportData && reportData.neighborhoodListings){
        setMapData(reportData.neighborhoodListings);
        }
     }, [reportData]);

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
                                    value={reportData.soldPriceAnalaysis.overallAveragePrice}
                                    highLow={{
                                        high: reportData.soldPriceAnalaysis.overallHighestPrice,
                                        low: reportData.soldPriceAnalaysis.overallLowestPrice,
                                    }}
                                    chart={<PriceChart data={reportData.soldPriceAnalaysis.listingPriceAnalyses} />}
                                />
                            </div>
                        </div>


                        {/* Parent container */}
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            {/* Mobile Toggle Button */}
                            <div className="lg:hidden mb-4">
                                <button
                                    onClick={() => setIsMapExpanded(!isMapExpanded)}
                                    className="w-full bg-blue-50 text-blue-600 p-2 rounded-md flex items-center justify-center gap-2"
                                >
                                    {isMapExpanded ? (
                                        <>
                                            <span>Show Listings</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </>
                                    ) : (
                                        <>
                                            <span>Show Map</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6 relative h-[calc(100vh-16rem)]">
                                {/* Listings Section */}
                                <div className={`
                            ${isMapExpanded ? 'hidden lg:block' : 'block'} 
                            h-full transition-all duration-300 
                            ${isMapExpanded ? 'lg:w-0 lg:hidden' : 'lg:w-1/2'}
                        `}>
                                    <ListingsSection
                                        listings={reportData.neighborhoodListings}
                                        onSort={(items) => handleListingFiltered(items)}
                                        sortOption="price-low"
                                    />
                                </div>

                                {/* Map Section */}
                                <div className={`
                            ${isMapExpanded ? 'block' : 'hidden lg:block'}
                            h-[70vh] lg:h-full transition-all duration-300
                            ${isMapExpanded ? 'lg:w-full' : 'lg:w-1/2'}
                        `}>
                                    <div className="h-full relative">
                                        {/* Desktop Toggle Button */}
                                        <button
                                            onClick={() => setIsMapExpanded(!isMapExpanded)}
                                            className="hidden lg:block absolute top-2 left-2 z-10 bg-white p-2 rounded-md shadow-md hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            {isMapExpanded ? (
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm">Show List</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 010 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 010 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm">Hide List</span>
                                                </div>
                                            )}
                                        </button>
                                        <ListingsMap
                                            listings={mapData}
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