import React, { useState } from "react";
import s from "./SideBar.module.css";
import Home from "../images/Home.svg";
import Charts from "../images/Charts.svg";
import Charts2 from "../images/Charts2.svg";
import Menu from "../images/Menu.svg";
import Eye from "../images/Eye.svg";
import Settings from "../images/Settings.svg";
import DashBoard from "../images/DashBoard.svg";
import Arrow from "../images/Arrow.svg";
import Isa from "../images/i.svg";
import Quest from "../images/Quest.svg";
import ReverseArrow from "../images/ReverseArrow.svg"
const SideBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(null);
  return (
    <div
      className={`${s.sideBarContainer} ${
        drawerOpen === true && s.expanding} ${drawerOpen === false && s.collapsing}
      }`}
    >
      {!drawerOpen ? (
        <>
          <div className={s.sideBarSettings}>
            <div>
              <img src={Home} width={14} height={14} />
            </div>
            <div>
              <img src={Charts} width={14} height={14.52} />
            </div>
            <div>
              <img src={Menu} width={10} height={10} />
            </div>
            <div>
              <img src={Eye} width={12} height={8} />
            </div>
            <div>
              <img src={Settings} width={14.45} height={15} />
            </div>
            <div>
              <img src={DashBoard} width={13.33} height={13.33} />
            </div>
            <div>
              <img src={Charts2} width={14.5} height={14} />
            </div>
            <div>
              <img src={Isa} width={6} height={14} />
            </div>
          </div>
          <div className={s.sideBarDraw}>
            <div>
              <img src={Quest} width={12} height={12} />
            </div>
            <div>
              <img
                onClick={() => setDrawerOpen(true)}
                src={Arrow}
                width={8}
                height={12}
              />
            </div>
          </div>
        </>
      ) : (
        <>
         <div className={`${s.sideBarSettings}`}>
        <div>
          <img src={Home} width={14} height={14} />
          <span>Главная</span>
        </div>
        <div>
          <img src={Charts} width={14} height={14.52} />
          <span >Онлайн</span>
        </div>
        <div>
          <img src={Menu} width={10} height={10} />
          <span>Дашборд</span>
        </div>
        <div>
          <img src={Eye} width={12} height={8} />
          <span>2D/3D</span>
        </div>
        <div>
          <img src={Settings} width={14.45} height={15} />
          <span>Панель оператора</span>
        </div>
        <div>
          <img src={DashBoard} width={13.33} height={13.33} />
          <span>Отчеты</span>
        </div>
        <div>
          <img src={Charts2} width={14.5} height={14} />
          <span>Анализ сигналов</span>
        </div>
        <div>
          <img src={Isa} width={6} height={14} />
          <span>FAQ</span>
        </div>
      </div>

      <div className={s.sideBarDraw} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ paddingLeft: 24 }}>
          <img src={Quest} width={12} height={12} />
        </div>
        <div style={{ paddingRight: 27 }}>
          <img
            onClick={() => setDrawerOpen(!drawerOpen)}
            src={drawerOpen ? ReverseArrow : Arrow}
            width={8}
            height={12}
          />
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
