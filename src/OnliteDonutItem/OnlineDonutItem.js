import React from 'react'
import { DonutChart } from '../Charts/DonutChart'
import s from "./OnlineDonutItem.module.css"
import {useNavigate} from "react-router-dom"
import Camera from "./../images/Camera.svg"
import IBlock from "./../images/iBlock.svg"
import Play from "./../images/Play.svg"
import ICircle from "./../images/iCircle.svg"
import Stanok from "./../images/Stanok.png"
const OnlineDonutItem = ({fullSize}) => {
    const navigate = useNavigate();
    return (
        <div className={s.itemContainer} onClick={()=>navigate("41245")}>
            {fullSize === true && <div className={s.imageContainer}><img src={Stanok}/></div>}
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
              {fullSize === true && <> <div className={s.wrapperInfo}>
                    <span>Коррекция скорости</span>
                    <span>100</span>
                </div>
                <div className={s.wrapperInfo}>
                    <span>Коррекция подачи</span>
                    <span>100</span>
                </div>
                <div className={s.wrapperInfo}>
                    <span>Сетевой статус</span>
                    <span>В сети</span>
                </div>
                <div className={s.wrapperInfo} style={{borderBottom:"1px solid #00416633",paddingBottom:"8px",marginBottom:"8px"}}>
                    <span>Время отклика</span>
                    <span>1267 мс</span>
                </div></>}
            </div>
            <div className={s.donutContainer} style={{height:fullSize !== true ? "120px" : "167px"}}>
            {fullSize === true &&<div className={s.wrapperInfo}>
                    <span>Текущая статистка за день</span>
                    <span></span>
                </div>}
            <DonutChart />
            </div>
            {fullSize === true && <div className={s.iconsWrapper}>
                <div className={s.iconBlock}><img src={Camera}/></div>
                <div className={s.iconBlock}><img src={IBlock} /></div>
                <div className={s.iconBlock}><img src={Play}/></div>
                <div className={s.iconBlock}><img src={ICircle}/></div>
                </div>}
            {fullSize !== true &&<div className={s.buttonInfo}>Подробнее</div>}
        </div>
    )
}

export default OnlineDonutItem