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

//getFilteredStocks();

