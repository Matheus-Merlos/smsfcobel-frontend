/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import './Style.css';
import { useSelector } from 'react-redux';
import menuIcon from './img/grid_icon.png';
import userIcon from './img/user_icon_white.png';

import Menu from '../Menu';
import UserMenu from '../UserMenu';

export default function Funcionarios() {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [userMenuIsVisible, setUserMenuIsVisible] = useState(false);

  function changeMenuVisibility() {
    setMenuIsVisible(!menuIsVisible);
  }

  function changeUserMenuVisibility() {
    setUserMenuIsVisible(!userMenuIsVisible);
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
            onClick={changeMenuVisibility}
            onKeyDown={(e) => {
              if (e.key === 'm') {
                changeMenuVisibility();
              }
            }}
          />
          <h1>{currentMenu}</h1>
        </div>
        <div
          className="cabecalio-part"
          id="perfil"
          onClick={changeUserMenuVisibility}
          onKeyDown={(e) => {
            if (e.key === 'u') {
              changeUserMenuVisibility();
            }
          }}
        >
          <img src={userIcon} alt="Foto de perfil" />
          <h1>
            {userName.length >= 15 ? `${userName.slice(0, 15)}...` : userName}
          </h1>
        </div>
      </header>
      <div id="user-menus">
        <div>
          <div className={`modal ${menuIsVisible ? 'fade-in' : ''}`}>
            {menuIsVisible && <Menu />}
          </div>
        </div>
        <div>
          <div className={`user-modal ${userMenuIsVisible ? 'fade-in' : ''}`}>
            {userMenuIsVisible && <UserMenu />}
          </div>
        </div>
      </div>
    </>
  );
}
