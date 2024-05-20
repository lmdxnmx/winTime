import React, { useState, useEffect } from 'react';
import { Pie } from '@consta/charts/Pie';
import axios from 'axios';

export const DonutChart = ({ categoriesColor, dateValue }) => {
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  let currentDate = `${year}-${month}-${day}`;

  useEffect(() => {
    setIsDataReady(false);
    const fetchData = async () => {
      if (dateValue !== null) {
        const dateObj = new Date(dateValue);
        year = dateObj.getFullYear();
        month = String(dateObj.getMonth() + 1).padStart(2, '0');
        day = String(dateObj.getDate()).padStart(2, '0');
        currentDate = `${year}-${month}-${day}`;
      }

      if (categoriesColor.length > 0) {
        const initialData = categoriesColor.map(color => ({
          type: color.label,
          slug: color.slug,
          value: 0
        }));

        const slugs = categoriesColor.map(category => category.slug);

        try {
          const response = await axios.post(`http://192.168.1.109:8000/machines/pie-view/`, {
            "machines": ["all"],
            "states": slugs,
            "from": `${currentDate}T00:00`,
            "to": `${currentDate}T23:59`
          }, {
            headers: {
              'access-control-allow-origin': '*',
              'access-control-allow-credentials': 'true',
            }
          });

          const serverData = response?.data?.percents;

          const updatedData = initialData.map(item => {
            const updatedValue = item.slug && serverData[item.slug] !== undefined
              ? parseFloat(serverData[item.slug].toFixed(2))
              : item.value;
            return {
              ...item,
              value: updatedValue
            };
          });

          const filteredData = updatedData.filter(object => {
            const category = categoriesColor.find(category => category.label === object.type);
            return category && category.active;
          });

          setData(filteredData);
          setIsDataReady(true);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
    };

    fetchData();
  }, [categoriesColor, dateValue]);

  const sum = (array) => {
    if (!array) return '0';
    let s = 0;
    for (const item of array) {
      s += item.value;
    }
    const result = s ? s.toFixed(2) : "0";
    return result.endsWith('.00') ? parseInt(result).toString() : result;
  };

  const categoriesToTypeColors = (categories) => {
    const typeColors = {};
    categories.forEach(category => {
      typeColors[category.label] = category.color;
    });
    return typeColors;
  };

  const typeColors = categoriesToTypeColors(categoriesColor);

  return (
    <>
      {isDataReady && data.length > 0 && (
        <Pie
          style={{
            width: "100%",
            height: '100%',
          }}
          data={data}
          angleField="value"
          seriesField="slug"
          colorField={"type"}
          color={({ type }) => typeColors[type]}
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
                width: "100%",
                height: '100%'
              },
              'g2-tooltip-list-item': {
                color: '#FFFFFF',
                fontSize: '10px',
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
                fontSize: '10px',
                fontWeight: 600
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
                margin: 0
              }
            }
          }}
          label={false}
        />
      )}
    </>
  );
}
