import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/vinculos/sidebar';

import axios from '../../../services/axios';

import './Style.css';

export default function Funcionarios() {
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    async function getGenders() {
      const response = await axios.get('/vinculos/api/sexos/');
      const gendersData = response.data.map(
        (gender) => `${gender.id}-${gender.descricao}`
      );

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

            <form method="post" id="preenchimento">
              <div className="formulario-parte nome-sexo">
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Nome Completo"
                />
                <select name="sexo" id="sexo">
                  {genders.map((gender) => (
                    <option>{gender}</option>
                  ))}
                </select>
              </div>
              <div className="formulario-parte dois-inputs">
                <input type="number" name="cpf" id="cpf" placeholder="CPF" />
                <input type="number" name="cns" id="cns" placeholder="CNS" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
              />
              <div className="formulario-parte" id="tres-inputs">
                <input
                  type="date"
                  name="data_nascimento"
                  id="data_nascimento"
                  placeholder="Data de Nascimento"
                />
                <input type="number" name="rg" id="rg" placeholder="RG" />
                <input
                  type="date"
                  name="emissao_rg"
                  id="emissao_rg"
                  placeholder="Data de Emissão do RG"
                />
              </div>
              <div className="formulario-parte dois-inputs">
                <input
                  type="text"
                  name="nome_mae"
                  id="nome_mae"
                  placeholder="Nome da mãe"
                />
                <input
                  type="text"
                  name="nome_pai"
                  id="nome_pai"
                  placeholder="Nome do Pai"
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
