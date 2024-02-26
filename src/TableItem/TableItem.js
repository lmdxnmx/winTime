import React from 'react'
import s from "./TableItem.module.css"
import ProgressBar from '../ProgressBar/ProgressBar'
const TableItem = ({title,serial,programm,loadDay,sum,loadPercentage}) => {
  return (
    <div className={s.itemCointainer}>
      <div className={`${s.cell} ${s.title_cell}`}><span>{title}</span></div>
      <div className={`${s.cell} ${s.serial_cell}`}><span>{serial}</span></div>
      <div className={`${s.cell} ${s.programm_cell}`}><span>{programm}</span></div>
      <div className={`${s.cell} ${s.progress_cell}`}><ProgressBar label={loadDay}/>
      <div className={s.load_time}>
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>
      </div>
      <div className={`${s.cell} ${s.sum_cell}`}><span>{sum}</span></div>
      <div className={`${s.cell} ${s.loadPercentage_cell}`}><span>{`${loadPercentage}%`}</span></div>
    </div>
  )
}

export default TableItem