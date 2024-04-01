import React from 'react'
import { DonutChart } from '../Charts/DonutChart'
import s from "./OnlineDonutItem.module.css"
const OnlineDonutItem = () => {
    return (
        <div className={s.itemContainer}>
            <h1 className={s.titleItem}>VS-2050/400- Tech</h1>
            <div className={s.wrapperInfo} style={{borderTop:"1px solid #00416633",borderBottom:"1px solid #00416633",padding:"8px 0 8px 0",marginBottom:"8px"}}>
                <span>Сотрудник</span>
                <span>Петров Константин</span>
            </div>
            <div style={s.wrapperInfoEquipment}>
                <div className={s.wrapperInfo}>
                    <span>Статус</span>
                    <span style={{color:"#32CD32"}}>Работает</span>
                </div>
                <div className={s.wrapperInfo}>
                    <span>Текущий цикл</span>
                    <span>37 473 892 шт.</span>
                </div>
                <div className={s.wrapperInfo}>
                    <span>Задание в МК</span>
                    <span>50 000 000 шт.</span>
                </div>
                <div className={s.wrapperInfo}>
                    <span>Время текущего цикла</span>
                    <span>45.6 с.</span>
                </div>
                <div className={s.wrapperInfo}>
                    <span>Циклов за смену</span>
                    <span>4000</span>
                </div>
                <div className={s.wrapperInfo}>
                    <span>Название ПФ</span>
                    <span>Vilka 257-03</span>
                </div>
                <div className={s.wrapperInfo} style={{borderBottom:"1px solid #00416633",paddingBottom:"8px",marginBottom:"8px"}}>
                    <span>Наработка ПФ</span>
                    <span>128 ч.</span>
                </div>
            </div>
            <div className={s.donutContainer}>
            <DonutChart />
            </div>
            <div className={s.buttonInfo}>Подробнее</div>
        </div>
    )
}

export default OnlineDonutItem