import React from "react";
import {Container,Card} from "react-bootstrap";
import './StockListItem.module.css'

export default function StockListItem(props) {
  return (
   <div className='.each__stock'>
     {props.name}
   </div>
    
  )
}