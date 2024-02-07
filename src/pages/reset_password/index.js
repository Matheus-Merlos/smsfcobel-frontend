import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Style.css';

import loginImage from './img/login-image.jpeg';
import atiImage from './img/ati_icon.png';
import pmfbIcon from './img/pmfb_icon.jpeg';

import axios from '../../services/axios';
import history from '../../services/history';

export default function ChangePassword() {
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  function redirect() {
    history.push('/login/');
    history.go();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      toast.info('As senhas informadas não coincidem!');
    }

    const request = {
      email,
      cpf,
      password: newPassword,
    };

    try {
      await axios.post('api/change-password/', request);

      toast.success('Senha alterada com sucesso!');

      setTimeout(redirect, 2000);
    } catch (error) {
      if (error.response.status === 404) {
        toast.warn('Não existe um usuário com este CPF e email!');
      } else {
        toast.error(`Erro interno do servidor ${error}`);
      }
    }
  }

  return (
    <>
      <section id="icons">
        <div className="icon">
          <img src={atiImage} alt="Imagem ATI" />
        </div>
        <div className="icon">
          <img src={pmfbIcon} alt="Imagem Prefeitura Francisco Beltrão" />
        </div>
      </section>
      <section className="left-image">
        <section id="gradient" />
        <img src={loginImage} alt="Imagem Login" id="login-image" />
      </section>
      <section className="right-form">
        <div className="formulario">
          <h1>SMS de Francisco Beltrão</h1>
          <h2>Trocar de senha</h2>
          <form method="post" id="formulario-login" onSubmit={handleSubmit}>
            <input
              type="number"
              name="cpf"
              placeholder="CPF"
              onChange={(e) => setCPF(e.target.value)}
              value={cpf}
            />
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              name="password"
              placeholder="Nova Senha"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <input
              type="password"
              name="password"
              placeholder="Repita a nova senha"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
            />
            <input type="submit" value="Continuar" id="submit-button" />
          </form>
        </div>
      </section>
    </>
  );
}
