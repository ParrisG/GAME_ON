import React from "react";
import StockInformation from "./StockInformation";
import StockChart from "./StockChart";
import StockNewsList from "./StockNewsList";

export default function StockDetail(props) {
  return (
    <div>
      <h1>I am StockDetail</h1>
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