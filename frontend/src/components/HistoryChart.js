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
  console.log('props:',props.chart_time);
  console.log('propsX:',props.xAxis);
  console.log('propsY:',props.yAxis);

  useEffect(()=> {

    if(chartRef && chartRef.current){
        const chartInstance = new Chart(chartRef.current, {
          type: 'line',
          data: {
              labels: ["2015-03-15T13:03:00Z", "2015-03-25T13:02:00Z", "2015-04-25T14:12:00Z"],
              datasets: [{
                  label: '# of Votes',
                  data: [{
                    t: '2015-03-15T13:03:00Z',
                    y: 12
                  },
                  {
                    t: '2015-03-25T13:02:00Z',
                    y: 21
                  },
                  {
                    t: '2015-04-25T14:12:00Z',
                    y: 32
                  }
                ],
                  borderWidth: 1,
                  fill: true,
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgb(0,128,0)',
                  tension: 0.1
              }]
          },
          options: {
            scales: {
              xAxes: [{
                type: 'time',
              }]
            }
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