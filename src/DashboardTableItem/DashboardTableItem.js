import React, { useEffect,useState } from 'react'
import s from './DashboardTableItem.module.css'
import VerticalProgressBar from '../CommonComponents/VerticalProgressBar'
import axios from 'axios'
const DashboardTableItem = ({name, username, changeData}) => {
const [data,setData] = useState(null)
const today = new Date();
const year = today.getFullYear();
const dayQeary = String(today.getDate()).padStart(2, '0');
const monthQearu = String(today.getMonth() + 1).padStart(2, '0');
let currentDate = `${year}-${monthQearu}-${dayQeary}`;


const fetchNewData = async () => {
  let newDate = currentDate;
  let newStartTime = "00:00";
  let newFinishTime = "23:59";
  if(changeData !== null){
  if (changeData.date !== null) {
    const dateObj = new Date(changeData?.date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    newDate = `${year}-${month}-${day}`;
  }
  if (changeData.startTime !== null) {
    newStartTime = changeData?.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (changeData.finishTime !== null) {
    newFinishTime = changeData?.finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }}
  try {
    const response = await axios.get(`http://192.168.1.109:8000/worker/${username}/worktime?from=${newDate}T${newStartTime}&to=${newDate}T${newFinishTime}`, {
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
      }
    })
    console.log(response)
    setData(response?.data)
  } catch (error) {
    console.error(error);
  }
};
useEffect(()=>{
    fetchNewData();
},[changeData])


const transformData = (data) => {
  if (!data) return [];
  
  return Object.keys(data).map((key) => {
    let color;
    switch (key) {
      case 'off':
        color = '#FF8C00';
        break;
      case 'on':
        color = '#32CD32';
        break;
      case 'work':
        color = '#1E90FF';
        break;
      default:
        color = '#000000';
    }
    return {
      value: data[key]?.toFixed(2),
      color: '#FFF',
      backColor: color,
      id: key
    };
  });
};
useEffect(()=>{
  console.log(data)
},[data])
const progressBarData = transformData(data);
  return (
    <div className={s.itemContainer}>
        <span className={s.itemName}>{name}</span>
        {/* <span className={s.itemPercent}>75%</span> */}
        <div className={s.barsWrapper}>
           <VerticalProgressBar width={"40%"} data={[{value:450, color:"#000000",backColor:"#CFD7DD",id:1}]}/>
           <VerticalProgressBar width={"40%"} data={progressBarData}/>
        </div>
    </div>
  )
}

export default DashboardTableItem