import React, { useEffect, useState } from 'react'
import s from './DashboardTableItem.module.css'
import VerticalProgressBar from '../CommonComponents/VerticalProgressBar'
import axios from 'axios'

const DashboardTableItem = ({ name, data }) => {

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

  const progressBarData = transformData(data)

  return (
    <div className={s.itemContainer}>
      <span className={s.itemName}>{name ?? ''}</span>
      <div className={s.barsWrapper}>
        {data !== null &&
        Object?.keys(data).length > 0 ?
          <>
            <VerticalProgressBar width={'40%'} data={[{ value: totalTime, color: '#000000', backColor: '#CFD7DD', id: 1 }]} />
            <VerticalProgressBar width={'40%'} data={progressBarData} />
          </>:<div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
          <span style={{textAlign:'center'}}>Данных нет</span>
          </div>
        }
      </div>
    </div>
  )
}

export default DashboardTableItem
