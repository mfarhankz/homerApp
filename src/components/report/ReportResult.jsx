import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingScreen from "../../components/LoadingScreen";
import { baseDataAPI } from "../../services/api";
import { Share2, Save, X, Loader2 } from "lucide-react";

import ReportHeader from "./ReportHeader";
import ListingsMap from "./ListingsMap";
import ShareModal from "../ShareModal";
import CardBox from "../shared/CardBox";
import WelcomeBox from "./WelcomeBox";
import RegionNeighborhoodSalesRatio from "./RegionNeighborhoodSalesRatio";
import SoldByPropertyType from "./SoldByPropertyType";
import DaysOnMarkerPriceRangeChart from "./DaysOnMarkerPriceRangeChart";
import MetricsCard from "./MetricsCard";
import PriceChart from "./PriceChart";

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
  const [shareUrl, setShareUrl] = useState("");
  const [isHiddenListingsSaving, setIsHiddenListingsSaving] = useState(false);

  const [reportState, setReportState] = useState({
    reportId: reportId,
    requestDto: {},
    hiddenListings: [],
    displayName: "",
    isSaved: false,
    isShared: false,
  });

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
        displayName: reportResponse.reportRequestDocument.displayName || "",
        isSaved: reportResponse.reportRequestDocument.isSaved || false,
        isShared: reportResponse.reportRequestDocument.isShared || false,
        hiddenListings:
          reportResponse.reportRequestDocument.hiddenListings || [],
      }));
      console.log("Hidden listings saved");
    } catch (error) {
      console.error("Error saving hidden listings:", error);
    } finally {
      setIsHiddenListingsSaving(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
    navigate("/");
  };

  const handleSaveReport = () => {
    setShowSaveDialog(true);
  };

  const handleSaveConfirm = async () => {
    if (!reportState.displayName.trim()) return;
    try {
      setIsSaving(true);
      console.log("Saving report with name:", reportState.displayName);

      setReportState((prev) => ({ ...prev, isSaved: true }));

      abortControllerRef.current = new AbortController();
      const response = await baseDataAPI.SaveReportTitle(
        {
          reportId: reportState.reportId,
          displayName: reportState.displayName,
          save: true,
        },
        abortControllerRef.current.signal
      );

      if (!response.success) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reportResponse = await response.data;
      console.log(reportResponse);
    } catch (error) {
      console.error("Error saving report:", error);
    } finally {
      setShowSaveDialog(false);
      abortControllerRef.current = null;
      setIsSaving(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSaveDialog(false);
  };

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
      console.error("Failed to copy URL:", err);
    }
  };

  const handleDelete = async () => {
    try {
      // Your API call or logic for deleting a report
      await baseDataAPI.deleteReport(reportState.reportId);
      navigate("/"); // Or any post-delete action
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleMapMarkerClicked = (key) => {
    console.log("Map marker clicked with key:", key);
  };
  const [components, setComponents] = useState([]);

  useEffect(() => {
    if (reportData) {
      setComponents([
        {
          id: "averageListPrice",
          type: "MetricsCard",
          span: "col-span-6",
          title: "Average List Price",
          value: reportData.priceAnalaysis?.overallAveragePrice || 0,
          highLow: {
            high: reportData.priceAnalaysis?.overallHighestPrice || 0,
            low: reportData.priceAnalaysis?.overallLowestPrice || 0,
          },
        },
        {
          id: "averageSellPrice",
          type: "MetricsCard",
          span: "col-span-6",
          title: "Average Sell Price",
          value: reportData.soldPriceAnalaysis?.overallAveragePrice || 0,
          highLow: {
            high: reportData.soldPriceAnalaysis?.overallHighestPrice || 0,
            low: reportData.soldPriceAnalaysis?.overallLowestPrice || 0,
          },
        },
        {
          id: "listingsMap",
          type: "ListingsMap",
          span: "col-span-12",
        },
        {
          id: "regionSalesRatio",
          type: "RegionNeighborhoodSalesRatio",
          span: "col-span-6",
        },
        {
          id: "propertyTypeChart",
          type: "SoldByPropertyType",
          span: "col-span-6",
        },
        {
          id: "daysOnMarketChart",
          type: "DaysOnMarkerPriceRangeChart",
          span: "col-span-12",
        },
      ]);
    }
  }, [reportData]);

  const handleBoxDelete = (id) => {
    setComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id)
    );
  };

  const getDynamicSpan = (compIndex) => {
    // Check adjacent components with col-span-6
    const prevComp = components[compIndex - 1];
    const nextComp = components[compIndex + 1];

    // If there's only one col-span-6 in a group, make it col-span-12
    if (
      components[compIndex].span === "col-span-6" &&
      (!prevComp || prevComp.span !== "col-span-6") &&
      (!nextComp || nextComp.span !== "col-span-6")
    ) {
      return "col-span-12";
    }

    return components[compIndex].span;
  };

  const renderComponent = (comp) => {
    const dynamicSpan =
      components.length === 1 && comp.span === "col-span-6"
        ? "col-span-12"
        : comp.span;

    switch (comp.type) {
      case "MetricsCard": {
        const chart =
          comp.id === "averageListPrice" ? (
            <PriceChart
              data={reportData?.priceAnalaysis?.listingPriceAnalyses || []}
              colorVariant="green"
            />
          ) : (
            <PriceChart
              data={reportData?.soldPriceAnalaysis?.listingPriceAnalyses || []}
            />
          );

        return (
          <MetricsCard
            key={comp.id}
            customClass={dynamicSpan} // Directly set the span class here
            title={comp.title}
            value={comp.value}
            highLow={comp.highLow}
            chart={chart}
            onDelete={() => handleBoxDelete(comp.id)}
          />
        );
      }
      case "ListingsMap":
        return (
          <ListingsMap
            key={comp.id}
            customClass={dynamicSpan}
            listings={reportData?.neighborhoodListings || []}
            hideListingEvent={(key) => handleHideListing(key)}
            isMapExpanded={false}
            propagateClick={(key) => handleMapMarkerClicked(key)}
            onDelete={() => handleBoxDelete(comp.id)}
          />
        );
      case "RegionNeighborhoodSalesRatio":
        return (
          <RegionNeighborhoodSalesRatio
            key={comp.id}
            coustomClass={dynamicSpan}
            dataSeries={reportData?.salesRatio?.series || []}
            categories={reportData?.salesRatio?.categories || []}
            onDelete={() => handleBoxDelete(comp.id)}
          />
        );
      case "SoldByPropertyType":
        return (
          <SoldByPropertyType
            key={comp.id}
            coustomClass={dynamicSpan}
            dataSeries={reportData?.propertyTypeChartData?.series || []}
            labels={reportData?.propertyTypeChartData?.labels || []}
            onDelete={() => handleBoxDelete(comp.id)}
          />
        );
      case "DaysOnMarkerPriceRangeChart":
        return (
          <DaysOnMarkerPriceRangeChart
            key={comp.id}
            coustomClass={dynamicSpan}
            daysOnMarketData={reportData?.daysOnMarketByPrice || []}
            onDelete={() => handleBoxDelete(comp.id)}
          />
        );
      default:
        return null;
    }
  };

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
          displayName: reportResponse.reportRequestDocument.displayName || "",
          isSaved: reportResponse.reportRequestDocument.isSaved || false,
          isShared: reportResponse.reportRequestDocument.isShared || false,
          hiddenListings:
            reportResponse.reportRequestDocument.hiddenListings || [],
        }));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request was cancelled");
        } else {
          console.error("Error generating report:", error);
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
      <LoadingScreen onCancel={handleCancel} overlay={true}>
        <p>Loading...</p>
      </LoadingScreen>
    );
  }

  return (
    <>
      {/* Increased horizontal and vertical padding; slightly larger space-y */}
      <div className="mt-20 mb-10 mx-auto space-y-8">
        {/* Top Section */}
        <div className="report-header">
          <div className="container mx-auto z-10 relative">
            <CardBox className="p-6 w-full">
              {/* This parent flex also needs -reverse if you want 
              the agent info on the right in the same row as 
              WelcomeBox: */}
              <div className="grid grid-cols-12 gap-4">
                {/* Left Side (will appear on left in mobile, right in desktop) */}
                <div className="col-span-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-7">
                      {/* Title + Presented By */}
                      <h2 className="text-3xl  text-white">
                        Neighbourhood Report
                      </h2>
                      <p className="text-sm text-white/50 font-light mt-1">
                        Presented by:
                      </p>
                      <ReportHeader
                        location={
                          reportData.reportRequestDocument.searchCriteria.city +
                          ", " +
                          reportData.reportRequestDocument.searchCriteria.region
                        }
                        propertyType={
                          reportData.reportRequestDocument.searchCriteria
                            .propertyType
                        }
                        timeRange={
                          reportData.reportRequestDocument.searchCriteria
                            .timeRange
                        }
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

                    <div className="col-span-2 flex flex-col items-center justify-between">
                      <button
                        onClick={handleDelete}
                        className=" hover:bg-red-600 hover:text-white text-center border border-[#fff]/50 text-[#fff]/50 rounded-full p-3  flex items-center justify-center text-base font-light w-[120px]"
                      >
                        <i className="icon-trash text-lg flex"></i>
                        <span className="ml-2">Delete</span>
                      </button>

                      <button
                        onClick={handleSaveReport}
                        className="hover:bg-blue-700 hover:text-white text-center border border-[#fff]/50 text-[#fff]/50 rounded-full p-3  flex items-center justify-center text-base font-light w-[120px]"
                      >
                        <i className="icon-save-add text-lg flex"></i>
                        <span className="ml-2">Save</span>
                        {isSaving && (
                          <Loader2 className="animate-spin w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={(e) => handleShare(e, reportState.reportId)}
                        className="hover:bg-blue-700 hover:text-white text-center border border-[#fff]/50 text-[#fff]/50 rounded-full p-3  flex items-center justify-center text-base font-light w-[120px]"
                      >
                        <i className="icon-share text-lg flex"></i>
                        <span className="ml-2">Share</span>
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

                <div className="col-span-6 relative">
                  <WelcomeBox
                    location={
                      reportData.reportRequestDocument.searchCriteria.city +
                      ", " +
                      reportData.reportRequestDocument.searchCriteria.region
                    }
                    propertyType={
                      reportData.reportRequestDocument.searchCriteria
                        .propertyType
                    }
                    timeRange={
                      reportData.reportRequestDocument.searchCriteria.timeRange
                    }
                    agent={{
                      firstName: user.firstName,
                      lastName: user.lastName,
                      brokerageName: user.brokerageName,
                      emailAddress: user.emailAddress,
                      displayPullDown: false,
                      photo: user.photo,
                      phone: user.phone,
                    }}
                    priceAnalysis={{
                      avgDaysOnMarket: reportData.avergaeDaysOnMarket,
                    }}
                    totalActive={reportData.totalActiveListings}
                    totalSold={reportData.totalSoldListings}
                  />
                </div>
              </div>
            </CardBox>
          </div>
        </div>

        {/* Price Cards */}
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-8">
            {components.map((comp, index) =>
              renderComponent({
                ...comp,
                span: getDynamicSpan(index), // Pass the dynamic span directly to the component
              })
            )}
          </div>
        </div>

        {/* No Listings Found */}
        {reportData.neighborhoodListings.length === 0 && (
          <div className="w-full text-center text-red-500 font-semibold py-4">
            No listings were found!
          </div>
        )}

        {/* Overlay spinner if still saving hidden listings */}
        {isHiddenListingsSaving && <LoadingScreen overlay={true} />}

        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Save Report
                </h3>
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
                    ${
                      reportState.displayName.trim()
                        ? "button-blue"
                        : "button-blue"
                    }
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
