import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale, TimeScale
} from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, TimeScale);

const LineChartForTable = ({ categoriesColor, data }) => {

 

  const categoriesToTypeColors = (categories) => {
    const colorMap = {};
    categories.forEach(category => {
      colorMap[category.label] = category.color;
    });
    return colorMap;
  };

  const colorMap = categoriesToTypeColors(categoriesColor);

  const chartData = {
    labels: [...new Set(data.map(item => item.Date))],
    datasets: categoriesColor.map(category => ({
      label: category.label,
      data: data
        .filter(item => item.type === category.label)
        .map(item => item.scales),
      borderColor: category.color,
      fill: false
    }))
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        time: {
          unit: 'minute',
          stepSize: 30,
          displayFormats: {
            minute: 'HH:mm'
          }
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 20
        }
      },
      y: {
        display: true,
        title: {
          display: false,
          text: 'Value'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
          labelColor: function (context) {
            return {
              backgroundColor: colorMap[context.dataset.label], // используйте цвет для кружочка
              borderRadius:5
            };
          }
        }
      }
    }
  };
  

  return (
    <>
      {data.length > 0 && (
        <div style={{ height: "100%", width: "100%", marginTop: 10 }}>
          <Line data={chartData} options={options} />
        </div>
      )}
    </>
  );
};

export default LineChartForTable;
