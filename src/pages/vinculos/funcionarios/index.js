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

  async function handleSubmit(e) {
    e.preventDefault();

    const funcionario = {
      nome,
      sexo_codigo: sexo,
      cpf,
      rg,
      emissao_rg: dataEmissaoRG,
      cns,
      email,
      data_nascimento: dataNascimento,
      nome_mae: nomeMae,
      nome_pai: nomePai,
    };
    await axios.post('/vinculos/api/funcionarios/', funcionario);
  }

  useEffect(() => {
    async function getGenders() {
      const response = await axios.get('/vinculos/api/sexos/');
      const gendersData = response.data.map((gender) => ({
        id: gender.id,
        descricao: gender.descricao,
      }));

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

            <form method="post" id="preenchimento" onSubmit={handleSubmit}>
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
                  maxLength="8"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
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
                  maxLength="8"
                  value={dataEmissaoRG}
                  onChange={(e) => setDataEmissaoRG(e.target.value)}
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
