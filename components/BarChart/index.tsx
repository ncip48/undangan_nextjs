"use client";

import ApexCharts from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
// import ReactApexChart from "react-apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const BarChart = ({
  title,
  categories,
  data,
}: {
  title: string;
  categories: object;
  data: object;
}) => {
  const [state, setState] = React.useState<any>({
    series: data,
    options: {
      grid: {
        borderColor: "#e2e6e9",
        strokeDashArray: 4,
      },
      theme: {
        mode: "dark",
      },
      fill: {
        opacity: 1,
      },
      colors: ["#295F98", "#7695FF", "#667BC6"],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true,
        position: "top",
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: categories,
        labels: {
          show: true,
          style: {
            fontSize: "8px",
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      yaxis: {
        title: {
          // text: "Jumlah",
        },
        labels: {
          show: true,
          minWidth: 0,
          maxWidth: 160,
          style: {
            fontSize: "8px",
            cssClass: "apexcharts-yaxis-label",
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        },
      },
      tooltip: {
        enabled: false,
        y: {
          formatter: function (val: number) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm dark:bg-dark-800 dark:border-dark-800 dark:text-white">
      <div className="border-b border-blue-gray-50 p-4 dark:border-gray-900">
        <p className="block antialiased font-sans text-base leading-relaxed font-medium text-blue-gray-600">
          {title}
        </p>
      </div>
      <div className="p-4" id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BarChart;
