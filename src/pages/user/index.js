/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import './Style.css';

import Page from '../../components/Page';
import { userSidebar as Sidebar } from '../../components/vinculos/sidebar';
import Botao from '../../components/Botao';

import axios from '../../services/axios';

export default function User() {
  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  const userLogado = useSelector((state) => state.reducer.userId);

  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`api/users/${userLogado}/`);
      const responseData = response.data;

      setName(responseData.name);
      setCPF(responseData.cpf);
      setEmail(responseData.email);
    }

    fetchUser();
  }, [userLogado]);

  async function handleOperatorPatch(e) {
    e.preventDefault();

    const operatorPatch = {
      name,
      email,
      cpf,
    };

    try {
      await axios.patch(`api/users/${userLogado}/`, operatorPatch);

      toast.success('Operador editado com sucesso!');
    } catch (error) {
      toast.error(`Erro interno do servidor: ${error}`);
    }
  }

  return (
    <Page
      Sidebar={Sidebar}
      hasTitle
      pageName="Conta"
      description="Alterar informações da sua conta"
    >
      <form method="post" onSubmit={handleOperatorPatch} id="user-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            placeholder="Nome"
            className="user-form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            placeholder="CPF"
            className="user-form-input"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            placeholder="E-mail"
            className="user-form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Botao nome="Editar" />
      </form>
    </Page>
  );
}
