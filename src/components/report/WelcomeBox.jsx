import CardBox from "../shared/CardBox";
import { Icon } from "@iconify/react";

const WelcomeBox = ({ location, propertyType, timeRange, agent, priceAnalysis, totalActive, totalSold }) => {
    return (
        <div className="grid grid-cols-1"> {/* Use grid for proper stacking */}
            {/* Main Card */}
            <div className="col-start-1 row-start-1">
                <CardBox className="bg-primary dark:bg-primary h-full">
                    <div className="p-6">
                        {/* Header row with icon and stats */}
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            {/* Left side - Location with icon */}
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <Icon
                                        icon="solar:course-up-outline"
                                        className="text-white opacity-90"
                                        height={20}
                                    />
                                </div>
                                <h5 className="text-lg text-white font-medium pt-1.5">{location}</h5>
                            </div>

                            {/* Right side - Stats in a row */}
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-white/70 text-sm mb-0.5">Active Listings</p>
                                    <h2 className="text-white text-2xl font-semibold">{totalActive}</h2>
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm mb-0.5">Sold Listings</p>
                                    <h2 className="text-white text-2xl font-semibold">{totalSold}</h2>
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm mb-0.5">Avg DoM</p>
                                    <h2 className="text-white text-2xl font-semibold">
                                        {typeof priceAnalysis.avgDaysOnMarket === 'number'
                                            ? priceAnalysis.avgDaysOnMarket.toFixed()
                                            : 'N/A'}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBox>
            </div>

            {/* Overlay Image - in same grid cell but higher z-index */}
            <div className="col-start-1 row-start-1 relative">
                <div className="absolute -top-1 -right-1">
                    <img
                        src={`/images/${propertyType}.avif`}
                        alt="property"
                        className="w-32 h-32 object-contain drop-shadow-2xl"                                  
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomeBox;