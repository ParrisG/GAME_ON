import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {Card, Spinner, ListGroup} from 'react-bootstrap';
import axios from "axios";

export default function StockInformation(props) {

  const [stockInfo, setStockInfo] = useState();

  let params = useParams(); //we can access the :ticker value as params.ticker

  
  const singleStockOptions = () => {
    return {
      method: 'GET',
      url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
      params: {symbol: params.ticker},
      headers: {
        'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
      }
    }
  };

  useEffect(() => {
    axios.request(singleStockOptions())
    .then((response) => {
      //console.log(response.data);
      setStockInfo(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }, []);

  const stockInfoBox = () => {
    if (!stockInfo) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )
    } else {
      
        return (
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>{params.ticker}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{stockInfo.price.shortName}</Card.Subtitle>
              <Card.Text>Exchange: {stockInfo.price.exchangeName}</Card.Text>
              <ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item>Average Volume {stockInfo.price.averageDailyVolume10Day.longFmt}</ListGroup.Item>
                  <ListGroup.Item>Day Volume {stockInfo.price.regularMarketVolume.longFmt}</ListGroup.Item>
                </ListGroup>
                <ListGroup.Item>Summary {stockInfo.summaryProfile.longBusinessSummary}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        )
    }
  };

  let display = stockInfoBox();


  return (
    <div>
      <h1>I am StockInformation: </h1>
        {display}
      
      <p></p>
    </div>
  )
}