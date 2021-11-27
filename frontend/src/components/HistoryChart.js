import {useRef, useEffect} from "react";
import { historyOptions } from "./chartConfig/chartConfigs";

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
  const chartRef = useRef();

  useEffect(()=> {

    if(chartRef && chartRef.current){
        const chartInstance = new Chart(chartRef.current, {
          type: 'line',
          data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                  label: '# of Votes',
                  data: [{x:1,y:15},{x:2,y:12},{x:3,y:25}],
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
  },[])

  return(
    <div className="bg-white border mt-2 rounded p-3">
      <div></div>
      <div>
        <canvas id="myChart" ref={chartRef} width="200" height="200"></canvas>
      </div>
    </div>
  )
}