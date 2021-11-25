import React from "react";
import { Container,Card } from "react-bootstrap";
import './StockListItem.css'

export default function StockListItem(props) {
  return (
    <Container className="stock__container" >
      <Card className="stock__card" >
        <div>{props.name}</div>
        <div>$ {props.price}</div>
        <div>{props.percentChange}</div>
        </Card>
    </Container>
  )
}