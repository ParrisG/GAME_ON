import React from "react";
import '../css/StockListItem.module.css'

export default function StockListItem(props) {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}