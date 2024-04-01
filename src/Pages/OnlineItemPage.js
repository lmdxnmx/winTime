import React, { useRef, useState } from 'react'
import OnlineDonutItem from '../OnliteDonutItem/OnlineDonutItem'
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DonutChart } from '../Charts/DonutChart';
import ProgressBar from '../ProgressBar/ProgressBar';
const OnlineItemPage = () => {
    const refDropChanges = useRef(null);
    const [isOpenChanges, setIsOpenChanges] = useState(false);
    return (
        <div className='onlineItemContainer'>
            <div>
            </div>
            <div>
                <OnlineDonutItem fullSize={true} />
            </div>
            <div>
                <div className="onlineItemCentWrapper">
                    <span style={{height:40}}>.....</span>
                    <div style={{ margin: "24px 0 24px 0" }}>
                        <DropDownMenu width={101} refs={refDropChanges} label={"1 смена"} isOpen={isOpenChanges} setIsOpen={setIsOpenChanges} />
                    </div>
                    <span className="nameChart">График загрузки станка</span>
                    <div style={{ width: "320px", height: "320px", margin: "50px 52px 64px 52px" }}><DonutChart /></div>
                    <div>
                        <span className='nameChart' style={{marginBottom:8}}>График работы станка</span>
                        <div className={`progress_bar`} style={{marginBottom:12}}>  <ProgressBar  />
                            <div className={"load_time"}>
                                <span>00:00</span>
                                <span>06:00</span>
                                <span>12:00</span>
                                <span>18:00</span>
                                <span>23:59</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnlineItemPage