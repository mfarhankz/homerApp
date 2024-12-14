import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ReportHeader from './ReportHeader';
import { debounce } from 'lodash';
import MetricsCard from './MetricsCard';
import DaysOnMarket from './DaysOnMarket'
import ListingsSection from './ListingsSection';
import PriceChart from './PriceChart';
import ListingsMap from './ListingsMap';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../../components/LoadingScreen'
import { baseDataAPI } from '../../services/api'
import { Share2, Save, X, Loader2, } from 'lucide-react';
import ShareModal from '../ShareModal';



const ReportResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { reportId } = useParams();
    const { user } = useAuth();
    const [reportData, setReportData] = useState();
    const [loading, setLoading] = useState(true);
    const abortControllerRef = React.useRef(null);
    const [isMapExpanded, setIsMapExpanded] = useState(false);
    const [mapData, setMapData] = useState();
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [isHiddenListingsSaving, setIsHiddenListingsSaving] = useState(false);
    // State matching the C# class structure
    const [reportState, setReportState] = useState({
        reportId: reportId,
        requestDto: {},
        hiddenListings: [],
        displayName: '',
        isSaved: false,
        isShared: false
    });

    const handleHideListing = (key) => {
        setReportData(prevData => {
            const updatedListings = prevData.neighborhoodListings.map(listing => {
                if (listing.listingKey === key) {
                    return { ...listing, hide: !listing.hide };
                }
                return listing;
            });

            // Trigger debounced save whenever listings are updated
            debouncedSaveHiddenListings(updatedListings);

            return {
                ...prevData,
                neighborhoodListings: updatedListings
            };
        });
    };

    // Add this debounced save function near other constants
    const debouncedSaveHiddenListings = async (listings) => {
        if (isHiddenListingsSaving) return;

        try {
            setIsHiddenListingsSaving(true);
            const hiddenOnes = listings.filter(listing => listing.hide)
                .map(listing => listing.listingKey);

            const response = await baseDataAPI.saveReportHiddenListings({
                displayName: reportState.displayName,
                reportId: reportState.reportId,
                hiddenListings: hiddenOnes
            });

            const reportResponse = await response.data;
            setReportData(reportResponse);
            setReportState(prev => ({
                ...prev,
                reportId: reportId,
                requestDto: reportResponse.reportRequestDocument.searchCriteria || {},
                displayName: reportResponse.reportRequestDocument.displayName || '',
                isSaved: reportResponse.reportRequestDocument.isSaved || false,
                isShared: reportResponse.reportRequestDocument.isShared || false,
                hiddenListings: reportResponse.reportRequestDocument.hiddenListings || []
            }));
            console.log('Hidden listings saved');
        } catch (error) {
            console.error('Error saving hidden listings:', error);
        } finally {
            setIsHiddenListingsSaving(false);
        }
    }; // Wait 2 seconds after last change before saving


    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        setLoading(false);
        navigate('/');
    };

    const handleListingFiltered = (filtered) => {
        setMapData(filtered);
    }


    // useEffect(() => {
    //     return () => {
    //         debouncedSaveHiddenListings.cancel();
    //     };
    // }, []);

    // useEffect(() => {
    //     if (reportData && reportData.neighborhoodListings) {
    //         setMapData(reportData.neighborhoodListings);
    //         // Save any hidden listings from initial load
    //         const hasHiddenListings = reportData.neighborhoodListings.some(listing => listing.hide);
    //         if (hasHiddenListings) {
    //             debouncedSaveHiddenListings(reportData.neighborhoodListings);
    //         }
    //     }
    // }, [reportData]);

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
                setReportState(prev => ({
                    ...prev,
                    reportId: reportId,
                    requestDto: reportResponse.reportRequestDocument.searchCriteria || {},
                    displayName: reportResponse.reportRequestDocument.displayName || '',
                    isSaved: reportResponse.reportRequestDocument.isSaved || false,
                    isShared: reportResponse.reportRequestDocument.isShared || false,
                    hiddenListings: reportResponse.reportRequestDocument.hiddenListings || []
                }));
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

    const handleSaveReport = () => {
        setShowSaveDialog(true);
    };


    const handleSaveConfirm = async () => {
        if (!reportState.displayName.trim()) return;
        try {
            setIsSaving(true);
            console.log('Saving report with name:', reportState.displayName);
            setReportState(prev => ({
                ...prev,
                isSaved: true
            }));

            abortControllerRef.current = new AbortController();
            var response = await baseDataAPI.SaveReportTitle({ reportId: reportState.reportId, displayName: reportState.displayName, save: true }, abortControllerRef.current.signal);
            if (!response.success) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reportResponse = await response.data;
            console.log(reportResponse);

        } catch (error) {
            console.error('Error saving report:', error);
            // You might want to show an error toast here
        } finally {
            setShowSaveDialog(false);
            abortControllerRef.current = null;
            setIsSaving(false);
        }
    }

    const handleCloseDialog = () => {
        setShowSaveDialog(false);
    };

    if (loading) {
        return (
            <LoadingScreen
                neighborhood='Loading...'
                onCancel={handleCancel}
            />
        );
    }

    const handleShare = (e, reportId) => {
        e.stopPropagation();
        const publicUrl = `${window.location.origin}/viewreport/${reportId}`;
        setShareUrl(publicUrl);
        setIsShareOpen(true);
    };

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setIsShareOpen(false);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    return (
        <div >
            <div className="mx-auto px-4  space-y-8">
                {/* Toolbar */}
                <div className="report-toolbar  rounded-lg overflow-hidden">
                    <div className="flex items-center justify-end ">
                        <div className="flex flex-row gap-2"> {/* Removed flex-col */}
                            <button
                                disabled={isSaving}
                                className="flex items-center justify-center gap-2 button-delete text-white px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                <Save className="w-4 h-4" />
                                <span className="hidden sm:inline text-xs">Delete</span>
                                {isSaving && <Loader2 className="animate-spin" />}
                            </button>

                            <button
                                disabled={isSaving}
                                onClick={handleSaveReport}
                                className="flex items-center justify-center gap-2 button-blue text-white px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                <Save className="w-4 h-4" />
                                <span className="hidden sm:inline text-xs">Set a Friendly Name</span>
                                {isSaving && <Loader2 className="animate-spin" />}
                            </button>

                            <button
                                onClick={(e) => handleShare(e, reportState.reportId)}
                                className="flex items-center justify-center gap-2 border border-blue-600 button-blue text-white px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                <Share2 className="w-4 h-4" />
                                <span className="hidden sm:inline text-xs">Share</span>
                            </button>

                            {/* Simple Modal */}
                            <ShareModal
                                isOpen={isShareOpen}
                                onClose={() => setIsShareOpen(false)}
                                url={shareUrl}
                                onCopy={handleCopyUrl}
                            />
                        </div>
                    </div>
                </div>

                {/* Header Section */}
                <ReportHeader
                    location={reportData.reportRequestDocument.searchCriteria.city + ', ' + reportData.reportRequestDocument.searchCriteria.region}
                    propertyType={reportData.reportRequestDocument.searchCriteria.propertyType}
                    timeRange={reportData.reportRequestDocument.searchCriteria.timeRange}
                    agent={{
                        firstName: user.firstName,
                        lastName: user.lastName,
                        brokerageName: user.brokerageName,
                        emailAddress: user.emailAddress,
                        displayPullDown: false,
                        photo: user.photo,
                        phone: user.phone,
                    }}
                />

                {isHiddenListingsSaving && <LoadingScreen overlay={true} />}
                {/* Save Dialog */}
                {showSaveDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="text-lg font-semibold text-gray-900">Save Report</h3>
                                <button
                                    onClick={handleCloseDialog}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-4">
                                <div className="mb-4">
                                    <label htmlFor="reportName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Report Name
                                    </label>
                                    <input
                                        type="text"
                                        id="reportName"
                                        value={reportState.displayName}
                                        onChange={(e) => setReportState(prev => ({
                                            ...prev,
                                            displayName: e.target.value
                                        }))}
                                        placeholder="Enter a name for your report"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none 
                                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 p-4 border-t bg-gray-50 rounded-b-lg">
                                <button
                                    onClick={handleCloseDialog}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 
                                             rounded-md transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveConfirm}
                                    disabled={!reportState.displayName.trim() || isSaving}
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-md 
                                                 ${reportState.displayName.trim()
                                            ? 'button-blue'
                                            : 'button-blue'} 
                                              transition-colors duration-200`}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {reportData.totalListings > 0 && (
                    <>
                        <div className="rounded-lg">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                                {/* DaysOnMarket takes up 1 column */}
                                <div className="lg:col-span-1">
                                    <DaysOnMarket
                                        title="Avg Days on Market"
                                        value={reportData.avergaeDaysOnMarket}
                                    />
                                </div>

                                {/* Each MetricsCard takes up 2 columns */}
                                <div className="lg:col-span-2">
                                    <MetricsCard
                                        title="Average List Price"
                                        value={reportData.priceAnalaysis.overallAveragePrice}
                                        highLow={{
                                            high: reportData.priceAnalaysis.overallHighestPrice,
                                            low: reportData.priceAnalaysis.overallLowestPrice,
                                        }}
                                        chart={<PriceChart data={reportData.priceAnalaysis.listingPriceAnalyses} />}
                                    />
                                </div>

                                <div className="lg:col-span-2">
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
                        </div>
                        {/* Parent container */}
                        <div className="metric-card rounded-xl shadow-sm p-4">
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

                            <div className="flex flex-col lg:flex-row gap-6 relative h-[610px]">
                                {/* Listings Section */}
                                <div className={`
                            ${isMapExpanded ? 'hidden lg:block' : 'block'} 
                            h-full transition-all duration-300 
                            ${isMapExpanded ? 'lg:w-0 lg:hidden' : 'lg:w-1/2'}`}>
                                    <ListingsSection
                                        listings={reportData.neighborhoodListings}
                                        onSort={(items) => handleListingFiltered(items)}
                                        sortOption="price-low"
                                        onHideListing={handleHideListing}
                                    />
                                </div>

                                {/* Map Section */}
                                <div className={`
                            ${isMapExpanded ? 'block' : 'hidden lg:block'}
                            h-[70vh] lg:h-full transition-all duration-300
                            ${isMapExpanded ? 'lg:w-full' : 'lg:w-1/2'}
                        `}>
                                    <div className="h-full relative">
                                        {/* Desktop Toggle Buttons */}
                                        <div className="hidden lg:flex absolute top-2 left-2 z-10 gap-2">
                                            <button
                                                onClick={() => setIsMapExpanded(!isMapExpanded)}
                                                className="button-blue text-white p-2 rounded-md shadow-md hover:bg-gray-50 transition-colors duration-200">
                                                {isMapExpanded ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm">Show Listings</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <span className="text-sm">Hide Listings</span>
                                                    </div>
                                                )}
                                            </button>
                                        </div>
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