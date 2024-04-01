import React,{useState} from 'react';
import { Line } from '@consta/charts/Line';
import { useEffect } from 'react';

export const LineChart = ({categoriesColor}) => {
  
  const breakingObjects = [  {
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
  },]
  const workingObjects = [
    { Date: '00:00', scales: 0, type: "Работало" },
    { Date: '04:00', scales: 120, type: "Работало" },
    { Date: '08:00', scales: 150, type: "Работало" },
    { Date: '12:00', scales: 200, type: "Работало" },
    { Date: '16:00', scales: 80, type: "Работало" },
    { Date: '20:00', scales: 120, type: "Работало" },
    { Date: '23:59', scales: 100, type: "Работало" }
];

const downtimeObjects = [
    { Date: '00:00', scales: Math.floor(Math.random() * 200), type: "Не работало" },
    { Date: '04:00', scales: Math.floor(Math.random() * 200), type: "Не работало" },
    { Date: '08:00', scales: Math.floor(Math.random() * 200), type: "Не работало" },
    { Date: '12:00', scales: Math.floor(Math.random() * 200), type: "Не работало" },
    { Date: '16:00', scales: Math.floor(Math.random() * 200), type: "Не работало" },
    { Date: '20:00', scales: Math.floor(Math.random() * 200), type: "Не работало" },
    { Date: '23:59', scales: Math.floor(Math.random() * 200), type: "Не работало" }
];

const toolBreakageObjects = [
    { Date: '00:00', scales: Math.floor(Math.random() * 200), type: "Поломка инструмента" },
    { Date: '04:00', scales: Math.floor(Math.random() * 200), type: "Поломка инструмента" },
    { Date: '08:00', scales: Math.floor(Math.random() * 200), type: "Поломка инструмента" },
    { Date: '12:00', scales: Math.floor(Math.random() * 200), type: "Поломка инструмента" },
    { Date: '16:00', scales: Math.floor(Math.random() * 200), type: "Поломка инструмента" },
    { Date: '20:00', scales: Math.floor(Math.random() * 200), type: "Поломка инструмента" },
    { Date: '23:59', scales: Math.floor(Math.random() * 200), type: "Поломка инструмента" }
];

const manualModeObjects = [
    { Date: '00:00', scales: Math.floor(Math.random() * 200), type: "Ручной режим инструмента" },
    { Date: '04:00', scales: Math.floor(Math.random() * 200), type: "Ручной режим инструмента" },
    { Date: '08:00', scales: Math.floor(Math.random() * 200), type: "Ручной режим инструмента" },
    { Date: '12:00', scales: Math.floor(Math.random() * 200), type: "Ручной режим инструмента" },
    { Date: '16:00', scales: Math.floor(Math.random() * 200), type: "Ручной режим инструмента" },
    { Date: '20:00', scales: Math.floor(Math.random() * 200), type: "Ручной режим инструмента" },
    { Date: '23:59', scales: Math.floor(Math.random() * 200), type: "Ручной режим инструмента" }
];
const downTimeModeObjects = [
    { Date: '00:00', scales: Math.floor(Math.random() * 200), type: "Необоснованный простой" },
    { Date: '04:00', scales: Math.floor(Math.random() * 200), type: "Необоснованный простой" },
    { Date: '08:00', scales: Math.floor(Math.random() * 200), type: "Необоснованный простой" },
    { Date: '12:00', scales: Math.floor(Math.random() * 200), type: "Необоснованный простой" },
    { Date: '16:00', scales: Math.floor(Math.random() * 200), type: "Необоснованный простой" },
    { Date: '20:00', scales: Math.floor(Math.random() * 200), type: "Необоснованный простой" },
    { Date: '23:59', scales: Math.floor(Math.random() * 200), type: "Необоснованный простой" }
];
const toolModeObjects = [   {
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
},]
const allData = [
  ...toolBreakageObjects,
  ...breakingObjects,
  ...toolModeObjects,
  ...downTimeModeObjects,
  ...downtimeObjects,
  ...manualModeObjects,
  ...workingObjects
];
const [data,setData] = useState([])
 useEffect(()=>{
  const newData = allData.filter(object=>{
    const category = categoriesColor.find(category => category.label === object.type)
    return category && category.active;
  })
  setData(newData)
 },[categoriesColor])
  const colorMap = {
    'Работало':'#32CD32',
    'Авария':'#FF8C00',
    'Не работало':'#FFD700',
    'Обслуживание':'#4682B4',
    'Необоснованный простой':'#FF69B4',
    'Поломка инструмента':'#008B8B',
    'Ручной режим инструмента':'#FF8C00'
  };
  return <Line legend={false} style={{ height: "76%", width: "100%", marginTop: 10 }} data={data} xField="Date" yField="scales" seriesField="type"
  lineStyle={({ type }) => {
    return {
      stroke: colorMap[type],
    };
  }}

  />;
}
