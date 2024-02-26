import React from "react";
import s from "./TableItem.module.css";
const TableTitleItem = ({
  title,
  serial,
  programm,
  loadDay,
  sum,
  loadPercentage,
}) => {
  return (
    <div className={s.itemCointainer}>
      <div className={`${s.cell} ${s.title_cell}`} style={{borderTop:0,borderBottom:0}}>
        <span style={{ color: "#4E6170" }}>{title}</span>
      </div>
      <div className={`${s.cell} ${s.serial_cell}`} style={{borderTop:0,borderBottom:0}}>
        <span style={{ color: "#4E6170" }}>{serial}</span>
      </div>
      <div className={`${s.cell} ${s.programm_cell}`} style={{borderTop:0,borderBottom:0}}>
        <span style={{ color: "#4E6170" }}>{programm}</span>
      </div>
      <div className={`${s.cell} ${s.progress_cell}`} style={{borderTop:0,borderBottom:0}}>{loadDay}</div>
      <div className={`${s.cell} ${s.sum_cell}`} style={{borderTop:0,borderBottom:0}}>
        <span style={{ color: "#4E6170" }}>{sum}</span>
      </div>
      <div className={`${s.cell} ${s.loadPercentage_cell}`} style={{borderTop:0,borderBottom:0}}>
        <span style={{ color: "#4E6170" }}>{loadPercentage}</span>
      </div>
    </div>
  );
};

export default TableTitleItem;
