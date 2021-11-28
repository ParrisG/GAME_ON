import React from "react";
import { Container,Card } from "react-bootstrap";
import './StockListItem.css'
const moreInfo=()=>{
  
}

export default function StockListItem(props) {
  return (
    <div className="stock__container" >
        <div>{props.name}</div>
        <div >$ {props.price}</div>
        <div className="price">{props.percentChange}</div>
        </div>
  )
}