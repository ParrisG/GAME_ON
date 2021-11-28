import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

import StockNewsListItem from "./StockNewsListItem";
//import { Prev } from "react-bootstrap/esm/PageItem";

export default function StockNewsList(props) {
  const [stockNews, setStockNews] = useState([]);
  let param = useParams();
  let news = [];


  const getNewsList = () => {
    return {
      method: 'POST',
      url: 'https://yh-finance.p.rapidapi.com/news/v2/list',
      params: {region: 'US', snippetCount: '5', s: param.ticker},
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
      
      const streamArr = response.data.data.main.stream;
      
      setStockNews(streamArr);

    })
    .catch(function (error) {
      console.error(error);
    })
  }, []);

  news = (stockNews).map((stream) => {
    const publishedDate = stream.content.pubDate;
    const difference = new Date().getTime() - new Date(publishedDate).getTime();
    const minutesDifference = Math.floor(difference / 1000 / 60);
    let duration = minutesDifference + 'minutes';
    if(minutesDifference > 59 && minutesDifference < 1440){
      const hoursDifferences = Math.floor(difference / 1000 / 60 / 60);
      duration = hoursDifferences + 'hours';
    } else if(minutesDifference > 1440){
      const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
      duration = daysDifference + 'day';
    }
    let hasThumbnail = stream.content.thumbnail;
    let thumbnail;
    if(!hasThumbnail){
      thumbnail = 'https://dbdzm869oupei.cloudfront.net/img/vinylrugs/preview/32155.png';
    } else {
      thumbnail = hasThumbnail.resolutions[1].url;
    }

    if(stream.content){
      return <StockNewsListItem 
      key={stream.id} 
      title={stream.content.title} 
      uuid={stream.id} 
      thumbnail={thumbnail}
      provider={stream.content.provider.displayName}
      duration={duration}
      />
    } else {
      return (
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      )
    }
  })

  return (
    <div>{news}</div> 
  )
}