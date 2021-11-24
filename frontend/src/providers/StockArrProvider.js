import { createContext, useState } from 'react';

export const stockArrContext = createContext();

export default function StockArrProvider(props) {
  const [stockArr, setStockArr] = useState([]);

  const stockArrData = { stockArr, setStockArr };

  return (
    <stockArrContext.Provider value={stockArrData}>
      {props.children}
    </stockArrContext.Provider>
  );
};
