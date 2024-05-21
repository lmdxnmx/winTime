import React, { useState, useEffect } from 'react';
import { Line } from '@consta/charts/Line';
import axios from 'axios';

export const LineChart = ({ categoriesColor, dateValue }) => {
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  let currentDate = `${year}-${month}-${day}`;
  const times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];

  useEffect(() => {
    const fetchData = async () => {
      setIsDataReady(false);
      if (dateValue !== null) {
        const dateObj = new Date(dateValue);
        year = dateObj.getFullYear();
        month = String(dateObj.getMonth() + 1).padStart(2, '0');
        day = String(dateObj.getDate()).padStart(2, '0');
        currentDate = `${year}-${month}-${day}`;
      }
      if (categoriesColor && categoriesColor.length > 0) {
        const slugs = categoriesColor.map(category => category.slug);

        try {
          const response = await axios.post(`http://192.168.1.109:8000/machines/horizontal-view`, {
            "machines": ["all"],
            "states": slugs,
            "times": times.map(time => `${currentDate}T${time}`)
          }, {
            headers: {
              'access-control-allow-origin': '*',
              'access-control-allow-credentials': 'true',
            }
          });

          const serverData = response.data.times;
          const newAllData = categoriesColor.flatMap(category => {
            return times.map(time => ({
              Date: time,
              scales: serverData[`${currentDate} ${time}:00`]?.[category.slug],
              type: category.label
            }));
          });

          const filteredData = newAllData.filter(object => {
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

  const categoriesToTypeColors = (categories) => {
    const colorMap = {};
    categories.forEach(category => {
      colorMap[category.label] = category.color;
    });
    return colorMap;
  };

  const colorMap = categoriesToTypeColors(categoriesColor);
  useEffect(()=>{
    console.log(data)
  },[data])
  return (
    <>
      {isDataReady && data.length > 0 && (
        <Line
          renderer='svg'
          legend={false}
          style={{ height: "76%", width: "100%", marginTop: 10, }}
          data={data}
          xField="Date"
          yField="scales"
          seriesField="type"
          
          lineStyle={({ type }) => ({
            stroke: colorMap[type],
          })}
          options={{
            maintainAspectRatio: false, 
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Value'
                }
              }
            }
          }}
          tooltip={{
            customContent: (title, items) => {
              return (
                `<div style="padding: 10px; display: flex; flex-direction: column;">
                  <div style="margin-bottom: 4px;"><strong>${title}</strong></div>
                  ${items.map(item => `
                    <div style="display: flex; align-items: center; width:200px; justify-content:space-between">
                      <div style="background-color: ${colorMap[item.name]}; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px;"></div>
                      <div style="flex: 1;">${item.name}</div>
                      <div style="margin-left:10px">${item.value}</div>
                    </div>
                  `).join('')}
                </div>`
              );
            },
          }}
          
          
          
        />
      )}
    </>
  );
};
