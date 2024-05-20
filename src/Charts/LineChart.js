import React, { useState, useEffect } from 'react';
import { Line } from '@consta/charts/Line';
import axios from 'axios';

export const LineChart = ({ categoriesColor, dateValue }) => {
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  const times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];

  useEffect(() => {
    const fetchData = async () => {
      setIsDataReady(false);

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
  }, [categoriesColor, currentDate]);

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
          legend={false}
          style={{ height: "76%", width: "100%", marginTop: 10 }}
          data={data}
          xField="Date"
          yField="scales"
          seriesField="type"
          lineStyle={({ type }) => ({
            stroke: colorMap[type],
          })}
        />
      )}
    </>
  );
};
