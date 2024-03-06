import React,{useState, useRef} from 'react'
import s from "./dropDownMenu.module.css"
import { Checkbox } from '@consta/uikit/Checkbox';
import {ContextMenu} from '@consta/uikit/ContextMenu'

const DropDownMenu = ({label, width, value,setValue}) => {
    const [isOpen, setIsOpen] = useState(false);
    const getItemOnClick = (item) => {
        setValue(prevValue=> prevValue.map(prevItem => prevItem.id === item.id ? {...prevItem, active : !prevItem.active} : prevItem))
    };
  return (
   <div style={{width:width}} className={s.filterButton}>
       <div className={s.filterLabel} onClick={() => {
              setIsOpen(!isOpen);
            }}>
                {label}
            </div>
    <div className={s.dropDown} style={{display:isOpen === true ?"" : "none"}}>
        {value.map((i)=>{
            return(
                <div onClick={()=>getItemOnClick(i)} className={s.dropDownItem}><Checkbox checked={i.active} className={s.dropDownCheckbox}/><span>{i.label}</span></div>
            )
        })}
    </div>
   </div>
  )
}

export default DropDownMenu