import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale, TimeScale
} from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, TimeScale);

const LineChart = ({ categoriesColor, dateValue, dataTableIsLoading, changes }) => {
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
            const response = await axios.post(`${process.env.REACT_APP_QUERY_MAIN}machines/horizontal-view`, {
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
            const generateHalfHourIntervals = (startHour, endHour) => {
              const times = [];
              for (let hour = startHour; hour <= endHour; hour++) {
                times.push(`${String(hour).padStart(2, '0')}:00`);
                times.push(`${String(hour).padStart(2, '0')}:30`);
              }
              return times;
            };

            let times = [];
            if (change.id === 1) {
              times = generateHalfHourIntervals(0, 7);
              times.push('08:00');
            } else if (change.id === 2) {
              times = generateHalfHourIntervals(8, 15);
              times.push('16:00');
            } else if (change.id === 3) {
              times = generateHalfHourIntervals(16, 23);
              times.push('23:59');
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

  const chartData = {
    labels: [...new Set(data.map(item => item.Date))],
    datasets: categoriesColor.map(category => ({
      label: category.label,
      data: data
        .filter(item => item.type === category.label)
        .map(item => item.scales),
      borderColor: category.color,
      fill: false
    }))
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        time: {
          unit: 'minute',
          stepSize: 30,
          displayFormats: {
            minute: 'HH:mm'
          }
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 20
        }
      },
      y: {
        display: true,
        title: {
          display: false,
          text: 'Value'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
          labelColor: function (context) {
            return {
              backgroundColor: colorMap[context.dataset.label], // используйте цвет для кружочка
              borderRadius:5
            };
          }
        }
      }
    }
  };
  

  return (
    <>
      {isDataReady && data.length > 0 && dataTableIsLoading === true && (
        <div style={{ height: "76%", width: "100%", marginTop: 10 }}>
          <Line data={chartData} options={options} />
        </div>
      )}
    </>
  );
};

export default LineChart;
