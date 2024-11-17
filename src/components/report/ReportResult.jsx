import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReportHeader from './ReportHeader';
import MetricsCard from './MetricsCard';
import ListingsSection from './ListingsSection';
import PriceChart from './PriceChart';
import ListingsMap from './ListingsMap';

const ReportResult = () => {
    const location = useLocation();
    const { reportId } = useParams();
    const { reportData, searchCriteria } = location.state || {};
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1600px] mx-auto px-4 py-8 space-y-8">
                {/* Header Section */}
                <ReportHeader
                    location={searchCriteria.city + ', ' + searchCriteria.region}
                    propertyType="Detached"
                    timeRange={searchCriteria.timeRange}
                    agent={{
                        name: "Firstname Lastname",
                        brokerage: "Brokerage Name",
                        initials: "FL"
                    }}
                />

                {/* Metrics Cards - Stacked on mobile */}
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

                {/* Listings and Map Section - Also make responsive */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Listings Section */}
                    <div className="w-full lg:w-1/2">
                        <ListingsSection
                            listings={reportData.neighborhoodListings}
                            onSort={(option) => console.log(option)}
                            sortOption="price-low"
                        />
                    </div>

                    {/* Map Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="sticky top-8 h-[calc(100vh-12rem)]">
                            <ListingsMap />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportResult;