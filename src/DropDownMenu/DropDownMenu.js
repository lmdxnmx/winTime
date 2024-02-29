import React,{useState, useRef} from 'react'
import s from "./dropDownMenu.module.css"
import { Checkbox } from '@consta/uikit/Checkbox';
import {ContextMenu} from '@consta/uikit/ContextMenu'

const DropDownMenu = ({label,name,refs, width}) => {
    const [value, setValue] = useState([{ label: "DOOSAN 2600LY", active: true, id: 1 }, { label: "DOOSAN 2700LY", active: true, id: 2 },]);
    const [isOpen, setIsOpen] = useState("");
    const getItemOnClick = (item) => {
        setValue(prevValue=> prevValue.map(prevItem => prevItem.id === item.id ? {...prevItem, active : !prevItem.active} : prevItem))
    };
    function renderLeftSide(item) {
        return <Checkbox size="m" align='center' view='primary' checked={item.active} />;
    }
  return (
   <div style={{width:width}} className={s.filterButton}>
       <div className={s.filterLabel} ref={refs} onClick={() => {
                if (isOpen !== name)
                    setIsOpen(name)
                else {
                    setIsOpen("")
                }
            }}>
                {label}
            </div>
    <div className={s.dropDown} style={{display:isOpen === name ?"" : "none"}}>
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