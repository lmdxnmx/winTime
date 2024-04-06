import React, { useRef, useState } from "react";
import OnlineDonutItem from "../OnliteDonutItem/OnlineDonutItem";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { DonutChart } from "../Charts/DonutChart";
import ProgressBar from "../ProgressBar/ProgressBar";
import ButtonBlock from "../CommonComponents/ButtonBlock";
import { Table } from '@consta/uikit/Table';
import SwitchButtons from "../CommonComponents/SwitchButtons";
const OnlineItemPage = () => {
  const refDropChanges = useRef(null);
  const [isOpenChanges, setIsOpenChanges] = useState(false);
  const data =[{
    color: "#FF8C00",
    percent: 10,
  },
  { color: "#32CD32", percent: 35 }]
  const [rows, setRows] = useState([
    {
      name: 'Программа выполняется',
      serial: 'CTGS 46999948 9494030 VTULKA',
      programm: "Значение 1",
    },
    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },    {
        name: 'Программа выполняется',
        serial: 'CTGS 46999948 9494030 VTULKA',
        programm: "Значение 1",
      },
  ]);
  const columns = [
    {
      title: 'Наименование',
      accessor: 'name',
      align: 'left',
      sortable: true,
      width:300
    },
    {
      title: 'Значение',
      accessor: 'serial',
      align: "center",
      sortable: true,
      width:300

    },
    {
      title: 'ПРОГРАММА',
      accessor: 'programm',
      align: "center",
      sortable: true,
      width:200

    },
  ];
  const [filteredRows, setFilteredRows] = useState(rows)
  const [typeVal, setTypeVal] = useState([{ name: "Смена", active: true, size: 16 }, 
   { name: "День", active: false, size: 16 },{ name: "Вызов", active: false, size: 16 }])
  return (
    <div className="onlineItemContainer">
      <div></div>
      <div style={{display:'flex',flex:1}}>
        <OnlineDonutItem fullSize={true} />
      </div>
      <div style={{display:'flex',flex:5}}>
        <div className="onlineItemCentWrapper" >
          <div style={{maxWidth:'35%'}}>
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
            <DonutChart />
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
      <div style={{display:'flex',flex:6}}>
        <div className="tableBtnContainer">
          <div className="buttonWrapperOnline">
            <ButtonBlock name={"Шпендель"} />
            <ButtonBlock name={"Режим работы"} />
            <ButtonBlock name={"Технология"} />
            <ButtonBlock name={"Коды"} />
            <ButtonBlock name={"Координаты АБС"} />
            <ButtonBlock name={"Координаты АБС"} />
            <ButtonBlock name={"Координаты (маш.)"} />
            <ButtonBlock name={"Счётчики"} />
            <ButtonBlock name={"Инструмент"} />
            <ButtonBlock name={"Время"} />
            <ButtonBlock name={"Простой"} />
            <ButtonBlock name={"Нагрузка"} />
          </div>
          <div style={{maxWidth:"100%"}}>
          <Table size="s" zebraStriped='odd' rows={filteredRows} columns={columns} borderBetweenRows={true} borderBetweenColumns={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineItemPage;
