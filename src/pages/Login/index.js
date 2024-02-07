import React, { useState } from 'react';
import './Style.css';
import { useDispatch } from 'react-redux';
import loginImage from './img/login-image.jpeg';
import atiImage from './img/ati_icon.png';
import pmfbIcon from './img/pmfb_icon.jpeg';
import * as actions from '../../store/actions';

function Login() {
  const dispatch = useDispatch();
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      actions.loginRequest({
        cpf,
        password,
      })
    );
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
          <h2>Acesse sua Conta</h2>
          <p className="aviso">
            Sem acesso? <span className="strong">Clique aqui</span>
          </p>
          <form method="post" id="formulario-login" onSubmit={handleSubmit}>
            <input
              type="number"
              name="cpf"
              id="cpf"
              placeholder="CPF"
              onChange={(e) => setCPF(e.target.value)}
              value={cpf}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <a href="/change-password/" className="strong aviso">
              Esqueci minha senha
            </a>
            <input type="submit" value="Continuar" id="submit-button" />
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
