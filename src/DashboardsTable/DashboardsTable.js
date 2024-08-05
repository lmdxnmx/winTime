import React, { useState, useEffect } from 'react'
import SwitchButtons from '../CommonComponents/SwitchButtons'
import DashboardTableItem from '../DashboardTableItem/DashboardTableItem'
import s from "./DashboardsTable.module.css"
import { Table } from '@consta/uikit/Table'
import axios from 'axios'

const DashboardsTable = ({ name, changeData }) => {
  const [tableState, setTableState] = useState([{ name: "Инфографика", active: true, size: 12 }, { name: "Таблица", active: false, size: 12 }])
  const [filteredRows, setFilteredRows] = useState([])
  const [users, setUsers] = useState([])
  const [columns, setColumns] = useState([
    {
      title: 'ФИО',
      accessor: 'name',
      align: 'left',
      sortable: true,
      width: 186
    }
  ])

  const today = new Date()
  const year = today.getFullYear()
  const dayQeary = String(today.getDate()).padStart(2, '0')
  const monthQearu = String(today.getMonth() + 1).padStart(2, '0')
  let currentDate = `${year}-${monthQearu}-${dayQeary}`

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_QUERY_MAIN}workers`, {
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        }
      })
      const usersData = response.data.users
      const updatedUsers = await Promise.all(usersData.map(async (user) => {
        const userWorkTime = await fetchUserWorkTime(user.username)
        return { ...user, data: userWorkTime }
      }))
      setUsers(updatedUsers)
      updateFilteredRowsAndColumns(updatedUsers)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserWorkTime = async (username) => {
    let newDate = currentDate
    let newStartTime = '00:00'
    let newFinishTime = '23:59'
    if (changeData !== null) {
      if (changeData.date !== null) {
        const dateObj = new Date(changeData.date)
        const year = dateObj.getFullYear()
        const month = String(dateObj.getMonth() + 1).padStart(2, '0')
        const day = String(dateObj.getDate()).padStart(2, '0')
        newDate = `${year}-${month}-${day}`
      }
      if (changeData.startTime !== null) {
        newStartTime = changeData.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      if (changeData.finishTime !== null) {
        newFinishTime = changeData.finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QUERY_MAIN}worker/${username}/worktime?from=${newDate}T${newStartTime}&to=${newDate}T${newFinishTime}`,
        {
          headers: {
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
          }
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      return {}
    }
  }

  const updateFilteredRowsAndColumns = (usersData) => {
    const uniqueColumns = new Map()

    const newFilteredRows = usersData.map(user => {
      const workTimeData = user.data || {}
      const row = { name: user.fullname }
      Object.keys(workTimeData).forEach(key => {
        row[key] = `${workTimeData[key]?.time?.toFixed(2) || 0} ч.`
        if (!uniqueColumns.has(key)) {
          uniqueColumns.set(key, workTimeData[key]?.name || key)
        }
      })
      return row
    })

    const newColumns = [
      {
        title: 'ФИО',
        accessor: 'name',
        align: 'left',
        sortable: true,
        width: 186
      },
      ...Array.from(uniqueColumns.entries()).map(([key, name]) => ({
        title: name,
        accessor: key,
        align: "center",
        sortable: true,
        width: 100
      }))
    ]

    setFilteredRows(newFilteredRows)
    setColumns(newColumns)
  }

 

  useEffect(() => {
    fetchData()
  }, [changeData])

  return (
    <div className={s.tableDashboard} style={{ marginLeft: name === "Фрезерные станки" ? 16 : 0, width: name === "Фрезерные станки" ? "100%" : "" }}>
      <h1 className={s.title}>{name}</h1>
      <div style={{ width: 157 }}> <SwitchButtons val={tableState} setVal={setTableState} /></div>
      <div className={s.itemWrapper}>
        {tableState[0].active && users.length > 0 &&
          users.map((user) => {
            return (
              <DashboardTableItem changeData={changeData} key={user.id} name={user.fullname} username={user.username} data={user.data} />
            )
          })
        }
        {tableState[1].active && columns.length > 1 ? 
         <Table size="xs" zebraStriped='odd' rows={filteredRows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} width={"100%"} /> : tableState[1].active && <span>Данных нет</span>}
      </div>
    </div>
  )
}

export default DashboardsTable
