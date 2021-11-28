import React from "react";
import { Container,Card, Row } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './StockListItem.css'


export default function StockListItem(props) {

  const navigate = useNavigate();

  const handleClick = () => {
    const navString = "/stock/" + props.symbol;
    console.log(navString);
    navigate(navString);
  }

  return (
    <Container onClick={handleClick} className="stock__container">
        <div>{props.name}</div>
        <div >$ {props.price}</div>
        <div className="price">{props.percentChange}</div> 
    </Container>
  )
}