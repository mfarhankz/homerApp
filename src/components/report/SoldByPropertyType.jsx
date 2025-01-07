import React from "react";
import Chart from 'react-apexcharts';

const EnhancedPropertyChart = ({ dataSeries, labels, closePrices }) => {
    // Calculate average close price
    const averagePrice = closePrices && closePrices.length > 0
        ? Math.round(closePrices.reduce((acc, curr) => acc + curr, 0) / closePrices.length)
        : 0;

    const options = {
        chart: {
            type: 'donut',
            background: 'transparent',
            fontFamily: 'Inter, sans-serif',
        },
        labels: labels,
        colors: ['#4F46E5', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            markers: {
                width: 12,
                height: 12,
                radius: 6,
            },
            itemMargin: {
                horizontal: 12,
                vertical: 8
            },
            formatter: function (seriesName, opts) {
                return [seriesName, ' - ', opts.w.globals.series[opts.seriesIndex]];
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return Math.round(val) + '%';
            },
            style: {
                fontSize: '14px',
                fontWeight: 600,
                colors: ['#ffffff']
            },
            dropShadow: {
                enabled: true,
                blur: 3,
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#6B7280',
                        },
                        value: {
                            show: true,
                            fontSize: '24px',
                            fontWeight: 700,
                            color: '#111827',
                        },
                        total: {
                            show: true,
                            label: 'Avg. Price',
                            formatter: function () {
                                return `$${averagePrice.toLocaleString()}`;
                            },
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#6B7280',
                        }
                    }
                },
                offsetY: 0,
            }
        },
        stroke: {
            show: false
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function(value) {
                    return value + '%';
                }
            },
            style: {
                fontSize: '14px',
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom',
                    fontSize: '12px',
                },
                plotOptions: {
                    pie: {
                        offsetX: 0,
                        offsetY: 0
                    }
                }
            }
        }]
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Properties Sold by Type
                </h3>
                <div className="w-full">
                    <Chart
                        options={options}
                        series={dataSeries}
                        type="donut"
                        width="100%"
                        height="400px"
                    />
                </div>
            </div>
        </div>
    );
};

export default EnhancedPropertyChart;