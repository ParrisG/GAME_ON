import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import HistoryChart from "./HistoryChart";

export default function StockChart(props) {
  const [chart, setChart] = useState();
  let param = useParams();

  const getChartTime = (timestamp) =>{
    const date = new Date(timestamp * 1000);
    let h = date.getHours();
    let m = date.getMinutes();
    const x = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? '0'+m: m;
    const stockOpenTime= h + ':' + m + ' ' + x;
    //console.log('Time in :', stockOpenTime);
    return stockOpenTime;
  }

  const dayChartOptions = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-chart',
    params: {interval: '15m', symbol: param.ticker, range: '1d', region: 'US'},
    headers: {
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
      'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
    }
  };

  const weekChartOptions = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-chart',
    params: {interval: '1d', symbol: param.ticker, range: '5d', region: 'US'},
    headers: {
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
      'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
    }
  };

  const monthChartOptions = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-chart',
    params: {interval: '1d', symbol: param.ticker, range: '1mo', region: 'US'},
    headers: {
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
      'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
    }
  };

  const formatData = (range) =>{
    const timeStamp = range.data.chart.result[0].timestamp;
    const quoteOpen = range.data.chart.result[0].indicators.quote[0].open;
    const chartArr = [];
    for (let i = 0; i < timeStamp.length; i++){
      let chartData = {};
      const time = getChartTime(timeStamp[i]);
      //chartTimeArr.push(time);
      const quote = quoteOpen[i].toFixed(2);
      chartData[time] = quote;
      chartArr.push(chartData);
    }
    //console.log('Chart : ', chartArr);
    chartArr.map((elm)=> {
      //console.log(elm);
      const key = Object.keys(elm);
      //console.log('key=',key);
      //console.log('elm[key]=',elm[key]);

      return {t:key, y:elm[key]}

      //return {t:elm}
    })
  }

  useEffect(() => {
    const fetchData = async() =>{
      const[day, week, month] = await Promise.all([
        axios.request(dayChartOptions), axios.request(weekChartOptions), axios.request(monthChartOptions)
      ])
     
      const dayData = formatData(day);
      console.log('DAyData: ', dayData);

      // const weekData = formatData(week);
      // console.log('Week: ', weekData);

      // const monthData = formatData(month);
      // console.log('Month: ', monthData);
    }

    fetchData();
     
  }, []);

  return (
    <div>
      <HistoryChart/>
    </div>
  )
}
