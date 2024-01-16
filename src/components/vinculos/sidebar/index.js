import React from 'react';
import './Style.css';

import funcionarioIcon from './img/funcionario_icon.png';
import vincularIcon from './img/vinculo_icon.png';
import desvincularIcon from './img/unlink_icon.png';

import history from '../../../services/history';

export default function vinculosSidebar() {
  function redirectToFuncionarios() {
    history.push('/vinculos/funcionarios/');
    history.go();
  }
  function redirectToVinculos() {
    history.push('/vinculos/vincular/');
    history.go();
  }
  function redirectToDesvincular() {
    history.push('/vinculos/desvincular/');
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
        <img src={funcionarioIcon} alt="Funcionário Ícone" />
        <h1>Funcionários</h1>
      </div>
      <hr />
      <div onClick={redirectToVinculos} onKeyUp={handleKeyPress}>
        <img src={vincularIcon} alt="Vincular Ícone" />
        <h1>Vincular</h1>
      </div>
      <hr />
      <div onClick={redirectToDesvincular} onKeyUp={handleKeyPress}>
        <img src={desvincularIcon} alt="Desvincular Ícone" />
        <h1>Desvincular</h1>
      </div>
    </aside>
  );
}
