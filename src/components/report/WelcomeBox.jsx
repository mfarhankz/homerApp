import CardBox from "../shared/CardBox";
import { Icon } from "@iconify/react";

const WelcomeBox = ({ location, propertyType, timeRange, agent, priceAnalysis, totalActive, totalSold }) => {
  // Split location into city and neighborhood
  const [city, neighborhood] = location.split(', ');
  // Reorder for desktop display
  const desktopLocation = `${neighborhood}, ${city}`;

  return (
    <div className="grid grid-cols-1 ">
      <div className="col-start-1 row-start-1">
        <CardBox className="bg-blue-950 h-full">
          <div className="p-4 md:p-6 flex items-center justify-between">
            {/* Left side: location & stats */}
            <div>
              {/* Location headers */}
              <div className="md:hidden">
                <h5 className="text-xl font-semibold text-white">{neighborhood}</h5>
                <h5 className="text-xl font-semibold text-white">{city}</h5>
              </div>
              <h5 className="hidden md:block text-3xl text-white font-semibold">
                {desktopLocation}
              </h5>

              {/* Stats row */}
              <div className="mt-4 flex gap-4 md:gap-8">
                <div className="border-e border-white/20 pe-4">
                  <p className="text-white/70 text-xs md:text-sm mb-0.5">Active Listings</p>
                  <h2 className="text-white text-xl md:text-2xl font-semibold">
                    {totalActive}
                  </h2>
                </div>
                <div className="border-e border-white/20 pe-4">
                  <p className="text-white/70 text-xs md:text-sm mb-0.5">Sold Listings</p>
                  <h2 className="text-white text-xl md:text-2xl font-semibold">
                    {totalSold}
                  </h2>
                </div>
                <div>
                  <p className="text-white/70 text-xs md:text-sm mb-0.5">Avg DoM</p>
                  <h2 className="text-white text-xl md:text-2xl font-semibold">
                    {typeof priceAnalysis.avgDaysOnMarket === "number"
                      ? priceAnalysis.avgDaysOnMarket.toFixed()
                      : "N/A"}
                  </h2>
                </div>
              </div>
            </div>

            {/* Right side: icon */}
            <div className="flex-shrink-0 ml-4 md:ml-8">
              <img
                src={`/images/${propertyType}.avif`}
                alt="property"
                className="w-20 h-20 md:w-40 md:h-40 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </CardBox>
      </div>


    </div>
  );
};

export default WelcomeBox;