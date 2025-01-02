import React from "react";
import Chart from 'react-apexcharts';

const SoldListPriceByMonth = ({ dataSeries }) => {
    const options = {
        chart: {
            type: 'scatter',
            zoom: {
                enabled: false,
                type: 'xy'
            },
            toolbar: {
                show: false
            },
        },
        xaxis: {
            type: 'numeric',
            labels: {
                formatter: function (val) {
                    // Convert numeric month back to month-year format
                    const date = new Date(2000, val % 12 - 1, 1);
                    return date.toLocaleString('default', { month: 'short' }) +
                        '-' + Math.floor(val / 12);
                }
            },
            title: {
                text: ''
            }
        },
        yaxis: {
            title: {
                text: '',
            },
            labels: {
                formatter: function (val) {
                    return '$' + val.toLocaleString();
                }
            }
        },
        markers: {
            size: 6,
            hover: {
                size: 8
            }
        },
        title: {
            text: 'Sold listings',
            align: 'center',
            style: {
                fontSize: '12px'
            }
        },
        legend: {
            show: false,
            position: 'bottom',
            horizontalAlign: 'left',
            fontSize: '12px'
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const point = w.config.series[seriesIndex].data[dataPointIndex];
                const monthVal = point[0];
                const date = new Date(2000, monthVal % 12 - 1, 1);
                const monthYear = date.toLocaleString('default', { month: 'short' }) +
                    '-' + Math.floor(monthVal / 12);
                const price = point[1].toLocaleString();

                return `<div class="p-2">
                    <div>${monthYear}</div>
                    <div>$${price}</div>
                </div>`;
            }
        }
    };

    return (
        <div className="bg-lightprimary p-4 rounded-lg flex flex-col items-center">
            <div className="w-full">
                <Chart
                    options={options}
                    series={dataSeries}
                    type="scatter"
                    height={250}
                    width="100%"
                />
            </div>
        </div>
    );
};

export default SoldListPriceByMonth;