import React, { useEffect, useState, useRef } from 'react';
import { Table } from '@consta/uikit/Table';
import ProgressBar from '../ProgressBar/ProgressBar';
import s from "./../TableItem/TableItem.module.css"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DatePicker } from '@consta/uikit/DatePicker';
export const TableConsta = () => {

    const [dateValue,setDateValue] = useState(null);
    const [timeValue,setTimeValue] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenChanges,setIsOpenChanges] = useState(false);
    const [isOpenMachines,setIsOpenMachines] = useState(false);

    const refDropMachines = useRef(null);
    const refDropChanges = useRef(null);
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
                <div className={`${s.progress_cell}`}>  <ProgressBar label={row.loadDay} />
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
        <div className={s.filterTable}>
          <DropDownMenu width={352} refs={refDropMachines} label={"Все станки"} isOpen={isOpenMachines} setIsOpen={setIsOpenMachines}/>
          <DatePicker className={s.datePicker} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateValue} onChange={setDateValue} />
          <DropDownMenu width={123} label={"Все смены"} refs={refDropChanges}  isOpen={isOpenChanges} setIsOpen={setIsOpenChanges}/>
          <DatePicker className={s.datePicker} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="time" value={timeValue} onChange={setTimeValue} />
        </div>
        <Table zebraStriped='odd' rows={filteredRows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} />
    </div>);
};
