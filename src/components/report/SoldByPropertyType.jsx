import React from "react";
import Chart from 'react-apexcharts';

const EnhancedPropertyChart = ({ dataSeries, labels, coustomClass }) => {
  const options = {
    chart: {
      type: 'donut',
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false, // Hides the menu (export, zoom, etc.) for a cleaner look
      },
    },
    labels: labels,
    colors: ['#6366F1', '#3B82F6', '#14B8A6', '#10B981', '#F59E0B', '#EF4444'],
    legend: {
      position: 'right',
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
      // Modern approach: show the percentage inside the legend instead
      formatter: function (seriesName, opts) {
        const val = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName} - ${val}%`;
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
        enabled: false,  // Disabling to keep it simple and modern
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',    // Slightly smaller for a modern ratio
          labels: {
            show: false, // Hide the entire donut label area
            /*
            If you just want to remove "Avg. Price" but keep the main label, you can do:
            total: { show: false },
            name: { show: true },
            value: { show: true },
            */
          }
        },
        offsetY: 0,
      }
    },
    stroke: {
      show: false,
      // Or if you like a subtle separation between slices:
      // width: 2,
      // colors: ['#ffffff'],
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      y: {
        formatter: function(value) {
          return value + '%';
        }
      },
      style: {
        fontSize: '14px',
      }
    },
    responsive: [
      {
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
      }
    ]
  };

  return (
    <div className={`metric-card-new ${coustomClass}`}>
      <div className="flex justify-between items-center px-4 py-4 bg-[#eaeaea]">
          <h3 className="text-2xl">
            Properties Sold by Type
          </h3>
          <i className="icon-close-circle text-2xl text-[rgb(223,88,74)] cursor-pointer flex ml-4"></i>
        </div>
        
        <div className="p-3">
          <Chart
            options={options}
            series={dataSeries}
            type="donut"
            width="100%"
            height="290px"
          />
        </div>
    </div>
  );
};

export default EnhancedPropertyChart;
