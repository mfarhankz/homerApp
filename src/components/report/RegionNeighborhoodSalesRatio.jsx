import React from "react";
import Chart from "react-apexcharts";
import CardBox from "../shared/CardBox";

const RegionNeighborhoodSalesRatio = ({ dataSeries, categories, coustomClass }) => {
  const seriesColors = ["#2E93fA", "#1cc3bd"];

  const chartOptions = {
    chart: {
      type: "area",
      zoom: { enabled: false },
      toolbar: { show: false },
      fontFamily: "inherit",
      parentHeightOffset: 0,
      offsetY: 0,
      offsetX: 0,
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: seriesColors,
    stroke: {
      curve: "smooth",
      width: 2,
      colors: seriesColors,
    },
    xaxis: {
      categories: categories || [],
      // Turn x-axis labels back on
      labels: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      // Add an axis title
      title: {
        text: "Months",
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    },
    yaxis: {
      // Turn y-axis labels back on
      labels: {
        show: true,
        formatter: function (value) {
          return value.toFixed(2) + "%";
        },
      },
      // Add an axis title
      title: {
        text: "Sold:List Price Ratio (%)",
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    },
    grid: {
      // You can re-enable grid lines to help read values
      show: true,
      borderColor: "#e0e0e0",
      strokeDashArray: 3,
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0,
      },
    },
    fill: {
      type: ["gradient", "gradient"],
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        colorStops: [
          [
            {
              offset: 0,
              color: seriesColors[0],
              opacity: 0.4,
            },
            {
              offset: 100,
              color: seriesColors[0],
              opacity: 0.1,
            },
          ],
          [
            {
              offset: 0,
              color: seriesColors[1],
              opacity: 0.4,
            },
            {
              offset: 100,
              color: seriesColors[1],
              opacity: 0.1,
            },
          ],
        ],
      },
      colors: seriesColors,
    },
    annotations: {
      yaxis: [
        {
          y: 100,
          borderColor: "#FF4560",
          label: {
            borderColor: "#FF4560",
            style: {
              color: "#fff",
              background: "#FF4560",
            },
            position: "left",
          },
        },
      ],
    },
    tooltip: {
      theme: "dark",
      shared: true,
      x: {
        show: true,
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const month = w.globals.categoryLabels[dataPointIndex];
        const allSeriesData = w.globals.seriesNames.map((name, index) => ({
          name,
          value: series[index][dataPointIndex],
          color: seriesColors[index],
        }));

        let tooltipContent = `
          <div style="background: #1a1a1a; border-radius: 4px;">
            <div style="background: white; color: #1a1a1a; padding: 8px; font-weight: bold; border-top-left-radius: 4px; border-top-right-radius: 4px;">
              ${month}
            </div>
            <div style="border-top: 1px solid #444; padding: 8px;">
        `;

        allSeriesData.forEach((seriesData) => {
          const comparison = seriesData.value > 100 ? "above" : "below";
          const difference = Math.abs(seriesData.value - 100).toFixed(2);

          tooltipContent += `
            <div style="color: ${seriesData.color}; margin-bottom: 4px;">
              ${seriesData.name}: ${seriesData.value.toFixed(2)}%
            </div>
            <div style="color: #888; font-size: 0.75rem; margin-bottom: 8px;">
              ${comparison} list price by ${difference}%
            </div>
          `;
        });

        tooltipContent += "</div></div>";
        return tooltipContent;
      },
      marker: {
        show: true,
        fillColors: seriesColors,
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <CardBox className={`${coustomClass}`}>
      <div className="metric-card-new">
        <div className="flex justify-between items-center px-4 py-4 bg-[#eaeaea]">
          <h3 className="flex items-center gap-2">
            {dataSeries?.map((series, index) => (
              <div key={series.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      index === 0 ? seriesColors[0] : seriesColors[1],
                  }}
                />
                <p className="text-base">{series.name}</p>
              </div>
            ))}
          </h3>
          <div className="text-base flex">Past 6 months
          <i className="icon-close-circle text-2xl text-[rgb(223,88,74)] cursor-pointer flex ml-4"></i>
          </div>

        </div>
        <div className="p-3">
        <Chart
          options={chartOptions}
          series={dataSeries || []}
          type="area"
          height="300"
          width="100%"
        />
        </div>
        
      </div>
    </CardBox>
  );
};

export default RegionNeighborhoodSalesRatio;
