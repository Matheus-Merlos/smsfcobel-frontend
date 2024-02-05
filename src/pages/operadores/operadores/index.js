import React, { useEffect, useState } from 'react';

import './Style.css';

import { useSelector } from 'react-redux';
import axios from '../../../services/axios';
import history from '../../../services/history';
import Header from '../../../components/Header';
import { operadoresSidebar as Sidebar } from '../../../components/vinculos/sidebar';

import { formatCPF } from '../../../services/utils';

export default function ListagemOperadores() {
  const [operadores, setOperadores] = useState([]);

  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  function formatAndCapitalize(str) {
    const stringWithSpaces = str.replace(/_/g, ' ');

    const capitalizedString =
      stringWithSpaces.charAt(0).toUpperCase() +
      stringWithSpaces.slice(1).toLowerCase();

    return capitalizedString;
  }

  function formatPermissions(perms) {
    const names = [];
    perms.forEach((perm) => names.push(formatAndCapitalize(perm.descricao)));
    return names.join(', ');
  }

  useEffect(() => {
    async function fetchAllOperators() {
      try {
        const response = await axios.get('/api/users/all/');
        setOperadores(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          history.push('/login/');
          history.go();
        }
      }
    }
    fetchAllOperators();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div id="direita-listagem-vinculos">
          <table id="listagem-vinculos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Permissões</th>
              </tr>
            </thead>
            <tbody>
              {operadores.map((operador) => (
                <tr key={operador.id}>
                  <td>{operador.id}</td>
                  <td>{operador.name}</td>
                  <td>{formatCPF(operador.cpf)}</td>
                  <td>{operador.email}</td>
                  <td>{formatPermissions(operador.permissions)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
