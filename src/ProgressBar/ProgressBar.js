import React from 'react';
import s from "./ProgressBar.module.css"
const ProgressBar = ({label, date}) => {
  return (
    <>
    <div className={s.container}>
      {label?.map((i)=>{
        return(
<div className={s.progress} style={{width:`${i.percent}%`,backgroundColor:i.color}}></div>

        )
      })}
       
    </div>
          <div className={s.load_time}>
          {date?.map((i)=>{
           return(<span>{i}</span>)
          })}
          </div>
    </>
  );
};

export default ProgressBar;
