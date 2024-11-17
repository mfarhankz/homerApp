import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Area, AreaChart, Tooltip } from 'recharts';

// components/report/PriceChart.jsx
const PriceChart = ({ data }) => {

    const CustomLabel = ({ x, y, value }) => {
        return (
            <text
                x={x}
                y={y - 10} // Position slightly above the dot
                fill="#000"
                textAnchor="middle"
                fontSize="12px"
                fontWeight="bold"
            >
                ${value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value}
            </text>
        );
    };
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="31.09%" stopColor="#F4AFA8" />
                        <stop offset="63.25%" stopColor="#FFE2DF" />
                        <stop offset="100%" stopColor="#E5EAFD" stopOpacity="0.31" />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    axisLine={true}
                    tickLine={true}
                    tick={{ fontSize: 12, fill: '#615E83' }}
                />
                <YAxis
                    domain={['dataMin', 'dataMax']}
                    tick={{ fontSize: 12, fill: '#615E83' }}
                    tickFormatter={(value) => {
                        if (value >= 1000000) {
                            return `${(value / 1000000).toFixed(2)}M`; // Format in millions
                        } else if (value >= 1000) {
                            return `${(value / 1000).toFixed(1)}K`; // Format in thousands
                        }
                        return value; // For very small values
                    }}
                />
                <Tooltip
                    formatter={(value, name, props) => {
                        const { payload } = props;
                        console.log(payload);
                        return [payload.formattedAveragePrice, "Average Price"];
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="averagePrice"
                    stroke="#EE6F6F"
                    strokeWidth={2}
                    dot={true}
                    fill="url(#colorUv)"
                    activeDot={{ r: 4, fill: "#ff6b6b" }}
                />
            </AreaChart>
        </ResponsiveContainer>


    );
};


export default PriceChart;