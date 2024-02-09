import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import './Style.css';

import { operadoresSidebar as Sidebar } from '../../../components/vinculos/sidebar';
import Page from '../../../components/Page';
import Botao from '../../../components/Botao';

import axios from '../../../services/axios';
import useRedirect from '../../../services/redirect';
import * as perms from '../../../services/permissions';

export default function CriarOperador() {
  useRedirect(perms.OPERADORES);

  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  const [permissions, setPermissions] = useState([]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  function handleCheckboxChange(permissionId) {
    const isSelected = selectedPermissions.includes(permissionId);
    if (isSelected) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permissionId)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  }

  function formatAndCapitalize(str) {
    const stringWithSpaces = str.replace(/_/g, ' ');

    const capitalizedString =
      stringWithSpaces.charAt(0).toUpperCase() +
      stringWithSpaces.slice(1).toLowerCase();

    return capitalizedString;
  }

  useEffect(() => {
    async function fetchPermissions() {
      const response = await axios.get('/api/permissions/');

      setPermissions(response.data);
    }

    fetchPermissions();
  }, []);

  async function handleOperadorSubmit(e) {
    e.preventDefault();

    const operador = {
      name: nome,
      cpf,
      email,
      password,
      permissions: selectedPermissions.sort(),
    };

    try {
      await axios.post('/api/register/', operador);

      toast.success('Operador criado com sucesso!');
    } catch (error) {
      if (error.response.status === 400) {
        const response = JSON.parse(error.request.response);
        if ('name' in response) {
          toast.error('Operador com esse nome já existe!');
        }
        if ('email' in response) {
          toast.error('Operador com esse E-mail já existe');
        }
        if ('cpf' in response) {
          toast.error('Operador com esse CPF já existe!');
        }
      }
    }
  }

  return (
    <Page
      pageName="Operadores"
      description="Criar novo operador"
      Sidebar={Sidebar}
      hasTitle
    >
      <form
        method="post"
        id="formulario-operador"
        onSubmit={handleOperadorSubmit}
      >
        <input
          type="text"
          name="nome-operador"
          id="nome-operador"
          placeholder="Nome completo"
          className="operador-input"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          name="email-operador"
          id="email-operador"
          placeholder="Email"
          className="operador-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="dois-inputs">
          <input
            type="number"
            name="cpf-operador"
            id="cpf-operador"
            placeholder="CPF"
            className="operador-input"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
          <input
            type="text"
            name="senha-operador"
            id="senha-operador"
            placeholder="Senha"
            className="operador-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p id="perms">Permissões:</p>

        <div id="permissoes">
          {permissions.map((permission) => (
            <div id="permission" key={permission.id}>
              <input
                type="checkbox"
                className="select"
                checked={selectedPermissions.includes(permission.id)}
                onChange={() => handleCheckboxChange(permission.id)}
              />
              <p key={permission.id} className="permission-name">
                {formatAndCapitalize(permission.descricao)}
              </p>
            </div>
          ))}
        </div>
        <Botao nome="Criar" />
      </form>
    </Page>
  );
}
