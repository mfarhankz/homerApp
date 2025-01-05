import React from "react";
import Chart from 'react-apexcharts';
import CardBox from '../shared/CardBox';

const SoldByPropertyType = ({ dataSeries, labels }) => {
    const options = {
        chart: {
            type: 'donut',
        },
        labels: labels,
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            formatter: function (seriesName, opts) {
                return seriesName;
            }
        },
        dataLabels: {
            enabled: true
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%'
                },
                offsetY: 0,
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
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
        <div className="bg-lightprimary p-4 rounded-lg flex flex-col items-center">
          
                <Chart
                    options={options}
                    series={dataSeries}
                    type="donut"                    
                    width="100%"
                />
          
        </div>
    );
};

export default SoldByPropertyType;