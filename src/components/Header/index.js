import React from 'react';

import './Style.css';
import menuIcon from './img/grid_icon.png';
import userIcon from './img/user_icon_white.png';

export default function Funcionarios() {
  return (
    <header id="cabecalio">
      <div id="menu-titulo" className="cabecalio-part">
        <img src={menuIcon} alt="Menu" />
        <h1>Vínculos CNES/IDS</h1>
      </div>
      <div className="cabecalio-part" id="perfil">
        <img src={userIcon} alt="Foto de perfil" />
        <h1>Matheus Au...</h1>
      </div>
    </header>
  );
}
