import React,{useState} from 'react'
import {TableConsta} from './../Table/TableConsta';
import { DonutChart } from './../Charts/DonutChart';
import { LineChart } from './../Charts/LineChart';
import "./Pages.css"
import CategoryChoose from './../CategoryChoose/CategoryChoose';
const MainPage = () => {
  const [categoriesColor,setCategoriesColors] = useState([
    { label: "Работало",color:"#32CD32" ,active: true, id: 1 }, 
    { label: "Авария",color:"#FF8C00", active: true, id: 2 },
    { label: "Не работало",color:"#FFD700", active: true, id: 3 },
    { label: "Обслуживание",color:"#4682B4", active: true, id: 4 },
    { label: "Необоснованный простой",color:"#FF69B4", active: false, id: 5 },
    { label: "Поломка инструмента",color:"#008B8B", active: false, id: 6 },
    { label: "Ручной режим инструмента",color:"#FF8C00", active: false, id: 7 },
]); 
  return (
    <>
    <h1 className="title">Общая статистика</h1>
    <div className="chartContainer">
      <div className="donutContainer">
        <h3 style={{ fontSize: 11 }}>Загрузка всех станков</h3>
        <DonutChart categoriesColor={categoriesColor} />
      </div>
      <div className="lineContainer">
    <CategoryChoose value={categoriesColor} setValue={setCategoriesColors}/>
        
        <LineChart categoriesColor={categoriesColor} />
      </div>
    </div>
    <TableConsta />
  </>
  )
}

export default MainPage