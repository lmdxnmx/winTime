import React, { useEffect, useState } from 'react';
import { Pie } from '@consta/charts/Pie';
import axios from 'axios';

export const DonutChartOnline = ({ pieData, slugs }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (pieData && pieData.percents) {
      const transformedData = Object.keys(pieData.percents).map((key) => ({
        type: key,
        value: pieData.percents[key],
      }));
      setData(transformedData);
    }
  }, [pieData]);

  const categoriesToTypeColors = (cat) => {
    const typeColors = {};
    cat.forEach((category) => {
      typeColors[category.slug] = category.color;
    });
    return typeColors;
  };

  const sum = (array) => {
    if (!array) return '0';
    let s = 0;
    for (const item of array) {
      s += item.value;
    }
    const result = s ? s.toFixed(2) : '0';
    return result.endsWith('.00') ? parseInt(result).toString() : result;
  };

  const typeColors = categoriesToTypeColors(slugs);

  return (
    <>
      <Pie
        style={{
          width: '100%',
          height: '100%',
        }}
        data={data}
        angleField="value"
        colorField="type"
        color={({ type }) =>typeColors[type]} // Если цвет не указан, используем черный
        legend={false}
        radius={1}
        statistic={{
          title: {
            formatter: () => `${sum(data)}%`,
            style: {
              marginTop: '10px',
              fontSize: '14px',
              fontWeight: 600,
            },
          },
          content: {
            customHtml: () => (
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
            },
            'g2-tooltip-list': {
              margin: 0,
              padding: 0,
              listStyleType: 'none',
              width: '100%',
              height: '100%',
            },
            'g2-tooltip-list-item': {
              color: '#FFFFFF',
              fontSize: '10px',
              margin: '6px 0px 6px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'nowrap',
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              paddingLeft: '6px',
              paddingRight: '6px',
            },
            'g2-tooltip-name': {
              fontSize: '10px',
              fontWeight: 600,
            },
            'g2-tooltip-value': {
              fontSize: '10px',
              fontWeight: 500,
            },
            'g2-tooltip-marker': {
              minWidth: '14px',
              minHeight: '14px',
            },
            'g2-tooltip-title': {
              margin: 0,
            },
          },
        }}
        label={false}
      />
    </>
  );
};
