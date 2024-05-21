import React, { useEffect, useState } from 'react';
import { TableConsta } from './../Table/TableConsta';
import { DonutChart } from './../Charts/DonutChart';
import { LineChart } from './../Charts/LineChart';
import "./Pages.css";
import CategoryChoose from './../CategoryChoose/CategoryChoose';
import axios from 'axios';

const MainPage = () => {
  const [categoriesColor, setCategoriesColors] = useState([]);
  const [machines, setMachines] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [machineTimeWork, setMachineTimeWork] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.109:8000/machines')
      .then(response => {
        setMachines(response?.data?.machines);
      })
      .catch(error => {
        console.error('Ошибка при получении машин:', error);
      });
  }, []);

  useEffect(() => {
    if (machines.length > 0) {
      (async () => {
        for (const mach of machines) {
          try {
            const response = await axios.get(`http://192.168.1.109:8000/machine/${mach.slug}/all-states`);
            const newStates = response.data.states;
            setCategoriesColors(prevState => {
              const updatedState = [...prevState];
              if (newStates.length > 0) {
                newStates.forEach(newState => {
                  if (!updatedState.some(item => item.label === newState.name)) {
                    updatedState.push({ label: newState.name, color: newState.color, active: true, id: newState.id, slug: newState.slug });
                  }
                });
              }
              return updatedState;
            });
          } catch (error) {
            console.error(error);
          }

          try {
            const response = await axios.get(`http://192.168.1.109:8000/machine/${mach.slug}/states/?from=2024-05-20T00:00&to=2024-05-20T23:59`);
            const newStates = response.data.states;
            setMachineTimeWork(prevState => {
              const updatedState = Array.isArray(prevState) ? [...prevState] : [];
              if (newStates.length > 0) {
                newStates.forEach(newState => {
                  updatedState.push({ time: Object.keys(newState), value: Object.values(newState), machine: mach.slug });
                });
              }
              return updatedState;
            });
          } catch (error) {
            console.error(error);
          }
        }
        setIsLoading(false);
      })();
    }
  }, [machines]);

  useEffect(() => {
    console.log(machineTimeWork);
  }, [machineTimeWork]);

  return (
    <>
      <h1 className="title">Общая статистика</h1>
      <div className="chartContainer">
        <div className="donutContainer">
          <h3 style={{ fontSize: 11 }}>Загрузка всех станков</h3>
          {!isLoading && (
            <DonutChart dateValue={dateValue} categoriesColor={categoriesColor} />
          )}
        </div>
        <div className="lineContainer">
          <CategoryChoose dateValue={dateValue} setDateValue={setDateValue} value={categoriesColor} setValue={setCategoriesColors} />
          {!isLoading && (
            <LineChart dateValue={dateValue} categoriesColor={categoriesColor} />
          )}
        </div>
      </div>
      {!isLoading && (<TableConsta machines={machines} />)}
    </>
  );
};

export default MainPage;
