import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ProgressBar from './ProgressBar/ProgressBar';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import {TableConsta} from './Table/TableConsta';
import { DonutChart } from './Charts/DonutChart';
import { LineChart } from './Charts/LineChart';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import CategoryChoose from './CategoryChoose/CategoryChoose';
function App() {
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
    <Theme preset={presetGpnDefault}>
      <div className="App">
        <Header />
        <SideBar />
        <div className="content">
        <h1 className="title">Перечень и загрузка оборудования</h1>
          <div className="chartContainer">
            <div style={{height:160 +(40 * categoriesColor.filter((i)=>i.active === true).length)}} className="donutContainer">
              <h3 style={{ fontSize: 11 }}>Загрузка всех станков</h3>
              <DonutChart />
            </div>
            <div className="lineContainer" style={{height:160 +(40 * categoriesColor.filter((i)=>i.active === true).length)}}>
            <CategoryChoose value={categoriesColor} setValue={setCategoriesColors}/>
              <LineChart categoriesColor={categoriesColor}/>
            </div>
          </div>
          <TableConsta />
        </div>
      </div>
    </Theme>
  );
}

export default App;
