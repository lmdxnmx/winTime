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
  const [changes, setChanges] = useState([{
    change:"1 смена",
    startTime: "00:00:00",
    finishTime:"07:59:59",
    id:1,
    active:true
  },{
    change:"2 смена",
    startTime: "00:08:00",
    finishTime:"15:59:59",
    id:2,
    active:true
  },{
    change:"3 смена",
    startTime: "16:00:00",
    finishTime:"23:59:59",
    id:3,
    active:true
  }])
  const [isLoading, setIsLoading] = useState(true);
  const [dataTableIsLoading, setDataTableIsLoading] = useState(false)
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
      Promise.all(
        machines.map(async mach => {
          try {
            const response = await axios.get(`http://192.168.1.109:8000/machine/${mach.slug}/all-states`);
            const newStates = response.data.states;
            return newStates.map(newState => ({
              label: newState.name,
              color: newState.color,
              active: true,
              id: newState.id,
              slug: newState.slug
            }));
          } catch (error) {
            console.error(error);
            return [];
          }
        })
      ).then(statesArray => {
        const combinedStates = statesArray.flat(); // Combine states from all responses
        setCategoriesColors(prevState => {
          const updatedState = [...prevState];
          combinedStates.forEach(newState => {
            if (!updatedState.some(item => item.label === newState.label)) {
              updatedState.push(newState);
            }
          });
          return updatedState;
        });
      
      }).then(()=> {
        setIsLoading(false)});
    }
  }, [machines]);
  


  return (
    <>
      <h1 className="title">Общая статистика</h1>
      <div className="chartContainer">
        <div className="donutContainer">
          <h3 style={{ fontSize: 11 }}>Загрузка всех станков</h3>
          {!isLoading && (
            <DonutChart setChanges={setChanges} changes={changes} dataTableIsLoading={dataTableIsLoading} dateValue={dateValue} categoriesColor={categoriesColor} />
          )}
        </div>
        <div className="lineContainer">
          {!isLoading &&<CategoryChoose setChanges={setChanges} changes={changes} dateValue={dateValue} setDateValue={setDateValue} value={categoriesColor} setValue={setCategoriesColors} />}
          {!isLoading && (
            <LineChart setChanges={setChanges} changes={changes} dataTableIsLoading={dataTableIsLoading} dateValue={dateValue} categoriesColor={categoriesColor} />
          )}
        </div>
      </div>
      {!isLoading && (<TableConsta setDataTableIsLoading={setDataTableIsLoading} machines={machines} />)}
    </>
  );
};

export default MainPage;
