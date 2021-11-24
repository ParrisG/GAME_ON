import React from "react";
import { useParams } from 'react-router-dom';


import StockInformation from "./StockInformation";
import StockChart from "./StockChart";
import StockNewsList from "./StockNewsList";

export default function StockDetail(props) {

  let params = useParams(); //we can access the :ticker value as params.ticker


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