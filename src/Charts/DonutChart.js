import React,{useState,useEffect} from 'react';
import { Pie } from '@consta/charts/Pie';
import { Text } from '@consta/uikit/Text';
import { useThemeVars } from '@consta/uikit/useThemeVars';

export const DonutChart = ({value}) => {
  const [data,setData] = useState([
    { name: 'DOOSAN 2700LY',type:"Работало", value: 27, },
    { name: 'DOOSAN 2600LY',type:"Авария", value: 25 },
    { name: 'DOOSAN 2700L', type:"Не работало",value: 18 },
    { name: 'DOOSAN 2600L', type:"Обслуживание",value: 15 },
    { name: 'DOOSAN 2500LY',type:"Необоснованный простой", value: 10 },
    { name: 'DOOSAN 2500L', type:"Поломка инструмента",value: 5 },
    { name: 'DOOSAN 2500L', type:"Ручной режим инструмента",value: 0 },
  ]);

  function sum(array) {
    if (!array) {
      return '0';
    }
    let s = 0;
    for (const item of array) {
      s += item.value;
    }
    return s.toString();
  }

  const vars = useThemeVars();

  // Массив цветов, которые вы хотите использовать
  const colors = ['#32CD32', '#FF8C00', '#FFD700', '#4682B4', '#FF69B4', '#008B8B', '#FF8C00'];

  return (
    <Pie
      style={{
        width: "100%",
        height: '100%',
      }}
      data={data}
      angleField="value"
      seriesField="type"
      colorField={"name"}
      color={colors}
      legend={false}
      radius={1}
      statistic={{
        title: {
          formatter: () => `${sum(data)}%`,
          style: {
            marginTop: "10px",
            fontSize: "14px",
            fontWeight: 600
          }
        },
        content: {
          customHtml: (v, v2, v3, v4) => (
            <span style={{ fontSize: 0 }}>{sum(data)}%</span>
          ),
        },
      }}
      innerRadius={0.5}
      tooltip={{
        domStyles: {
          'g2-tooltip': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '4px',
            padding: '0px',
            width: "165px",
          },
          'g2-tooltip-list': {
            margin: 0,
            padding: 0,
            listStyleType: 'none',
            width: "100%",
            height: '100%'
          },
          'g2-tooltip-list-item': {
            color: '#FFFFFF',
            fontSize: '12px',
            margin: '6px 0px 6px',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            width: "100%",
            height: '100%',
            boxSizing: "border-box",
            paddingLeft: "6px",
            paddingRight: "6px"
          },
          'g2-tooltip-name': {
            fontSize: '12px',
            fontWeight: 600
          },
          'g2-tooltip-value': {
            fontSize: '12px',
            fontWeight: 500,
          },
          'g2-tooltip-marker': {
            width: '14px',
            height: '14px',
          },
          'g2-tooltip-title': {
            margin: 0
          }
        }
      }}
      label={false}
    />
  );

}
