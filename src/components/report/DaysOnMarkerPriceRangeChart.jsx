import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Text
} from 'recharts';

const DaysOnMarkerPriceRangeChart = ({ daysOnMarketData }) => {
    console.log(daysOnMarketData)
    const [data, setData] = useState(daysOnMarketData);
    const [regionTypes, setRegionTypes] = useState([]);

    const getPriceLowerBound = (category) => {
        const map = {
            '250k-500k': 250,
            '500k-750k': 500,
            '750k-1M': 750,
            '1M-1.5M': 1000,
            '1.5M-2.5M': 1500,
            '2.5M-3M': 2500,
            '3M-4M': 3000,
            '4M+': 4000
        };
        return map[category] || 0;
    };

    // Custom tooltip with larger font
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
                    <p className="text-base font-semibold mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toFixed(0)} days
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const transformData = (apiData) => {
        // Get unique region types
        const uniqueRegionTypes = [...new Set(apiData.map(item => item.regionType))];
        setRegionTypes(uniqueRegionTypes);

        // Group by priceCategory
        const groupedByPrice = apiData.reduce((acc, item) => {
            if (!acc[item.priceCategory]) {
                acc[item.priceCategory] = {
                    priceCategory: item.priceCategory,
                    ...Object.fromEntries(uniqueRegionTypes.map(type => [type, 0]))
                };
            }
            acc[item.priceCategory][item.regionType] = item.averageDaysOnMarket;
            return acc;
        }, {});

        // Convert to array and sort
        return Object.values(groupedByPrice)
            .sort((a, b) => getPriceLowerBound(a.priceCategory) - getPriceLowerBound(b.priceCategory));
    };

    useEffect(() => {
        const transformedData = transformData(daysOnMarketData);
        setData(transformedData);
    }, []);


    // Array of colors for different regions
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F'];

    return (
        <div className="w-full">
            <h2 className="text-l font-bold text-center">Average Days on Market by Price Range</h2>
            <div className="h-96 p-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="priceCategory"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            interval={0}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            label={{
                                value: 'Avg Days',
                                angle: -90,
                                position: 'insideLeft',
                                style: { textAnchor: 'middle', fontSize: 14 }
                            }}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        {regionTypes.map((region, index) => (
                            <Bar
                                key={region}
                                dataKey={region}
                                fill={colors[index % colors.length]}
                                label={{
                                    position: 'top',
                                    fontSize: 12,
                                    fill: '#666',
                                    formatter: (value) => value.toFixed(0)
                                }}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DaysOnMarkerPriceRangeChart;