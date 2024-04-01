import React, { useState, useRef, useEffect } from 'react';
import s from "./dropDownMenu.module.css";
import { Checkbox } from '@consta/uikit/Checkbox';

const DropDownMenu = ({ label, refs, width, isOpen, setIsOpen, value, setValue }) => {
    const [valueMachines, setValueMachines] = useState([
        { label: "DOOSAN 2600LY", active: true, id: 1 }, 
        { label: "DOOSAN 2700LY", active: true, id: 2 },
    ]);
    const [valueChanges, setValueChanges] = useState([
        { label: "1 смена", active: true, id: 1 }, 
        { label: "2 смена", active: true, id: 2 },
        { label: "3 смена", active: true, id: 3 }
    ]);

    const handleMenuClick = (event) => {
        event.stopPropagation();
    };

    const getItemMachinesOnClick = (item) => {
        setValueMachines(prevValue => prevValue.map(prevItem => prevItem.id === item.id ? { ...prevItem, active: !prevItem.active } : prevItem))
    };

    const getItemChangesOnClick = (item) => {
        setValueChanges(prevValue => prevValue.map(prevItem => prevItem.id === item.id ? { ...prevItem, active: !prevItem.active } : prevItem))
    };
   const getItemColorsOnClick = (item) =>{

    if(value.filter((i)=>i.active === true).length !== 1){
    setValue(prevValue =>
        prevValue.map(prevItem =>
            prevItem.id === item.id ? { ...prevItem, active: !prevItem.active } : prevItem
        )
    );}else{
        setValue(prevValue =>
            prevValue.map(prevItem =>
                prevItem.id === item.id ? { ...prevItem, active: true } : prevItem
            )
        )
    }
    }

    return (
        <div ref={refs} style={{ width: width, position:'relative' }} className={label !== "" && s.filterButton}>
           {label !== "" && <div className={s.filterLabel} onClick={() => setIsOpen(!isOpen)}>
                {label}
            </div>}
            <div  className={s.dropDown} style={{ display: isOpen === true  ? "" : "none", right:label === "" ? "40px" : "", width:label === "" ? "" :"100%" }} onClick={handleMenuClick}>
                {label === "Все станки" && 
                    valueMachines.map((item) => (
                        <div key={item.id} onClick={() => getItemMachinesOnClick(item)} className={s.dropDownItem}>
                            <Checkbox checked={item.active} className={s.dropDownCheckbox} />
                            <span>{item.label}</span>
                        </div>
                    ))
                }
                {label === "Все смены" && 
                    valueChanges.map((item) => (
                        <div key={item.id} onClick={() => getItemChangesOnClick(item)} className={s.dropDownItemChanges}>
                            <Checkbox checked={item.active} className={s.dropDownCheckbox} />
                            <span>{item.label}</span>
                        </div>
                    ))
                }
                {label === "" &&
                   value.map((item) => (
                    <div key={item.id} style={{minWidth:400}} onClick={() => getItemColorsOnClick(item)} className={s.dropDownItemChanges}>
                        <Checkbox checked={item.active} className={s.dropDownCheckbox} />
                        <div style={{backgroundColor:item.color}} className={s.dropDownCircle}></div>
                        <span style={{whiteSpace:'nowrap'}}>{item.label}</span>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default DropDownMenu;