import React, { useRef }from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { stringify, parse } from "flatted";


export default function FilterBox(props) {

  const minPrice = useRef();
  const maxPrice = useRef();
  const minVolume = useRef();

  //Creating the options for the Axios call using the values from the filter.
  const addFilterDetails = (minPrice, maxPrice, minVolume) => {
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
    
    if (minVolume) {
      filterArr.push({operator: 'gt', operands: ['dayvolume', minVolume]});
    }
    if (minPrice && maxPrice) {
      filterArr.push({operator: 'BTWN', operands: ['intradayprice', minPrice, maxPrice]});
    } else if (minPrice) {
      filterArr.push({operator: 'gt', operands: ['intradayprice', minPrice]});
    } else if (maxPrice) {
      filterArr.push({operator: 'lt', operands: ['intradayprice', maxPrice]});
    }
    return filterArr;
  }
  let filteredStockOptions = {
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
    data: addFilterDetails(minPrice, maxPrice, minVolume)
  };

  //using flatted to eliminate the circular reference JSON issue.
  let options = stringify(filteredStockOptions);
  let options2 = parse(options)
  
  const getFilteredStocks = () => {
    axios.request(options2).then(function (response) {
      console.log(options2)
      console.log(response.data.finance.result[0]["quotes"]);
    }).catch(function (error) {
      console.error(error);
    })
  }

  function handleSubmit(e){
    
    e.preventDefault();
    console.log(minPrice);
    getFilteredStocks();

  }


  return (
    <>
      <Card>
        <Card.Body>
          
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
            
            <Button  type='submit' className="w-100 mt-2">Find Stocks!</Button>
          </Form>
        </Card.Body>
      </Card>
  
    </>
  )
}