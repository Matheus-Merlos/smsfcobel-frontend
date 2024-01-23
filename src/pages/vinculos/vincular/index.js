import React, { useEffect, useState } from 'react';

import './Style.css';

import { useSelector } from 'react-redux';
import axios from '../../../services/axios';

import Header from '../../../components/Header';
import Sidebar from '../../../components/vinculos/sidebar';

import history from '../../../services/history';

export default function Vincular() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [locals, setLocals] = useState([]);
  const [types, setTypes] = useState([]);

  const [funcionarioPOST = 1, setFuncionarioPOST] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [funcaoPOST = 1, setFuncaoPOST] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [localPOST = 1, setLocalPOST] = useState('');
  const [dataSaida = 1, setDataSaida] = useState('');
  const [tipoPOST = 1, setTipoPOST] = useState('');

  function formatDate(date) {
    const dateAsString = date.split('/');
    return `${dateAsString[2]}-${dateAsString[1]}-${dateAsString[0]}`;
  }

  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  async function handleSubmitVinculo(e) {
    e.preventDefault();

    const vinculo = {
      funcionario_codigo: funcionarioPOST,
      carga_horaria: cargaHoraria,
      data_entrada: formatDate(dataEntrada),
      data_saida: formatDate(dataSaida),
      funcao_codigo: funcaoPOST,
      local_codigo: localPOST,
      tipo_codigo: tipoPOST,
      tipo_vinculo_codigo: 1,
    };

    try {
      await axios.post('/vinculos/api/', vinculo);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEnterDate = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length >= 2) {
      // Insere a barra após os dois primeiros caracteres
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    if (value.length >= 5) {
      // Insere a segunda barra após os cinco primeiros caracteres
      value = `${value.slice(0, 5)}/${value.slice(5)}`;
    }

    setDataEntrada(value);
  };

  const handleExitDate = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length >= 2) {
      // Insere a barra após os dois primeiros caracteres
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    if (value.length >= 5) {
      // Insere a segunda barra após os cinco primeiros caracteres
      value = `${value.slice(0, 5)}/${value.slice(5)}`;
    }

    setDataSaida(value);
  };

  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const response = await axios.get('/vinculos/api/funcionarios/');
        setFuncionarios(response.data);
      } catch (error) {
        history.push('/login/');
        history.go();
      }
    }
    async function fetchFunctions() {
      const response = await axios.get('/vinculos/api/funcoes/');
      setFunctions(response.data);
    }
    async function fetchLocals() {
      const response = await axios.get('/vinculos/api/locais-trabalho/');
      setLocals(response.data);
    }
    async function fetchTypes() {
      const response = await axios.get('/vinculos/api/tipos/');
      setTypes(response.data);
    }

    fetchFuncionarios();
    fetchFunctions();
    fetchLocals();
    fetchTypes();
  }, [accessToken]);
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <section id="direita">
          <div id="formulario-vinculos">
            <h1 id="titulo">Vínculo</h1>
            <h3 id="descricao">Cadastrar novo vínculo</h3>
            <hr />
            <p id="aviso">Insira os dados abaixo:</p>
            <form
              method="post"
              id="preenchimento"
              onSubmit={handleSubmitVinculo}
            >
              <select
                name="funcionario"
                id="funcionario"
                value={funcionarioPOST}
                onChange={(e) => setFuncionarioPOST(e.target.value)}
              >
                {funcionarios.map((funcionario) => (
                  <option key={funcionario.id} value={funcionario.id}>
                    {`${funcionario.id}-${funcionario.nome}`}
                  </option>
                ))}
              </select>
              <div className="dois-inputs formulario-parte">
                <input
                  type="number"
                  name="carga_horaria"
                  id="carga_horaria"
                  placeholder="Carga Horária"
                  value={cargaHoraria}
                  onChange={(e) => setCargaHoraria(e.target.value)}
                />
                <select
                  name="funcao"
                  id="funcao"
                  value={funcaoPOST}
                  onChange={(e) => setFuncaoPOST(e.target.value)}
                >
                  {functions.map((funcao) => (
                    <option key={funcao.id} value={funcao.id}>
                      {`${funcao.id}-${funcao.descricao}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dois-inputs formulario-parte">
                <input
                  type="text"
                  name="data_entrada"
                  id="data_entrada"
                  placeholder="Data de Entrada"
                  value={dataEntrada}
                  onChange={handleEnterDate}
                />
                <select
                  name="local"
                  id="local"
                  value={localPOST}
                  onChange={(e) => setLocalPOST(e.target.value)}
                >
                  {locals.map((local) => (
                    <option key={local.id} value={local.id}>
                      {`${local.id}-${local.descricao}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dois-inputs formulario-parte">
                <input
                  type="text"
                  name="data_saida"
                  id="data_saida"
                  placeholder="Data de Saída"
                  value={dataSaida}
                  onChange={handleExitDate}
                />
                <select
                  name="tipo"
                  id="tipo"
                  value={tipoPOST}
                  onChange={(e) => setTipoPOST(e.target.value)}
                >
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {`${type.id}-${type.descricao}`}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" id="criar-vinculo">
                Vincular
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
