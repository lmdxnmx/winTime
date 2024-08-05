import React, { useState, useEffect } from 'react';
import { Column } from '@consta/charts/Column';
import axios from 'axios';

const ColumnChart = ({ changeData, type }) => {
  const [data, setData] = useState([]);

  const fetchUsersState = async () => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${day}.${month}`;
      dates.push({ date: formattedDate, queryDate: `${month}-${day}` });
    }

    let combinedData = [];

    for (const { date, queryDate } of dates) {
      const newStartTime = '00:00';
      const newFinishTime = '23:59';

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_QUERY_MAIN}machines/worktime?from=2022-${queryDate}T${newStartTime}&to=2025-${queryDate}T${newFinishTime}&type=${type}`,
          {
            headers: {
              'access-control-allow-origin': '*',
              'access-control-allow-credentials': 'true'
            }
          }
        );
        const result = Object.keys(response.data).map(key => ({
          key: key,
          type: type,
          date: date,
          ...response.data[key]
        }));

        combinedData = [...combinedData, ...result];
      } catch (error) {
        console.error(error);
      }
    }

    setData(combinedData);
  };

  useEffect(() => {
    fetchUsersState();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Column
      data={data}
      xField="date"
      yField="time"
      seriesField="color"
      color={({ color }) =>{ return color}}
      isStack
      legend={false} // Убираем легенду
    />
  );
};

export default ColumnChart;
