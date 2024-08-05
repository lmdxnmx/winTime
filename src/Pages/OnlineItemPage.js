import React, { useEffect, useRef, useState } from "react";
import OnlineDonutItem from "../OnliteDonutItem/OnlineDonutItem";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { DonutChartOnline } from "../Charts/DonutChartOnline";
import ProgressBar from "../ProgressBar/ProgressBar";
import ButtonBlock from "../CommonComponents/ButtonBlock";
import { Table } from '@consta/uikit/Table';
import SwitchButtons from "../CommonComponents/SwitchButtons";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
const OnlineItemPage = () => {
  const [signalType, setSignalType] = useState("Технология")
  const refDropChanges = useRef(null);
  const [isOpenChanges, setIsOpenChanges] = useState(false);
  const [signals, setSignals] = useState([])
  const params = useParams()
  const {state} = useLocation()
  const [machine, setMachines] = useState(null);
  const fetchData = async()=>{
    const response  = await  axios.post(`${process.env.REACT_APP_QUERY_MAIN}machines/online`, {
      "machines": [`${params.id.toLowerCase()}`],
    }, {
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
      }
    })
    setMachines(response.data)
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    console.log(machine)
  },[machine])
  const data = [{
    color: "#FF8C00",
    percent: 10,
  },
  { color: "#32CD32", percent: 35 }]
  const [rows, setRows] = useState([]);
  const columns = [
    {
      title: 'Наименование',
      accessor: 'name',
      align: 'left',
      sortable: true,
      width: 300
    },
    {
      title: 'Обозначение',
      accessor: 'serial',
      align: "center",
      sortable: true,
      width: 300

    },
    {
      title: 'Значение',
      accessor: 'value',
      align: "center",
      sortable: true,
      width: 200

    },
  ];
  const [filteredRows, setFilteredRows] = useState(rows)
  const [typeVal, setTypeVal] = useState([{ name: "Смена", active: true, size: 16 },
  { name: "День", active: false, size: 16 }, { name: "Вызов", active: false, size: 16 }])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_QUERY_MAIN}machine/${params.id.toLowerCase()}/signals/`)
      .then(response => {
        setSignals(response?.data?.signals?.Сигналы);
        console.log(response?.data)
      })
      .catch(error => {
        console.error('Ошибка при получении машин:', error);
      });
  }, []);
  useEffect(() => {
    if (signals !== null) {
      signals.forEach((signal) => {
        setRows(prevRows => [
          ...prevRows,
          { name: signal.name, serial: signal.slug, value: signal.id }
        ]);
      });
    }
  }, [signals]);

  useEffect(() => {
    setFilteredRows(rows)
  }, [rows])
  return (
    <div className="onlineItemContainer">
      <div></div>
      <div style={{ display: 'flex', flex: 1 }}>
       {machine !== null && <OnlineDonutItem fullSize={true} machineName={machine[0].machine} worker={machine[0].worker} state={machine[0].state}  />}
      </div>
      <div style={{ display: 'flex', flex: 5 }}>
        <div className="onlineItemCentWrapper" >
          <div style={{ maxWidth: '35%' }}>
            <SwitchButtons val={typeVal} setVal={setTypeVal} />
          </div>
          <div style={{ margin: "24px 0 24px 0" }}>
            <DropDownMenu
              width={101}
              refs={refDropChanges}
              label={"1 смена"}
              isOpen={isOpenChanges}
              setIsOpen={setIsOpenChanges}
            />
          </div>
          <span className="nameChart">График загрузки станка</span>
          <div
            style={{
              width: "320px",
              height: "320px",
              margin: "50px auto 64px auto",
            }}
          >
            <DonutChartOnline pieData={state.pieData} slugs={state.slugs} />
          </div>
          <div>
            <span className="nameChart" style={{ marginBottom: 8 }}>
              График работы станка
            </span>
            <div className={`progress_bar`} style={{ marginBottom: 12 }}>
              {" "}
              <ProgressBar />
              <div className={"load_time"}>
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 6 }}>
        <div className="tableBtnContainer">
          <div className="buttonWrapperOnline">
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Шпендель"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Режим работы"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Технология"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Коды"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Координаты АБС"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Координаты АБС"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Координаты (маш.)"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Счётчики"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Инструмент"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Время"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Простой"} />
            <ButtonBlock signalType={signalType} setSignalType={setSignalType} name={"Нагрузка"} />
          </div>
          <div style={{ maxWidth: "100%" }}>
            <Table size="s" zebraStriped='odd' rows={filteredRows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineItemPage;
