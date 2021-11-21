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

getSingleStockSummary();
