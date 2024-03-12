import React from 'react';
import { Line } from '@consta/charts/Line';
const data = [
  {
    Date: '00:00',
    scales: 250,
  },
  // ...
  {
    Date: '04:00',
    scales: 150,
  },
  {
    Date:"08:00",
    scales:100,
  },
  {
    Date:"12:00",
    scales:0,
  },
  {
    Date:"16:00",
    scales:130
  },
  {
    Date:"20:00",
    scales:40
  },
  {
    Date:'23:59',
    scales:60
  }
];
export const LineChart = () => {
  return <Line style={{width:'100%',height:"80%",marginTop:10}} fill={"#000"} data={data} xField="Date" yField="scales"/>;
}
