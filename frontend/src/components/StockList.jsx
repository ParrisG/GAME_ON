import { useContext } from "react";
import StockListItem from "./StockListItem";
import { stockArrContext } from '../providers/StockArrProvider';
import './StockList.css';



export default function StockList(props) {
  const { stockArr } = useContext(stockArrContext);
  
  const parsedStocks = (stockArr).map((stock) => (
    <StockListItem key={stock.symbol} name={stock.shortName} symbol={stock.symbol} price={stock.regularMarketPrice.raw} percentChange={stock.regularMarketChangePercent.fmt} volume={stock.regularMarketVolume} />
  ));

  return (
    <div>
      
      <div className="stockdetails__container">
      <h1>Stocks In Play:</h1>
      <div className="stock__parsed">
        {parsedStocks}
      </div>
      </div>
    </div>
  )
}