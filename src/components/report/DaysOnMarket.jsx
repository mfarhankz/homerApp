// components/report/DaysOnMarket.jsx
const DaysOnMarket = ({ title,value, className = '' }) => {
    return (
        <div className={`metric-card rounded-lg p-6 shadow-sm ${className}`}>
            <div className="flex justify-between items-center mt-3">
                <h3 className="metric-card-text">{title}</h3>                
            </div>
            <div className="flex justify-between items-start mb-4 mt-2">
                <div className="text-4xl font-semibold">
                    {typeof value === 'number' ? value : `${value}`}
                </div>
            </div>
        </div>

    );
};

export default DaysOnMarket;