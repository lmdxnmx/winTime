import React, { useState } from 'react';
import s from "./ProgressBar.module.css";
import ReactDOM from 'react-dom';
const ProgressBar = ({ label, date, viewTooltip }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, color: '#000', start:"", end:"", status:"", machineName:"" });

  const handleMouseOver = (e,color, start, end, status,machineName) => {
    const startDate = new Date(start);
    const endDate = new Date(end)
    const formatTime = (time) => time.toString().padStart(2, '0');
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      color,
      start: `${formatTime(startDate.getUTCHours())}:${formatTime(startDate.getUTCMinutes())}`,
      end: `${formatTime(endDate.getUTCHours())}:${formatTime(endDate.getUTCMinutes())}`,
      status,
      machineName
    });
  };

  const handleMouseMove = (e) => {
    if (tooltip.visible) {
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    }
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, x: 0, y: 0,color: '#000', start:"", end:"", status:"",machineName:"" });
  };
  const tooltipElement = tooltip.visible ? (
    <div
      className={s.tooltip}
      style={{ top: `${tooltip.y - 6}px`, left: `${tooltip.x + 77}px` }}
    >
    <span className={s.tooltipInfo} style={{fontWeight:600,paddingBottom:12}}>{tooltip.machineName}</span>
    <div style={{display:"flex", paddingBottom:12}}><div className={s.colorCircle} style={{backgroundColor:tooltip.color}}></div><span className={s.tooltipInfo}>{tooltip.status}</span></div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'nowrap', paddingBottom:4}}>
      <span className={s.tooltipInfo}>Время начала:</span><span style={{paddingLeft:5}} className={s.tooltipInfo}>{tooltip.start}</span></div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', flexWrap:'nowrap', paddingBottom:4}}>
      <span className={s.tooltipInfo}>Время завершения:</span><span style={{paddingLeft:5}} className={s.tooltipInfo}>{tooltip.end}</span></div>
      <div className={s.tooltipArrow}></div>
    </div>
  ) : null;
  return (
    <>
      <div className={s.container}>
        {label?.map((i, index) => {
          return (
            <div
              key={index}
              className={s.progress}
              style={{ width: `${i.percent}%`, backgroundColor: i.color, minWidth:1 }}
              onMouseOver={(e) => handleMouseOver(e, i.color, i.start, i.end, i.status, i.machineName)}
              onMouseMove={handleMouseMove}
              onMouseOut={handleMouseOut}
            ></div>
          );
        })}
      </div>
      <div className={s.load_time}>
        {date?.map((time, index) => (
          <React.Fragment key={index}>
            <span style={{ fontSize: 12 }}>{time}</span>
          </React.Fragment>
        ))}
      </div>

       {viewTooltip === true && ReactDOM.createPortal(tooltipElement, document.body)}
    </>
  );
};

export default ProgressBar;
