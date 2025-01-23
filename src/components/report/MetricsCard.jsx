import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CardBox from "../shared/CardBox";

const MetricsCard = ({ title, value, highLow, chart, customClass }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <CardBox className={`${customClass}`}>
      <div className={`metric-card-new`}>
        <div className="flex justify-between items-center px-4 py-2 bg-[#eaeaea]">
          <div className="flex items-center">
            {/* <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 bg-gray-200 rounded-full transition-colors"
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                    </button> */}
            <h3 className="text-2xl">
              {title}
              <small className="flex-shrink justify-between items-start text-xl bg-[rgb(223,88,74)] py-1 px-4 rounded-full text-white ml-4">
                {typeof value === "number" ? value : `$${value}`}
              </small>
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-center bg-[#162452] py-2 px-4 rounded-md">
              <div className="text-sm text-white">HIGH</div>
              <div className="text-base text-white">${highLow.high}</div>
            </div>
            <div className="text-center bg-[#162452] py-2 px-4 rounded-md mx-2">
              <div className="text-sm text-white">LOW</div>
              <div className="text-base text-white">${highLow.low}</div>
            </div>
            <i className="icon-close-circle text-2xl text-[rgb(223,88,74)] cursor-pointer flex ml-2"></i>
          </div>
        </div>

        <div className="p-3">{chart && <div className="">{chart}</div>}</div>
      </div>
    </CardBox>
  );
};

export default MetricsCard;
