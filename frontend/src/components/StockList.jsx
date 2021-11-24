import { useContext } from "react";
import StockListItem from "./StockListItem";
import { stockArrContext } from '../providers/StockArrProvider';
import {Container,Card} from "react-bootstrap";
import './StockList.module.css'


export default function StockList(props) {
  const { stockArr } = useContext(stockArrContext);
  
  const parsedStocks = (stockArr).map((stock) => (
    <StockListItem key={stock.symbol} name={stock.shortName} price={stock.regularMarketPrice.raw} percentChange={stock.regularMarketChangePercent.fmt} volume={stock.regularMarketVolume} />
  ));

  return (
  
    <div className='stats__row'>
      {parsedStocks}
    </div>
  )
    
}