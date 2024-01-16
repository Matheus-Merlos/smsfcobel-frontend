import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/vinculos/sidebar';

import axios from '../../../services/axios';

import './Style.css';

export default function Funcionarios() {
  const [genders, setGenders] = useState([]);

  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [cpf, setCPF] = useState('');
  const [cns, setCNS] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [rg, setRG] = useState('');
  const [dataEmissaoRG, setDataEmissaoRG] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [nomePai, setNomePai] = useState('');

  // Função para formatar a data de DD/MM/AAAA para AAAA-MM-DD, pois é o que a REST API Suporta
  function formatDate(date) {
    const dateAsString = date.split('/');
    return `${dateAsString[2]}-${dateAsString[1]}-${dateAsString[0]}`;
  }

  async function handleSubmitFuncionario(e) {
    e.preventDefault();

    const funcionario = {
      nome: nome.toUpperCase(),
      sexo_codigo: sexo,
      cpf,
      rg,
      emissao_rg: formatDate(dataEmissaoRG),
      cns,
      email: email.toLowerCase(),
      data_nascimento: formatDate(dataNascimento),
      nome_mae: nomeMae.toUpperCase(),
      nome_pai: nomePai.toUpperCase(),
    };
    await axios.post('/vinculos/api/funcionarios/', funcionario);
  }

  // Função para formatar a data em um input de texto
  const handleBirthDateInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length >= 2) {
      // Insere a barra após os dois primeiros caracteres
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    if (value.length >= 5) {
      // Insere a segunda barra após os cinco primeiros caracteres
      value = `${value.slice(0, 5)}/${value.slice(5)}`;
    }

    setDataNascimento(value);
  };

  const handleRGInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length >= 2) {
      // Insere a barra após os dois primeiros caracteres
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    if (value.length >= 5) {
      // Insere a segunda barra após os cinco primeiros caracteres
      value = `${value.slice(0, 5)}/${value.slice(5)}`;
    }

    setDataEmissaoRG(value);
  };

  useEffect(() => {
    // Função para pegar a lista de gêneros da nossa REST API
    async function getGenders() {
      const response = await axios.get('/vinculos/api/sexos/');
      const gendersData = response.data;

      setGenders(gendersData);
    }

    getGenders();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div id="direita">
          <div id="formulario-funcionario">
            <h1 id="titulo">Funcionário</h1>
            <p id="descricao">Cadastrar novo funcionário</p>
            <hr />
            <p id="aviso">Insira os dados abaixo:</p>

            <form
              method="post"
              id="preenchimento"
              onSubmit={handleSubmitFuncionario}
            >
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
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="formulario-parte" id="tres-inputs">
                <input
                  type="text"
                  name="data_nascimento"
                  id="data_nascimento"
                  placeholder="Data de Nascimento"
                  maxLength="10"
                  value={dataNascimento}
                  onChange={handleBirthDateInputChange}
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
                  onChange={handleRGInputChange}
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
          </div>
        </div>
      </main>
    </>
  );
}
