import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import './Style.css';

import { vinculosSidebar as Sidebar } from '../../../components/vinculos/sidebar';

import Page from '../../../components/Page';

import axios from '../../../services/axios';
import history from '../../../services/history';

export default function Desvincular() {
  const [funcionariosDesvincular, setFuncionariosDesvincular] = useState([]);
  const [locaisDesvincular, setLocaisDesvincular] = useState([]);

  const [funcionarioParaDesvincular, setFuncionarioParaDesvincular] =
    useState(0);
  const [localParaDesvincular, setLocalParaDesvincular] = useState(0);

  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const response = await axios.get('/vinculos/api/funcionarios/');

        setFuncionariosDesvincular(response.data);
      } catch (error) {
        history.push('/login/');
        history.go();
      }
    }
    async function fetchLocais() {
      const response = await axios.get('/vinculos/api/locais-trabalho/');
      setLocaisDesvincular(response.data);
    }

    fetchFuncionarios();
    fetchLocais();
  }, []);

  function getTodayDate() {
    const data = new Date();

    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  async function handleDesvincular(e) {
    e.preventDefault();

    const vinculo = {
      funcionario_codigo:
        funcionarioParaDesvincular === '' ? 1 : funcionarioParaDesvincular,
      carga_horaria: 0,
      data_entrada: getTodayDate(),
      data_saida: getTodayDate(),
      funcao_codigo: 1,
      local_codigo: localParaDesvincular === '' ? 1 : localParaDesvincular,
      tipo_codigo: 1,
      tipo_vinculo_codigo: 3,
    };

    try {
      await axios.post('/vinculos/api/', vinculo);

      toast.success('Funcionário desvinculado com sucesso!');
    } catch (error) {
      toast.error(`Erro interno do sistema: ${error}`);
    }
  }

  return (
    <Page
      pageName="Desvincular"
      description="Remover vínculo existente"
      Sidebar={Sidebar}
      hasTitle
    >
      <form method="post" id="preenchimento" onSubmit={handleDesvincular}>
        <select
          name="funcionario-desvincular"
          id="funcionario-desvincular"
          value={funcionarioParaDesvincular}
          onChange={(e) => setFuncionarioParaDesvincular(e.target.value)}
        >
          {funcionariosDesvincular.map((funcionario) => (
            <option key={funcionario.id} value={funcionario.id}>
              {`${funcionario.id}-${funcionario.nome}`}
            </option>
          ))}
        </select>
        <select
          name="local-desvincular"
          id="local-desvincular"
          value={localParaDesvincular}
          onChange={(e) => setLocalParaDesvincular(e.target.value)}
        >
          {locaisDesvincular.map((local) => (
            <option key={local.id} value={local.id}>
              {`${local.id}-${local.descricao}`}
            </option>
          ))}
        </select>
        <button type="submit" id="criar-vinculo">
          Desvincular
        </button>
      </form>
    </Page>
  );
}
