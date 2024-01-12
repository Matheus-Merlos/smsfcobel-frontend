import React from 'react';
import './Style.css';
import loginImage from './img/login-image.jpeg';
import atiImage from './img/ati_icon.png';
import pmfbIcon from './img/pmfb_icon.jpeg';

function Login() {
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
          <form action="#" method="post" id="formulario">
            <input type="number" name="cpf" id="cpf" placeholder="CPF" />
            <input type="password" name="password" placeholder="Senha" />
            <p className="strong aviso">Esqueci minha senha</p>
            <input type="submit" value="Continuar" id="submit-button" />
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
