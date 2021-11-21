import React from "react";
import FilterBox from "./FilterBox";
import StockList from "./StockList";

export default function Dashboard(props) {
  return (
    <div>
      <h1>I am Dashboard</h1>
      <div>
        <h2>Here is FilterBox:</h2>
        <FilterBox />
      </div>
      <div>
        <h2>Here is StockList:</h2>
        <StockList />
      </div>
    </div>
  )
}