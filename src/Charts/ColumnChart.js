import React, { useState, useEffect } from 'react';
import { Column } from '@consta/charts/Column';
import axios from 'axios';

const ColumnChart = ({ changeData, type, startDate, finishDate, newQueryFlag }) => {
  const [data, setData] = useState([]);

  const fetchUsersState = async () => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= new Date(finishDate)) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${day}.${month}`;
      dates.push({ date: formattedDate, queryDate: `${year}-${month}-${day}` });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    let combinedData = [];

    for (const { date, queryDate } of dates) {
      const newStartTime = '00:00';
      const newFinishTime = '23:59';

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_QUERY_MAIN}machines/worktime?from=${queryDate}T${newStartTime}&to=${queryDate}T${newFinishTime}&type=${type}`,
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
       console.log(response)
        combinedData = [...combinedData, ...result];
      } catch (error) {
        console.error(error);
      }
    }

    setData(combinedData);
  };

  useEffect(() => {
    fetchUsersState();
    console.log("query")
  }, [newQueryFlag]);

  return (
    <Column
      data={data}
      xField="date"
      yField="time"
      seriesField="color"
      color={({ color }) => color}
      isStack
      legend={false} // Убираем легенду
    />
  );
};

export default ColumnChart;
