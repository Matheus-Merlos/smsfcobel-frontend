import React from 'react';

import './Style.css';

import vinculoIcon from './img/vinculo_icon.png';
import vinculoPendenteIcon from './img/console.svg';

import history from '../../services/history';

export default function Menu() {
  function redirect(link) {
    history.push(link);
    history.go();
  }

  return (
    <div className="menu-principal">
      <div
        role="button"
        tabIndex="0"
        onClick={() => redirect('/vinculos/funcionarios/')}
        onKeyDown={(e) => {
          if (e.key === 'v') {
            redirect('/vinculos/funcionarios/');
          }
        }}
      >
        <img src={vinculoIcon} alt="teste" />
        <p>Vínculos CNES/IDS</p>
      </div>
      <div
        role="button"
        tabIndex="0"
        onClick={() => redirect('/vinculos/vinculos-ids/')}
        onKeyDown={(e) => {
          if (e.key === 'v') {
            redirect('/vinculos/vinculos-ids/');
          }
        }}
      >
        <img src={vinculoPendenteIcon} alt="teste" />
        <p>Vínculos Pendentes</p>
      </div>
    </div>
  );
}
