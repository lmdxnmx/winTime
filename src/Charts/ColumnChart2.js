import React from 'react';
import { Column } from '@consta/charts/Column';

const ColumnChart2 = () => {
  const data = [
    {
      name: 'group1',
      month: 'ПФ22',
      value: 15,
      hour:0,
    },
    {
      name: 'group1',
      month: 'ПФ23',
      value: 23,
      hour:0,
    },
    {
      name: 'group1',
      month: 'ПФ24',
      value: 62,
      hour:0,
    },
    
    // Добавьте остальные данные
    {
      name: 'group1',
      month: 'ПФ25',
      value: 28.8,
      hour:8,
    },
    {
      name: 'group1',
      month: 'ПФ26',
      value: 100,
      hour:16,
    },
    {
      name: 'group1',
      month: 'ПФ27',
      value: 28.8,
      hour:24,
    },
    {
      name: 'group1',
      month: 'ПФ28',
      value: 28.8,
      hour:24,
    },
  ];

  return (
    <Column
      data={data}
      xField="month"
      yField="value"
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

export default ColumnChart2;