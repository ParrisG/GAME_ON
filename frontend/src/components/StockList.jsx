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
      <h1>I am StockList</h1>
      <div>
        <h2>Here is StockListItem:</h2>
        {parsedStocks}
      </div>
    </div>
  )
}