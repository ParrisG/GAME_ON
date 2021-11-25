import React from "react";

export default function StockNewsListItem(props) {
  console.log('props',props);

  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}