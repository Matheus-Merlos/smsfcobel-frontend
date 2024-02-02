/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import './Style.css';
import { useSelector } from 'react-redux';
import menuIcon from './img/grid_icon.png';
import userIcon from './img/user_icon_white.png';

import Menu from '../Menu';

export default function Funcionarios() {
  const [isVisible, setIsVisible] = useState(false);

  function changeVisibility() {
    setIsVisible(!isVisible);
  }

  const currentMenu = useSelector(
    (state) => state.menuChangeReducer.currentMenu
  );
  const userName = useSelector((state) => state.reducer.userName);

  return (
    <>
      <header id="cabecalio">
        <div id="menu-titulo" className="cabecalio-part">
          <img
            src={menuIcon}
            alt="Menu"
            className="menu"
            onClick={changeVisibility}
            onKeyDown={(e) => {
              if (e.key === 'm') {
                changeVisibility();
              }
            }}
          />
          <h1>{currentMenu}</h1>
        </div>
        <div className="cabecalio-part" id="perfil">
          <img src={userIcon} alt="Foto de perfil" />
          <h1>
            {userName.length >= 15 ? `${userName.slice(0, 15)}...` : userName}
          </h1>
        </div>
      </header>
      <div className={`modal ${isVisible ? 'fade-in' : ''}`}>
        {isVisible && <Menu />}
      </div>
    </>
  );
}
