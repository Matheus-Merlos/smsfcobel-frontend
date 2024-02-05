import React from 'react';

import './Style.css';

import { useSelector } from 'react-redux';
import vinculoIcon from './img/vinculo-icon.png';
import vinculoPendenteIcon from './img/console.svg';
import operadorIcon from './img/operador-icon.png';

import Icon from './icon';

export default function Menu() {
  const permissions = useSelector((state) => state.reducer.permissions);

  const menus = {
    VINCULOS: (
      <Icon
        itemIcon={vinculoIcon}
        name="Vínculos CNES/IDS"
        link="/vinculos/funcionarios/"
      />
    ),
    VINCULOS_PENDENTES: (
      <Icon
        itemIcon={vinculoPendenteIcon}
        name="Vínculos Pendentes"
        link="/vinculos/vinculos-ids/"
      />
    ),
    OPERADORES: (
      <Icon
        itemIcon={operadorIcon}
        name="Operadores"
        link="/operadores/adicionar/"
      />
    ),
  };

  return (
    <div className="menu-principal">
      {Object.keys(menus).map(
        (menu) => permissions.includes(menu) && menus[menu]
      )}
    </div>
  );
}
