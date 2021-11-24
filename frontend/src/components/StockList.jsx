import { useContext } from "react";
import StockListItem from "./StockListItem";
import { stockArrContext } from '../providers/StockArrProvider';


export default function StockList(props) {
  const { stockArr } = useContext(stockArrContext);
  console.log(stockArr);

  return (
    <div>
      <h1>I am StockList</h1>
      <div>
        <h2>Here is StockListItem:</h2>
        <StockListItem />
      </div>
    </div>
  )
}