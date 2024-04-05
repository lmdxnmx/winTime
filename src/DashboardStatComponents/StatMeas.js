import React from 'react'
import VerticalProgressBar from '../CommonComponents/VerticalProgressBar'
import "./Stats.css"
const StatMeas = () => {
  return (
    <div className='statMesContainer'>
      <div>
        <div></div>
      </div>
      <div className='changesContainer'>
      <span>3 смена</span>
        <div className='barsWrapper'>
          <div className='barChanger'>
            <VerticalProgressBar data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]} />
          </div>
          <div className='barChanger'>
            <VerticalProgressBar data={[{ value: 50, color: "#FFF", backColor: "#FF6347", id: 1 }, { value: 350, color: "#FFF", backColor: "#77CB10", id: 2 }, { value: 50, color: "#FFF", backColor: "#FF8C00", id: 3 }]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatMeas