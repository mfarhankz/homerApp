import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import CardBox from '../shared/CardBox';

const RegionNeighborhoodSalesRatio = ({ dataSeries, categories }) => {
    const seriesColors = ['#2E93fA', '#1cc3bd'];
    const chartOptions = {
        chart: {
            type: "area",
            height: 350,
            toolbar: {
                show: false
            },
            fontFamily: "inherit",
            parentHeightOffset: 0,  // Add this to remove top margin
            offsetY: 0,             // Add this to remove any Y offset
            offsetX: 0,
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },

        dataLabels: {
            enabled: false
        },
        colors: seriesColors,
        stroke: {
            curve: "smooth",
            width: 2,
            colors: seriesColors
        },
        xaxis: {
            categories: categories || [],
            labels: {
                show: false,
            },
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: true
            }
        },
        yaxis: {
            labels: {
                show: false  // Hides labels but keeps other y-axis settings
            },
            // Keep formatter for tooltips
            formatter: function (value) {
                return value.toFixed(2) + '%'
            }
        },
        grid: {
            show: false,
            borderColor: '#e0e0e0',
            strokeDashArray: 3,
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        fill: {
            type: ['gradient', 'gradient'],
            gradient: {
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.5,
                opacityFrom: 0.5,
                opacityTo: 0.1,
                colorStops: [
                    [
                        {
                            offset: 0,
                            color: seriesColors[0],
                            opacity: 0.4
                        },
                        {
                            offset: 100,
                            color: seriesColors[0],
                            opacity: 0.1
                        }
                    ],
                    [
                        {
                            offset: 0,
                            color: seriesColors[1],
                            opacity: 0.4
                        },
                        {
                            offset: 100,
                            color: seriesColors[1],
                            opacity: 0.1
                        }
                    ]
                ]
            },
            colors: seriesColors
        },
        annotations: {
            yaxis: [{
                y: 100,
                borderColor: '#FF4560',
                label: {
                    borderColor: '#FF4560',
                    style: {
                        color: '#fff',
                        background: '#FF4560'
                    },
                    position: 'left',
                }
            }]
        },

        tooltip: {
            theme: "dark",
            shared: true,
            x: {
                show: true
            },
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const month = w.globals.categoryLabels[dataPointIndex];
                const allSeriesData = w.globals.seriesNames.map((name, index) => ({
                    name: name,
                    value: series[index][dataPointIndex],
                    color: seriesColors[index]
                }));

                let tooltipContent = `
            <div style="background: #1a1a1a; border-radius: 4px;">
                <div style="background: white; color: #1a1a1a; padding: 8px; font-weight: bold; border-top-left-radius: 4px; border-top-right-radius: 4px;">
                    ${month}
                </div>
                <div style="border-top: 1px solid #444; padding: 8px;">`;

                allSeriesData.forEach(seriesData => {
                    const comparison = seriesData.value > 100 ? 'above' : 'below';
                    const difference = Math.abs(seriesData.value - 100).toFixed(2);

                    tooltipContent += `
                <div style="color: ${seriesData.color}; margin-bottom: 4px;">
                    ${seriesData.name}: ${seriesData.value.toFixed(2)}%
                </div>
                <div style="color: #888; font-size: 0.75rem; margin-bottom: 8px;">
                    ${comparison} list price by ${difference}%
                </div>`;
                });

                tooltipContent += '</div></div>';
                return tooltipContent;
            },
            marker: {
                show: true,
                fillColors: seriesColors
            }
        },
        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'right'
        }
    };

    return (
        <CardBox>
            <div className="bg-lightprimary  overflow-hidden rounded-md">
                <div className="py-30 px-6 pt-2 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-900">Sold:List price Ratio</p>
                        <div className="flex gap-4 mt-1">
                            {dataSeries?.map((series, index) => (
                                <div key={series.name} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: index === 0 ? seriesColors[0] : seriesColors[1] }}
                                    />
                                    <p className="text-xs">{series.name}</p>
                                </div>
                            ))}

                        </div>
                        <p className="text-xs">Past 6 months</p>
                    </div>
                </div>
                <Chart
                    options={chartOptions}
                    series={dataSeries || []}
                    type="area"
                    height="200"
                    width="100%"
                />
            </div>
        </CardBox>
    );
}

export default RegionNeighborhoodSalesRatio;