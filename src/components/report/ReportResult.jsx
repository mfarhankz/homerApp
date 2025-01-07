import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../../components/LoadingScreen';
import { baseDataAPI } from '../../services/api';
import { Share2, Save, X, Loader2 } from 'lucide-react';

import ReportHeader from './ReportHeader';
import ListingsMap from './ListingsMap';
import ShareModal from '../ShareModal';
import CardBox from '../shared/CardBox';
import WelcomeBox from './WelcomeBox';
import RegionNeighborhoodSalesRatio from './RegionNeighborhoodSalesRatio';
import SoldByPropertyType from './SoldByPropertyType';
import DaysOnMarkerPriceRangeChart from './DaysOnMarkerPriceRangeChart';
import MetricsCard from './MetricsCard';
import PriceChart from './PriceChart';

const ReportResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reportId } = useParams();
  const { user } = useAuth();

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = React.useRef(null);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isHiddenListingsSaving, setIsHiddenListingsSaving] = useState(false);

  // Store report state (mirrors the C# class structure).
  const [reportState, setReportState] = useState({
    reportId: reportId,
    requestDto: {},
    hiddenListings: [],
    displayName: '',
    isSaved: false,
    isShared: false,
  });

  // ---- LISTINGS HIDE/SHOW ----
  const handleHideListing = (key) => {
    setReportData((prevData) => {
      const updatedListings = prevData.neighborhoodListings.map((listing) => {
        if (listing.listingKey === key) {
          return { ...listing, hide: !listing.hide };
        }
        return listing;
      });

      debouncedSaveHiddenListings(updatedListings);
      return {
        ...prevData,
        neighborhoodListings: updatedListings,
      };
    });
  };

  const debouncedSaveHiddenListings = async (listings) => {
    if (isHiddenListingsSaving) return;
    try {
      setIsHiddenListingsSaving(true);

      const hiddenOnes = listings
        .filter((listing) => listing.hide)
        .map((listing) => listing.listingKey);

      const response = await baseDataAPI.saveReportHiddenListings({
        displayName: reportState.displayName,
        reportId: reportState.reportId,
        hiddenListings: hiddenOnes,
      });

      const reportResponse = await response.data;
      setReportData(reportResponse);
      setReportState((prev) => ({
        ...prev,
        reportId,
        requestDto: reportResponse.reportRequestDocument.searchCriteria || {},
        displayName: reportResponse.reportRequestDocument.displayName || '',
        isSaved: reportResponse.reportRequestDocument.isSaved || false,
        isShared: reportResponse.reportRequestDocument.isShared || false,
        hiddenListings: reportResponse.reportRequestDocument.hiddenListings || [],
      }));
      console.log('Hidden listings saved');
    } catch (error) {
      console.error('Error saving hidden listings:', error);
    } finally {
      setIsHiddenListingsSaving(false);
    }
  };

  // ---- GENERAL EVENT HANDLERS ----
  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
    navigate('/');
  };

  const handleSaveReport = () => {
    setShowSaveDialog(true);
  };

  const handleSaveConfirm = async () => {
    if (!reportState.displayName.trim()) return;
    try {
      setIsSaving(true);
      console.log('Saving report with name:', reportState.displayName);

      setReportState((prev) => ({ ...prev, isSaved: true }));

      abortControllerRef.current = new AbortController();
      const response = await baseDataAPI.SaveReportTitle(
        { reportId: reportState.reportId, displayName: reportState.displayName, save: true },
        abortControllerRef.current.signal
      );

      if (!response.success) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reportResponse = await response.data;
      console.log(reportResponse);
    } catch (error) {
      console.error('Error saving report:', error);
    } finally {
      setShowSaveDialog(false);
      abortControllerRef.current = null;
      setIsSaving(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSaveDialog(false);
  };

  // ---- SHARE HANDLERS ----
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

  // ---- MAP CLICK HANDLER ---- (if needed)
  const handleMapMarkerClicked = (key) => {
    console.log('Map marker clicked with key:', key);
  };

  // ---- DATA LOADING ----
  useEffect(() => {
    const LoadReportData = async () => {
      try {
        abortControllerRef.current = new AbortController();
        const response = await baseDataAPI.fetchReportData(
          reportId,
          abortControllerRef.current.signal
        );

        if (!response.success) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reportResponse = await response.data;
        setReportData(reportResponse);
        setReportState((prev) => ({
          ...prev,
          reportId,
          requestDto: reportResponse.reportRequestDocument.searchCriteria || {},
          displayName: reportResponse.reportRequestDocument.displayName || '',
          isSaved: reportResponse.reportRequestDocument.isSaved || false,
          isShared: reportResponse.reportRequestDocument.isShared || false,
          hiddenListings: reportResponse.reportRequestDocument.hiddenListings || [],
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

  if (loading) {
    return (
      <LoadingScreen onCancel={handleCancel}>
        <p>Loading...</p>
      </LoadingScreen>
    );
  }

  // ---- RENDER ----
  return (
    <>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Top Section: Welcome & Header */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Welcome Box */}
          <div className="flex-1 order-2 md:order-1">
            <WelcomeBox
              location={
                reportData.reportRequestDocument.searchCriteria.city +
                ', ' +
                reportData.reportRequestDocument.searchCriteria.region
              }
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
              priceAnalysis={{ avgDaysOnMarket: reportData.avergaeDaysOnMarket }}
              totalActive={reportData.totalActiveListings}
              totalSold={reportData.totalSoldListings}
            />
          </div>

          {/* Report Header + Toolbar */}
          <div className="flex-1 order-1 md:order-2">
            <CardBox className="bg-secondary h-full">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 p-4">
                {/* Report Header */}
                <div className="flex-grow min-w-0">
                  <ReportHeader
                    location={
                      reportData.reportRequestDocument.searchCriteria.city +
                      ', ' +
                      reportData.reportRequestDocument.searchCriteria.region
                    }
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
                </div>

                {/* Toolbar */}
                <div className="report-toolbar w-full lg:w-auto mt-2">
                  <div className="flex flex-wrap sm:flex-nowrap justify-end gap-2">
                    {/* Example "Delete" button—replace or remove as needed */}
                    <button
                      disabled={isSaving}
                      className="flex items-center justify-center gap-1 button-delete text-white px-2 py-2 rounded-lg transition-colors duration-200 text-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Delete</span>
                      {isSaving && <Loader2 className="animate-spin" />}
                    </button>

                    {/* Save / Set Name */}
                    <button
                      disabled={isSaving}
                      onClick={handleSaveReport}
                      className="flex items-center justify-center gap-1 button-blue text-white px-2 py-2 rounded-lg transition-colors duration-200 text-xs whitespace-nowrap"
                    >
                      <Save className="w-4 h-4" />
                      <span>Set Name</span>
                      {isSaving && <Loader2 className="animate-spin" />}
                    </button>

                    {/* Share */}
                    <button
                      onClick={(e) => handleShare(e, reportState.reportId)}
                      className="flex items-center justify-center gap-1 border border-blue-600 button-blue text-white px-2 py-2 rounded-lg transition-colors duration-200 text-xs"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>

                    <ShareModal
                      isOpen={isShareOpen}
                      onClose={() => setIsShareOpen(false)}
                      url={shareUrl}
                      onCopy={handleCopyUrl}
                    />
                  </div>
                </div>
              </div>
            </CardBox>
          </div>
        </div>

        {/* Price Cards (Average List Price / Average Sell Price) */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
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
          <div className="w-full md:w-1/2">
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

        {/* Main Content: Map on the left, charts on the right */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Map */}
          <div className="w-full md:w-2/3 relative">
            <ListingsMap
              listings={reportData.neighborhoodListings}
              isMapExpanded={false}
              propagateClick={(key) => handleMapMarkerClicked(key)}
            />
          </div>

          {/* Charts on the right, stacked vertically */}
          <div className="w-full md:w-1/3 space-y-4">
            {/* 1. Sold:List Price Ratio (formerly "list vs sold") */}
            <RegionNeighborhoodSalesRatio
              dataSeries={reportData.salesRatio.series}
              categories={reportData.salesRatio.categories}
            />

            {/* 2. Property Type chart beneath the ratio chart */}
            <SoldByPropertyType
              dataSeries={reportData.propertyTypeChartData.series}
              labels={reportData.propertyTypeChartData.labels}
            />
          </div>
        </div>

        {/* Days on Market Chart */}
        <div>
          <DaysOnMarkerPriceRangeChart
            daysOnMarketData={reportData.daysOnMarketByPrice}
          />
        </div>

        {/* If no listings found */}
        {reportData.neighborhoodListings.length === 0 && (
          <div className="w-full text-center text-red-400">
            No listings were found!
          </div>
        )}

        {/* Overlay spinner if hiding listings is still in progress */}
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
                  <label
                    htmlFor="reportName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Report Name
                  </label>
                  <input
                    type="text"
                    id="reportName"
                    value={reportState.displayName}
                    onChange={(e) =>
                      setReportState((prev) => ({
                        ...prev,
                        displayName: e.target.value,
                      }))
                    }
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
                    ${reportState.displayName.trim() ? 'button-blue' : 'button-blue'}
                    transition-colors duration-200`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReportResult;
