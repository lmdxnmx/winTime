import React from 'react'
import "./CommonComponents.css"
const ButtonBlock = ({name, signalType, setSignalType}) => {
  return (
    <div className="btnBlock" style={{backgroundColor:name === signalType ?"#00426912" : ""}} onClick={()=>setSignalType(name)}>{name}</div>
  )
}

export default ButtonBlock