import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DaysOnMarket = ({ title, value, className = '' }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className={`metric-card ${className}`}>
            <div className="flex justify-between items-center ">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 bg-gray-200 rounded-full transition-colors"
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                    </button>
                    <span className="metric-card-text">{title}</span>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-50 opacity-0 h-[28px]'
                }`}>
                <div className="flex justify-between items-start mb-4 mt-2">
                    <div className="text-4xl font-semibold">
                        {typeof value === 'number' ? value.toFixed() : 'NAN'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DaysOnMarket;