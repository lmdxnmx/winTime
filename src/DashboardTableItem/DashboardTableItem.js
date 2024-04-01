import React from 'react'
import s from './DashboardTableItem.module.css'
import VerticalProgressBar from '../CommonComponents/VerticalProgressBar'
const DashboardTableItem = () => {

  return (
    <div className={s.itemContainer}>
        <span className={s.itemName}>Дегтярев П.А</span>
        <span className={s.itemPercent}>75%</span>
        <div className={s.barsWrapper}>
           <VerticalProgressBar data={[{value:450, color:"#000000",backColor:"#CFD7DD",id:1}]}/>
           <VerticalProgressBar data={[{value:50, color:"#FFF",backColor:"#FF6347",id:1},{value:350, color:"#FFF",backColor:"#77CB10",id:2},{value:50, color:"#FFF",backColor:"#FF8C00", id:3}]}/>
        </div>
    </div>
  )
}

export default DashboardTableItem