import React, { useEffect } from 'react'
import VerticalProgressBar from '../CommonComponents/VerticalProgressBar'
import "./Stats.css"
import axios from 'axios'
const StatMeas = () => {
  const today = new Date()
  const year = today.getFullYear()
  const dayQeary = String(today.getDate()).padStart(2, '0')
  const monthQearu = String(today.getMonth() + 1).padStart(2, '0')
  let currentDate = `${year}-${monthQearu}-${dayQeary}`

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_QUERY_MAIN}machines/worktime?from=2023-01-01T00:00&to2025-01-01T00:00:00&type=lathe`, {
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        }
      })
     console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{},[
    fetchData()
  ])
  return (
    <div className='statMesContainer'>
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
            <VerticalProgressBar width={"70%"} data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]} />
          </div>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]} />
          </div>
        </div>
      <span className='changesName'>2 смена</span>
        <div className='barsWrapper'>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]} />
          </div>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]} />
          </div>
        </div>
      <span className='changesName'>1 смена</span>
        <div className='barsWrapper'>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]} />
          </div>
          <div className='barChanger'>
            <span>75%</span>
            <VerticalProgressBar width={"70%"} data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]} />
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default StatMeas