import React, { useEffect, useState, useRef } from 'react';
import { Table } from '@consta/uikit/Table';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Bullet } from '@consta/charts/Bullet';

import s from "./../TableItem/TableItem.module.css"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DatePicker } from '@consta/uikit/DatePicker';
import { Modal } from '@consta/uikit/Modal';
import axios from 'axios';
import Calendar from "./../images/Calendar.svg"
export const TableConsta = ({ machines, setDataTableIsLoading }) => {
  const [changes, setChanges] = useState([{
    change:"1 смена",
    startTime: "00:00:00",
    finishTime:"00:08:00",
    id:1,
    active:true
  },{
    change:"2 смена",
    startTime: "00:08:00",
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
  const [dateValue, setDateValue] = useState(null);
  const [timeStart, setTimeStart] = useState(null);
  const [timeFinish, setTimeFinish] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChanges, setIsOpenChanges] = useState(false);
  const [machineTimeWork, setMachineTimeWork] = useState([]);
  const [isOpenMachines, setIsOpenMachines] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const refDropMachines = useRef(null);
  const refDropChanges = useRef(null);
  const [timesIsView, setTimesIsView] = useState(false);
  const timesRef = useRef();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth()).padStart(2, '0');
  const dayQeary = String(today.getDate()).padStart(2, '0');
  const monthQearu =String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate() + 1).padStart(2, '0');
  const maxDate = new Date(year, month, day);
  let currentDate = `${year}-${monthQearu}-${dayQeary}`;
  const [fetchNewData,setFetchNewData] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (machines.length > 0) {
      let isMounted = true; // Флаг для проверки, что компонент все еще смонтирован
  
      const fetchData = async () => {
        try {
          const requests = machines.map(async mach => {
            const response = await axios.get(`http://192.168.1.109:8000/machine/${mach.slug}/states?from=${currentDate}T00:00&to=${currentDate}T23:59`);
            console.log(response)
            return { machine: mach.slug, states: response.data.states };
          });
  
          const machineTimeWorkData = await Promise.all(requests);
  
          if (isMounted) {
            setMachineTimeWork(prevState => {
              return [
                ...prevState,
                ...machineTimeWorkData.flatMap(({ machine, states }) =>
                  Object.entries(states).map(([time, value]) => ({ time, value, machine }))
                )
              ];
            });
            setDataTableIsLoading(true);
          }
        } catch (error) {
          console.error(error);
          setDataTableIsLoading(true);
        }
      };
  
      fetchData();
  
      return () => {
        isMounted = false; // Устанавливаем флаг в false при размонтировании компонента
      };
    }
  }, [machines, currentDate]);
   const getTimeFromStart = (startTime)=>{
    if(startTime !== null){
      const dateObj = new Date(startTime);
      let hour = dateObj.getHours();
      let minute = dateObj.getMinutes();
      if(hour < 10){
       hour = `0${hour}`;
      }
      if(minute < 10){
        minute = `${minute}0`
      }
      return `${hour}:${minute}`;
      }else{
        return "00:00"
      }
  
   }
   const getTimeFromFinish = (finishTime) =>{
    if(finishTime !== null){
      const dateObj = new Date(finishTime);
      let hour = dateObj.getHours();
      let minute = dateObj.getMinutes();
      if(hour < 10){
       hour = `0${hour}`;
      }
      if(minute < 10){
        minute = `${minute}`
      }
      return`${hour}:${minute}0`;
    }else{
      return '23:59'
    }
   }
    const fetchData = async (date,startTime, finishTime) => {
      let newDate = currentDate;
      let newStartTime = "00:00";
      let newfinishTime = "23:59"
      if(date !== null){
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      newDate = `${year}-${month}-${day}`;
      }
      if(startTime !== null){
      newStartTime =  getTimeFromStart(startTime)
        }
        if(finishTime !== null){
            
          newfinishTime = getTimeFromFinish(finishTime);
        }
        try {
          const requests = machines.map(async mach => {
            setMachineTimeWork([])
            const response = await axios.get(`http://192.168.1.109:8000/machine/${mach.slug}/states?from=${newDate}T${newStartTime}&to=${newDate}T${newfinishTime}`);
            console.log(response)
            return { machine: mach.slug, states: response.data.states };
          });
  
          const machineTimeWorkData = await Promise.all(requests);
  
            setMachineTimeWork(prevState => {
              return [
                ...prevState,
                ...machineTimeWorkData.flatMap(({ machine, states }) =>
                  Object.entries(states).map(([time, value]) => ({ time, value, machine }))
                )
              ];
            });
            setFetchNewData(true);
            setDataTableIsLoading(true);
        } catch (error) {
          console.error(error);
          setDataTableIsLoading(true);
        }
      };

  useEffect(() => {
    if (machineTimeWork.length > 0) {
      const newData = machines.map(machine => {
        const machineData = machineTimeWork.filter(data => data.machine === machine.slug); // Фильтруем данные по текущему станку
        let loadDay = [];
        let lastEndTime = new Date(currentDate + 'T00:00:00'); // Инициализируем время окончания последнего состояния на начало дня
        let totalTimeWork = 0; // Общее время работы в миллисекундах
  
        // Проходим по данным о времени работы станка
        machineData.forEach((data, index) => {
          const startTime = new Date(data.time); // Время начала работы
  
          // Определение цвета в зависимости от статуса работы
          let statusColor;
          switch (data.value) {
            case 'on':
              statusColor = "#32CD32"; // green
              break;
            case 'off':
              statusColor = "#FF8C00"; // orange
              break;
            case 'work':
              statusColor = "#1E90FF"; // blue
              break;
            default:
              statusColor = "#000000"; // black (default color)
              break;
          }
  
          // Вычисляем длительность работы
          let workingTime;
          if (index === machineData.length - 1) { // Если это последнее состояние
            const endTime = new Date(currentDate + 'T23:59:59'); // Устанавливаем время окончания на конец дня
            workingTime = endTime.getTime() - startTime.getTime();
          } else {
            const nextTime = new Date(machineData[index + 1].time); // Время начала следующего состояния
            workingTime = nextTime.getTime() - startTime.getTime();
          }
          
          if (data.value === 'work') {
            totalTimeWork += workingTime;
          }
  
          const workingPercentage = (workingTime / (1000 * 60 * 60 * 24)) * 100; // Процент времени работы
          console.log(workingPercentage, workingTime)
  
          // Добавляем объект в loadDay
          loadDay.push({
            color: statusColor,
            percent: workingPercentage,
            machine: machine.slug,
            startTime: startTime, 
            endTime: new Date(startTime.getTime() + workingTime) 
          });
  
          lastEndTime = new Date(startTime.getTime() + workingTime); 
        });
  
        const totalWorkPercentage = (totalTimeWork / (1000 * 60 * 60 * 24)) * 100; 
        return {
          name: machine.name,
          serial: machine.slug,
          percent: totalWorkPercentage.toFixed(2) + "%", 
          loadDay: loadDay,
          programm: "xLk_051",
          sum: 124230
        };
      });
  
      setRows(newData);
      setFilteredRows(newData);
    }
  }, [machineTimeWork, machines, currentDate]);

  const [filteredRows, setFilteredRows] = useState(rows)
  const columns = [
    {
      title: 'Название',
      accessor: 'name',
      align: 'left',
      width: 209.5,
      sortable: true,
      renderCell: (row) => (
        <span style={{ color: "#77CB10" }}>{row.name}</span>

      ),
    },
    {
      title: 'Серийный №',
      accessor: 'serial',
      align: "center",
      sortable: true,
      width: 209.5,
    },
    {
      title: 'ПРОГРАММА',
      accessor: 'programm',
      align: "center",
      sortable: true,
      width: 209.5,
    },
    {
      title: 'ЗАГРУЗКА ЗА ТЕКУЩИЙ ДЕНЬ',
      accessor: 'loadDay',
      align: "center",
      sortable: false,
      renderCell: (row) => (
        <div className={`${s.progress_cell}`} onClick={() => openHourlyModal(row.serial)}>  
          {fetchNewData === true && (timeStart !== null || timeFinish !==null) ?     
          
          <ProgressBar label={row.loadDay} date={[getTimeFromStart(timeStart), getTimeFromFinish(timeFinish)]} />: <ProgressBar label={row.loadDay} date={["00:00",
          "06:00",
           "12:00",
            "18:00",
            "23:59",]} />}
      
        </div>
      ),
      width: 412
    },
    {
      title: 'КОЛ-ВО',
      accessor: 'sum',
      align: "center",
      sortable: true,
      width: 130
    },
    {
      title: 'ЗАГРУЗКА',
      accessor: 'percent',
      align: "center",
      sortable: true,
      width: 130
    },
  ];
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
  const calculateHourlyData = (data, machine) => {
    const hourlyData = Array(24).fill(null).map(() => ({
        onTime: 0,
        offTime: 0,
        workTime: 0
    }));

    data = data.filter(item => item.machine === machine); // Фильтруем данные для конкретной машины

    let previousTime = new Date(0); // Инициализируем предыдущее время

    data.forEach((item, index) => {
        const itemTime = new Date(item.time);
        const currentHour = itemTime.getHours(); // Текущий час

        const startHour = new Date(itemTime);
        startHour.setMinutes(0, 0, 0); // Устанавливаем минуты на 0 для начала часа
        const endHour = new Date(startHour);
        endHour.setHours(endHour.getHours() + 1); // Конец часа

        const duration = itemTime - previousTime;

        switch (item.value) {
            case 'on':
                hourlyData[currentHour].onTime += duration;
                break;
            case 'off':
                hourlyData[currentHour].offTime += duration;
                break;
            case 'work':
                hourlyData[currentHour].workTime += duration;
                break;
        }

        previousTime = itemTime;
    });

    const msInHour = 3600000; // Миллисекунд в часе
    const formattedHourlyData = [];

    hourlyData.forEach((hourData, hour) => {
        const totalTime = hourData.onTime + hourData.offTime + hourData.workTime;
        if (totalTime > 0) {
            const totalWorkPercentage = (hourData.workTime / totalTime) * 100;
            const totalOnPercentage = (hourData.onTime / totalTime) * 100;
            const totalOffPercentage = (hourData.offTime / totalTime) * 100;

            if (totalOnPercentage > 0) {
                formattedHourlyData.push({
                    hour,
                    percent: totalOnPercentage,
                    color: "#32CD32" // Зеленый
                });
            }
            if (totalOffPercentage > 0) {
                formattedHourlyData.push({
                    hour,
                    percent: totalOffPercentage,
                    color: "#FF8C00" // Оранжевый
                });
            }
            if (totalWorkPercentage > 0) {
                formattedHourlyData.push({
                    hour,
                    percent: totalWorkPercentage,
                    color: "#1E90FF" // Синий
                });
            }
        } else {
            formattedHourlyData.push({
                hour,
                percent: 100,
                color: "#FF8C00" // По умолчанию оранжевый, если данных нет
            });
        }
    });

    return formattedHourlyData;
};






  const [hourlyData, setHourlyData] = useState([]);
const [selectedMachine, setSelectedMachine] = useState(null);

const openHourlyModal = (machine) => {
  const data = calculateHourlyData(machineTimeWork, machine);
  setHourlyData(data);
  setSelectedMachine(machine);
  setOpenModal(true);
};

const closeModal = () => {
  setOpenModal(false);
  setHourlyData([]);
  setSelectedMachine(null);
};
useEffect(()=>{
  console.log(machineTimeWork)
},[machineTimeWork])

  return (<div style={{ minHeight: "50vh" }}>
    <h1 className={s.title}>Перечень и загрузка оборудования</h1>
    <div className={s.filterTable}>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={()=>setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Оборудование</span>
        <DropDownMenu width={352}
          refs={refDropMachines}
          label={"Все станки"}
          isOpen={isOpenMachines}
          setIsOpen={setIsOpenMachines}
          machines={machines}
          setFilteredRows={setFilteredRows}
          rows={rows} 
          />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={()=>setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Смена</span>
        <DropDownMenu width={123} label={"Все смены"} refs={refDropChanges} isOpen={isOpenChanges} setIsOpen={setIsOpenChanges} changes={changes} setChanges={setChanges} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={()=>setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Дата</span>
        <div style={{position:"relative"}}>
        <DatePicker style={{ width: 118 }} className={s.datePicker} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateValue} onChange={setDateValue} maxDate={maxDate} />
     <img style={{position:"absolute", top:'37.5%',right:"22%"}} src={Calendar} width={10} height={10}/>
     </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Время</span>
        <div ref={timesRef}  style={{ width: 140, position:'relative' }} className={s.filterButton}>
        <div
  style={{ position: 'relative' }}
  className={s.filterLabel}
  onClick={() => {
    setTimesIsView(!timesIsView);
  }}
>
  {`${timeStart ? timeStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00'} - ${
    timeFinish ? timeFinish.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '23:59'
  }`}
  <img style={{ position: 'absolute', top: '35%', right: '5%' }} src={Calendar} width={10} height={10} />
</div>;

        <div className={s.dropDown} style={{ display: timesIsView === true  ? "" : "none", }}>
   
            <div className={s.dropDownItemChanges}>
            <div><DatePicker style={{ width: 64, marginRight:10, marginLeft:0}} className={s.datePicker} size="xs" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeStart} onChange={setTimeStart} maxDate={maxDate} /></div>
            <div> <DatePicker style={{ width: 64,margin:0, padding:0}} className={s.datePicker} size="xs" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeFinish} onChange={setTimeFinish} maxDate={maxDate} /></div>
                        </div>
        </div>
  
        </div>
    
      </div>
      {console.log(dateValue)}
      {(dateValue !== null || timeStart !== null || timeFinish !== null) &&
      <div style={{backgroundColor:"#4682B4",display:'flex',marginTop:'auto',height:'32px',borderRadius:"10px",width:'60px', justifyContent:'center',alignItems:'center'}} onClick={()=>{
        
        fetchData(dateValue, timeStart, timeFinish)
      }}>
          <span style={{fontSize:14, color:'white',padding:8, textAlign:'center',fontWeight:700}}>OK</span>
        </div>}
    </div>
    <div onClick={()=>setTimesIsView(false)} style={{marginTop:6}}>
    <Table zebraStriped='odd' rows={filteredRows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} />
    </div>
    <Modal isOpen={openModal}
  hasOverlay
  onClickOutside={closeModal}
  onEsc={closeModal}
>
  <div style={{ height: "700px", width: 820, paddingLeft: "24px", paddingRight: "24px" }}>
    <h3>Подробный отчет: {selectedMachine}</h3>
    {hourlyData.map((hourData, index) => (
      <div key={index} style={{ display: 'flex', width: '100%', alignItems: 'center', marginTop: 16 }}>
        <span style={{ color: "#00203399", fontSize: "14px", whiteSpace: "nowrap" }}>
          {hourData.hour}:00 - {hourData.hour}:59
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginLeft: 24 }}>
          <ProgressBar label={[{ color: hourData.color, percent: hourData.percent }]} />
          <div className={s.load_time}>
            <span>00</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
            <span>50</span>
            <span>60</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</Modal>

  </div>);};