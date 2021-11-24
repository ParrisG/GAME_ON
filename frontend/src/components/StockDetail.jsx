import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";


import StockInformation from "./StockInformation";
import StockChart from "./StockChart";
import StockNewsList from "./StockNewsList";

export default function StockDetail(props) {

  const [stockInfo, setStockInfo] = useState();

  let params = useParams(); //we can access the :ticker value as params.ticker

  const singleStockOptions = () => {
    return {
      method: 'GET',
      url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
      params: {symbol: params.ticker},
      headers: {
        'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
      }
    }
  };

  useEffect(() => {
    axios.request(singleStockOptions()).then(function (response) {
      console.log(response.data);
      setStockInfo(response.data);
    }).catch(function (error) {
      console.error(error);
    })
  }, []);

  return (
    <div>
      <h1>I am StockDetail for Stock Ticker: {params.ticker} </h1>
      <div>
        <h2>Here is StockInformation:</h2>
        <StockInformation />
      </div>
      <div>
        <h2>Here is StockChart:</h2>
        <StockChart />
      </div>
      <div>
        <h2>Here is StockNewsList:</h2>
        <StockNewsList />
      </div>
    </div>
  )
}