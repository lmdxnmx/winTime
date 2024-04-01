import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
function App() {
  const data = [{ type: "Break" }, { type: "Succ" }, { type: "Hold" }, { type: "Stop" }, { type: "No-usage" }]
  const filterData = data.filter((i) => i.data !== 0)
  return (
    <Theme preset={presetGpnDefault}>
      <div className="App">
        <Header />
        <SideBar />
        <div className="content">
          <div className="chartContainer">
            <div className="donutContainer">
              <h3 style={{ fontSize: 11 }}>Загрузка всех станков</h3>
              <DonutChart />
            </div>
            <div className="lineContainer">
              <div style={{ display: 'flex' }}>
                <div className='lineCategory' style={{cursor:'pointer'}}><span style={{color:"#00203399", fontSize:20}}>+</span></div>
       
                <div style={{ backgroundImage: "linear-gradient(to right, #32CD32 6px, transparent 6px)" }} className='lineCategory'>Работало</div>
                <div style={{ backgroundImage: "linear-gradient(to right, #FF6347 6px, transparent 6px)" }} className='lineCategory'>Авария</div>
                <div style={{ backgroundImage: "linear-gradient(to right, #FFBE0080 6px, transparent 6px)" }} className='lineCategory'>Не работало</div>
                <div style={{ backgroundImage: "linear-gradient(to right, #4682B4 6px, transparent 6px)" }} className='lineCategory'>Обслуживание</div>
              </div>
              <LineChart />
            </div>
          </div>
          <TableConsta />
        </div>
      </div>
    </Theme>
  );
}

export default App;
