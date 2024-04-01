import React from 'react';
import { Pie } from '@consta/charts/Pie';
import { Text } from '@consta/uikit/Text';
import { useThemeVars } from '@consta/uikit/useThemeVars';

export const DonutChart = () => {
  const data = [
    { type: 'DOOSAN 2700LY', value: 27 },
    { type: 'DOOSAN 2600LY', value: 25 },
    { type: 'DOOSAN 2700L', value: 18 },
    { type: 'DOOSAN 2600L', value: 15 },
    { type: 'DOOSAN 2500LY', value: 10 },
    { type: 'DOOSAN 2500L', value: 5 },
  ];

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

  return (
    <Pie
      style={{
        width: "100%",
        height: '100%',
      }}
      data={data}
      angleField="value"
      colorField="type"
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
