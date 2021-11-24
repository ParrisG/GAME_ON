import { useEffect, useContext } from 'react';
import { Routes, Route} from "react-router-dom";
import './App.css';
import Start from "./components/Start";
import Dashboard from "./components/Dashboard";
import StockDetail from "./components/StockDetail";
import HeaderBar from "./components/HeaderBar";
import Login from "./components/Login/Login";
import { stockArrContext } from './providers/StockArrProvider';
import axios from 'axios';
require('dotenv').config();



function App() {

  const { setStockArr } = useContext(stockArrContext);

  const filteredStockOptions = {
    method: 'POST',
    url: 'https://yh-finance.p.rapidapi.com/screeners/list',
    params: {
      quoteType: 'EQUITY',
      sortField: 'percentchange',
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
    data: [
      {operator: 'eq', operands: ['region', 'us']},
      {
        operator: 'or',
        operands: [
          {operator: 'BTWN', operands: ['intradaymarketcap', 2000000000, 10000000000]},
          {operator: 'BTWN', operands: ['intradaymarketcap', 10000000000, 100000000000]},
          {operator: 'GT', operands: ['intradaymarketcap', 100000000000]}
        ]
      },
      {operator: 'gt', operands: ['dayvolume', 150000]}
    ]
  };
  
  useEffect(() => {
    axios.request(filteredStockOptions).then(function (response) {
      console.log(response.data.finance.result[0]["quotes"]);
      setStockArr(response.data.finance.result[0]["quotes"]);
    }).catch(function (error) {
      console.error(error);
    })
  }, []);


  return (
    <div className="App">
      <HeaderBar />

      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock/:ticker" element={<StockDetail />} />
      </Routes>
      
    </div>
    
  );
}

export default App;
