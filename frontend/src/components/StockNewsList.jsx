import { useState, useEffect } from "react";
import axios from "axios";

import StockNewsListItem from "./StockNewsListItem";
import { Prev } from "react-bootstrap/esm/PageItem";

export default function StockNewsList(props) {
  const [stockNews, setStockNews] = useState([]);
  let news = [];


  const getNewsList = () => {
    return {
      method: 'POST',
      url: 'https://yh-finance.p.rapidapi.com/news/v2/list',
      params: {region: 'US', snippetCount: '5', s: 'AMZN'},
      headers: {
        'content-type': 'text/plain',
        'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
      },
      data: ''
    };
  };
  

  useEffect(() => {
   
    axios.request(getNewsList()).then(function (response) {
      
      console.log('Line 53:',response.data);
      //const title = response.data.data.main.stream[0].content.title;
      const streamArr = response.data.data.main.stream;
      
      console.log('Line 57:',streamArr);
      setStockNews(streamArr);

      console.log('stockNews : ', stockNews);

      
    })
    .catch(function (error) {
      console.error(error);
    })
  }, []);

  news = (stockNews).map((stream) => {
    console.log('Stream: ',stream)
    if(stream.content){
      return <StockNewsListItem key={stream.id} title={stream.content.title}/>
    }
    else{
      return <div>Loading</div>
    }
    
  })
  console.log('Stock here: ',stockNews);
  return (
    <div>{news}</div>
  )
}