import React, { useState, useRef, useEffect } from 'react'
import SwitchButtons from '../CommonComponents/SwitchButtons'
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DatePicker } from '@consta/uikit/DatePicker';
  import { Table } from '@consta/uikit/Table';
  import ColumnChart from '../Charts/ColumnChart';
import { DonutChart } from './../Charts/DonutChart';

const ReportsPage = () => {
  const [typeVal, setTypeVal] = useState([{ name: "Отчет по загрузке", active: false, size: 16 }, { name: "Выполненные операции", active: true, size: 16 }, { name: "Анализ тегов", active: false, size: 16 },{ name: "Учет инструментов", active: false, size: 16 }])
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChanges, setIsOpenChanges] = useState(false);
  const [isOpenMachines, setIsOpenMachines] = useState(false);
  const refDropMachines = useRef(null);
  const refDropChanges = useRef(null);
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
  return (
    <div>
      <h1 className='title'>Отчеты</h1>
      <div style={{width:"35%"}}>
        <SwitchButtons val={typeVal} setVal={setTypeVal} />
      </div>
      <div className="filters">
        <div className='filterWrapper'>
          <span>Оборудование</span>
          <DropDownMenu width={352} refs={refDropMachines} label={"Все станки"} isOpen={isOpenMachines} setIsOpen={setIsOpenMachines} />
        </div>
        <div className='filterWrapper'>
          <span>Смена</span>
          <DatePicker className="datePicker" size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateValue} onChange={setDateValue} />
        </div>
        <div className='filterWrapper'>
          <span>Дата</span>
          <DropDownMenu width={123} label={"Все смены"} refs={refDropChanges} isOpen={isOpenChanges} setIsOpen={setIsOpenChanges} />
        </div>
        <div className='filterWrapper'>
          <span>Время</span>
          <DatePicker className="datePicker" size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeValue} onChange={setTimeValue} />
        </div>
      </div>
      {typeVal[0].active &&<><div className='columnContainer'>
        <h1 className='title' style={{marginBottom:32}}>Группа 1</h1>
        <ColumnChart/>
      </div>
      <div className='columnContainer'>
        <h1 className='title' style={{marginBottom:32}}>Группа 1</h1>
        <ColumnChart/>
      </div></>}
      {typeVal[1].active &&<><div className='columnContainer' style={{display:'flex'}}>
        <div style={{display:'flex',flexDirection:'column',width:'33%',height:"250px",margin:"auto 0"}}>
          <span style={{color:"#323E48",fontSize:14, fontWeight:600,paddingBottom:8}}>Все операции</span>
          <DonutChart/></div>
          <div style={{display:'flex',flexDirection:'column',width:'33%',height:"250px",margin:"auto 0"}}>
          <span style={{color:"#323E48",fontSize:14, fontWeight:600,paddingBottom:8}}>Завершенные</span>
          <DonutChart/></div>
          <div style={{display:'flex',flexDirection:'column',width:'33%',height:"250px",margin:"auto 0"}}>
          <span style={{color:"#323E48",fontSize:14, fontWeight:600,paddingBottom:8}}>Незавершенные</span>
          <DonutChart/></div>
      </div>
      </>}
      <div style={{width:"95%"}}>
    <Table size="s" zebraStriped='odd' rows={rows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} width={"100%"}/>
    </div>
    </div>
  )
}

export default ReportsPage