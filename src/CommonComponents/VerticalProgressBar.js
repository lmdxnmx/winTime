import React from 'react'
import "./CommonComponents.css"
const VerticalProgressBar = ({data, width}) => {
    const sum = data.reduce((acc, val) => acc + val.value, 0);
  return (
    <div className="verticalProgressBar" style={{width:width}}>
     {data?.map((i, index)=>{
        return(
            <div key={i.id} className='verticalProgressBarVal' style={{backgroundColor:i.backColor,height:`${(i.value / sum) * 100}%`,borderRadius:data.length === 1 ? 4 :index === 0 ? "4px 4px 0 0" : index === data.length - 1 && "0 0 4px 4px"}}>
                <span style={{color:i.color}}>{i.value} ч.</span>
            </div>
        )
     })}
    </div>
  )
}

export default VerticalProgressBar