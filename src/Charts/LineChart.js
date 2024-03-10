import React from 'react';
import { Line } from '@consta/charts/Line';

const data = [
  {
    Date: '00:00',
    scales: 0,
    type: "Работало"
  },
  {
    Date: '04:00',
    scales: 120,
    type: "Работало"
  },
  {
    Date: '08:00',
    scales: 150,
    type: "Работало"
  },
  {
    Date: '12:00',
    scales: 200,
    type: "Работало"
  },
  {
    Date: '16:00',
    scales: 80,
    type: "Работало"
  },
  {
    Date: '20:00',
    scales: 120,
    type: "Работало"
  },
  {
    Date: '23:59',
    scales: 100,
    type: "Работало"
  },
  {
    Date: '00:00',
    scales: Math.floor(Math.random() * 200),
    type: "Не работало"
  },
  {
    Date: '04:00',
    scales: Math.floor(Math.random() * 200),
    type: "Не работало"
  },
  {
    Date: '08:00',
    scales: Math.floor(Math.random() * 200),
    type: "Не работало"
  },
  {
    Date: '12:00',
    scales: Math.floor(Math.random() * 200),
    type: "Не работало"
  },
  {
    Date: '16:00',
    scales: Math.floor(Math.random() * 200),
    type: "Не работало"
  },
  {
    Date: '20:00',
    scales: Math.floor(Math.random() * 200),
    type: "Не работало"
  },
  {
    Date: '23:59',
    scales: Math.floor(Math.random() * 200),
    type: "Не работало"
  },
  {
    Date: '00:00',
    scales: Math.floor(Math.random() * 200),
    type: "Обслуживание"
  },
  {
    Date: '04:00',
    scales: Math.floor(Math.random() * 200),
    type: "Обслуживание"
  },
  {
    Date: '08:00',
    scales: Math.floor(Math.random() * 200),
    type: "Обслуживание"
  },
  {
    Date: '12:00',
    scales: Math.floor(Math.random() * 200),
    type: "Обслуживание"
  },
  {
    Date: '16:00',
    scales: Math.floor(Math.random() * 200),
    type: "Обслуживание"
  },
  {
    Date: '20:00',
    scales: Math.floor(Math.random() * 200),
    type: "Обслуживание"
  },
  {
    Date: '23:59',
    scales: Math.floor(Math.random() * 200),
    type: "Обслуживание"
  },
  {
    Date: '00:00',
    scales: 120,
    type: "Авария"
  },
  {
    Date: '04:00',
    scales: 9,
    type: "Авария"
  },
  {
    Date: '08:00',
    scales: 42,
    type: "Авария"
  },
  {
    Date: '12:00',
    scales: 150,
    type: "Авария"
  },
  {
    Date: '16:00',
    scales: 32,
    type: "Авария"
  },
  {
    Date: '20:00',
    scales: 60,
    type: "Авария"
  },
  {
    Date: '23:59',
    scales: 200,
    type: "Авария"
  },
];

const colorMap = {
  'Работало':'#32CD32',
  'Авария':'#FF8C00',
  'Не работало':'#FFD700',
  'Обслуживание':'#4682B4',
};

export const LineChart = () => {
  return <Line legend={false} style={{ height: "76%", width: "100%", marginTop: 10 }} data={data} xField="Date" yField="scales" seriesField="type"
  lineStyle={({ type }) => {
    return {
      stroke: colorMap[type],
    };
  }}

  />;
}
