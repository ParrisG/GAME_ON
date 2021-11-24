import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import StockArrProvider from './providers/StockArrProvider';

ReactDOM.render(
  <BrowserRouter>
    <StockArrProvider>
      <App />
    </StockArrProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


