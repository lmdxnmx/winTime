import React from 'react'
import s from "./Report.module.css"
import ProgressBar from '../ProgressBar/ProgressBar'
const DetailedReport = () => {
    return (
        <div className={s.modalBackground}>
            <div className={s.modalContainer}>
                <h1 className={s.title}>Подробный отчет</h1>
                <span className={s.text}>1 смена</span>
                <div className={s.detailProgress}>
                    <span className={s.detailTime}>00:00 - 00:59</span>
                    <div className={s.progress_cell}><ProgressBar />
                        <div className={s.load_time}>
                            <span>00</span>
                            <span>10</span>
                            <span>20</span>
                            <span>30</span>
                            <span>40</span>
                            <span>50</span>
                            <span>60</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailedReport