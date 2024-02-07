import React from 'react';

import './Style.css';

import { useSelector } from 'react-redux';

import { formatCPF } from '../../services/utils';

export default function UserMenu() {
  const userName = useSelector((state) => state.reducer.userName);
  const cpf = useSelector((state) => state.reducer.userCPF);
  const email = useSelector((state) => state.reducer.email);

  return (
    <div className="user-menu-principal">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <p>{userName}</p>
      <p>{formatCPF(cpf)}</p>
      <p>{email}</p>

      <hr />

      <div className="user-information">
        <span className="material-symbols-outlined user-icon">person</span>
        <a href="/user/">Minha conta</a>
      </div>
      <div className="user-information">
        <span className="material-symbols-outlined user-icon">
          key_vertical
        </span>
        <a href="/user/">Trocar Senha</a>
      </div>

      <hr />

      <div id="account-logout" className="user-information">
        <span className="material-symbols-outlined">logout</span>
        <span>Sair da conta</span>
      </div>
    </div>
  );
}