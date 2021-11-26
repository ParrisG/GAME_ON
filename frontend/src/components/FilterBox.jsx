import React, { useRef, useContext }from "react";
import {Form,Button,Card,Container} from 'react-bootstrap'
import axios from "axios";
import { stockArrContext } from '../providers/StockArrProvider';
import './Filterbox.css'


export default function FilterBox() {

  const minPrice = useRef();
  const maxPrice = useRef();
  const minVolume = useRef();

  const { setStockArr } = useContext(stockArrContext);

  //Creating the options for the Axios call using the values from the filter.
  const addFilterDetails = () => {
    let minPriceFilter = parseInt(minPrice.current.value);
    let maxPriceFilter = parseInt(maxPrice.current.value);
    let minVolumeFilter = parseInt(minVolume.current.value);

    const filterArr = [
      {operator: 'eq', operands: ['region', 'us']},
    {
      operator: 'or',
      operands: [
        {operator: 'BTWN', operands: ['intradaymarketcap', 2000000000, 10000000000]},
        {operator: 'BTWN', operands: ['intradaymarketcap', 10000000000, 100000000000]},
        {operator: 'GT', operands: ['intradaymarketcap', 100000000000]}
      ]
    },];
    
    if (minVolumeFilter) {
      filterArr.push({operator: 'gt', operands: ['dayvolume', minVolumeFilter]});
    }
    if (minPriceFilter && maxPriceFilter) {
      filterArr.push({operator: 'BTWN', operands: ['intradayprice', minPriceFilter, maxPriceFilter]});
    } else if (minPriceFilter) {
      filterArr.push({operator: 'gt', operands: ['intradayprice', minPriceFilter]});
    } else if (maxPriceFilter) {
      filterArr.push({operator: 'lt', operands: ['intradayprice', maxPriceFilter]});
    }
    return filterArr;
  }
  const filteredStockOptions = () => {
    return ({
    method: 'POST',
    url: 'https://yh-finance.p.rapidapi.com/screeners/list',
    params: {
      quoteType: 'EQUITY',
      sortField: 'percentchange',
      region: 'US',
      size: '10',
      offset: '0',
      sortType: 'DESC'
    },
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
      'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
    },
    data: addFilterDetails()
  })};
  
  const getFilteredStocks = () => {
    console.log(filteredStockOptions())
    axios.request(filteredStockOptions()).then(function (response) {
      setStockArr(response.data.finance.result[0]["quotes"]);
      console.log(response.data.finance.result[0]["quotes"]);
    }).catch(function (error) {
      console.error(error);
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    getFilteredStocks();
  }


  return (
      <div  >
      <Card className="filter__container">
        <Card.Body >
          
          <h2 className="text-center mb-4"> FILTER</h2>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group id="regularMarketPrice_min">
              <Form.Label>Minimum Price</Form.Label>
              <Form.Control
                type="text"
                ref={minPrice}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="regularMarketPrice_max">
              <Form.Label>Maximum Price</Form.Label>
              <Form.Control
                type="text"
                ref={maxPrice}
              
              ></Form.Control>
            </Form.Group>
            <Form.Group id="dayvolume_min">
              <Form.Label>Minimum Daily Volume</Form.Label>
              <Form.Control type="text" ref={minVolume} ></Form.Control>
            </Form.Group>
            
            <Button  type='submit' className="w-90 mt-3">Find Stocks!</Button>
          </Form>
        </Card.Body>
      </Card>
      </div>
  
  )
}