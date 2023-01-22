<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded dark:bg-white bg-blueGray-700">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <form id="stockSymbolSearchForm" action="" @submit.prevent="createStockPriceChart(Number.MAX_SAFE_INTEGER)">
            <input v-model="stockSymbol" type="text" name="stockSymbolSearch"
              placeholder="Enter the symbol of the stock you want to search">
            <button type="submit" class="submit">Search</button>
          </form>

          <!--  <h2 class="text-white dark:text-black text-xl font-semibold mt-5">
            Active Stock Symbol: {{ stockSymbol }}
          </h2> -->

          <div class="dateRangeButtons">
            <button @click="createStockPriceChart(86400)">1 day</button>
            <button @click="createStockPriceChart(604800)">1 week</button>
            <button @click="createStockPriceChart(2630000)">1 month</button>
            <button @click="createStockPriceChart(31536000)">1 year</button>
            <button @click="createStockPriceChart(157680000)">5 years</button>
            <button @click="createStockPriceChart(Number.MAX_SAFE_INTEGER)">MAX</button>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 flex-auto">
      <div class="relative h-350-px ">
        <canvas id="stock-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, watch, ref } from 'vue'
import Chart from 'chart.js/auto';
import Stock from '@/services/request/stock'
import { ChartConfiguration } from 'chart.js';
import { storageTheme } from '@/store/modules/theme'

let stockMarketHistory: any = {};
let stockMarketHistoryDates: Array<string> = [];
let stockMarketHistoryEpochDates: Array<number> = [];
let stockMarketHistoryPrices: Array<number> = [];

const theme = computed(() => storageTheme.theme)

const config: ChartConfiguration = {
  type: 'line',
  data: {
    labels: stockMarketHistoryDates,
    datasets: [{
      label: 'Stock Market Price',
      data: stockMarketHistoryPrices,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0,
    }]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Sales Charts',
        color: 'white',
      },
      legend: {
        labels: {
          color: '#808080',
        },
        align: 'end',
        position: 'bottom',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,.7)' },
        display: true,
        title: {
          display: false,
        },
        grid: {
          drawTicks: true,
          tickBorderDash: [2],
          tickBorderDashOffset: 2,
          color: "rgba(33, 37, 41, 0.3)",
        },
      },
      y: {
        ticks: { color: 'rgba(255,255,255,.7)' },
        display: true,
        title: {
          display: false,
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
}

const updateConfig = (value: string) => {
  if (value === '1') {
    config.options!.scales!.x!.grid!.color = '#000'
    config.options!.scales!.y!.grid!.color = '#000'
    config.options!.scales!.x!.ticks!.color = '#000'
    config.options!.scales!.y!.ticks!.color = '#000'
    config.data.datasets[0].backgroundColor = '#000'
    config.data.datasets[0].borderColor = '#000'
  } else {
    config.options!.scales!.x!.grid!.color = 'rgba(248,249,253,0.3)'
    config.options!.scales!.y!.grid!.color = 'rgba(248,249,253,0.3)'
    config.data.datasets[0].backgroundColor = '#FF0000'
    config.data.datasets[0].borderColor = '#FF0000'
    config.options!.scales!.x!.ticks!.color = 'rgba(255,255,255,.7)'
    config.options!.scales!.y!.ticks!.color = 'rgba(255,255,255,.7)'
  }
}

updateConfig(theme.value)

watch(() => theme.value, (value) => {
  updateConfig(value)
  Chart.getChart('stock-chart')?.update()
})

const updateStockPriceHistoryChart = () => {
  const chartWithKey = Chart.getChart('stock-chart');
  if (chartWithKey != undefined) {
    chartWithKey.destroy();
  }
  config.data.labels = stockMarketHistoryPrices;
  config.data.datasets[0].data = stockMarketHistoryPrices;
  const canvas = document.getElementById('stock-chart') as HTMLCanvasElement;
  const ctx = canvas?.getContext('2d');
  if (ctx) {
    const myChart = new Chart(ctx, config)
  }
}

const stockSymbol = ref('IBM');
const AlphaVantageAPI_URL_LINK = computed(() => {
  return 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + stockSymbol.value + '&apikey=6S3XWKYVUZIUJZEF'
});

const createStockPriceChart = (dateRange: any) => {

  if (stockMarketHistoryDates.length > 0) {
    stockMarketHistoryDates = [];
    stockMarketHistoryEpochDates = [];
    stockMarketHistoryPrices = [];
  }

  Stock.getStockPriceHistoryData(AlphaVantageAPI_URL_LINK.value)
    .then(response => {
      stockMarketHistory = response;

      for (const property in stockMarketHistory.data["Monthly Adjusted Time Series"]) {
        const closingPrice = stockMarketHistory.data["Monthly Adjusted Time Series"][property]["4. close"];
        const closingDateMonth = property.split('-')[1];
        const closingDateYear = property.split('-')[0];
        const closingDateDay = property.split('-')[2];
        const closingDateProperlyFormatted = `${closingDateMonth}/${closingDateDay}/${closingDateYear}`;
        const closingDateEpochTime = Date.parse(closingDateProperlyFormatted) / 1000;

        stockMarketHistoryDates.unshift(closingDateProperlyFormatted);
        stockMarketHistoryEpochDates.unshift(closingDateEpochTime);
        stockMarketHistoryPrices.unshift(closingPrice);
      }
    })
    .then(() => {
      const now = Date.now() / 1000;
      const dateRangeDate = now - dateRange;

      const isLaterDateThanDateRangeDate = (date: number) => {
        return date > dateRangeDate;
      }

      const arrayIndexWhereDateIsLargerThanDateRangeDate = stockMarketHistoryEpochDates.findIndex(isLaterDateThanDateRangeDate);

      stockMarketHistoryDates.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);
      stockMarketHistoryPrices.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);

      updateStockPriceHistoryChart();
    });
}

onMounted(async () => {
  await nextTick(() => {
    createStockPriceChart(Number.MAX_SAFE_INTEGER)
    // updateStockPriceHistoryChart();
  })
})

</script>

<style scoped>
#stockSymbolSearchForm .submit {
  padding: 10px 20px;
}

.dateRangeButtons button {
  padding: 10px 20px;
  margin: 2px;
}
</style>
