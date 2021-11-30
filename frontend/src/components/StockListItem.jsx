import React from "react";
import { Container} from "react-bootstrap";
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
        <div className="stock__name">{props.name}</div>
        <div >Price: $ {props.price}</div>
        <div className="percentage">Change: {props.percentChange}</div> 
    </Container>
  )
}