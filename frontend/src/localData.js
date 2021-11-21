require('dotenv').config();
const axios = require("axios");

// This file is to be used to provide local data for the construction of components. 
// There are multiple different data sets to reflect the data returned from different axios endpoints.
// Each data set has an associated function that has been exported to allow you to import the data set to the component you are working on.

// Current functions:


var singleStockOptions = {
  method: 'GET',
  url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
  params: {symbol: 'AMZN'},
  headers: {
    'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.X_RAPIDAPI_KEY
  }
};


const getSingleStockSummary = () => {
  axios.request(singleStockOptions).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

//getSingleStockSummary();


var filteredStockOptions = {
  method: 'POST',
  url: 'https://yh-finance.p.rapidapi.com/screeners/list',
  params: {
    quoteType: 'EQUITY',
    sortField: 'percentchange',
    region: 'CA',
    size: '10',
    offset: '0',
    sortType: 'DESC'
  },
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.X_RAPIDAPI_KEY
  },
  data: [
    {operator: 'eq', operands: ['region', 'us']},
    {
      operator: 'or',
      operands: [
        {operator: 'BTWN', operands: ['intradaymarketcap', 2000000000, 10000000000]},
        {operator: 'BTWN', operands: ['intradaymarketcap', 10000000000, 100000000000]},
        {operator: 'GT', operands: ['intradaymarketcap', 100000000000]}
      ]
    },
    {operator: 'gt', operands: ['dayvolume', 15000]},
    {operator: 'BTWN', operands: ['regularMarketPrice', 50, 150]}
  ]
};

const getFilteredStocks = () => {
  axios.request(filteredStockOptions).then(function (response) {
    console.log(response.data.finance.result[0]["quotes"]);
  }).catch(function (error) {
    console.error(error);
  })
}

getFilteredStocks();

{
  symbol: 'KRNT',
  twoHundredDayAverageChangePercent: { raw: 0.4373827, fmt: '43.74%' },
  averageAnalystRating: '1.7 - Buy',
  fiftyTwoWeekLowChangePercent: { raw: 1.2219423, fmt: '122.19%' },
  language: 'en-CA',
  regularMarketDayRange: { raw: '158.0 - 181.36', fmt: '158.00 - 181.36' },
  earningsTimestampEnd: { raw: 1645185600, fmt: '2022-02-18', longFmt: '2022-02-18T07:00' },
  epsForward: { raw: 1.36, fmt: '1.36' },
  regularMarketDayHigh: { raw: 181.36, fmt: '181.36' },
  twoHundredDayAverageChange: { raw: 53.67694, fmt: '53.68' },
  twoHundredDayAverage: { raw: 122.72305, fmt: '122.72' },
  askSize: { raw: 22, fmt: '22', longFmt: '22' },
  bookValue: { raw: 12.159, fmt: '12.16' },
  fiftyTwoWeekHighChange: { raw: -4.980011, fmt: '-4.98' },
  marketCap: { raw: 8198595584, fmt: '8.199B', longFmt: '8,198,595,584' },
  fiftyTwoWeekRange: { raw: '79.39 - 181.38', fmt: '79.39 - 181.38' },
  fiftyDayAverageChange: { raw: 22.435791, fmt: '22.44' },
  exchangeDataDelayedBy: 0,
  averageDailyVolume3Month: { raw: 312265, fmt: '312,265', longFmt: '312,265' },
  firstTradeDateMilliseconds: 1427981400000,
  fiftyTwoWeekLow: { raw: 79.39, fmt: '79.39' },
  regularMarketVolume: { raw: 2608811, fmt: '2.609M', longFmt: '2,608,811' },
  market: 'us_market',
  postMarketPrice: { raw: 176.4, fmt: '176.40' },
  quoteSourceName: 'Nasdaq Real Time Price',
  messageBoardId: 'finmb_33277502',
  priceHint: 2,
  sourceInterval: 15,
  exchange: 'NMS',
  regularMarketDayLow: { raw: 158, fmt: '158.00' },
  shortName: 'Kornit Digital Ltd.',
  region: 'CA',
  fiftyDayAverageChangePercent: { raw: 0.14572082, fmt: '14.57%' },
  fullExchangeName: 'NasdaqGS',
  earningsTimestampStart: { raw: 1644836340, fmt: '2022-02-14', longFmt: '2022-02-14T05:59' },
  financialCurrency: 'USD',
  displayName: 'Kornit Digital',
  gmtOffSetMilliseconds: -18000000,
  regularMarketOpen: { raw: 160.71, fmt: '160.71' },
  regularMarketTime: { raw: 1637355602, fmt: '4:00PM EST' },
  regularMarketChangePercent: { raw: 13.79911, fmt: '13.80%' },
  quoteType: 'EQUITY',
  averageDailyVolume10Day: { raw: 721420, fmt: '721,420', longFmt: '721,420' },
  fiftyTwoWeekLowChange: { raw: 97.009995, fmt: '97.01' },
  fiftyTwoWeekHighChangePercent: { raw: -0.02745623, fmt: '-2.75%' },
  trailingPE: { raw: 410.23254, fmt: '410.23' },
  tradeable: false,
  postMarketTime: { raw: 1637369713, fmt: '7:55PM EST' },
  currency: 'USD',
  sharesOutstanding: { raw: 46477300, fmt: '46.477M', longFmt: '46,477,300' },
  fiftyTwoWeekHigh: { raw: 181.38, fmt: '181.38' },
  regularMarketPreviousClose: { raw: 155.01, fmt: '155.01' },
  postMarketChangePercent: { raw: 0, fmt: '0.00%' },
  exchangeTimezoneName: 'America/New_York',
  regularMarketChange: { raw: 21.39, fmt: '21.39' },
  bidSize: { raw: 12, fmt: '12', longFmt: '12' },
  priceEpsCurrentYear: { raw: 207.5294, fmt: '207.53' },
  fiftyDayAverage: { raw: 153.9642, fmt: '153.96' },
  epsCurrentYear: { raw: 0.85, fmt: '0.85' },
  exchangeTimezoneShortName: 'EST',
  marketState: 'CLOSED',
  regularMarketPrice: { raw: 176.4, fmt: '176.40' },
  forwardPE: { raw: 129.70587, fmt: '129.71' },
  postMarketChange: { raw: 0, fmt: '0.00' },
  earningsTimestamp: { raw: 1636527900, fmt: '2021-11-10', longFmt: '2021-11-10T02:05' },
  ask: { raw: 176.4, fmt: '176.40' },
  epsTrailingTwelveMonths: { raw: 0.43, fmt: '0.43' },
  bid: { raw: 175.01, fmt: '175.01' },
  priceToBook: { raw: 14.5077715, fmt: '14.51' },
  triggerable: true,
  longName: 'Kornit Digital Ltd.'
}