import React, { useEffect, useState, useRef } from 'react';
import { Table } from '@consta/uikit/Table';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Bullet } from '@consta/charts/Bullet';

import s from "./../TableItem/TableItem.module.css"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DatePicker } from '@consta/uikit/DatePicker';
import { Modal } from '@consta/uikit/Modal';

export const TableConsta = () => {

  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChanges, setIsOpenChanges] = useState(false);
  const [isOpenMachines, setIsOpenMachines] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const refDropMachines = useRef(null);
  const refDropChanges = useRef(null);
  const data =[{
    color: "#FF8C00",
    percent: 10,
  },
  { color: "#32CD32", percent: 35 }]
  const [rows, setRows] = useState([
    {
      name: 'DOOSAN 2600LY',
      serial: 'NS:152667dl',
      percent: "45%",
      loadDay: [{
        color: "#FF8C00",
        percent: 10,
      },
      { color: "#32CD32", percent: 35 }],
      programm: "xLk_051",
      sum: 124230
    },
    {
      name: 'DOOSAN 2700LY',
      serial: 'NS:152667dl',
      percent: "50%",
      loadDay: [{
        color: "#FF8C00",
        percent: 10,
      },
      { color: "#32CD32", percent: 35 }],
      programm: "xLk_051",
      sum: 124230
    },
    {
      name: 'DOOSAN 2600LY',
      serial: 'NS:152667dl',
      percent: "50%",
      loadDay: [{
        color: "#FF8C00",
        percent: 10,
      },
      { color: "#32CD32", percent: 35 }],
      programm: "xLk_051",
      sum: 124230
    },
  ]);
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
        <div className={`${s.progress_cell}`} onClick={() => setOpenModal(true)}>  <ProgressBar label={row.loadDay} />
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
  return (<div>
     <h1 className={s.title}>Перечень и загрузка оборудования</h1>
    <div className={s.filterTable}>
      <DropDownMenu width={352} refs={refDropMachines} label={"Все станки"} isOpen={isOpenMachines} setIsOpen={setIsOpenMachines} />
      <DatePicker className={s.datePicker} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateValue} onChange={setDateValue} />
      <DropDownMenu width={123} label={"Все смены"} refs={refDropChanges} isOpen={isOpenChanges} setIsOpen={setIsOpenChanges} />
      <DatePicker className={s.datePicker} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeValue} onChange={setTimeValue} />
    </div>
    <Table zebraStriped='odd' rows={filteredRows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} />
    <Modal isOpen={openModal}
      hasOverlay
      onClickOutside={() => setOpenModal(false)}
      onEsc={() => setOpenModal(false)}
    >
      <div style={{ height: "700px", width: 820,paddingLeft:"24px",paddingRight:"24px" }} onClick={() => setOpenModal(true)}>
        <h3>Подробный отчет</h3>
        <span style={{color:'#002033',fontSize:'12px',paddingTop:'16px'}}>1 смена</span>
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>
        <span style={{color:"#00203399",fontSize:"14px",whiteSpace: "nowrap"}}>00:00 - 00:59</span>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data}/>
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
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>
        <span style={{color:"#00203399",fontSize:"14px",whiteSpace: "nowrap"}}>01:00 - 01:59</span>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data}/>
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
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>
        <span style={{color:"#00203399",fontSize:"14px",whiteSpace: "nowrap"}}>02:00 - 02:59</span>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data}/>
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
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>
        <span style={{color:"#00203399",fontSize:"14px",whiteSpace: "nowrap"}}>03:00 - 03:59</span>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data}/>
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
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>
        <span style={{color:"#00203399",fontSize:"14px",whiteSpace: "nowrap"}}>04:00 - 04:59</span>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data}/>
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
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>
        <span style={{color:"#00203399",fontSize:"14px",whiteSpace: "nowrap"}}>05:00 - 05:59</span>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data}/>
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
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>
        <span style={{color:"#00203399",fontSize:"14px",whiteSpace: "nowrap"}}>06:00 - 06:59</span>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data}/>
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
        <div style={{display:'flex',width:'100%',alignItems: 'center',marginTop:16}}>
        <span style={{color:"#00203399",fontSize:"14px",whiteSpace: "nowrap"}}>07:00 - 07:59</span>

          <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginLeft:24 }}> 
          <ProgressBar label={data}/>
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
        
      </div>
    </Modal>
  </div>);
};