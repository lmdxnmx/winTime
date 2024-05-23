import React, { useState, useRef, useEffect } from 'react';
import s from "./dropDownMenu.module.css";
import { Checkbox } from '@consta/uikit/Checkbox';
import { IconArrowDown } from "@consta/icons/IconArrowDown"
import { IconArrowUp } from "@consta/icons/IconArrowUp"
const DropDownMenu = ({ label, refs, width, isOpen, setIsOpen, value, setValue,machines, setFilteredRows, rows, changes, setChanges }) => {
    const [valueMachines, setValueMachines] = useState([
        { label: "DOOSAN 2600LY", active: true, id: 1 }, 
        { label: "DOOSAN 2700LY", active: true, id: 2 },
    ]);
    const [valueChanges, setValueChanges] = useState([
        { change: "1 смена", active: true, id: 1 }, 
        { change: "2 смена", active: true, id: 2 },
        { change: "3 смена", active: true, id: 3 }
    ]);
    useEffect(() => {
        if (machines?.length > 0) {
          const newValueMachines = machines.map(machine => ({
            label: machine.name, 
            active: true, 
            id: machine.id, 
          }));
      
          setValueMachines(newValueMachines);
        }
      }, [machines]);
      useEffect(()=>{
        console.log("?///////////412412", changes)
        if (changes?.length > 0) {
            const newValueChanges = changes.map(change => ({
              change: change.change, 
              active: change.active, 
              id: change.id, 
              startTime: change.startTime,
              finishTime:change.finishTime,
            }));
        
            setValueChanges(newValueChanges);
          }
      },[changes])
  useEffect(()=>{
    console.log(valueChanges)
  },[valueChanges])

    const handleMenuClick = (event) => {
        event.stopPropagation();
    };

    const getItemMachinesOnClick = (item) => {
        setValueMachines(prevValue => prevValue.map(prevItem => prevItem.id === item.id ? { ...prevItem, active: !prevItem.active } : prevItem));
        const activeMachines = valueMachines.map(change => change.id === item.id ? { ...change, active: !change.active } : change);
        const filtered = rows.filter(row => activeMachines.find(machine => machine.label === row.name && machine.active));
        setFilteredRows(filtered);
    };
    const getItemChangesOnClick = (item) => {
        setValueChanges(prevValue => prevValue.map(prevItem => prevItem.id === item.id ? { ...prevItem, active: !prevItem.active } : prevItem))
        const activeChanges = valueChanges.map(machine => machine.id === item.id ? { ...machine, active: !machine.active } : machine);
        setChanges(activeChanges)
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
           {label !== "" && <div className={s.filterLabel} style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} onClick={() => {
                setIsOpen(!isOpen)}}>
                {label}
                {(isOpen && label === "Все станки") || (isOpen &&  label === "Все смены") ? <IconArrowUp size='xs'/>: <IconArrowDown size='xs'/>}
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
                            <span>{item.change}</span>
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