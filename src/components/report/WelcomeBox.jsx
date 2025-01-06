import CardBox from "../shared/CardBox";
import { Icon } from "@iconify/react";

const WelcomeBox = ({ location, propertyType, timeRange, agent, priceAnalysis, totalActive, totalSold }) => {
    return (
        <div className="grid grid-cols-1">
            <div className="col-start-1 row-start-1">
                <CardBox className="bg-primary dark:bg-primary h-full">
                    <div className="p-4 md:p-6">
                        {/* Location header */}
                        <div className="mb-4 md:mb-6">
                            <h5 className="text-2xl md:text-3xl text-white font-semibold leading-tight">{location}</h5>
                        </div>

                        {/* Stats in a row */}
                        <div className="flex gap-4 md:gap-8">
                            <div className="border-e border-white/20 pe-4">
                                <p className="text-white/70 text-xs md:text-sm mb-0.5">Active Listings</p>
                                <h2 className="text-white text-xl md:text-2xl font-semibold">{totalActive}</h2>
                            </div>
                            <div className="border-e border-white/20 pe-4">
                                <p className="text-white/70 text-xs md:text-sm mb-0.5">Sold Listings</p>
                                <h2 className="text-white text-xl md:text-2xl font-semibold">{totalSold}</h2>
                            </div>
                            <div>
                                <p className="text-white/70 text-xs md:text-sm mb-0.5">Avg DoM</p>
                                <h2 className="text-white text-xl md:text-2xl font-semibold">
                                    {typeof priceAnalysis.avgDaysOnMarket === 'number'
                                        ? priceAnalysis.avgDaysOnMarket.toFixed()
                                        : 'N/A'}
                                </h2>
                            </div>
                        </div>
                    </div>
                </CardBox>
            </div>

            <div className="col-start-1 row-start-1 relative">
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8">
                    <img
                        src={`/images/${propertyType}.avif`}
                        alt="property"
                        className="w-24 h-24 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomeBox;