import React from 'react';
import './Style.css';

import funcionarioIcon from './img/funcionario_icon.png';
import vincularIcon from './img/vinculo_icon.png';
import desvincularIcon from './img/unlink_icon.png';

export default function vinculosSidebar() {
  return (
    <aside id="sidebar">
      <div>
        <img src={funcionarioIcon} alt="Funcionário Ícone" />
        <h1>Funcionários</h1>
      </div>
      <hr />
      <div>
        <img src={vincularIcon} alt="Vincular Ícone" />
        <h1>Vincular</h1>
      </div>
      <hr />
      <div>
        <img src={desvincularIcon} alt="Desvincular Ícone" />
        <h1>Desvincular</h1>
      </div>
    </aside>
  );
}
