import React, { useEffect, useState } from 'react'
import VerticalProgressBar from '../CommonComponents/VerticalProgressBar'
import "./Stats.css"
import axios from 'axios'
const StatMeas = ({dataOk, setDataOk}) => {
  const [dataLathe, setDataLathe] = useState([])
  const [dataMilling, setDataMilling] = useState([])
  const today = new Date()
  const year = today.getFullYear()
  const dayQeary = String(today.getDate()).padStart(2, '0')
  const monthQearu = String(today.getMonth() + 1).padStart(2, '0')
  let currentDate = `${year}-${monthQearu}-${dayQeary}`

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QUERY_MAIN}machines/worktime?from=2022-01-01T00:00:00&to=2025-01-01T23:59:59&type=lathe`,
        {
          headers: {
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
          }
        }
      );
      const result = Object.keys(response.data).map(key => ({
        key: key,
        type: "lathe",
        color:"#FFF",
        backColor:response.data[key].color,
        value:response.data[key].time?.toFixed(0),
      }));
      setDataLathe(result)
    } catch (error) {
      console.error(error)
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QUERY_MAIN}machines/worktime?from=2022-01-01T00:00:00&to=2025-01-01T23:59:59&type=milling`,
        {
          headers: {
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
          }
        }
      );
      const result = Object.keys(response.data).map(key => ({
        key: key,
        type: "milling",
        color:"#FFF",
        backColor:response.data[key].color,
        value:response.data[key].time?.toFixed(0),
      }));
      setDataMilling(result)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    fetchData()
  },[]
  )
  useEffect(()=>{
    console.log(dataLathe, dataMilling)
  },[dataLathe, dataMilling])
  return (
    <div className='statMesContainer'>
      {dataOk === true && 
      <>
      <div style={{textAlign:"left"}} className='changesContainer'>
        <span className='statMesName'>Статистика станков</span>
      </div>
      <div className='changesContainer'>
        <div className='changesWrapper'>
        <div className='barsWrapper'>
          <div className='barChanger'>
            <span style={{color:"#000",fontSize:14, fontWeight:600}}>ТОКАРНЫЕ</span>
          </div>
          <div className='barChanger'>
            <span style={{color:"#000",fontSize:14, fontWeight:600}}>ФРЕЗЕРНЫЕ</span>
          </div>
        </div>
      <span className='changesName'>3 смена</span>
        <div className='barsWrapper'>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={dataLathe} />
          </div>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={dataMilling} />
          </div>
        </div>
      <span className='changesName'>2 смена</span>
      <div className='barsWrapper'>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={dataLathe} />
          </div>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={dataMilling} />
          </div>
        </div>
      <span className='changesName'>1 смена</span>
      <div className='barsWrapper'>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={dataLathe} />
          </div>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={dataMilling} />
          </div>
        </div>
      </div>
      </div>
      </>}
    </div>
  )
}

export default StatMeas