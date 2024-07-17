import React,{useEffect, useState} from 'react'
import { DonutChartOnline } from '../Charts/DonutChartOnline'
import s from "./OnlineDonutItem.module.css"
import {useNavigate} from "react-router-dom"
import Camera from "./../images/Camera.svg"
import IBlock from "./../images/iBlock.svg"
import Play from "./../images/Play.svg"
import ICircle from "./../images/iCircle.svg"
import Stanok from "./../images/Stanok.png"
import axios from "axios"
const OnlineDonutItem = ({fullSize, machineName, worker, state}) => {
    const color = JSON.parse(localStorage.getItem("colors")).filter((i)=>i.name === state);
    const navigate = useNavigate();
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    const [slugs,setSlugs] = useState([]);
    const [pieData, setPieData] = useState(null);
    let currentDate = `${year}-${month}-${day}`;
    const fetchData = async()=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_QUERY_MAIN}machine/${machineName.toLowerCase().replace(" ", "")}/all-states`);
            const newStates = response.data.states;
            setSlugs(newStates.map(newState => ({
              label: newState.name,
              color: newState.color,
              active: true,
              id: newState.id,
              slug: newState.slug
            })));
            
          } catch (error) {
            console.error(error);
            setSlugs([]);
          }
    }
    const fetchPie = async(slug)=>{
        const response = await axios.post(`${process.env.REACT_APP_QUERY_MAIN}machines/pie-view/`, {
            "machines": [machineName.toLowerCase().replace(" ", "")],
            "states": slug,
            "from": `${currentDate}T00:00`,
            "to": `${currentDate}T23:59`
          }, {
            headers: {
              'access-control-allow-origin': '*',
              'access-control-allow-credentials': 'true',
            }
          });
          console.log(response)
          setPieData(response?.data)
    }
    useEffect(()=>{
      if(slugs.length> 0){
        const slug = slugs.map(category => category.slug);
       fetchPie(slug)
      }
    },[slugs])
    useEffect(()=>{
        fetchData()
    },[machineName])
    return (
    <div className={s.itemContainer} style={{border: `2px solid ${color[0]?.color}`}}>
            {fullSize === true && <div className={s.imageContainer}><img src={Stanok}/></div>}
            <h1 className={s.titleItem}>{machineName}</h1>
            <div className={s.wrapperInfo} style={{borderTop:"1px solid #00416633",borderBottom:"1px solid #00416633",padding:"8px 0 8px 0",marginBottom:"8px"}}>
                <span>Сотрудник</span>
                <span>{worker}</span>
            </div>
            <div style={s.wrapperInfoEquipment}>
                <div className={s.wrapperInfo}>
                    <span>Статус</span>
                    <span style={{color:color[0]?.color}}>{state}</span>
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
            {pieData !== null &&<DonutChartOnline pieData={pieData} slugs={slugs}/>}
            </div>
            {fullSize === true && <div className={s.iconsWrapper}>
                <div className={s.iconBlock}><img src={Camera}/></div>
                <div className={s.iconBlock}><img src={IBlock} /></div>
                <div className={s.iconBlock}><img src={Play}/></div>
                <div className={s.iconBlock}><img src={ICircle}/></div>
                </div>}
            {fullSize !== true &&<div onClick={()=>navigate(machineName.replace(" ", ""),{state:{pieData:pieData, slugs:slugs}})} className={s.buttonInfo}>Подробнее</div>}
        </div>
    )
}

export default OnlineDonutItem