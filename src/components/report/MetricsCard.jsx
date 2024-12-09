import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MetricsCard = ({ title, value, highLow, chart, className = '' }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className={`metric-card rounded-lg p-3 shadow-sm ${className}`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="metric-card-text">{title}</h3>
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
                <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                    <div className="text-center">
                        <div className="text-xs text-gray-500 font-medium">HIGH</div>
                        <div className="text-sm text-gray-800 font-bold">${highLow.high}</div>
                    </div>
                    <div className="text-center ml-4">
                        <div className="text-xs text-gray-500 font-medium">LOW</div>
                        <div className="text-sm text-gray-800 font-bold">${highLow.low}</div>
                    </div>
                </div>
            </div>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="flex justify-between items-start mb-4">
                    <div className="text-2xl font-semibold">
                        {typeof value === 'number' ? value : `$${value}`}
                    </div>
                </div>
                {chart && (
                    <div className="mt-6 h-24">
                        {chart}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetricsCard;