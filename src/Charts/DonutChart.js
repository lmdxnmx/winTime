import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const options ={
    plugins:{
        legend:{
            display:false
        },
        
    }
}
const textCenter = {
    id:'textCenter',
    beforeDatasetsDraw(chart,args,pluginOptins){
        const {ctx,data} = chart;
        const sumOfData = data.datasets.reduce((total, dataset) => {
            return total + dataset.data.reduce((subTotal, value) => subTotal + value, 0);
          }, 0);
        ctx.save();
        ctx.font = '700 14px sans-serif';
        ctx.fillStyle = '#002033';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${sumOfData}%`, chart.getDatasetMeta(0).data[0].x,chart.getDatasetMeta(0).data[0].y)
    }
}
export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  legend:false,
  datasets: [
    {
      label: 'Что-то',
      data: [7, 3, 1, 1],
      backgroundColor: [
        '#32CD32',
        '#FF8C00',
        '#EB5757',
        '#12A8DD'
      ],
    },
  ],
};

export const DonutChart = () => {
  return <div style={{width:"102.44px"}}><Doughnut plugins={[textCenter]} data={data} options={options} /></div>
}
