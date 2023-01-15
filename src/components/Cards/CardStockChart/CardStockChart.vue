<template>
  <div class="lineChart">
    <div class="chartAndButtonsContainer">
      <form id="stockSymbolSearchForm" action="" @submit.prevent="createStockPriceChart(10000000000000000000000000)">
        <input id="stockSymbolSearchBar" v-model="stockSymbol" type="text" name="stockSymbolSearch"
          placeholder="Enter the symbol of the stock you want to search">
        <button type="submit" class="submit">Search</button>
      </form>
      <br>
      <p>Active Stock Symbol: {{ stockSymbol }}</p>
      <br>
      <div class="dateRangeButtons">
        <button @click="createStockPriceChart(86400)">1 day</button>
        <button @click="createStockPriceChart(604800)">1 week</button>
        <button @click="createStockPriceChart(2630000)">1 month</button>
        <button @click="createStockPriceChart(31536000)">1 year</button>
        <button @click="createStockPriceChart(157680000)">5 years</button>
        <button @click="createStockPriceChart(10000000000000000)">MAX</button>
      </div>
      <div id="chartContainer">
        <canvas id="myChart" width="400px" height="400px"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Chart from 'chart.js/auto';
import Stock from '@/services/request/stock'

// import axios from 'axios';
let stockMarketHistory = [];
let stockMarketHistoryDates = [];
let stockMarketHistoryEpochDates = [];
let stockMarketHistoryPrices = [];

export default {
  name: 'LineChart',
  setup() {
    const updateStockPriceHistoryChart = () => {
      const ctx = document.getElementById('myChart');

      const labels = stockMarketHistoryDates;
      const data = {
        labels: labels,
        datasets: [{
          label: 'Stock Market Price',
          data: stockMarketHistoryPrices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        }]
      }

      const chartWithKey = Chart.getChart('myChart');
      if (chartWithKey != undefined) {
        chartWithKey.destroy();
      }

      const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
      })
    }

    const stockSymbol = ref('IBM');
    const AlphaVantageAPI_URL_LINK = computed(() => {
      return 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + stockSymbol.value + '&apikey=6S3XWKYVUZIUJZEF'
    });

    console.debug(AlphaVantageAPI_URL_LINK.value);

    const createStockPriceChart = (dateRange) => {

      if (stockMarketHistoryDates.length > 0) {
        stockMarketHistoryDates = [];
        stockMarketHistoryEpochDates = [];
        stockMarketHistoryPrices = [];
      }

      Stock.getStockPriceHistoryData(AlphaVantageAPI_URL_LINK.value)
        .then(response => {
          stockMarketHistory = response;

          dateRange

          console.debug(stockMarketHistory.data["Monthly Adjusted Time Series"]);

          for (const property in stockMarketHistory.data["Monthly Adjusted Time Series"]) {
            const closingPrice = stockMarketHistory.data["Monthly Adjusted Time Series"][property]["4. close"];
            const closingDateMonth = property.split('-')[1];
            const closingDateYear = property.split('-')[0];
            const closingDateDay = property.split('-')[2];
            const closingDateProperlyFormatted = `${closingDateMonth}/${closingDateDay}/${closingDateYear}`;
            const closingDateEpochTime = Date.parse(closingDateProperlyFormatted) / 1000;

            console.debug(closingDateEpochTime)

            stockMarketHistoryDates.unshift(closingDateProperlyFormatted);
            stockMarketHistoryEpochDates.unshift(closingDateEpochTime);
            stockMarketHistoryPrices.unshift(closingPrice);
          }
        })
        .then(() => {
          const now = Date.now() / 1000;
          const dateRangeDate = now - dateRange;

          const isLaterDateThanDateRangeDate = (date) => {
            return date > dateRangeDate;
          }

          const arrayIndexWhereDateIsLargerThanDateRangeDate = stockMarketHistoryEpochDates.findIndex(isLaterDateThanDateRangeDate);

          stockMarketHistoryDates.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);
          stockMarketHistoryPrices.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);

          updateStockPriceHistoryChart();
        });
    }
    return {
      stockSymbol,
      updateStockPriceHistoryChart,
      createStockPriceChart,
    }
  },
  mounted() {
    this.createStockPriceChart(10000000000000000)
    this.updateStockPriceHistoryChart();
  },
}
</script>

<style scoped>
#chartContainer {
  width: 1000px;
  height: 300px;
  margin: 0 auto;
}

#stockSymbolSearchBar {
  padding: 10px;
}

#stockSymbolSearchForm .submit {
  padding: 10px 20px;
}

.dateRangeButtons button {
  padding: 10px 20px;
  margin: 2px;
}
</style>
