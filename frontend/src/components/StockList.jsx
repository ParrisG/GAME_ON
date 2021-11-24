import { useContext } from "react";
import StockListItem from "./StockListItem";
import { stockArrContext } from '../providers/StockArrProvider';
import '../css/StockList.module.css'
import { Card,Container} from "react-bootstrap";


export default function StockList(props) {
  const { stockArr } = useContext(stockArrContext);
  
  const parsedStocks = (stockArr).map((stock) => (
    <StockListItem key={stock.symbol} name={stock.shortName} price={stock.regularMarketPrice.raw} percentChange={stock.regularMarketChangePercent.fmt} volume={stock.regularMarketVolume} />
  ));

  return (

    <div>
    <Container>
    <div>
      <h1>stocks</h1>
      </div>
      <div>
        {parsedStocks}
      </div>
   
    </Container>
    </div>
  )
}