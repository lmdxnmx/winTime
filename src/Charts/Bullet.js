import React from 'react';
import { Bullet } from '@consta/charts/Bullet';

const BulletChart = () => {
    const data = [
        { title: 'bullet1', ranges: [0,10,20,30,40,50,60,70,80,90,100], measures: [20, 30],target: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,85,90,95]  },
        { title: 'bullet2', ranges: [100], measures: [10, 50], target: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,85,90,95] },
        { title: 'bullet3', ranges: [100], measures: [30, 10, 10, 10],target: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,85,90,95]  },
        { title: 'bullet4', ranges: [100], measures: [30], target: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,85,90,95]  },
        { title: 'bullet5', ranges: [100], measures: [45],target: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,85,90,95]  },
      ];

  return (
    <Bullet
    data={data}
    measureField="measures"
    rangeField="ranges"
    targetField="target"
    xField="title"
    label={{
      measure: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    }}
  />

  );
};

export default BulletChart;