import React from 'react';
import s from "./ProgressBar.module.css"
const ProgressBar = ({label}) => {
  return (
    <div className={s.container}>
      {label?.map((i)=>{
        return(
<div className={s.progress} style={{width:`${i.percent}%`,backgroundColor:i.color}}></div>
        )
      })}
    </div>
  );
};

export default ProgressBar;
