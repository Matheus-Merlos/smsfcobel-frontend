import React, { useEffect, useState } from 'react';

import './Style.css';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';

import Header from '../../../components/Header';
import Sidebar from '../../../components/vinculos/sidebar';

import history from '../../../services/history';

import {
  isValidDate,
  handleDateInputChange,
  formatDate,
} from '../../../services/utils';

export default function Vincular() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [locals, setLocals] = useState([]);
  const [types, setTypes] = useState([]);

  const [funcionarioPOST, setFuncionarioPOST] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [funcaoPOST, setFuncaoPOST] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [localPOST, setLocalPOST] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [tipoPOST, setTipoPOST] = useState('');

  function clearVinculoForm() {
    const funcs = [setCargaHoraria, setDataEntrada, setDataSaida];
    funcs.forEach((func) => func(''));
  }

  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  async function handleSubmitVinculo(e) {
    e.preventDefault();

    let errors = false;

    function validateAndToast(condition, message) {
      if (condition) {
        toast.info(message);
        errors = true;
      }
    }

    const requiredFields = [cargaHoraria, dataEntrada, dataSaida];
    if (requiredFields.some((field) => field.length === 0)) {
      toast.info('Por favor, preencha todos os campos!');
      return;
    }

    validateAndToast(
      !isValidDate(dataEntrada),
      'A data de entrada é inválida!'
    );
    validateAndToast(!isValidDate(dataSaida), 'A data de saída é inválida!');

    if (errors) {
      return;
    }

    const vinculo = {
      funcionario_codigo: funcionarioPOST === '' ? 1 : funcionarioPOST,
      carga_horaria: cargaHoraria,
      data_entrada: formatDate(dataEntrada),
      data_saida: formatDate(dataSaida),
      funcao_codigo: funcaoPOST === '' ? 1 : funcaoPOST,
      local_codigo: localPOST === '' ? 1 : localPOST,
      tipo_codigo: tipoPOST === '' ? 1 : tipoPOST,
      tipo_vinculo_codigo: 1,
    };

    try {
      await axios.post('/vinculos/api/', vinculo);

      clearVinculoForm();

      toast.success('Funcionário vinculado com sucesso!');
    } catch (error) {
      toast.error(`Erro interno do sistema: ${error}`);
    }
  }

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
                  onChange={(e) => handleDateInputChange(e, setDataEntrada)}
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
                  onChange={(e) => handleDateInputChange(e, setDataSaida)}
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
