import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
    display:false,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];

export const data = {
    labels,
    datasets: [
      {
        label: 'Работало',
        data: generateRandomData(),
        borderColor: '#32CD32',
        backgroundColor: '#32CD32',
      },
      {
        label: 'Обслуживание',
        data: generateRandomData(),
        borderColor: '#4682B4',
        backgroundColor: '#4682B4',
      },
      {
        label: 'Авария',
        data: generateRandomData(),
        borderColor: '#FF6347',
        backgroundColor: '#FF6347',
      },
      {
        label: 'Не работало',
        data: generateRandomData(),
        borderColor: '#FFBE0080',
        backgroundColor: '#FFBE0080',
      },
    ],
  };
  
  function generateRandomData() {
    // Генерируем случайные данные для каждого месяца
    const newData = [];
    for (let i = 0; i < labels.length; i++) {
      newData.push(Math.floor(Math.random() * 200)); // Пример генерации случайного числа от -1000 до 1000
    }
    return newData;
  }
  

export const LineChart = () => {
  return <div style={{height:110,flex:1}}><Line options={options} data={data} /></div>;
}
