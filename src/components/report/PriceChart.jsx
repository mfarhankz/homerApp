import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// components/report/PriceChart.jsx
const PriceChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={120}>
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis
                    hide={true}
                    domain={['dataMin - 100', 'dataMax + 100']}
                />
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#ff6b6b"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#ff6b6b" }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};


export default PriceChart;