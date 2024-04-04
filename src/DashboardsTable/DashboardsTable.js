import React, { useState } from 'react'
import SwitchButtons from '../CommonComponents/SwitchButtons'
import DashboardTableItem from '../DashboardTableItem/DashboardTableItem'
import s from "./DashboardsTable.module.css"
import { Table } from '@consta/uikit/Table';
const DashboardsTable = ({ name }) => {
  const [tableState, setTableState] = useState([{ name: "Инфографика", active: true, size: 12 }, { name: "Таблица", active: false, size: 12 }])
  const [rows, setRows] = useState([
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
    {
      name: 'Дегтярев П.А',
      serial: '450 ч.',
      programm: "350 ч.",
      work:"350 ч.",
      stop:"50 ч.",
      broke:"50 ч."
    },
  ]);
  const columns = [
    {
      title: 'ФИО',
      accessor: 'name',
      align: 'left',
      sortable: true,
      width:186
    },
    {
      title: 'ВСЕГО',
      accessor: 'serial',
      align: "center",
      sortable: true,
      width:66,
    },
    {
      title: 'ПРОИЗВОД.',
      accessor: 'programm',
      align: "center",
      sortable: true,
      width:93

    },
    {
      title: 'РАБОТА',
      accessor: 'work',
      align: "center",
      sortable: true,
      width:72
    },
    {
      title: 'ПРОСТОЙ',
      accessor: 'stop',
      align: "center",
      sortable: true,
      width:83,
      fontSize:10
    },
    {
      title: 'АВАРИЯ',
      accessor: 'broke',
      align: "center",
      sortable: true,
      width:88
    },
  ];
  const [filteredRows, setFilteredRows] = useState(rows)
  return (
    <div className={s.tableDashboard} style={{ marginLeft: name === "Фрезерные станки" ? 16 : 0,width:name === "Фрезерные станки" ? "100%" : "" }}>
      <h1 className={s.title}>{name}</h1>
      <SwitchButtons val={tableState} setVal={setTableState} />
      <div className={s.itemWrapper}>
        {tableState[0].active &&
          <>
            <DashboardTableItem />
            <DashboardTableItem />
            <DashboardTableItem />
            <DashboardTableItem />
            <DashboardTableItem />
            <DashboardTableItem />
          </>}
          {tableState[1].active && <Table size="xs" zebraStriped='odd' rows={filteredRows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} width={"100%"}/>}
      </div>
    </div>
  )
}

export default DashboardsTable