import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DaysOnMarket = ({ title, value, className = '' }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className={`metric-card rounded-lg p-3 shadow-sm ${className}`}>
            <div className="flex justify-between items-center ">
                <div className="flex items-center gap-2">
                    <span className="metric-card-text">{title}</span>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                    </button>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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