import React, { useEffect, useState } from 'react';
import { Table } from '@consta/uikit/Table';
import ProgressBar from '../ProgressBar/ProgressBar';
import s from "./../TableItem/TableItem.module.css"
import {
    TableTextFilter,
    TableNumberFilter,
    TableChoiceGroupFilter,
} from '@consta/uikit/Table';

export const TableConsta = () => {
    const [value, setValue] = useState("");
    const [rows,setRows] = useState([
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
 
    useEffect(()=>{
       if(value !== ""){
        const filtered = rows.filter((i)=>i.name === value)
        setRows(filtered)
       }
    },[value])
    return (<div>
        <div><div onClick={()=>setValue("DOOSAN 2700LY")}>SET</div></div>
        <Table zebraStriped='odd'  rows={rows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} />
    </div>);
};
