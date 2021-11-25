import { useContext } from "react";
import StockListItem from "./StockListItem";
import { stockArrContext } from '../providers/StockArrProvider';



export default function StockList(props) {
  const { stockArr } = useContext(stockArrContext);
  
  const parsedStocks = (stockArr).map((stock) => (
    <StockListItem key={stock.symbol} name={stock.shortName} price={stock.regularMarketPrice.raw} percentChange={stock.regularMarketChangePercent.fmt} volume={stock.regularMarketVolume} />
  ));

  return (
    <div>
      <h1>Stocks</h1>
      <div>
        {parsedStocks}
      </div>
    </div>
  )
}