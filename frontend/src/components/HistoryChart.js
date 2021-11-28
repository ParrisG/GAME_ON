import {useRef, useEffect, useState} from "react";
import { Spinner,Container } from "react-bootstrap";
import { historyOptions } from "./chartConfig/chartConfigs";
import './HistoryChart.css'

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

export default function HistoryChart(props){
  const chartRef = useRef()
  const [isloading,setLoading]=useState(false)
  const gain = props.quote;
  const dates = props.time;
  const  drawChart = ()=>{
    if(chartRef && chartRef.current){
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Stocks',
                data: gain,
                borderWidth: 1,
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(0,128,0)',
                tension: 0.1
            }]
        },
        
        options: {
          ...historyOptions,
        },
    });
  }
  setLoading(true)

  }

  useEffect(()=> {

    setTimeout(()=>{
      drawChart();
    },3000)
  

  },[])

  return(
    <Container>
    {/* <div className="bg-white border mt-2 rounded p-3 chart__size"> */}
    <div className='chart__size'>
      
     
        {!isloading && <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
       <canvas id="myChart" ref={chartRef} width="250" height="250"></canvas>

    </div>
    </Container>
  )
}