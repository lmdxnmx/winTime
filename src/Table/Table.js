import React from "react";
import TableItem from "../TableItem/TableItem";
import TableTitleItem from "../TableItem/TableTitleItem";
import s from './Table.module.css'
const Table = () => {
    const data = [{
        title:"DOOSAN 2600LY",
        serial:"NS:152667dl",
        programm:"xLk_051",
        loadDay:[{
            color:"#FF8C00",
            percent:10,
    },
    {color:"#32CD32",percent:35}],
        sum:"124230",
        loadPercentage:45
    },{
        title:"DOOSAN 2600LY",
        serial:"NS:152667dl",
        programm:"xLk_051",
        loadDay:[{
            color:"#FF8C00",
            percent:10,
    },
    {color:"#32CD32",percent:35}],
        sum:"124230",
        loadPercentage:45
    },{
        title:"DOOSAN 2600LY",
        serial:"NS:152667dl",
        programm:"xLk_051",
        loadDay:[{
            color:"#FF8C00",
            percent:10,
    },
    {color:"#32CD32",percent:45}],
        sum:"124230",
        loadPercentage:55
    },{
        title:"DOOSAN 2600LY",
        serial:"NS:152667dl",
        programm:"xLk_051",
        loadDay:[{
            color:"#FF8C00",
            percent:10,
    },
    {color:"#32CD32",percent:35}],
        sum:"124230",
        loadPercentage:45
    }]
  return (
    <div>
        <h1 className={s.title}>Перечень и загрузка оборудования</h1>
      <div></div>
      <div>
        <TableTitleItem
          title={"НАЗВАНИЕ"}
          serial={"СЕРИЙНЫЙ №"}
          programm={"ПРОГРАММА"}
          loadDay={"ЗАГРУЗКА ЗА ТЕКУЩИЙ ДЕНЬ"}
          sum={"КОЛ-ВО"}
          loadPercentage={"ЗАГРУЗКА"}
        />
    {data.map((i)=>{
        return(
            <TableItem
            title={i.title}
            serial={i.serial}
            programm={i.programm}
            loadDay={i.loadDay}
            sum={i.sum}
            loadPercentage={i.loadPercentage}
          />
        )
    })}
      </div>
    </div>
  );
};

export default Table;
