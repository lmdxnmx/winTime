import React, { useState, useRef, useEffect } from 'react'
import SwitchButtons from '../CommonComponents/SwitchButtons'
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DatePicker } from '@consta/uikit/DatePicker';
  import { Table } from '@consta/uikit/Table';
  import ColumnChart from '../Charts/ColumnChart';
import { DonutChartOnline } from './../Charts/DonutChartOnline';
import ColumnChart2 from '../Charts/ColumnChart2';
import Bullet from '../Charts/Bullet';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Modal } from '@consta/uikit/Modal';
import ss from "./../TableItem/TableItem.module.css"
import ProgressBarTags from '../ProgressBar/PrograssBarTags';
import axios from 'axios';
import { ReportTableStates } from '../Report/ReportTableStates';
import { ReportTableTags } from '../Report/ReportTableTags';
import s from "./../TableItem/TableItem.module.css"
import Calendar from "./../images/Calendar.svg"

const ReportsPage = () => {
  const [typeVal, setTypeVal] = useState([{ name: "Отчет по загрузке", active: true, size: 16 }, { name: "Выполненные операции", active: false, size: 16 }, { name: "Анализ тегов", active: false, size: 16 },{ name: "Учет инструментов", active: false, size: 16 }])
  const [dateValue, setDateValue] = useState(null);
  const [dateFinishValue, setDateFinishValue] = useState(null);
  const [newQueryFlag, setNewQueryFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [timeStart, setTimeStart] = useState(null);
  const [timeFinish, setTimeFinish] = useState(null);
  const [timesIsView, setTimesIsView] = useState(false);
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  let currentDate = `${year}-${month}-${day}`;
  const dayQeary = String(today.getDate()).padStart(2, '0');
  const monthQearu = String(today.getMonth() + 1).padStart(2, '0');
  const [minDate, setMinDate] = useState(new Date(year, month, day));
  const [maxDate, setMaxDate] = useState(new Date(year, month, day));
  const [fetchNewData, setFetchNewData] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [graphType, setGraphType] = useState([{type:"column", name:"Вертикальный график",active:true, id:1},{type:'row', name:'Горизонтальный график',active:false, id:2}])
  const [data, setData] =useState([{
    color: "#FF8C00",
    percent: 10,
  },
  { color: "#32CD32", percent: 35 }])
  const [isOpenChanges, setIsOpenChanges] = useState(false);
  const [isOpenMachines, setIsOpenMachines] = useState(false);
  const refDropType = useRef(null)
  const refDropMachines = useRef(null);
  const refDropChanges = useRef(null);
  const [machines, setMachines] = useState([]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refDropMachines.current && !refDropMachines.current.contains(event.target)) {
        setIsOpenMachines(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refDropChanges.current && !refDropChanges.current.contains(event.target)) {
        setIsOpenChanges(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const [rows, setRows] = useState([
    {
      object: 'Дегтярев П.А',
      date: '09.01.2024',
      nagr: "6,6839",
      work:"124230",
      start:"5435,35",
      broke:"342,42",
      startCont:"12342",
      nagrCont:"124230",
      workon:"342,55",
      brokeCont:"0",
      off:"0"
    },
    {
      object: 'Дегтярев П.А',
      date: '09.01.2024',
      nagr: "6,6839",
      work:"124230",
      start:"5435,35",
      broke:"342,42",
      startCont:"12342",
      nagrCont:"124230",
      workon:"342,55",
      brokeCont:"0",
      off:"0"
    },
    {
      object: 'Дегтярев П.А',
      date: '09.01.2024',
      nagr: "6,6839",
      work:"124230",
      start:"5435,35",
      broke:"342,42",
      startCont:"12342",
      nagrCont:"124230",
      workon:"342,55",
      brokeCont:"0",
      off:"0"
    },
    {
      object: 'Дегтярев П.А',
      date: '09.01.2024',
      nagr: "6,6839",
      work:"124230",
      start:"5435,35",
      broke:"342,42",
      startCont:"12342",
      nagrCont:"124230",
      workon:"342,55",
      brokeCont:"0",
      off:"0"
    },
    {
      object: 'Дегтярев П.А',
      date: '09.01.2024',
      nagr: "6,6839",
      work:"124230",
      start:"5435,35",
      broke:"342,42",
      startCont:"12342",
      nagrCont:"124230",
      workon:"342,55",
      brokeCont:"0",
      off:"0"
    },
    {
      object: 'Дегтярев П.А',
      date: '09.01.2024',
      nagr: "6,6839",
      work:"124230",
      start:"5435,35",
      broke:"342,42",
      startCont:"12342",
      nagrCont:"124230",
      workon:"342,55",
      brokeCont:"0",
      off:"0"
    },
    {
      object: 'Дегтярев П.А',
      date: '09.01.2024',
      nagr: "6,6839",
      work:"124230",
      start:"5435,35",
      broke:"342,42",
      startCont:"12342",
      nagrCont:"124230",
      workon:"342,55",
      brokeCont:"0",
      off:"0"
    },
    {
      object: 'Дегтярев П.А',
      date: '09.01.2024',
      nagr: "6,6839",
      work:"124230",
      start:"5435,35",
      broke:"342,42",
      startCont:"12342",
      nagrCont:"124230",
      workon:"342,55",
      brokeCont:"0",
      off:"0"
    },
  ]);
  const columns = [
    {
      title: 'ОБЪЕКТ',
      accessor: 'object',
      align: 'left',
      sortable: true,
      width:130
    },
    {
      title: 'ДАТА',
      accessor: 'date',
      align: "center",
      sortable: true,
      width:122,
    },
    {
      title: 'ПОД НАГР...',
      accessor: 'nagr',
      align: "center",
      sortable: true,
      width:130

    },
    {
      title: 'РАБОТА ...',
      accessor: 'work',
      align: "center",
      sortable: true,
      width:130
    },
    {
      title: 'ВКЛЮЧЕН',
      accessor: 'start',
      align: "center",
      sortable: true,
      width:130,
      fontSize:10
    },
    {
      title: 'АВАРИЙН..',
      accessor: 'broke',
      align: "center",
      sortable: true,
      width:130
    },
    {
      title: 'ВКЛЮЧЕН..',
      accessor: 'startCont',
      align: "center",
      sortable: true,
      width:130
    },
    {
      title: 'ПОД НАГР..',
      accessor: 'nagrCont',
      align: "center",
      sortable: true,
      width:130
    },
    {
      title: 'РАБОТА ПО..',
      accessor: 'workon',
      align: "center",
      sortable: true,
      width:130
    },
    {
      title: 'АВАРИЙН..',
      accessor: 'brokeCont',
      align: "center",
      sortable: true,
      width:130
    },
    {
      title: 'ВЫКЛЮЧЕН',
      accessor: 'off',
      align: "center",
      sortable: true,
      width:130
    },
  ];

  
  const fetchDataForChange = async (change) => {


  };
  useEffect(()=>{
    if(typeVal[2].active === true){
      fetchDataForChange()
    }
  },[typeVal])
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_QUERY_MAIN}machines`)
      .then(response => {
        setMachines(response?.data?.machines);
        console.log(response?.data.machines)
      })
      .catch(error => {
        console.error('Ошибка при получении машин:', error);
      });
  }, []);
  return (
    <div>
      <h1 className='title'>Отчеты</h1>
      <div style={{width:"35%"}}>
        <SwitchButtons val={typeVal} setVal={setTypeVal} />
      </div>

      {typeVal[0].active &&<>
      {graphType[0].active === true && <> <div className={s.filterTable}>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Тип графика</span>
      <DropDownMenu refs={refDropType} width={352}
label={"Все графики"}
 isOpen={isOpenMachines}
          setIsOpen={setIsOpenMachines}
          type={graphType}
          setType={setGraphType}
         />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Дата начала</span>
        <div style={{ position: "relative" }}>
          <DatePicker style={{ width: 118 }} className={s.datePicker} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateValue} onChange={setDateValue} maxDate={maxDate} />
          <img style={{ position: "absolute", top: '37.5%', right: "22%" }} src={Calendar} width={10} height={10} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Дата конца</span>
        <div style={{ position: "relative" }}>
          <DatePicker style={{ width: 118 }} className={s.datePicker} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateFinishValue} onChange={setDateFinishValue} />
          <img style={{ position: "absolute", top: '37.5%', right: "22%" }} src={Calendar} width={10} height={10} />
        </div>
      </div>
    
     
      {(dateValue !== null || timeStart !== null || timeFinish !== null) &&
        <div style={{ backgroundColor: "#4682B4", display: 'flex', marginTop: 'auto', height: '32px', borderRadius: "10px", width: '60px', justifyContent: 'center', alignItems: 'center' }} onClick={() => {
          setNewQueryFlag(!newQueryFlag)
        }}>
          <span style={{ fontSize: 14, color: 'white', padding: 8, textAlign: 'center', fontWeight: 700 }}>OK</span>
        </div>}
    </div>
      <div className='columnContainer'>
        <h1 className='title' style={{marginBottom:32}}>Группа 1</h1>
        <ColumnChart changeData={null} type={"lathe"} startDate={dateValue} finishDate={dateFinishValue} newQueryFlag={newQueryFlag}/>
      </div>
      <div className='columnContainer'>
        <h1 className='title' style={{marginBottom:32}}>Группа 2</h1>
        <ColumnChart changeData={null} type={"milling"} startDate={dateValue} finishDate={dateFinishValue} newQueryFlag={newQueryFlag}/>
      </div>
      </>}
      {graphType[1].active === true && 
      <div>
        <Modal isOpen={openModal}
      hasOverlay
      onClickOutside={() => setOpenModal(false)}
      onEsc={() => setOpenModal(false)}
    >
      <div style={{ height: "182px", width: 450,paddingLeft:"24px",paddingRight:"24px" }}>
        <h3>Холостой ход</h3>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>Период времени</span>
        <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>07:38-08:43</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>Программа</span>
        <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>Xty-peo344</span>
        </div>
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data.loadDay} date={[data.start, data.finish]}/>
       
          </div>
          </div>
        </div></Modal>
        <div>
          <ReportTableStates graphType={graphType} setGraphType={setGraphType}  setData={setData} machines={machines} setOpenModal={setOpenModal} />
          </div></div>}
      </>}
      {typeVal[1].active &&<>
      {/* <div className='columnContainer' style={{display:'flex'}}>
        <div style={{display:'flex',flexDirection:'column',width:'33%',height:"250px",margin:"auto 0"}}>
          <span style={{color:"#323E48",fontSize:14, fontWeight:600,paddingBottom:8}}>Все операции</span>
          <DonutChartOnline/></div>
          <div style={{display:'flex',flexDirection:'column',width:'33%',height:"250px",margin:"auto 0"}}>
          <span style={{color:"#323E48",fontSize:14, fontWeight:600,paddingBottom:8}}>Завершенные</span>
          <DonutChartOnline/></div>
          <div style={{display:'flex',flexDirection:'column',width:'33%',height:"250px",margin:"auto 0"}}>
          <span style={{color:"#323E48",fontSize:14, fontWeight:600,paddingBottom:8}}>Незавершенные</span>
          <DonutChartOnline/>
          </div>
      </div> */}
      <Modal isOpen={openModal}
      hasOverlay
      onClickOutside={() => setOpenModal(false)}
      onEsc={() => setOpenModal(false)}
    >
      <div style={{ height: "182px", width: 450,paddingLeft:"24px",paddingRight:"24px" }} onClick={() => setOpenModal(true)}>
        <h3>Холостой ход</h3>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>Период времени</span>
        <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>07:38-08:43</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>Программа</span>
        <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>Xty-peo344</span>
        </div>
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data.loadDay} date={[data.start, data.finish]}/>
      
          </div>
          </div>
        </div></Modal>
        <div>
        <ReportTableTags setData={setData} machines={machines} setOpenModal={setOpenModal}/>
          </div>
      </>}
      {typeVal[2].active && <>
           <Modal isOpen={openModal}
           hasOverlay
           onClickOutside={() => setOpenModal(false)}
           onEsc={() => setOpenModal(false)}
         >
           <div style={{ height: "182px", width: 450,paddingLeft:"24px",paddingRight:"24px" }} onClick={() => setOpenModal(true)}>
             <h3>Холостой ход</h3>
             <div style={{display:'flex',justifyContent:'space-between'}}>
             <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>Период времени</span>
             <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>07:38-08:43</span>
             </div>
             <div style={{display:'flex',justifyContent:'space-between'}}>
             <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>Программа</span>
             <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>Xty-peo344</span>
             </div>
             <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>
     
               <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
               <ProgressBar label={data.loadDay} date={[data.start, data.finish]}/>
           
               </div>
               </div>
             </div></Modal>
             <div>
             <ReportTableTags setData={setData} machines={machines} setOpenModal={setOpenModal}/>
               </div>
               </>
          }
      {typeVal[3].active && <div className='columnContainer'>
        <ColumnChart2/>
      </div>}
      <div style={{width:"95%"}}>
    <Table size="s" zebraStriped='odd' rows={rows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} width={"100%"}/>
    </div>
    </div>
  )
}

export default ReportsPage