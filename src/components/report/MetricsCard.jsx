// components/report/MetricsCard.jsx
const MetricsCard = ({ title, value, highLow, chart, className = '' }) => {
    return (
        <div className={`metric-card rounded-lg p-6 shadow-sm ${className}`}>
            <div className="flex justify-between items-center">
                <h3 className="metric-card-text">{title}</h3>
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
            <div className="flex justify-between items-start mb-4">
                <div className="text-4xl font-semibold">
                    {typeof value === 'number' ? value : `$${value}`}
                </div>
            </div>
            {chart && (
                <div className="mt-6 h-24">
                    {chart}
                </div>
            )}
        </div>

    );
};

export default MetricsCard;