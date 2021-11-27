import React, { useRef }from "react";
import {Form,Button,Card} from 'react-bootstrap'
import {useNavigate} from "react-router-dom";
import './Filterbox.css'

export default function SymbolSearch() {

  const symbol = useRef("");
  const navigate = useNavigate();

  const getNavString = (ticker) => {
    return "/stock/" + ticker;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const navString = getNavString(symbol.current.value)
    navigate(navString);
  }


  return (
    <div>
      <Card className="filter__container">
        <Card.Body >
          
          <h2 className="text-center mb-4"> Go To Stock</h2>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group id="tickerSymbol">
              <Form.Label>Ticker Symbol</Form.Label>
              <Form.Control
                type="text"
                ref={symbol}
              ></Form.Control>
            </Form.Group>
            <Button  type='submit' className="w-90 mt-3">Go Get It!</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}