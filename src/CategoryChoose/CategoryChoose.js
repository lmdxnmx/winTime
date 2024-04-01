import React, { useState, useRef, useEffect } from 'react'
import s from "./CategoryChoose.module.css"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
const CategoryChoose = ({ value, setValue }) => {
    const colorRef = useRef();
    const [copyColors, setCopyColors] = useState(value)
    const [colorsOpen, setColorsOpen] = useState(false)
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
    useEffect(()=>{
        if(colorsOpen=== false){
            setValue(copyColors)
        }
    },[colorsOpen])
    return (
        <div style={{ display: 'flex',flexWrap:'wrap' }}>
            <div ref={colorRef} className={s.lineCategory} style={{ cursor: 'pointer' }} onClick={() => setColorsOpen(!colorsOpen)}><span style={{ color: "#00203399", fontSize: 20 }}>+</span></div>
            <DropDownMenu width={0} value={copyColors} setValue={setCopyColors} isOpen={colorsOpen} label="" />
            {value.map((i)=>{
                return(
                    <>
            {i.active === true &&<div style={{ backgroundImage: `linear-gradient(to right, ${i.color} 6px, transparent 6px)` }} className={s.lineCategory}>{i.label}</div>}
            </>
                )
            })}
        </div>
    )
}

export default CategoryChoose