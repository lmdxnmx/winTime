import React from 'react'
import OnlineDonutItem from '../OnliteDonutItem/OnlineDonutItem'
import "./Pages.css"
const OnlineChartPage = () => {
  return (
    <>
    <h1 className="title">Онлайн мониторинг оборудования</h1>
    <div className="onlineItemsWrapper">
    <OnlineDonutItem/>
    <OnlineDonutItem/>
    <OnlineDonutItem/>
    <OnlineDonutItem/>
    <OnlineDonutItem/>
    <OnlineDonutItem/>
    <OnlineDonutItem/>
    <OnlineDonutItem/>
    <OnlineDonutItem/>
    <OnlineDonutItem/>
    </div>
    </>
   )
}

export default OnlineChartPage