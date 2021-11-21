import React from "react";
import StockNewsListItem from "./StockNewsListItem";

export default function StockNewsList(props) {
  return (
    <div>
      <h1>I am StockNewsList</h1>
      <div>
        <h2>Here is StockNewsListItem:</h2>
        <StockNewsListItem />
      </div>
    </div>
  )
}