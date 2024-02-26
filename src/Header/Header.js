import React from 'react'
import s from "./Header.module.css"
import {Avatar} from "antd"
import logo from "./../images/WINTIME.svg"
import ring from "./../images/Ring.svg"
import avatar from "./../images/Avatar.svg"
const Header = () => {
  return (
    <div className={s.headerContainer}>
       <div className={s.headerLogo}><img src={logo}/></div>
       <div className={s.headerAvatar}>
               <img src={ring} className={s.ring}/>
               <Avatar className={s.avatar} size={'large'} src={avatar}/>
       </div>
    </div>
  )
}

export default Header