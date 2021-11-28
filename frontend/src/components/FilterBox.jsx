import React, { useRef, useContext }from "react";
import {Form,Button,Card,Container, ListGroup} from 'react-bootstrap'
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

    const getMarketCap = () => {
      const capArray = [];
      if (document.getElementById('nanoCap').checked) {
        capArray.push({operator: 'BTWN', operands: ['intradaymarketcap', 0, 50000000]});
      } else if (document.getElementById('microCap').checked) {
        capArray.push({operator: 'BTWN', operands: ['intradaymarketcap', 50000000, 300000000]});
      } else if (document.getElementById('smallCap').checked) {
        capArray.push({operator: 'BTWN', operands: ['intradaymarketcap', 300000000, 2000000000]});
      } else if (document.getElementById('midCap').checked) {
        capArray.push({operator: 'BTWN', operands: ['intradaymarketcap', 2000000000, 10000000000]});
      } else if (document.getElementById('largeCap').checked) {
        capArray.push({operator: 'BTWN', operands: ['intradaymarketcap', 10000000000, 200000000000]});
      } else if (document.getElementById('largeCap').checked) {
        capArray.push({operator: 'GT', operands: ['intradaymarketcap', 200000000000]});
      } else {
        capArray.push({operator: 'GT', operands: ['intradaymarketcap', 2000000000]});
      };
  
      return capArray;
    };

    const filterArr = [
      {operator: 'eq', operands: ['region', 'us']},
    {
      operator: 'or',
      operands: getMarketCap()
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

  const sortByOption = () => {
    if (document.getElementById('sort').checked) {
      return(document.getElementById('sort').value);
    } else {
      return("beta");
    }
  }

  const filteredStockOptions = () => {
    return ({
    method: 'POST',
    url: 'https://yh-finance.p.rapidapi.com/screeners/list',
    params: {
      quoteType: 'EQUITY',
      sortField: sortByOption(),
      region: 'US',
      size: '20',
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
    if (document.getElementById('sort').checked) {
      console.log(document.getElementById('sort').value);
    } else {
      console.log("beta");
    }
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
            <Form.Label>Sort By</Form.Label>
            <Form.Group>
              <Form.Check
                inline
                label="Percent Change"
                name="sort"
                type="radio"
                id="sort"
                value="percentchange"
                
              />
              <Form.Check
                inline
                label="Beta"
                name="sort"
                type="radio"
                id="sort"
                value="beta"
              />
            </Form.Group>
            <Form.Label>Select Market Cap</Form.Label>
            <ListGroup style={{fontSize: '0.75rem'}} horizontal>
              <ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item style={{ width: '6.5rem'}}>Nano-Cap</ListGroup.Item>
                  <ListGroup.Item style={{ width: '2.5rem'}}><Form.Check id="nanoCap" type="checkbox" /></ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item style={{ width: '6.5rem'}}>Micro-Cap</ListGroup.Item>
                  <ListGroup.Item style={{ width: '2.5rem'}}><Form.Check id="microCap" type="checkbox" /></ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item style={{ width: '6.5rem'}}>small-Cap</ListGroup.Item>
                  <ListGroup.Item style={{ width: '2.5rem'}}><Form.Check id="smallCap" type="checkbox" /></ListGroup.Item>
                </ListGroup>
              </ListGroup>
              <ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item style={{ width: '6.5rem'}}>Mid-Cap</ListGroup.Item>
                  <ListGroup.Item style={{ width: '2.5rem'}}><Form.Check id="midCap" type="checkbox" /></ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item style={{ width: '6.5rem'}}>Large-Cap</ListGroup.Item>
                  <ListGroup.Item style={{ width: '2.5rem'}}><Form.Check id="largeCap" type="checkbox" /></ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal>
                  <ListGroup.Item style={{ width: '6.5rem'}}>Mega-Cap</ListGroup.Item>
                  <ListGroup.Item style={{ width: '2.5rem'}}><Form.Check id="megaCap" type="checkbox" /></ListGroup.Item>
                </ListGroup>
              </ListGroup>
            </ListGroup>
            
            <Button  type='submit' className="w-90 mt-3">Find Stocks!</Button>
          </Form>
        </Card.Body>
      </Card>
      </div>
  
  )
}