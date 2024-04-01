import React,{useRef, useState, useEffect} from 'react'
import "./Pages.css"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DatePicker } from '@consta/uikit/DatePicker';
import DashboardsTable from '../DashboardsTable/DashboardsTable';
const DashboardsPage = () => {
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
  return (
       <>
        <h1 className='title'>Дашборд</h1>
        <div className="filters">
      <DropDownMenu width={352} refs={refDropMachines} label={"Все станки"} isOpen={isOpenMachines} setIsOpen={setIsOpenMachines} />
      <DatePicker className="datePicker" size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateValue} onChange={setDateValue} />
      <DropDownMenu width={123} label={"Все смены"} refs={refDropChanges} isOpen={isOpenChanges} setIsOpen={setIsOpenChanges} />
      <DatePicker className="datePicker" size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeValue} onChange={setTimeValue} />
    </div>
    <DashboardsTable/>
       </>
  )
}

export default DashboardsPage