import CardBox from "../shared/CardBox";
import { Icon } from "@iconify/react";

const WelcomeBox = ({ location, propertyType, timeRange, agent, priceAnalysis, totalActive, totalSold }) => {
  // Split location into city and neighborhood
  const [city, neighborhood] = location.split(', ');
  // Reorder for desktop display
  const desktopLocation = `${neighborhood}, ${city}`;

  return (
    <CardBox className="flex items-start justify-center h-[100%]">
          {/* Left side: location & stats */}
          <div>
              {/* Location headers */}
              <div className="md:hidden">
                <h5 className="text-2xl text-white">{neighborhood}</h5>
                <h5 className="text-2xl text-white">{city}</h5>
              </div>
              <span className="hidden md:block text-4xl text-white">
                {desktopLocation}
              </span>

              {/* Stats row */}
              <div className="mt-4 flex items-start justify-between">
                <div className="border-e border-white/10 pe-6">
                  <p className="text-white/50 text-base font-light">Active Listings</p>
                  <h2 className="text-white text-4xl text-center">
                    {totalActive}
                  </h2>
                </div>
                <div className="border-e border-white/10 px-6">
                  <p className="text-white/50 text-base font-light">Sold Listings</p>
                  <h2 className="text-white text-4xl text-center">
                    {totalSold}
                  </h2>
                </div>
                <div className="px-6">
                  <p className="text-white/50 text-base font-light">Avg DoM</p>
                  <h2 className="text-white text-4xl text-center">
                    {typeof priceAnalysis.avgDaysOnMarket === "number"
                      ? priceAnalysis.avgDaysOnMarket.toFixed()
                      : "N/A"}
                  </h2>
                </div>
              </div>
            </div>

            {/* Right side: icon */}
            <div className="absolute right-0 bottom-[-50px]">
              <img
                src={`/images/${propertyType}.avif`}
                alt="property"
                className="bouncing-image w-[350px] h-[350px] object-contain drop-shadow-2xl"
              />
            </div>
        </CardBox>
  );
};

export default WelcomeBox;