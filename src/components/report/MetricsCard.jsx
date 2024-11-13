// components/report/MetricsCard.jsx
const MetricsCard = ({ title, value, highLow, chart, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>
            <h3 className="text-lg font-medium mb-4">{title}</h3>
            <div className="flex justify-between items-start mb-4">
                <div className="text-4xl font-semibold">
                    {typeof value === 'number' ? value : `$${value}k`}
                </div>
                <div className="text-xs text-gray-500">
                    <div>HIGH: {highLow.high}</div>
                    <div>LOW: {highLow.low}</div>
                </div>
            </div>
            {chart && (
                <div className="mt-4 h-24">
                    {chart}
                </div>
            )}
        </div>
    );
};

export default MetricsCard;