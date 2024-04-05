import React from 'react'
import VerticalProgressBar from '../CommonComponents/VerticalProgressBar'
import "./Stats.css"
const StatWork = () => {
  return (
    <div className='statWorkContainer'>
      <div style={{textAlign:"left"}} className='changesContainer'>
        <span className='statMesName'>Статистика станков</span>
      </div>
      <div style={{display:"flex",flexWrap:"wrap"}}>
      <div className='changesContainerWork'>
  <div className='titleWork'>
          <div style={{display:'flex',flexDirection:"column",borderBottom: "1px solid #00416633",marginBottom:8}}><span>Дегтярев П.А</span>
          <span style={{fontWeight:400}}>Токарь</span>
          <span style={{fontWeight:700,marginBottom:8}}>0.9 %</span>
          </div>
          <VerticalProgressBar width={"70%"} data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]}/>
        </div>
        <div className='infoWork'>
          <div className='infoWorkTitle'><span>SL-3295</span></div>
          <div className="wrapperCategory"><span>Статус</span><span style={{color:"#FFBE00"}}>Обслуживание</span></div>
          <div className="wrapperCategory"><span>Текущий цикл</span><span>3 892 шт.</span></div>
          <div className="wrapperCategory"><span>Задание в МК</span><span>5 000 шт.</span></div>
          <div className="wrapperCategory"><span>ВР. тек. цикла</span><span>45.6 с.</span></div>
          <div className="wrapperCategory"><span>Циклов за см.</span><span>4000</span></div>
          <div className="wrapperCategory"><span>Название ПФ</span><span>Vilka 257-03</span></div>
          <div className="wrapperCategory"><span>Наработка ПФ</span><span>128 ч.</span></div>
        </div>
        <div className='infoWork'>
          <div className='infoWorkTitle'><span>SL-3295</span></div>
          <div className="wrapperCategory"><span>Статус</span><span style={{color:"#FFBE00"}}>Обслуживание</span></div>
          <div className="wrapperCategory"><span>Текущий цикл</span><span>3 892 шт.</span></div>
          <div className="wrapperCategory"><span>Задание в МК</span><span>5 000 шт.</span></div>
          <div className="wrapperCategory"><span>ВР. тек. цикла</span><span>45.6 с.</span></div>
          <div className="wrapperCategory"><span>Циклов за см.</span><span>4000</span></div>
          <div className="wrapperCategory"><span>Название ПФ</span><span>Vilka 257-03</span></div>
          <div className="wrapperCategory"><span>Наработка ПФ</span><span>128 ч.</span></div>
        </div>
        <div className='infoWork'>
          <div className='infoWorkTitle'><span>SL-3295</span></div>
          <div className="wrapperCategory"><span>Статус</span><span style={{color:"#FFBE00"}}>Обслуживание</span></div>
          <div className="wrapperCategory"><span>Текущий цикл</span><span>3 892 шт.</span></div>
          <div className="wrapperCategory"><span>Задание в МК</span><span>5 000 шт.</span></div>
          <div className="wrapperCategory"><span>ВР. тек. цикла</span><span>45.6 с.</span></div>
          <div className="wrapperCategory"><span>Циклов за см.</span><span>4000</span></div>
          <div className="wrapperCategory"><span>Название ПФ</span><span>Vilka 257-03</span></div>
          <div className="wrapperCategory"><span>Наработка ПФ</span><span>128 ч.</span></div>
        </div>
        </div>
      <div className='changesContainerWork'>
  <div className='titleWork'>
          <div style={{display:'flex',flexDirection:"column",borderBottom: "1px solid #00416633",marginBottom:8}}><span>Дегтярев П.А</span>
          <span style={{fontWeight:400}}>Токарь</span>
          <span style={{fontWeight:700,marginBottom:8}}>0.9 %</span>
          </div>
          <VerticalProgressBar width={"70%"} data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]}/>
        </div>
        <div className='infoWork'>
          <div className='infoWorkTitle'><span>SL-3295</span></div>
          <div className="wrapperCategory"><span>Статус</span><span style={{color:"#FFBE00"}}>Обслуживание</span></div>
          <div className="wrapperCategory"><span>Текущий цикл</span><span>3 892 шт.</span></div>
          <div className="wrapperCategory"><span>Задание в МК</span><span>5 000 шт.</span></div>
          <div className="wrapperCategory"><span>ВР. тек. цикла</span><span>45.6 с.</span></div>
          <div className="wrapperCategory"><span>Циклов за см.</span><span>4000</span></div>
          <div className="wrapperCategory"><span>Название ПФ</span><span>Vilka 257-03</span></div>
          <div className="wrapperCategory"><span>Наработка ПФ</span><span>128 ч.</span></div>
        </div>
        </div>
        </div>
    </div>  )
}

export default StatWork