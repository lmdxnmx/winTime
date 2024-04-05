import React from 'react';
import { Column } from '@consta/charts/Column';

const ColumnChart = () => {
  const data = [
    {
      name: 'group1',
      month: '09.01.2024',
      value: 15,
      hour:0,
      color:"#23421"
    },
    {
      name: 'group1',
      month: '09.01.2024',
      value: 23,
      hour:0,
      color:""
    },
    {
      name: 'group1',
      month: '09.01.2024',
      value: 62,
      hour:0,
      color:"2"
    },
    
    // Добавьте остальные данные
    {
      name: 'group1',
      month: '08.01.2024',
      value: 28.8,
      hour:8,
       color:"#C00"
    },
    {
      name: 'group1',
      month: '07.01.2024',
      value: 100,
      hour:16,
      color:"#F00"
    },
    {
      name: 'group1',
      month: '06.01.2024',
      value: 28.8,
      hour:24,
       color:"#fff"
    },
  ];

  return (
    <Column
      data={data}
      xField="month"
      yField="value"
      seriesField='color'
      isStack
      legend={false} // Убираем легенду
      yAxis={{
        label: {
          formatter: (v) => `${(v / 100) * 100}%`, // Приводим значения к процентам от максимального значения (28.8)
        },
      }}

    />
  );
};

export default ColumnChart;