import React from 'react';

import './Style.css';

import { useDispatch, useSelector } from 'react-redux';
import vinculoIcon from './img/vinculo_icon.png';
import vinculoPendenteIcon from './img/console.svg';

import * as actions from '../../store/actions';

import history from '../../services/history';

export default function Menu() {
  const dispatch = useDispatch();

  function redirect(link) {
    history.push(link);
    history.go();
  }

  const permissions = useSelector((state) => state.reducer.permissions);

  const menus = {
    VINCULOS: (
      <div
        role="button"
        tabIndex="0"
        onClick={() => {
          redirect('/vinculos/funcionarios/');
          dispatch(actions.changeMenu({ newMenu: 'Vínculos CNES/IDS' }));
        }}
        onKeyDown={(e) => {
          if (e.key === 'v') {
            redirect('/vinculos/funcionarios/');
          }
        }}
      >
        <img src={vinculoIcon} alt="teste" />
        <p>Vínculos CNES/IDS</p>
      </div>
    ),
    VINCULOS_PENDENTES: (
      <div
        role="button"
        tabIndex="0"
        onClick={() => {
          redirect('/vinculos/vinculos-ids/');
          dispatch(actions.changeMenu({ newMenu: 'Vínculos Pendentes' }));
        }}
        onKeyDown={(e) => {
          if (e.key === 'v') {
            redirect('/vinculos/vinculos-ids/');
          }
        }}
      >
        <img src={vinculoPendenteIcon} alt="teste" />
        <p>Vínculos Pendentes</p>
      </div>
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
