import React, { useEffect, useState } from 'react';
import VerticalProgressBar from '../CommonComponents/VerticalProgressBar';
import './Stats.css';
import axios from 'axios';

const StatWork = ({ changeData = null }) => {
  const today = new Date();
  const year = today.getFullYear();
  const dayQuery = String(today.getDate()).padStart(2, '0');
  const monthQuery = String(today.getMonth() + 1).padStart(2, '0');
  let currentDate = `${year}-${monthQuery}-${dayQuery}`;
  const [finishData, setFinishData]= useState([]);
  const [allStates, setAllStates] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_QUERY_MAIN}workers`, {
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        }
      });
      const usersData = response.data.users;
      const updatedUsers = await Promise.all(usersData.map(async (user) => {
        const userWorkTime = await fetchUserWorkTime(user.username);
        const userWorkState = await fetchUsersState(user.username);
        return { ...user, time: userWorkTime, states: userWorkState, userStateData: [] };
      }));
      setAllStates(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserWorkTime = async (username) => {
    let newDate = currentDate;
    let newStartTime = '00:00';
    let newFinishTime = '23:59';
    if (changeData !== null) {
      if (changeData.date !== null) {
        const dateObj = new Date(changeData.date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        newDate = `${year}-${month}-${day}`;
      }
      if (changeData.startTime !== null) {
        newStartTime = changeData.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      if (changeData.finishTime !== null) {
        newFinishTime = changeData.finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QUERY_MAIN}worker/${username}/worktime?from=${newDate}T${newStartTime}&to=${newDate}T${newFinishTime}`,
        {
          headers: {
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const fetchUsersState = async (username) => {
    let newDate = currentDate;
    let newStartTime = '00:00';
    let newFinishTime = '23:59';
    if (changeData !== null) {
      if (changeData.date !== null) {
        const dateObj = new Date(changeData.date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        newDate = `${year}-${month}-${day}`;
      }
      if (changeData.startTime !== null) {
        newStartTime = changeData.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      if (changeData.finishTime !== null) {
        newFinishTime = changeData.finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QUERY_MAIN}worker/${username}/machines?from=${newDate}T${newStartTime}&to=${newDate}T${newFinishTime}`,
        {
          headers: {
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const fetchStateData = async (slug) => {
    let newDate = currentDate;
    let newStartTime = '00:00';
    let newFinishTime = '23:59';
    if (changeData !== null) {
      if (changeData.date !== null) {
        const dateObj = new Date(changeData.date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        newDate = `${year}-${month}-${day}`;
      }
      if (changeData.startTime !== null) {
        newStartTime = changeData.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      if (changeData.finishTime !== null) {
        newFinishTime = changeData.finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QUERY_MAIN}machine/${slug}/online?from=${newDate}T${newStartTime}&to=${newDate}T${newFinishTime}`,
        {
          headers: {
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const updateAllStates = async () => {
    const updatedUsers = await Promise.all(
      allStates.map(async (user) => {
        if (user.states && user.states.machines) {
          const machinesData = await Promise.all(
            user.states.machines.map(async (machine) => {
              const machineData = await fetchStateData(machine.slug);
              return { ...machine, ...machineData };
            })
          );
          return { ...user, userStateData: machinesData };
        }
        return user;
      })
    );
    setFinishData(updatedUsers);
  };
  useEffect(() => {
    if (allStates.length > 0) {
      updateAllStates();
    }
  }, [allStates]);
 useEffect(()=>{
  console.log(finishData)
 },[finishData])
 let totalTime = 0;
 const transformData = (data) => {
  if (!data) return []
  totalTime = 0
  const transformedData = Object.keys(data).map((key) => {
    const time = data[key]?.time?.toFixed(2)
    totalTime += parseFloat(time) || 0
    return {
      value: time,
      color: '#FFF',
      backColor: data[key]?.color,
      id: key
    }
  })
  return transformedData
}

const progressBarData = transformData(!finishData.time)

  return (
    <div className='statWorkContainer'>
      <div style={{textAlign:"left"}} className='changesContainer'>
        <span className='statMesName'>Статистика работников</span>
      </div>
      <div style={{display:"flex",flexWrap:"wrap"}}>
       {finishData.map((i)=>{
        return(
          <div className='changesContainerWork'>
          <div className='titleWork'>
                  <div style={{display:'flex',flexDirection:"column",borderBottom: "1px solid #00416633",marginBottom:8}}><span>{i.fullname}</span>
                  <span style={{fontWeight:400}}>{i.username}</span>
                  <span style={{fontWeight:700,marginBottom:8}}>0.9 %</span>
                  </div>
                  <VerticalProgressBar width={"70%"} data={progressBarData}/>
                </div>
                {i.userStateData?.map((j)=>{
                  return(
                    <div className='infoWork'>
                  <div className='infoWorkTitle'><span>{j.name}</span></div>
                  <div className="wrapperCategory"><span>Статус</span><span style={{color:"#FFBE00"}}>{j.state}</span></div>
                  <div className="wrapperCategory"><span>Текущий цикл</span><span>3 892 шт.</span></div>
                  <div className="wrapperCategory"><span>Задание в МК</span><span>5 000 шт.</span></div>
                  <div className="wrapperCategory"><span>ВР. тек. цикла</span><span>45.6 с.</span></div>
                  <div className="wrapperCategory"><span>Циклов за см.</span><span>4000</span></div>
                  <div className="wrapperCategory"><span>Название ПФ</span><span>Vilka 257-03</span></div>
                  <div className="wrapperCategory"><span>Наработка ПФ</span><span>128 ч.</span></div>
                </div>
                  )
                })}
                </div>
        )
       })}
        </div>
    </div>  )
}

export default StatWork