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

  const data = [{
    color: "#FF8C00",
    percent: 10,
  },
  { color: "#32CD32", percent: 35 }]
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
  

  useEffect(() => {
    if (machineTimeWork.length > 0) {
      const newData = machines.map(machine => {
        const machineData = machineTimeWork.filter(data => data.machine === machine.slug); // Фильтруем данные по текущему станку
        let loadDay = [];
        let lastEndTime = new Date(currentDate + 'T23:59:59'); // Инициализируем время окончания последнего состояния
  
        // Проходим по данным о времени работы станка
        machineData.forEach(data => {
          const startTime = new Date(data.time); // Время начала работы
          const endTime = new Date(data.time); // Время окончания работы
  
          // Определение цвета в зависимости от статуса работы
          let statusColor;
          switch (data.value) {
            case 'on':
              statusColor = "#32CD32"; // orange
              break;
            case 'off':
              statusColor = "#FF8C00" ; // green
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
          if (machineData.indexOf(data) === machineData.length - 1) { // Если это последнее состояние
            endTime.setHours(23, 59, 59, 999); // Устанавливаем время окончания на конец дня
            workingTime = endTime.getTime() - startTime.getTime();
          } else {
            workingTime = startTime.getTime() - lastEndTime.getTime();
          }
          const workingPercentage = (workingTime / (1000 * 60 * 60 * 24)) * 100; // Процент времени работы
  
          // Добавляем объект в loadDay
          loadDay.push({
            color: statusColor,
            percent: workingPercentage,
            machine: machine.slug,
            startTime: lastEndTime, // Время начала работы равно времени окончания предыдущего состояния
            endTime: endTime // Время окончания работы равно времени начала текущего состояния
          });
  
          lastEndTime = endTime; // Обновляем время окончания последнего состояния
        });
  
        return {
          name: machine.name,
          serial: machine.slug,
          percent: "50%", // Примерный процент (можно заменить на реальное значение)
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
          <ProgressBar label={row.loadDay} />
          <div className={s.load_time}>
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:59</span>
          </div>
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

    data = data.filter(item => item.machine === machine); // Отфильтруем данные по станку

    for (let hour = 0; hour < 24; hour++) {
        const startHour = new Date();
        startHour.setHours(hour, 0, 0, 0);
        const endHour = new Date(startHour);
        endHour.setHours(hour + 1, 0, 0, 0);

        let lastTime = startHour;
        let lastState = 'off'; // Начальное состояние, если данных нет

        data.forEach((item, index) => {
            const itemTime = new Date(item.time);

            if (itemTime >= startHour && itemTime < endHour) {
                const duration = itemTime - lastTime;
                switch (lastState) {
                    case 'on':
                        hourlyData[hour].onTime += duration;
                        break;
                    case 'off':
                        hourlyData[hour].offTime += duration;
                        break;
                    case 'work':
                        hourlyData[hour].workTime += duration;
                        break;
                }
                lastState = item.value;
                lastTime = itemTime;
            }

            if (index === data.length - 1 || new Date(data[index + 1].time) >= endHour) {
                const remainingTime = endHour - lastTime;
                switch (lastState) {
                    case 'on':
                        hourlyData[hour].onTime += remainingTime;
                        break;
                    case 'off':
                        hourlyData[hour].offTime += remainingTime;
                        break;
                    case 'work':
                        hourlyData[hour].workTime += remainingTime;
                        break;
                }
            }
        });
    }

    const msInHour = 3600000; // Количество миллисекунд в часе
    const formattedHourlyData = [];

    hourlyData.forEach((hourData, hour) => {
        const totalTime = hourData.onTime + hourData.offTime + hourData.workTime;
        if (totalTime > 0) {
            if (hourData.onTime > 0) {
                formattedHourlyData.push({
                    hour,
                    percent: (hourData.onTime / msInHour) * 100,
                    color: "#32CD32" // зеленый
                });
            }
            if (hourData.offTime > 0) {
                formattedHourlyData.push({
                    hour,
                    percent: (hourData.offTime / msInHour) * 100,
                    color: "#FF8C00" // оранжевый
                });
            }
            if (hourData.workTime > 0) {
                formattedHourlyData.push({
                    hour,
                    percent: (hourData.workTime / msInHour) * 100,
                    color: "#1E90FF" // синий
                });
            }
        } else {
            formattedHourlyData.push({
                hour,
                percent: 100,
                color: "#FF8C00" // оранжевый по умолчанию, если данных нет
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
        <DropDownMenu width={123} label={"Все смены"} refs={refDropChanges} isOpen={isOpenChanges} setIsOpen={setIsOpenChanges} />
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

  </div>);
};