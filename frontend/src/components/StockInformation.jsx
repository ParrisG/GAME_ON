import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {Badge, Card, Spinner, ListGroup} from 'react-bootstrap';
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
          <Card style={{ width: '30rem', background: 'rgb(99 99 99)'  }}>
            <Card.Body>
              <Card.Title><h1>{params.ticker}</h1></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{stockInfo.price.shortName}</Card.Subtitle>
              <Card.Text>Exchange: {stockInfo.price.exchangeName}</Card.Text>
              <ListGroup>
                <h1><Badge pill bg="dark">Price: {stockInfo.price.regularMarketPrice.fmt}</Badge></h1>
                <ListGroup horizontal>
                  <Card style={{ width: '15rem' }}>
                    <Card.Header>Volume</Card.Header>
                    <Card.Body>{stockInfo.price.regularMarketVolume.longFmt}</Card.Body>
                  </Card>
                  <Card style={{ width: '15rem' }}>
                    <Card.Header>Average Volume</Card.Header>
                    <Card.Body>{stockInfo.price.averageDailyVolume10Day.longFmt}</Card.Body>
                  </Card>
                </ListGroup>
                <ListGroup horizontal>
                  <Card style={{ width: '15rem' }}>
                    <Card.Header>Open</Card.Header>
                    <Card.Body>{stockInfo.price.regularMarketOpen.fmt}</Card.Body>
                  </Card>
                  <Card style={{ width: '15rem' }}>
                    <Card.Header>Previous Close</Card.Header>
                    <Card.Body>{stockInfo.price.regularMarketPreviousClose.fmt}</Card.Body>
                  </Card>
                </ListGroup>
                <ListGroup horizontal>
                  <Card style={{ width: '10rem' }}>
                    <Card.Header>Change</Card.Header>
                    <Card.Body>{stockInfo.price.regularMarketChange.fmt}</Card.Body>
                  </Card>
                  <Card style={{ width: '10rem' }}>
                    <Card.Header>Change %</Card.Header>
                    <Card.Body>{stockInfo.price.regularMarketChangePercent.fmt}</Card.Body>
                  </Card>
                  <Card style={{ width: '10rem' }}>
                    <Card.Header>Beta</Card.Header>
                    <Card.Body>{stockInfo.defaultKeyStatistics.beta.fmt}</Card.Body>
                  </Card>
                </ListGroup>
                <ListGroup horizontal>
                  <Card style={{ width: '30rem' }}>
                    <Card.Header>Market Range</Card.Header>
                    <Card.Body>{stockInfo.price.regularMarketDayLow.fmt} - {stockInfo.price.regularMarketDayHigh.fmt}</Card.Body>
                  </Card>
                </ListGroup>
                <ListGroup horizontal>
                  <Card style={{ width: '15rem' }}>
                    <Card.Header>Sector</Card.Header>
                    <Card.Body>{stockInfo.summaryProfile.sector}</Card.Body>
                  </Card>
                  <Card style={{ width: '15rem' }}>
                    <Card.Header>Market Cap</Card.Header>
                    <Card.Body>{stockInfo.price.marketCap.longFmt}</Card.Body>
                  </Card>
                </ListGroup>
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