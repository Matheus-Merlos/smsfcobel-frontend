import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { vinculosSidebar as Sidebar } from '../../../components/vinculos/sidebar';
import Page from '../../../components/Page';

import axios from '../../../services/axios';

import history from '../../../services/history';

import {
  isValidDate,
  handleDateInputChange,
  formatDate,
} from '../../../services/utils';

import './Style.css';

export default function Funcionarios() {
  const [genders, setGenders] = useState([]);

  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [cpf, setCPF] = useState('');
  const [cns, setCNS] = useState('');
  const [email, setEmail] = useState('');
  const [crm, setCRM] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [rg, setRG] = useState('');
  const [dataEmissaoRG, setDataEmissaoRG] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [nomePai, setNomePai] = useState('');

  function clearFuncionarioForm() {
    const funcs = [
      setNome,
      setSexo,
      setCPF,
      setCNS,
      setRG,
      setEmail,
      setCRM,
      setDataNascimento,
      setDataEmissaoRG,
      setNomeMae,
      setNomePai,
    ];
    funcs.forEach((func) => func(''));
  }

  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  async function handleSubmitFuncionario(e) {
    e.preventDefault();

    let errors = false;

    function nameIsValid(name) {
      return name.split(' ').length > 1;
    }
    function emailIsValid(emai) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emai);
    }
    function validateAndToast(condition, message) {
      if (condition) {
        toast.info(message);
        errors = true;
      }
    }

    const requiredFields = [
      nome,
      cpf,
      email,
      cns,
      nomeMae,
      nomePai,
      rg,
      dataNascimento,
      dataEmissaoRG,
    ];
    if (requiredFields.some((field) => field.length === 0)) {
      toast.info('Por favor, preencha todos os campos!');
      return;
    }

    validateAndToast(!nameIsValid(nome), 'O nome informado é inválido!');
    validateAndToast(
      !nameIsValid(nomeMae),
      'O nome da mãe informado é inválido!'
    );
    validateAndToast(
      !nameIsValid(nomePai),
      'O nome do pai informado é inválido!'
    );
    validateAndToast(cpf.length !== 11, 'O CPF informado é inválido!');
    validateAndToast(cns.length !== 15, 'O Cartão SUS informado é inválido!');
    validateAndToast(
      rg.length > 12 || rg.length < 8,
      'O RG informado é inválido!'
    );
    validateAndToast(!emailIsValid(email), 'O e-mail informado é inválido!');
    validateAndToast(
      !isValidDate(dataNascimento),
      'A data de nascimento informada é invalida!'
    );
    validateAndToast(
      !isValidDate(dataEmissaoRG),
      'A data de emissão do RG informada é invalida!'
    );

    if (errors) {
      return;
    }

    const funcionario = {
      nome: nome.toUpperCase(),
      sexo_codigo: sexo === '' ? 1 : sexo,
      cpf,
      rg,
      emissao_rg: formatDate(dataEmissaoRG),
      cns,
      email: email.toLowerCase(),
      crm,
      data_nascimento: formatDate(dataNascimento),
      nome_mae: nomeMae.toUpperCase(),
      nome_pai: nomePai.toUpperCase(),
    };

    try {
      await axios.post('/vinculos/api/funcionarios/', funcionario);

      clearFuncionarioForm();

      toast.success('Funcionário criado com sucesso!');
    } catch (error) {
      if (error.response.status === 400) {
        const errs = JSON.parse(error.response.request.responseText);

        if ('nome' in errs) {
          toast.error('Um funcionário com esse nome já existe!');
          return;
        }
        if ('rg' in errs) {
          toast.error('Um funcionário com esse RG já existe!');
          return;
        }
        if ('cpf' in errs) {
          toast.error('Um funcionário com esse CPF já existe!');
          return;
        }
      }

      toast.error(`Erro interno do sistema: ${error}`);
    }
  }

  useEffect(() => {
    // Função para pegar a lista de gêneros da nossa REST API
    async function getGenders() {
      try {
        const response = await axios.get('/vinculos/api/sexos/');
        const gendersData = response.data;

        setGenders(gendersData);
      } catch (error) {
        history.push('/login/');
        history.go();
      }
    }
    getGenders();
  }, []);

  return (
    <Page
      pageName="Funcionário"
      description="Cadastrar novo funcionário"
      Sidebar={Sidebar}
      hasTitle
    >
      <form method="post" id="preenchimento" onSubmit={handleSubmitFuncionario}>
        <div className="formulario-parte nome-sexo">
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <select
            name="sexo"
            id="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {`${gender.id}-${gender.descricao}`}
              </option>
            ))}
          </select>
        </div>
        <div className="formulario-parte dois-inputs">
          <input
            type="number"
            name="cpf"
            id="cpf"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
          <input
            type="number"
            name="cns"
            id="cns"
            placeholder="CNS"
            value={cns}
            onChange={(e) => setCNS(e.target.value)}
          />
        </div>
        <div className="formulario-parte dois-inputs">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            name="crm"
            id="crm"
            placeholder="CRM"
            value={crm}
            onChange={(e) => setCRM(e.target.value)}
          />
        </div>
        <div className="formulario-parte" id="tres-inputs">
          <input
            type="text"
            name="data_nascimento"
            id="data_nascimento"
            placeholder="Data de Nascimento"
            maxLength="10"
            value={dataNascimento}
            onChange={(e) => handleDateInputChange(e, setDataNascimento)}
          />
          <input
            type="number"
            name="rg"
            id="rg"
            placeholder="RG"
            value={rg}
            onChange={(e) => setRG(e.target.value)}
          />
          <input
            type="text"
            name="emissao_rg"
            id="emissao_rg"
            placeholder="Data de Emissão do RG"
            maxLength="10"
            value={dataEmissaoRG}
            onChange={(e) => handleDateInputChange(e, setDataEmissaoRG)}
          />
        </div>
        <div className="formulario-parte dois-inputs">
          <input
            type="text"
            name="nome_mae"
            id="nome_mae"
            placeholder="Nome da mãe"
            value={nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
          />
          <input
            type="text"
            name="nome_pai"
            id="nome_pai"
            placeholder="Nome do Pai"
            value={nomePai}
            onChange={(e) => setNomePai(e.target.value)}
          />
        </div>

        <button type="submit" id="criar-funcionario">
          Criar
        </button>
      </form>
    </Page>
  );
}
