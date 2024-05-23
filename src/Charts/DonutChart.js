import React, { useState, useEffect } from 'react';
import { Pie } from '@consta/charts/Pie';
import axios from 'axios';
import { da } from 'date-fns/locale';

export const DonutChart = ({ categoriesColor, dateValue, dataTableIsLoading, changes }) => {
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    setIsDataReady(false);

    const fetchData = async () => {
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

      if (categoriesColor.length > 0) {
        const initialData = categoriesColor.map(color => ({
          type: color.label,
          slug: color.slug,
          value: 0
        }));

        const slugs = categoriesColor.map(category => category.slug);
        const activeChanges = changes.filter(change => change.active);

        try {
          let serverData = {};

          if (activeChanges.length === changes.length) {
            // Все смены активны, делаем один запрос на весь день
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

            serverData = response?.data?.percents || {};
          } else {
            // Проверяем комбинации активных смен
            const activeIds = activeChanges.map(change => change.id);

            let requests = [];
            if (activeIds.includes(1) && activeIds.includes(3) && !activeIds.includes(2)) {
              // Если активны только первая и третья смены, делаем два запроса
              requests = activeChanges.map(change => {
                const fromTime = `${currentDate}T${change.startTime}`;
                const toTime = `${currentDate}T${change.finishTime}`;
                return axios.post(`http://192.168.1.109:8000/machines/pie-view/`, {
                  "machines": ["all"],
                  "states": slugs,
                  "from": fromTime,
                  "to": toTime
                }, {
                  headers: {
                    'access-control-allow-origin': '*',
                    'access-control-allow-credentials': 'true',
                  }
                });
              });
            } else {
              // В остальных случаях делаем один запрос для смежных смен
              const fromTime = `${currentDate}T${activeChanges[0].startTime}`;
              const toTime = `${currentDate}T${activeChanges[activeChanges.length - 1].finishTime}`;
              requests = [
                axios.post(`http://192.168.1.109:8000/machines/pie-view/`, {
                  "machines": ["all"],
                  "states": slugs,
                  "from": fromTime,
                  "to": toTime
                }, {
                  headers: {
                    'access-control-allow-origin': '*',
                    'access-control-allow-credentials': 'true',
                  }
                })
              ];
            }

            const responses = await Promise.all(requests);

            serverData = responses.reduce((acc, response) => {
              const data = response?.data?.percents;
              for (const [key, value] of Object.entries(data)) {
                if (acc[key] !== undefined) {
                  acc[key] += value;
                } else {
                  acc[key] = value;
                }
              }
              return acc;
            }, {});
          }

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

    if (categoriesColor !== null) {
      fetchData();
    }
  }, [categoriesColor, dateValue, changes]);

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
  const filterChanges = changes.filter((i)=>i.active === true);
  const typeColors = categoriesToTypeColors(categoriesColor);

  return (
    <>
      {isDataReady && data.length > 0 && dataTableIsLoading === true && (
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
              formatter: () => `${filterChanges.length === 2 && changes[1].active === false ? sum(data)/2 : sum(data) }%`,
              style: {
                marginTop: "10px",
                fontSize: "14px",
                fontWeight: 600
              }
            },
            content: {
              customHtml: () => (
                <span style={{ fontSize: 0 }}>{filterChanges.length === 2 && changes[1].active === false ? sum(data)/2 : sum(data) }%</span>
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
};
