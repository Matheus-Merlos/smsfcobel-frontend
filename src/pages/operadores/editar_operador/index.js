import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import './Style.css';

import { operadoresSidebar as Sidebar } from '../../../components/vinculos/sidebar';
import Page from '../../../components/Page';
import Botao from '../../../components/Botao';

import axios from '../../../services/axios';

export default function EditarOperador() {
  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  const [operadores, setOperadores] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [operadorSelecionado, setOperadorSelecionado] = useState(0);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const [isLocked, setIsLocked] = useState(true);

  function formatAndCapitalize(str) {
    const stringWithSpaces = str.replace(/_/g, ' ');

    const capitalizedString =
      stringWithSpaces.charAt(0).toUpperCase() +
      stringWithSpaces.slice(1).toLowerCase();

    return capitalizedString;
  }

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

  async function handleSelectOperador(e) {
    setOperadorSelecionado(e.target.value);
    if (e.target.value === '0') {
      setIsLocked(true);
      setNome('');
      setEmail('');
      setCPF('');
      setSelectedPermissions('');
      return;
    }
    setIsLocked(false);

    const operator = await axios.get(`api/users/${e.target.value}/`);
    const operatorData = operator.data;

    setNome(operatorData.name);
    setEmail(operatorData.email);
    setCPF(operatorData.cpf);
    setSelectedPermissions(operatorData.permissions);
  }

  async function handleOperatorPatch(e) {
    e.preventDefault();

    const operatorPatch = {
      name: nome,
      email,
      cpf,
      permissions: selectedPermissions,
    };

    try {
      await axios.patch(`api/users/${operadorSelecionado}/`, operatorPatch);

      toast.success('Operador editado com sucesso!');
    } catch (error) {
      toast.error(`Erro interno do servidor: ${error}`);
    }
  }

  useEffect(() => {
    async function fetchOperadores() {
      const response = await axios.get('api/users/');
      setOperadores(response.data);
    }

    async function fetchPermissions() {
      const response = await axios.get('/api/permissions/');

      setPermissions(response.data);
    }

    fetchPermissions();
    fetchOperadores();
  }, []);

  return (
    <Page
      Sidebar={Sidebar}
      hasTitle
      pageName="Editar Operador"
      description="Alterar dados de um operador existente"
    >
      <form
        method="post"
        id="formulario-editar-operador"
        onSubmit={handleOperatorPatch}
      >
        <select
          name="operador"
          id="operador"
          className="operador-input"
          value={operadorSelecionado}
          onChange={handleSelectOperador}
        >
          <option value="0">Selecionar Operador</option>
          {operadores.map((operador) => (
            <option
              value={operador.id}
              key={operador.id}
            >{`${operador.id}-${operador.name}`}</option>
          ))}
        </select>
        <input
          type="text"
          name="nome-operador"
          id="nome-operador"
          placeholder="Nome completo"
          className="operador-input"
          readOnly={isLocked}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          name="email-operador"
          id="email-operador"
          placeholder="Email"
          className="operador-input"
          readOnly={isLocked}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          name="cpf-operador"
          id="cpf-operador"
          placeholder="CPF"
          className="operador-input"
          readOnly={isLocked}
          value={cpf}
          onChange={(e) => setCPF(e.target.value)}
        />

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
        <Botao nome="Editar" />
      </form>
    </Page>
  );
}
