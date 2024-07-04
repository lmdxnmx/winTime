import React, {useState, useEffect} from 'react'
import OnlineDonutItem from '../OnliteDonutItem/OnlineDonutItem'
import "./Pages.css"
import axios from "axios"
const OnlineChartPage = () => {
  const [machines, setMachines] = useState([]);

  const fetchData = async()=>{
    const response  = await  axios.post(`http://192.168.1.109:8000/machines/online`, {
      "machines": ["all"],
    }, {
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
      }
    })

    setMachines(response.data)
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <h1 className="title">Онлайн мониторинг оборудования</h1>
    <div className="onlineItemsWrapper">
  {machines.map((i)=>{
    return(
      <OnlineDonutItem machineName={i.machine} state={i.state} worker={i.worker} />
    )
  })}
    </div>
    </>
   )
}

export default OnlineChartPage