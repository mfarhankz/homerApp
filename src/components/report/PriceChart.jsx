// export default PriceChart;
import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import CardBox from '../shared/CardBox';

const PriceChart = ({ data }) => {
    const options = {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2,
            colors: ['#EE6F6F']
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [31, 63, 100],
                colorStops: [
                    {
                        offset: 31,
                        color: '#F4AFA8',
                        opacity: 1
                    },
                    {
                        offset: 63,
                        color: '#FFE2DF',
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: '#E5EAFD',
                        opacity: 0.31
                    }
                ]
            }
        },
        markers: {
            size: 4,
            colors: ['#EE6F6F'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: {
                size: 6
            }
        },
        xaxis: {
            categories: data.map(item => item.month),
            labels: {
                style: {
                    colors: '#615E83',
                    fontSize: '12px'
                }
            },
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: true
            }
        },
        yaxis: {
            min: Math.min(...data.map(item => item.lowestPrice)) * 0.9,
            max: Math.max(...data.map(item => item.highestPrice)) * 1.1,
            labels: {
                style: {
                    colors: '#615E83',
                    fontSize: '12px'
                },
                formatter: function (value) {
                    if (value >= 1000000) {
                        return `${(value / 1000000).toFixed(1)}M`;
                    } else if (value >= 1000) {
                        return `${(value / 1000).toFixed(0)}K`;
                    }
                    return value;
                }
            }
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 3,
            show: false
        },
        tooltip: {
            y: {
                formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                    return data[dataPointIndex].formattedAveragePrice;
                },
                title: {
                    formatter: () => 'Avg'
                }
            }
        }
    };
    const series = [{
        name: 'Average Price',
        data: data.map(item => item.averagePrice)
    }];

    return (
        <CardBox>
            <div className="bg-lightprimary  overflow-hidden rounded-md">
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    height="100%"
                    width="100%"
                />
            </div>
        </CardBox>
    );
};

export default PriceChart;