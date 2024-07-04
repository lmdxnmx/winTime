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
    change: "1 смена",
    startTime: "00:00:00",
    finishTime: "08:00:00",
    id: 1,
    active: true
  }, {
    change: "2 смена",
    startTime: "08:00:00",
    finishTime: "16:00:00",
    id: 2,
    active: true
  }, {
    change: "3 смена",
    startTime: "16:00:00",
    finishTime: "23:59:59",
    id: 3,
    active: true
  }])
  const [seeDate, setSeeDate] = useState({ timeStart: null, timeFinish: null });
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
  const monthQearu = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate() + 1).padStart(2, '0');
  const [minDate, setMinDate] = useState(new Date(year, month, day));
  const [maxDate, setMaxDate] = useState(new Date(year, month, day));
  let currentDate = `${year}-${monthQearu}-${dayQeary}`;
  const [fetchNewData, setFetchNewData] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (machines.length > 0) {
      let isMounted = true; // Flag to check if the component is still mounted

      const fetchData = async () => {
        try {
          const requests = machines.map(async mach => {
            const response = await axios.get(`http://192.168.1.109:8000/machine/${mach.slug}/states?from=${currentDate}T00:00&to=${currentDate}T23:59&percent=true`);
            return { machine: mach.slug, states: response.data.states, percents: response.data.percents };
          });

          const machineTimeWorkData = await Promise.all(requests);

          if (isMounted) {
            setMachineTimeWork(prevState => [
              ...prevState,
              ...machineTimeWorkData.map(({ machine, states, percents }) => ({ machine, states, percents }))
            ]);
            setDataTableIsLoading(true);
          }
        } catch (error) {
          console.error(error);
          setDataTableIsLoading(true);
        }
      };

      fetchData();

      return () => {
        isMounted = false; // Set the flag to false when the component unmounts
      };
    }
  }, [machines, currentDate]);
  const getTimeFromStart = (startTime) => {
    if (startTime !== null) {
      const dateObj = new Date(startTime);
      let hour = dateObj.getHours();
      let minute = dateObj.getMinutes();
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `${minute}0`
      }
      return `${hour}:${minute}`;
    } else {
      return "00:00"
    }

  }
  const getTimeFromFinish = (finishTime) => {
    if (finishTime !== null) {
      const dateObj = new Date(finishTime);
      let hour = dateObj.getHours();
      let minute = dateObj.getMinutes();
      if (hour < 10) {
        hour = `0${hour}`;
      }
      else if (minute < 10) {
        minute = `${minute}`
      }
      if (minute === 59) {
        return `${hour}:${minute}`;
      } else {
        return `${hour}:${minute}0`;
      }
    } else {
      return '23:59'
    }
  }
  useEffect(() => {
    console.log(machineTimeWork)
  }, [machineTimeWork])
  const fetchData = async (date, startTime, finishTime) => {
    let newDate = currentDate;
    let newStartTime = "00:00";
    let newFinishTime = "23:59";
    if (date !== null) {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      newDate = `${year}-${month}-${day}`;
    }
    if (startTime !== null) {
      newStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (finishTime !== null) {
      newFinishTime = finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    try {
      const requests = machines.map(async mach => {
        setMachineTimeWork([]);
        const response = await axios.get(`http://192.168.1.109:8000/machine/${mach.slug}/states?from=${newDate}T${newStartTime}&to=${newDate}T${newFinishTime}&percent=true`);
        return { machine: mach.slug, states: response.data.states, percents: response.data.percents };
      });

      const machineTimeWorkData = await Promise.all(requests);

      setMachineTimeWork(prevState => [
        ...prevState,
        ...machineTimeWorkData.map(({ machine, states, percents }) => ({ machine, states, percents }))
      ]);
      setFetchNewData(true);
      setSeeDate({ timeStart: timeStart, timeFinish: timeFinish });
      setDataTableIsLoading(true);
    } catch (error) {
      console.error(error);
      setDataTableIsLoading(true);
    }
  };

  useEffect(() => {
    if (machineTimeWork.length > 0) {
      const newData = machines.map(machine => {
        const machineData = machineTimeWork.find(data => data.machine === machine.slug);
        let loadDay = [];
        let statusColor;

        // Extracting only the timestamps from the states object
        const timestamps = Object.keys(machineData.states);

        machineData.percents.forEach((data, index) => {
          switch (data[0]) {
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

          // Using the extracted timestamps
          loadDay.push({
            color: statusColor,
            status: data[0],
            percent: data[1] * 100,
            start: timestamps[index], // Start timestamp
            end: timestamps[index + 1],
            machineName: machine.name
          });
        });

        return {
          name: machine.name,
          colorName: statusColor,
          serial: machine.slug,
          percent: 0,
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
        <span style={{ color: row.colorName }}>{row.name}</span>

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
          {fetchNewData === true && (seeDate.timeStart !== null || seeDate.timeFinish !== null) ?

            <ProgressBar viewTooltip={true} label={row.loadDay} date={[getTimeFromStart(seeDate.timeStart), getTimeFromFinish(seeDate.timeFinish)]} /> : <ProgressBar viewTooltip={true} label={row.loadDay} date={["00:00",
              "06:00",
              "12:00",
              "18:00",
              "23:59",]} />}

        </div>
      ),
      width: 812
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
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);

  const openHourlyModal = (machine) => {
    setSelectedMachine(machine);
    setOpenModal(true);
  };
  useEffect(() => {
    if (openModal) {
      const fetchHourlyData = async () => {
        const requests = [];
        for (let hour = 0; hour < 23; hour++) {
          const startTime = `${String(hour).padStart(2, '0')}:00`;
          const endTime = `${String(hour + 1).padStart(2, '0')}:00`;
          requests.push(
            axios.get(`http://192.168.1.109:8000/machine/${selectedMachine}/states?from=${currentDate}T${startTime}&to=${currentDate}T${endTime}&percent=true`)
          );
        }
        // Последний запрос от 23:00 до 23:59
        requests.push(
          axios.get(`http://192.168.1.109:8000/machine/${selectedMachine}/states?from=${currentDate}T23:00&to=${currentDate}T23:59&percent=true`)
        );
        try {
          const responses = await Promise.all(requests);
          const data = responses.map(response => response.data);
          setHourlyData(data);
        } catch (error) {
          console.error("Ошибка при запросе данных:", error);
        }
      };
      fetchHourlyData();
    }
  }, [openModal]);



  const closeModal = () => {
    setOpenModal(false);
    setHourlyData([]);
    setSelectedMachine(null);
  };
  useEffect(() => {
    const filteredChanges = changes.filter((i) => i.active === true)
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
  useEffect(() => {
    console.log(machineTimeWork)
  }, [machineTimeWork])

  return (<><div style={{ minHeight: "50vh" }}>
    <h1 className={s.title}>Перечень и загрузка оборудования</h1>
    <div className={s.filterTable}>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setTimesIsView(false)}>
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

      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Дата</span>
        <div style={{ position: "relative" }}>
          <DatePicker style={{ width: 118 }} className={s.datePicker} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateValue} onChange={setDateValue} maxDate={maxDate} />
          <img style={{ position: "absolute", top: '37.5%', right: "22%" }} src={Calendar} width={10} height={10} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => setTimesIsView(false)}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Смена</span>
        <DropDownMenu width={123} label={"Все смены"} refs={refDropChanges} isOpen={isOpenChanges} setIsOpen={setIsOpenChanges} changes={changes} setChanges={setChanges} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: "#00203399", textAlign: 'left', paddingBottom: 4, fontSize: 14 }}>Время</span>
        <div ref={timesRef} style={{ width: 140, position: 'relative' }} className={s.filterButton}>
          <div
            style={{ position: 'relative' }}
            className={s.filterLabel}
            onClick={() => {
              setTimesIsView(!timesIsView);
            }}
          >
            {`${timeStart ? timeStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00'} - ${timeFinish ? timeFinish.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '23:59'
              }`}
            <img style={{ position: 'absolute', top: '35%', right: '5%' }} src={Calendar} width={10} height={10} />
          </div>;

          <div className={s.dropDown} style={{ display: timesIsView === true ? "" : "none", }}>

            <div className={s.dropDownItemChanges}>
              <div><DatePicker style={{ width: 64, marginRight: 10, marginLeft: 0 }} className={s.datePicker} size="xs" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeStart} onChange={setTimeStart} minDate={minDate} maxDate={maxDate} /></div>
              <div> <DatePicker style={{ width: 64, margin: 0, padding: 0 }} className={s.datePicker} size="xs" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeFinish} onChange={setTimeFinish} minDate={minDate} maxDate={maxDate} /></div>
            </div>
          </div>

        </div>

      </div>
      {(dateValue !== null || timeStart !== null || timeFinish !== null) &&
        <div style={{ backgroundColor: "#4682B4", display: 'flex', marginTop: 'auto', height: '32px', borderRadius: "10px", width: '60px', justifyContent: 'center', alignItems: 'center' }} onClick={() => {

          fetchData(dateValue, timeStart, timeFinish)
        }}>
          <span style={{ fontSize: 14, color: 'white', padding: 8, textAlign: 'center', fontWeight: 700 }}>OK</span>
        </div>}
    </div>
    <div onClick={() => setTimesIsView(false)} style={{ marginTop: 6 }}>
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
              {index}:00 - {index}:59
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginLeft: 24 }}>
              <ProgressBar
                label={hourData.percents.map(([state, value]) => {
                  let color = "";
                  if (state === "on") color = "#32CD32";
                  else if (state === "off") color = "#FF8C00";
                  else if (state === "work") color = "#1E90FF";

                  return { color, percent: value * 100 };
                })}
              />
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

  </div>
  </>);
};