import logo from './logo.svg';
import './App.css';
import ProgressBar from './ProgressBar/ProgressBar';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import Table from './Table/Table';
import { DonutChart } from './Charts/DonutChart';
import { LineChart } from './Charts/LineChart';
function App() {
  const data = [{type:"Break"},{type:"Succ"},{type:"Hold"},{type:"Stop"},{type:"No-usage"}]
  const filterData = data.filter((i)=>i.data !== 0)
  return (
    <div className="App">
      <Header/>
      <SideBar/>
      <div className="content">
        <div className="chartContainer">
        <div className="donutContainer">
          <h3 style={{fontSize:11}}>Загрузка всех станков</h3>
          <DonutChart/>
          </div>
          <div className="lineContainer">
            <div style={{display:'flex'}}>
              <div style={{  backgroundImage: "linear-gradient(to right, #32CD32 6px, transparent 6px)"}} className='lineCategory'>Работало</div>
              <div style={{  backgroundImage: "linear-gradient(to right, #FF6347 6px, transparent 6px)"}} className='lineCategory'>Авария</div>
              <div style={{  backgroundImage: "linear-gradient(to right, #FFBE0080 6px, transparent 6px)"}} className='lineCategory'>Не работало</div>
              <div style={{  backgroundImage: "linear-gradient(to right, #4682B4 6px, transparent 6px)"}} className='lineCategory'>Обслуживание</div>
              </div>
          <LineChart/>
          </div>
          </div>
        <Table/>
      </div>
    </div>
  );
}

export default App;
