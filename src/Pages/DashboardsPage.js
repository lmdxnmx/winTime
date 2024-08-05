import React, { useRef, useState, useEffect } from 'react'
import "./Pages.css"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DatePicker } from '@consta/uikit/DatePicker';
import DashboardsTable from '../DashboardsTable/DashboardsTable';
import SwitchButtons from '../CommonComponents/SwitchButtons';
import StatMeas from '../DashboardStatComponents/StatMeas';
import StatWork from '../DashboardStatComponents/StatWork';
import axios from "axios"
import Calendar from "./../images/Calendar.svg"
const DashboardsPage = () => {
  const [dateValue, setDateValue] = useState(null);
  const [timeStart, setTimeStart] = useState(null);
  const [timeFinish, setTimeFinish] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChanges, setIsOpenChanges] = useState(false);
  const [machineTimeWork, setMachineTimeWork] = useState([]);
  const [isOpenMachines, setIsOpenMachines] = useState(false);
  const refDropMachines = useRef(null);
  const refDropChanges = useRef(null);
  const [timesIsView, setTimesIsView] = useState(false);
  const timesRef = useRef();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth()).padStart(2, '0');
  const [dataOk, setDataOk] = useState(false)
  const [changes, setChanges] = useState([{
    change:"1 смена",
    startTime: "00:00:00",
    finishTime:"08:00:00",
    id:1,
    active:true
  },{
    change:"2 смена",
    startTime: "08:00:00",
    finishTime:"16:00:00",
    id:2,
    active:true
  },{
    change:"3 смена",
    startTime: "16:00:00",
    finishTime:"23:59:59",
    id:3,
    active:true
  }])
  const day = String(today.getDate() + 1).padStart(2, '0');
  const [minDate, setMinDate] = useState(new Date(year, month, day));
  const [maxDate, setMaxDate] = useState(new Date(year, month, day));
  const [rows, setRows] = useState([]);
  const [changeData, setChangeData] = useState(null);
  const [typeVal, setTypeVal] = useState([{ name: "Сотрудники", active: true, size: 16 }, { name: "Общий", active: false, size: 16 }])

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
  useEffect(() => {
    const filteredChanges = changes.filter((i) => i.active === true)
    console.log(filteredChanges[0]?.startTime?.split(":"))
    const startDate = new Date();
    const timeStartArray = filteredChanges[0]?.startTime?.split(":");
    startDate.setHours(timeStartArray[0]);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    const finishDate = new Date();
    const timeFinishArray = filteredChanges[filteredChanges.length - 1]?.finishTime?.split(":");
    finishDate.setHours(timeFinishArray[0]);
    if (timeFinishArray[0] === '23') {
      finishDate.setMinutes(59);
    } else {
      finishDate.setMinutes(0);
    }
    finishDate.setSeconds(0);
    setTimeStart(startDate)
    setTimeFinish(finishDate)
    setMaxDate(finishDate)
    setMinDate(startDate)
  }, [changes])
  useEffect(()=>{
    console.log(timeStart,minDate)
  },[timeStart, minDate])
  return (
    <>
      <h1 className='title'>Дашборд</h1>
      <div style={{width:173}}>
      <SwitchButtons val={typeVal} setVal={setTypeVal} />
      </div>
      <div className={'filterTable'}>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Оборудование</span>
        <DropDownMenu width={352}
          refs={refDropMachines}
          label={"Все станки"}
          isOpen={isOpenMachines}
          setIsOpen={setIsOpenMachines}
          rows={rows}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Дата</span>
        <div style={{ position: "relative" }}>
          <DatePicker style={{ width: 118 }} className={"datePicker"} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateValue} onChange={setDateValue} maxDate={maxDate} />
          <img style={{ position: "absolute", top: '37.5%', right: "22%" }} src={Calendar} width={10} height={10} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Смена</span>
        <DropDownMenu width={123} label={"Все смены"} refs={refDropChanges} isOpen={isOpenChanges} setIsOpen={setIsOpenChanges} changes={changes} setChanges={setChanges} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Время</span>
        <div ref={timesRef} style={{ width: 140, position: 'relative' }} className={"filterButton"}>
          <div
            style={{ position: 'relative' }}
            className={"filterLabel"}
            onClick={() => {
              setTimesIsView(!timesIsView);
            }}
          >
            {`${timeStart ? timeStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00'} - ${timeFinish ? timeFinish.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '23:59'
              }`}
            <img style={{ position: 'absolute', top: '35%', right: '5%' }} src={Calendar} width={10} height={10} />
          </div>

          <div className={"dropDown"} style={{ display: timesIsView === true ? "" : "none", }}>

            <div className={"dropDownItemChanges"}>
              <div><DatePicker style={{ width: 64, marginRight: 10, marginLeft: 0 }} className={"datePicker"} size="xs" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeStart} onChange={setTimeStart} minDate={minDate} maxDate={maxDate} /></div>
              <div> <DatePicker style={{ width: 64, margin: 0, padding: 0 }} className={"datePicker"} size="xs" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeFinish} onChange={setTimeFinish} minDate={minDate} maxDate={maxDate} /></div>
            </div>
          </div>

        </div>

      </div>
      {(dateValue !== null || timeStart !== null || timeFinish !== null) &&
        <div style={{ backgroundColor: "#4682B4", display: 'flex', marginTop: 'auto', height: '32px', borderRadius: "10px", width: '60px', justifyContent: 'center', alignItems: 'center' }} onClick={() => {

          setChangeData({date:dateValue, startTime: timeStart, finishTime:timeFinish})
        }}>
          <span style={{ fontSize: 14, color: 'white', padding: 8, textAlign: 'center', fontWeight: 700 }}>OK</span>
        </div>}
    </div>
      {typeVal[0].active &&
      <div className='dashboardsWrapper'>
      <DashboardsTable changeData={changeData} name={"Токарные станки"} />
      {/* <DashboardsTable name={"Фрезерные станки"}/> */}
      </div>}
     {typeVal[1].active &&
     <div className='statWrapper'>
        <StatMeas dataOk={dataOk} setDataOk={setDataOk}/>
        <StatWork dataOk={dataOk} setDataOk={setDataOk}/>
     </div>
     }
    </>
  )
}

export default DashboardsPage