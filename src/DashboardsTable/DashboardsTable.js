import React,{useState} from 'react'
import SwitchButtons from '../CommonComponents/SwitchButtons'
import DashboardTableItem from '../DashboardTableItem/DashboardTableItem'
import s from "./DashboardsTable.module.css"
const DashboardsTable = () => {
  const [tableState,setTableState] = useState([{name:"Инфографика",active:true,size:12},{name:"Таблица",active:false,size:12}])
  return (
    <div className={s.tableDashboard}>
        <h1 className={s.title}>Токарные станки</h1>
        <SwitchButtons val={tableState} setVal={setTableState}/>
        <div className={s.itemWrapper}>
        <DashboardTableItem/>
        <DashboardTableItem/>
        <DashboardTableItem/>
        <DashboardTableItem/>
        <DashboardTableItem/>
        <DashboardTableItem/>
        </div>
        </div>
  )
}

export default DashboardsTable