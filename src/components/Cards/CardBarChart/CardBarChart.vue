<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            Performance
          </h6>
          <h2 class="text-blueGray-700 text-xl font-semibold">Total orders</h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <canvas id="bar-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted } from "vue";
import {
  Chart,
  ChartConfiguration,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineElement,
  LineController,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineElement,
  LineController,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const config: ChartConfiguration = {
  type: "bar",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ],
    datasets: [
      {
        label: new Date().getFullYear().toString(),
        backgroundColor: "#ed64a6",
        borderColor: "#ed64a6",
        data: [30, 78, 56, 34, 100, 45, 13],
        fill: false,
        barThickness: 8,
      },
      {
        label: (new Date().getFullYear() - 1).toString(),
        fill: false,
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [27, 68, 86, 74, 10, 4, 87],
        barThickness: 8,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Orders Chart",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        labels: {
          color: "#808080",
        },
        align: "end",
        position: "bottom",
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: false,
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          drawTicks: true,
          tickBorderDash: [2],
          tickBorderDashOffset: 2,
          color: "rgba(33, 37, 41, 0.3)",
        },
      },
      y: {
        display: true,
        title: {
          display: false,
          text: "Value",
        },
        grid: {
          drawTicks: true,
          tickBorderDash: [2],
          tickBorderDashOffset: 2,
          color: "rgba(33, 37, 41, 0.2)",
        },
      },
    },
  },
};

const renderChart = (): void => {
  // @ts-ignore
  const ctx = document.getElementById("bar-chart")!.getContext("2d");
  // @ts-ignore
  window.myLine = new Chart(ctx, config);
};

onMounted(async () => {
  await nextTick(() => {
    renderChart()
  })
})

</script>
