import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {Card, Spinner} from 'react-bootstrap';
import axios from "axios";

export default function StockInformation(props) {

  let info = {
    "beta": {},
    "sector": {},
    "summary": {},
    "open": {},
    "avgVolume": {},
    "dayHigh": {},
    "name": {},
    "change": {},
    "previousClose": {},
    "preMarketPrice": {},
    "preMarketChange": {},
    "exchange": {},
    "dayLow": {},
    "volume": {},
    "cap": {},
    "preMarketChangePercent": {},
    "regMarketChangePercent": {},
    "symbol": {},
  };

  const [stockInfo, setStockInfo] = useState(info);

  let params = useParams(); //we can access the :ticker value as params.ticker
  

  const createVariables = (info) => {
    setStockInfo( (prevState) => ({...prevState, 
      "beta": info.defaultKeyStatistics.beta.fmt,
      "sector": info.summaryProfile.sector,
      "summary": info.summaryProfile.longBusinessSummary,
      "open": info.price.regularMarketOpen.fmt,
      "avgVolume": info.price.averageDailyVolume10Day.longFmt,
      "dayHigh": info.price.regularMarketDayHigh.fmt,
      "name": info.price.shortName,
      "change": info.price.regularMarketChange.fmt,
      "previousClose": info.price.regularMarketPreviousClose.fmt,
      "preMarketPrice": info.price.preMarketPrice.fmt,
      "preMarketChange": info.price.preMarketChange.fmt,
      "exchange": info.price.exchangeName,
      "dayLow": info.price.regularMarketDayLow.fmt,
      "volume": info.price.regularMarketVolume.longFmt,
      "cap": info.price.marketCap.longFmt,
      "preMarketChangePercent": info.price.preMarketChangePercent.fmt,
      "regMarketChangePercent": info.price.regularMarketChangePercent.fmt,
      "symbol": info.price.quoteType.symbol
    }));

    return info;
  }

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
      console.log(response.data);
      createVariables(response.data);
      console.log(stockInfo);
    })
    .catch((error) => {
      console.error(error);
    })
  }, []);


  return (
    <div>
      <h1>I am StockInformation: </h1>

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p></p>
    </div>
  )
}