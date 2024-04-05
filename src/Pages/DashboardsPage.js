import React, { useRef, useState, useEffect } from 'react'
import "./Pages.css"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DatePicker } from '@consta/uikit/DatePicker';
import DashboardsTable from '../DashboardsTable/DashboardsTable';
import SwitchButtons from '../CommonComponents/SwitchButtons';
import StatMeas from '../DashboardStatComponents/StatMeas';
const DashboardsPage = () => {
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChanges, setIsOpenChanges] = useState(false);
  const [isOpenMachines, setIsOpenMachines] = useState(false);
  const refDropMachines = useRef(null);
  const refDropChanges = useRef(null);
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
  return (
    <>
      <h1 className='title'>Дашборд</h1>
      <SwitchButtons val={typeVal} setVal={setTypeVal} />
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
      </div>{typeVal[0].active &&
      <div className='dashboardsWrapper'>
      <DashboardsTable name={"Токарные станки"} />
      <DashboardsTable name={"Фрезерные станки"}/>
      </div>}
     {typeVal[1].active &&
     <div className='statWrapper'>
        <StatMeas/>
     </div>
     }
    </>
  )
}

export default DashboardsPage