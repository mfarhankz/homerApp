import React from "react";
import Chart from 'react-apexcharts';
import CardBox from '../shared/CardBox';

const PriceChart = ({ data, colorVariant = 'red' }) => {
  // Decide color stops based on colorVariant
  const getColorSettings = (variant) => {
    if (variant === 'green') {
      return {
        strokeColor: '#2563eb', // A rich modern blue
        fillGradientStops: [
            { offset: 31, color: '#93c5fd', opacity: 1 },    // Lighter blue
            { offset: 63, color: '#bfdbfe', opacity: 1 },    // Even lighter blue
            { offset: 100, color: '#dbeafe', opacity: 0.4 }  // Lightest blue with transparency
        ],
      };
    } else {
      // Default to red
      return {
        strokeColor: '#EE6F6F',
        fillGradientStops: [
          { offset: 31, color: '#F4AFA8', opacity: 1 },
          { offset: 63, color: '#FFE2DF', opacity: 1 },
          { offset: 100, color: '#E5EAFD', opacity: 0.31 }
        ],
      };
    }
  };

  const { strokeColor, fillGradientStops } = getColorSettings(colorVariant);

  // Compute min/max from the averagePrice
  const minAverage = Math.min(...data.map(item => item.averagePrice));
  const maxAverage = Math.max(...data.map(item => item.averagePrice));

  const options = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: [strokeColor]
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [31, 63, 100],
        colorStops: fillGradientStops
      }
    },
    markers: {
      size: 4,
      colors: [strokeColor],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: { size: 6 }
    },
    xaxis: {
      categories: data.map(item => item.month),
      labels: {
        style: {
          colors: '#615E83',
          fontSize: '12px'
        }
      },
      axisBorder: { show: true },
      axisTicks: { show: true }
    },
    yaxis: {
      min: minAverage * 0.9,
      max: maxAverage * 1.1,
      labels: {
        style: {
          colors: '#615E83',
          fontSize: '12px'
        },
        formatter: function (value) {
          if (value >= 1_000_000) {
            return `${(value / 1_000_000).toFixed(1)}M`;
          } else if (value >= 1_000) {
            return `${(value / 1_000).toFixed(0)}K`;
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
        formatter: function (_, { dataPointIndex }) {
          // Use your preformatted (e.g. "$234,567") if desired
          return data[dataPointIndex].formattedAveragePrice;
        },
        title: {
          formatter: () => 'Avg'
        }
      }
    }
  };

  const series = [
    {
      name: 'Average Price',
      data: data.map(item => item.averagePrice)
    }
  ];

  return (
    <CardBox>
      <div className="bg-lightprimary overflow-hidden">
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
