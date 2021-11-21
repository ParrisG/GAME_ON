import React from "react";
import StockListItem from "./StockListItem";

export default function StockList(props) {
  return (
    <div>
      <h1>I am StockList</h1>
      <div>
        <h2>Here is StockListItem:</h2>
        <StockListItem />
      </div>
    </div>
  )
}