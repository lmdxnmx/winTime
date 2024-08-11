import React, { useEffect, useState, useRef } from 'react';
import { Table } from '@consta/uikit/Table';
import ProgressBar from '../ProgressBar/ProgressBar';

import s from "./../TableItem/TableItem.module.css"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DatePicker } from '@consta/uikit/DatePicker';
import axios from 'axios';
import Calendar from "./../images/Calendar.svg"
import ProgressBarTags from '../ProgressBar/PrograssBarTags';
import CategoryChoose from '../CategoryChoose/CategoryChoose';
import LineChart from '../Charts/LineChart';
import LineChartForTable from '../Charts/LineChartForTable';
export const ReportTableTags = ({ machines, setOpenModal, setData }) => {
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
  const [categoriesColor, setCategoriesColors] = useState([]);
  const [allStates, setAllStates] = useState([])
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
            const response = await axios.get(`${process.env.REACT_APP_QUERY_MAIN}machine/${mach.slug}/states?from=${currentDate}T00:00&to=${currentDate}T23:59&percent=true`);
            const responseState = await axios.get(`${process.env.REACT_APP_QUERY_MAIN}machine/${mach.slug}/all-states`);
            return { machine: mach.slug, states: response.data.states, percents: response.data.percents, allStates: responseState.data };
          });

          const machineTimeWorkData = await Promise.all(requests);

          if (isMounted) {
            setMachineTimeWork(prevState => [
              ...prevState,
              ...machineTimeWorkData.map(({ machine, states, percents, allStates }) => ({ machine, states, percents, allStates }))
            ]);
          }
        } catch (error) {
          console.error(error);
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
        const response = await axios.get(`${process.env.REACT_APP_QUERY_MAIN}machine/${mach.slug}/states?from=${newDate}T${newStartTime}&to=${newDate}T${newFinishTime}&percent=true`);
        const responseState = await axios.get(`${process.env.REACT_APP_QUERY_MAIN}machine/${mach.slug}/all-states`);
            return { machine: mach.slug, states: response.data.states, percents: response.data.percents, allStates: responseState.data };
      });

      const machineTimeWorkData = await Promise.all(requests);
      console.log(machineTimeWorkData)

      setMachineTimeWork(prevState => [
        ...prevState,
        ...machineTimeWorkData.map(({ machine, states, percents, allStates }) => ({ machine, states, percents, allStates }))
      ]);
      setFetchNewData(true);
      setSeeDate({ timeStart: timeStart, timeFinish: timeFinish });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (machines.length > 0) {
      Promise.all(
        machines.map(async mach => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_QUERY_MAIN}machine/${mach.slug}/all-states`);
            const newStates = response.data.states;
            return newStates.map(newState => ({
              label: newState.name,
              color: newState.color,
              active: true,
              id: newState.id,
              slug: newState.slug
            }));
          } catch (error) {
            console.error(error);
            return [];
          }
        })
      ).then(statesArray => {
        const combinedStates = statesArray.flat(); // Combine states from all responses

        setCategoriesColors(prevState => {
          const updatedState = [...prevState];
          combinedStates.forEach(newState => {
            if (!updatedState.some(item => item.label === newState.label)) {
              updatedState.push(newState);
            }
          });
          return updatedState;
        });
      
      })
    }
  }, [machines]);
  useEffect(() => {
    const fetchData = async () => {
      let today = new Date();
      let year = today.getFullYear();
      let month = String(today.getMonth() + 1).padStart(2, '0');
      let day = String(today.getDate()).padStart(2, '0');
      let currentDate = `${year}-${month}-${day}`;
  
      if (dateValue !== null) {
        const dateObj = new Date(dateValue);
        year = dateObj.getFullYear();
        month = String(dateObj.getMonth() + 1).padStart(2, '0');
        day = String(dateObj.getDate()).padStart(2, '0');
        currentDate = `${year}-${month}-${day}`;
      }
  
      if (categoriesColor && categoriesColor.length > 0) {
        const slugs = categoriesColor.map(category => category.slug);
        const activeChanges = changes.filter(change => change.active);
  
        try {
          let serverData = {};
  
          const fetchDataForChange = async (change) => {
            const intervalTimes = generateTimesForChange(change);
            const response = await axios.post(`${process.env.REACT_APP_QUERY_MAIN}machines/horizontal-view`, {
              "machines": ["all"],
              "states": slugs,
              "times": intervalTimes.map(time => `${currentDate}T${time}`)
            }, {
              headers: {
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true',
              }
            });
            return response.data.times;
          };
  
          const generateTimesForChange = (change) => {
            const generateHalfHourIntervals = (startHour, endHour) => {
              const times = [];
              for (let hour = startHour; hour <= endHour; hour++) {
                times.push(`${String(hour).padStart(2, '0')}:00`);
                times.push(`${String(hour).padStart(2, '0')}:30`);
              }
              return times;
            };
  
            let times = [];
            if (change.id === 1) {
              times = generateHalfHourIntervals(0, 7);
              times.push('08:00');
            } else if (change.id === 2) {
              times = generateHalfHourIntervals(8, 15);
              times.push('16:00');
            } else if (change.id === 3) {
              times = generateHalfHourIntervals(16, 23);
              times.push('23:59');
            }
            return times;
          };
  
          const processData = (rawData) => {
            const combinedData = {};
            rawData.forEach((changeData) => {
              Object.entries(changeData).forEach(([timestamp, values]) => {
                if (!combinedData[timestamp]) {
                  combinedData[timestamp] = values;
                } else {
                  for (const [key, value] of Object.entries(values)) {
                    combinedData[timestamp][key] = (combinedData[timestamp][key] || 0) + value;
                  }
                }
              });
            });
  
            const uniqueTimestamps = [...new Set(Object.keys(combinedData))].sort();
            const filteredData = {};
            uniqueTimestamps.forEach((timestamp) => {
              filteredData[timestamp] = combinedData[timestamp];
            });
  
            return filteredData;
          };
  
          const activeChangePromises = activeChanges.map(fetchDataForChange);
          const rawData = await Promise.all(activeChangePromises);
  
          serverData = processData(rawData);
  
          const newAllData = categoriesColor.flatMap(category => {
            return Object.keys(serverData).map(time => ({
              Date: time.split(' ')[1],
              scales: serverData[time]?.[category.slug],
              type: category.label
            }));
          });
  
          const filteredData = newAllData.filter(object => {
            const category = categoriesColor.find(category => category.label === object.type);
            return category && category.active;
          });
  
  
          return filteredData;
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
      return [];
    };
  
    if (machineTimeWork.length > 0 && categoriesColor.length > 0) {
      fetchData().then(serverData => {
        const activeCategories = categoriesColor.filter(category => category.active);
  
        const newData = machines.map(machine => {
          const machineData = machineTimeWork.find(data => data.machine === machine.slug);
          let loadDay = [];
          let statusColor;
  
          // Extracting only the timestamps from the states object
          const timestamps = Object.keys(machineData.states);
          console.log(timestamps)
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
  
          // Adding allStates.states to rows with their own loadDay if they are active
          const rows = machineData.allStates.states.map(state => {
            if (activeCategories.find(cat => cat.slug === state.slug)) {
              let stateLoadDay = [];
              let stateStatusColor;
  
              machineData.percents.forEach((data, index) => {
                console.log(data,state.slug)
                if (data[0] === state.slug) {
                  switch (data[0]) {
                    case 'on':
                      stateStatusColor = "#32CD32"; // green
                      break;
                    case 'off':
                      stateStatusColor = "#FF8C00"; // orange
                      break;
                    case 'work':
                      stateStatusColor = "#1E90FF"; // blue
                      break;
                    default:
                      stateStatusColor = "#000000"; // black (default color)
                      break;
                  }
                }
                else{
                  stateStatusColor = "#CFD7DD"
                }
                  stateLoadDay.push({
                    color: stateStatusColor,
                    status: data[0],
                    percent: data[1] * 100,
                    start: timestamps[index], // Start timestamp
                    end: timestamps[index + 1],
                    machineName: machine.name
                  });
                
              });
              console.log(serverData,state.name)
              const lineChartData = (serverData).map((time)=>{
                return({
                  Date: time.Date,
                  scales: time.scales,
                  type: time.type
              })
                
              });
              const data = lineChartData.filter(item => {
                return item.type === state.name})
                const sum = data.reduce((accumulator, currentValue) => accumulator + currentValue.scales, 0);
            const average = sum / data.length;
              return {
                ...state,
                loadDay: stateLoadDay,
                lineChartData: average !== 0 ? data : []
              };
            } else {
              return null; // Exclude inactive states
            }
          }).filter(row => row !== null); // Remove null entries
  
          return {
            name: machine.name,
            colorName: statusColor,
            percent: 0,
            loadDay: loadDay,
            rows: rows // Adding the active states with their loadDay
          };
        });
  
        setRows(newData);
        setFilteredRows(newData);
      });
    }
  }, [machineTimeWork, machines, currentDate, categoriesColor, dateValue, changes]);
  
  // useEffect(() => {
  //   const fetchData = async () => {

  //     let today = new Date();
  //     let year = today.getFullYear();
  //     let month = String(today.getMonth() + 1).padStart(2, '0');
  //     let day = String(today.getDate()).padStart(2, '0');
  //     let currentDate = `${year}-${month}-${day}`;

  //     if (dateValue !== null) {
  //       const dateObj = new Date(dateValue);
  //       year = dateObj.getFullYear();
  //       month = String(dateObj.getMonth() + 1).padStart(2, '0');
  //       day = String(dateObj.getDate()).padStart(2, '0');
  //       currentDate = `${year}-${month}-${day}`;
  //     }

  //     if (categoriesColor && categoriesColor.length > 0) {
  //       const slugs = categoriesColor.map(category => category.slug);
  //       const activeChanges = changes.filter(change => change.active);

  //       try {
  //         let serverData = {};

  //         const fetchDataForChange = async (change) => {
  //           const intervalTimes = generateTimesForChange(change);
  //           const response = await axios.post(`${process.env.REACT_APP_QUERY_MAIN}machines/horizontal-view`, {
  //             "machines": ["all"],
  //             "states": slugs,
  //             "times": intervalTimes.map(time => `${currentDate}T${time}`)
  //           }, {
  //             headers: {
  //               'access-control-allow-origin': '*',
  //               'access-control-allow-credentials': 'true',
  //             }
  //           });
  //           console.log(response)
  //           return response.data.times;
  //         };

  //         const generateTimesForChange = (change) => {
  //           const generateHalfHourIntervals = (startHour, endHour) => {
  //             const times = [];
  //             for (let hour = startHour; hour <= endHour; hour++) {
  //               times.push(`${String(hour).padStart(2, '0')}:00`);
  //               times.push(`${String(hour).padStart(2, '0')}:30`);
  //             }
  //             return times;
  //           };

  //           let times = [];
  //           if (change.id === 1) {
  //             times = generateHalfHourIntervals(0, 7);
  //             times.push('08:00');
  //           } else if (change.id === 2) {
  //             times = generateHalfHourIntervals(8, 15);
  //             times.push('16:00');
  //           } else if (change.id === 3) {
  //             times = generateHalfHourIntervals(16, 23);
  //             times.push('23:59');
  //           }
  //           return times;
  //         };

  //         const processData = (rawData) => {
  //           const combinedData = {};
  //           rawData.forEach((changeData) => {
  //             Object.entries(changeData).forEach(([timestamp, values]) => {
  //               if (!combinedData[timestamp]) {
  //                 combinedData[timestamp] = values;
  //               } else {
  //                 for (const [key, value] of Object.entries(values)) {
  //                   combinedData[timestamp][key] = (combinedData[timestamp][key] || 0) + value;
  //                 }
  //               }
  //             });
  //           });

  //           const uniqueTimestamps = [...new Set(Object.keys(combinedData))].sort();
  //           const filteredData = {};
  //           uniqueTimestamps.forEach((timestamp) => {
  //             filteredData[timestamp] = combinedData[timestamp];
  //           });

  //           return filteredData;
  //         };

  //         const activeChangePromises = activeChanges.map(fetchDataForChange);
  //         const rawData = await Promise.all(activeChangePromises);

  //         serverData = processData(rawData);

  //         const newAllData = categoriesColor.flatMap(category => {
  //           return Object.keys(serverData).map(time => ({
  //             Date: time.split(' ')[1],
  //             scales: serverData[time]?.[category.slug],
  //             type: category.label
  //           }));
  //         });

  //         const filteredData = newAllData.filter(object => {
  //           const category = categoriesColor.find(category => category.label === object.type);
  //           return category && category.active;
  //         });

  //         setLineChartData(filteredData);

  //       } catch (error) {
  //         console.error('Ошибка при получении данных:', error);
  //       }
  //     }
  //   };

  //   if (categoriesColor !== null) {
  //     fetchData();
  //   }
  // }, [categoriesColor, dateValue, changes]); 

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
      title: 'ЗАГРУЗКА ЗА ТЕКУЩИЙ ДЕНЬ',
      accessor: 'loadDay',
      align: "center",
      sortable: false,
      renderCell: (row) => (

        <div className={`${s.progress_cell}`} onClick={()=>{
          setOpenModal(true)
          setData({loadDay:row.loadDay, start:getTimeFromStart(seeDate.timeStart), finish: getTimeFromFinish(seeDate.timeFinish)})
          }}>
          {fetchNewData === true && (seeDate.timeStart !== null || seeDate.timeFinish !== null) ?
           
            <ProgressBarTags  label={row.loadDay} date={[getTimeFromStart(seeDate.timeStart), getTimeFromFinish(seeDate.timeFinish)]} /> : <ProgressBarTags  label={row.loadDay} date={["00:00",
              "06:00",
              "12:00",
              "18:00",
              "23:59",]} />}
             {row.options.level === 1 && row.lineChartData.length > 0 && <LineChartForTable categoriesColor={categoriesColor} data={row.lineChartData}/>}
        </div>
      ),
      width: 812
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
useEffect(()=>{
  console.log(categoriesColor)
},[categoriesColor])
  return (<><div style={{ minHeight: "50vh" }}>
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
          </div>

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
    <div style={{display:'flex',flexDirection:'column'}}>
        <h3 style={{textAlign:"left", color:"#00203399",fontSize:14,paddingLeft:10}}>Теги</h3>
    <CategoryChoose setChanges={setChanges} changes={changes} dateValue={dateValue} setDateValue={setDateValue} value={categoriesColor} setValue={setCategoriesColors} />
    </div>
    <div onClick={() => setTimesIsView(false)} style={{ marginTop: 6 }}>
      <Table zebraStriped='odd' rows={filteredRows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} />
    </div>


  </div>
  </>);
};