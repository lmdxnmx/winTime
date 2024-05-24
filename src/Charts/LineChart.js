import React, { useState, useEffect } from 'react';
import { Line } from '@consta/charts/Line';
import axios from 'axios';

export const LineChart = ({ categoriesColor, dateValue, dataTableIsLoading, changes }) => {
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsDataReady(false);

      let today = new Date();
      let year = today.getFullYear();
      let month = String(today.getMonth() + 1).padStart(2, '0');
      let day = String(today.getDate()).padStart(2, '0');
      let currentDate = `${year}-${month}-${day}`;

      if (dateValue !== null) {
        const dateObj = new Date(dateValue);
        year = dateObj.getFullYear();
        month = String(dateObj.getMonth() + 1).padStart(2, '0');
        day = String(dateObj.getDate()).padStart(2, '0');
        currentDate = `${year}-${month}-${day}`;
      }

      if (categoriesColor && categoriesColor.length > 0) {
        const slugs = categoriesColor.map(category => category.slug);
        const activeChanges = changes.filter(change => change.active);

        try {
          let serverData = {};

          const fetchDataForChange = async (change) => {
            const intervalTimes = generateTimesForChange(change);
            const response = await axios.post(`http://192.168.1.109:8000/machines/horizontal-view`, {
              "machines": ["all"],
              "states": slugs,
              "times": intervalTimes.map(time => `${currentDate}T${time}`)
            }, {
              headers: {
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true',
              }
            });
            return response.data.times;
          };

          const generateTimesForChange = (change) => {
            let times = [];
            if (change.id === 1) {
              times = ['00:00:00', '04:00:00', '08:00:00'];
            } else if (change.id === 2) {
              times = ['08:00:00', '12:00:00', '16:00:00'];
            } else if (change.id === 3) {
              times = ['16:00:00', '20:00:00', '23:59:59'];
            }
            return times;
          };

          const processData = (rawData) => {
            const combinedData = {};
            rawData.forEach((changeData) => {
              Object.entries(changeData).forEach(([timestamp, values]) => {
                if (!combinedData[timestamp]) {
                  combinedData[timestamp] = values;
                } else {
                  for (const [key, value] of Object.entries(values)) {
                    combinedData[timestamp][key] = (combinedData[timestamp][key] || 0) + value;
                  }
                }
              });
            });

            // Удаление дубликатов временных меток
            const uniqueTimestamps = [...new Set(Object.keys(combinedData))].sort();
            const filteredData = {};
            uniqueTimestamps.forEach((timestamp) => {
              filteredData[timestamp] = combinedData[timestamp];
            });

            return filteredData;
          };

          const activeChangePromises = activeChanges.map(fetchDataForChange);
          const rawData = await Promise.all(activeChangePromises);

          serverData = processData(rawData);

          const newAllData = categoriesColor.flatMap(category => {
            return Object.keys(serverData).map(time => ({
              Date: time.split(' ')[1],
              scales: serverData[time]?.[category.slug],
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

    if (categoriesColor !== null) {
      fetchData();
    }
  }, [categoriesColor, dateValue, changes]);

  const categoriesToTypeColors = (categories) => {
    const colorMap = {};
    categories.forEach(category => {
      colorMap[category.label] = category.color;
    });
    return colorMap;
  };

  const colorMap = categoriesToTypeColors(categoriesColor);

  return (
    <>
      {isDataReady && data.length > 0 && dataTableIsLoading === true && (
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
