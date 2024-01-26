import React from 'react';
import './Style.css';

import IDSIcon from './img/simbolo-ids.png';
import CNESIcon from './img/simbolo-cnes.png';
import RHIcon from './img/simbolo-rh.png';

import history from '../../../services/history';

export default function vinculosSidebar() {
  function redirectToFuncionarios() {
    history.push('/vinculos/vinculos-ids/');
    history.go();
  }
  function redirectToVinculos() {
    history.push('/vinculos/vinculos-cnes/');
    history.go();
  }
  function redirectToDesvincular() {
    history.push('/vinculos/vinculos-rh/');
    history.go();
  }

  function handleKeyPress(event) {
    if (event.key === 'v') {
      redirectToVinculos();
    }
  }

  return (
    <aside id="sidebar">
      <div onClick={redirectToFuncionarios} onKeyUp={handleKeyPress}>
        <img src={IDSIcon} alt="Funcionário Ícone" />
        <h1>Vínculos IDS</h1>
      </div>
      <hr />
      <div onClick={redirectToVinculos} onKeyUp={handleKeyPress}>
        <img src={CNESIcon} alt="Vincular Ícone" />
        <h1>Vinculos CNES</h1>
      </div>
      <hr />
      <div onClick={redirectToDesvincular} onKeyUp={handleKeyPress}>
        <img src={RHIcon} alt="Desvincular Ícone" />
        <h1>Vinculos RH</h1>
      </div>
    </aside>
  );
}
