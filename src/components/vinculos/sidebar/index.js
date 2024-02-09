import React from 'react';
import './Style.css';

import funcionarioIcon from './img/funcionario_icon.png';
import vincularIcon from './img/vinculo_icon.png';
import desvincularIcon from './img/unlink_icon.png';

import IDSIcon from './img/simbolo-ids.png';
import CNESIcon from './img/simbolo-cnes.png';
import ListIcon from './img/simbolo-lista.jpg';

import AddOperador from './img/add-operador.svg';
import OperadorIcon from './img/operador-icon.png';
import EditarOperador from './img/editar-operador.png';

import UserIcon from './img/user_icon.png';

import Item from './item';

function vinculosSidebar() {
  return (
    <aside id="sidebar">
      <Item
        linkToRedirect="/vinculos/funcionarios/"
        icon={funcionarioIcon}
        name="Funcionários"
      />
      <Item
        linkToRedirect="/vinculos/vincular/"
        icon={vincularIcon}
        name="Vincular"
      />
      <Item
        linkToRedirect="/vinculos/desvincular/"
        icon={desvincularIcon}
        name="Desvincular"
      />
    </aside>
  );
}

function vinculosPendentesSidebar() {
  return (
    <aside id="sidebar">
      <Item
        linkToRedirect="/vinculos/vinculos-ids/"
        icon={IDSIcon}
        name="Vínculos IDS"
      />
      <Item
        linkToRedirect="/vinculos/vinculos-cnes/"
        icon={CNESIcon}
        name="Vínculos CNES"
      />
      <Item
        linkToRedirect="/vinculos/listagem/"
        icon={ListIcon}
        name="Listagem"
      />
    </aside>
  );
}

function operadoresSidebar() {
  return (
    <aside id="sidebar">
      <Item
        linkToRedirect="/operadores/adicionar/"
        icon={AddOperador}
        name="Adicionar"
      />
      <Item
        linkToRedirect="/operadores/editar/"
        icon={EditarOperador}
        name="Editar"
      />
      <Item
        linkToRedirect="/operadores/listagem/"
        icon={OperadorIcon}
        name="Operadores"
      />
    </aside>
  );
}

function userSidebar() {
  return (
    <aside id="sidebar">
      <Item linkToRedirect="/user/" icon={UserIcon} name="Conta" />
    </aside>
  );
}

export {
  vinculosSidebar,
  vinculosPendentesSidebar,
  operadoresSidebar,
  userSidebar,
};
