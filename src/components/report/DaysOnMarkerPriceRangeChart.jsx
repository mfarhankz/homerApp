import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const DaysOnMarkerPriceRangeChart = ({ daysOnMarketData, coustomClass, onDelete }) => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {}
    });

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

    const transformData = (apiData) => {
        const uniqueRegionTypes = [...new Set(apiData.map(item => item.regionType))];
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

        // Convert to array and sort by price range
        const sortedData = Object.values(groupedByPrice)
            .sort((a, b) => getPriceLowerBound(a.priceCategory) - getPriceLowerBound(b.priceCategory));

        // Transform data for ApexCharts format
        const categories = sortedData.map(item => item.priceCategory);
        const series = uniqueRegionTypes.map(region => ({
            name: region,
            data: sortedData.map(item => Math.round(item[region])) // Round to whole numbers
        }));

        return { categories, series };
    };

    useEffect(() => {
        const { categories, series } = transformData(daysOnMarketData);      
        // Colors array matching the original
        const colors = ['#01C0C8', '#FB9678'];

        const options = {
            chart: {
                type: 'bar',               
                stacked: false,
                zoom: {
                    enabled: false,                
                },
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 5,
                    columnWidth: '75%',
                    distributed: false,
                    endingShape: "rounded",
                    dataLabels: {
                        position: 'top'
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return Math.round(val);
                },
                style: {
                    fontSize: '12px',
                    colors: ['#666']
                },
                offsetY: -20
            },
            xaxis: {
                categories: categories,
                labels: {
                    rotate: -45,
                    style: {
                        fontSize: '12px'
                    }
                },
                title: {
                    text: ''
                }
            },
            yaxis: {
                title: {
                    text: '',
                    style: {
                        fontSize: '14px'
                    }
                },
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            tooltip: {
                theme: 'light',
                y: {
                    formatter: function (val) {
                        return Math.round(val) + ' days';
                    }
                },
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const categoryName = w.globals.labels[dataPointIndex];
                    const regionName = w.globals.seriesNames[seriesIndex];
                    const value = series[seriesIndex][dataPointIndex];

                    return (
                        '<div class="bg-white p-4 border border-gray-200 shadow-lg rounded">' +
                        '<div class="text-base font-semibold mb-2">' + categoryName + '</div>' +
                        '<div class="text-sm" style="color: ' + colors[seriesIndex] + '">' +
                        regionName + ': ' + Math.round(value) + ' days' +
                        '</div>' +
                        '</div>'
                    );
                }
            },
            title: {
                text: '',
                align: 'center',
                style: {
                    fontSize: '12px'
                }
            },
            legend: {
                position: 'bottom',
                fontSize: '12px',
                markers: {
                    width: 12,
                    height: 12,
                    radius: 2
                }
            },
            colors: colors,
            grid: {
                show: false,
                borderColor: '#90A4AE',
                strokeDashArray: 3
            }
        };

        setChartData({ series, options });
    }, [daysOnMarketData]);

    return (
        <div className={`metric-card-new ${coustomClass}`}>

            <div className="flex justify-between items-center px-4 py-4 bg-[#eaeaea]">
                <h3 className="text-2xl">
                    Average Days on Market
                </h3>
                <i className="icon-close-circle text-2xl text-[rgb(223,88,74)] cursor-pointer flex ml-4" onClick={onDelete}></i>

            </div>
            <div className="p-3">
            <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"                 
                    width="100%"
                    height="300"
                />
            </div>   
        </div>
    );
};

export default DaysOnMarkerPriceRangeChart;