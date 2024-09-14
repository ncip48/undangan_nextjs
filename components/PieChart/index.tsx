"use client";

import dynamic from "next/dynamic";
import ApexCharts from "apexcharts";
import React from "react";
// import ReactApexChart from "react-apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieChart = ({
  title,
  data,
  label,
}: {
  title: string;
  data: object;
  label: object;
}) => {
  const [state, setState] = React.useState<any>({
    series: data,
    options: {
      labels: label,
      colors: ["#295F98", "#7695FF", "#667BC6"],
      theme: {
        mode: "dark",
      },
      chart: {
        type: "pie",
        outline: {
          show: false,
        },
      },
      stroke: {
        colors: ["transparent"],
      },
      dataLabels: {
        formatter: function (val: any, opts: any) {
          return [opts.w.config.series[opts.seriesIndex], val.toFixed(0) + "%"];
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
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
          options={{
            ...state.options,
          }}
          series={state.series}
          type="pie"
          height={350}
        />
      </div>
    </div>
  );
};

export default PieChart;
