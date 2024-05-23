import React, { useState, useRef, useEffect } from 'react'
import s from "./CategoryChoose.module.css"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import x from "./../images/X.svg"
import { DatePicker } from '@consta/uikit/DatePicker';
import Calendar from "./../images/Calendar.svg"

const CategoryChoose = ({ value, setValue, dateValue, setDateValue, changes, setChanges }) => {
    const [isOpen, setIsOpen] = useState(false);
    const colorRef = useRef();
    const [copyColors, setCopyColors] = useState(value)
    const [colorsOpen, setColorsOpen] = useState(false)
    const [isOpenChanges, setIsOpenChanges] = useState(false);
    const refDropChanges = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorRef.current && !colorRef.current.contains(event.target)) {
                setColorsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (colorsOpen === false) {
            setValue(copyColors)
        }
    }, [colorsOpen])
    const handleRemoveItem = (index) => {
        if (value.filter((i) => i.active === true).length > 1) {
            const updatedCopyColors = value.map((item, i) => {
                if (i === index) {
                    return { ...item, active: false };
                }
                return item;
            });
            setValue(updatedCopyColors);
        }
    };
    useEffect(() => {
        setCopyColors(value)
    }, [value])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (refDropChanges.current && !refDropChanges.current.contains(event.target)) {
                setIsOpenChanges(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div ref={colorRef} className={s.lineCategory} style={{ cursor: 'pointer' }} onClick={() => setColorsOpen(!colorsOpen)}><span style={{ color: "#00203399", fontSize: 20 }}>+</span></div>
                <DropDownMenu width={0} value={copyColors} setValue={setCopyColors} isOpen={colorsOpen} label="" />
                {value.map((i, index) => {
                    return (
                        <>
                            {i.active === true && <div style={{ backgroundImage: `linear-gradient(to right, ${i.color} 6px, transparent 6px)` }} className={s.lineCategory}>
                                <span style={{ fontSize: 12, color: "#00395CCC", fontWeight: 400 }}>{i.label}</span>
                                {value.filter((i) => i.active === true).length > 1 && <img style={{ paddingTop: 2, paddingLeft: 5, cursor: "pointer" }} src={x} onClick={() => handleRemoveItem(index)} />}
                            </div>}
                        </>
                    )
                })}
            </div>
            <div style={{ display: 'flex' }}>
                <DropDownMenu width={120} label={"Все смены"} refs={refDropChanges} isOpen={isOpenChanges} setIsOpen={setIsOpenChanges} setChanges={setChanges} />
                <div style={{ position: "relative" }}>
                    <DatePicker style={{ width: 100, marginRight: 10 }} className={s.datePicker} size="s" placeholder="Сегодня" dropdownOpen={isOpen} type="date" value={dateValue} onChange={setDateValue} />
                    <img style={{ position: "absolute", top: '37.5%', right: "22%" }} src={Calendar} width={10} height={10} />
                </div>
            </div>
        </div>
    )
}

export default CategoryChoose