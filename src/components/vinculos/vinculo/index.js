/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Style.css';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';

export default function Vinculo({
  profissionalID,
  vinculoID,
  nome,
  local,
  criacao,
  inicio,
  tipo,
  cpf,
  rg,
  expedicaoRG,
  email,
  nomeMae,
  nomePai,
  cns,
  funcao,
  operadorCodigo,
  profissionalCodigo,
}) {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [operador, setOperador] = useState('');
  const [profissional, setProfissional] = useState('');

  function toggleModal() {
    setModalIsVisible(!modalIsVisible);
  }

  async function patchVinculo() {
    const vinculoPatch = {
      status_ids_id: 2,
    };
    try {
      await axios.patch(`/vinculos/api/${vinculoID}/`, vinculoPatch);

      toast.success('Vínculo atualizado com sucesso!');

      toggleModal();
    } catch (error) {
      toast.error(`Erro interno do sistema: ${error}`);
    }
  }

  async function handleVinculoPatch() {
    const profissionalPatch = {
      operador: parseInt(operador, 10),
      profissional: parseInt(profissional, 10),
    };

    if (operador === '') {
      toast.info("Preencha o campo de 'operador' para continuar");
      return;
    }

    try {
      await axios.patch(
        `/vinculos/api/funcionarios/${profissionalID}/`,
        profissionalPatch
      );
      await patchVinculo();

      setOperador('');
      setProfissional('');
    } catch (error) {
      toast.error(`Erro interno do sistema: ${error}`);
    }
  }

  function formatCPF(cpfToFormat) {
    const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cpfToFormat.replace(regex, '$1.$2.$3-$4');
  }

  // Formatar Cartão SUS
  function formatCNS(cartaoSUS) {
    const regex = /^(\d{3})(\d{4})(\d{4})(\d{4})$/;
    return cartaoSUS.replace(regex, '$1.$2.$3.$4');
  }

  function selectModal() {
    return operador !== '' ? (
      <section id="escurecimento">
        <div id="vinculo-modal">
          <h1 id="titulo-modal">Adicionar Vínculo</h1>
          <hr />
          <p className="titulo-vinculo">
            Nome: <span className="enfase">{nome}</span>
          </p>
          <div className="informacoes-vinculo">
            <p className="titulo-vinculo">
              CPF: <span className="enfase">{formatCPF(cpf)}</span>
            </p>
            <p className="titulo-vinculo">
              RG: <span className="enfase">{rg}</span>
            </p>
            <p className="titulo-vinculo">
              Expedição:<span className="enfase">{expedicaoRG}</span>
            </p>
          </div>
          <p className="titulo-vinculo">
            Local: <span className="enfase">{local}</span>
          </p>
          <p className="titulo-vinculo">
            E-mail: <span className="enfase">{email}</span>
          </p>
          <div className="informacoes-vinculo">
            <p className="titulo-vinculo">
              Nome da Mãe: <span className="enfase">{nomeMae}</span>
            </p>
            <p className="titulo-vinculo">
              Nome do Pai: <span className="enfase">{nomePai}</span>
            </p>
          </div>
          <p className="titulo-vinculo">
            CNS: <span className="enfase">{formatCNS(cns)}</span>
          </p>
          <p className="titulo-vinculo">
            Função: <span className="enfase">{funcao}</span>
          </p>
          <div className="informacoes-vinculo inputs-vinculo-completo">
            <div>
              <label
                htmlFor="operador"
                className="titulo-vinculo label-vinculo-completo"
              >
                Operador:
              </label>
              <input
                type="number"
                name="operador"
                id="operador"
                placeholder="Código de Operador"
                onChange={(e) => setOperador(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="profissional" className="titulo-vinculo">
                Profissional:
              </label>
              <input
                type="number"
                name="profissional"
                id="profissional"
                placeholder="Código de Profissional"
                onChange={(e) => setProfissional(e.target.value)}
              />
            </div>
          </div>
          <div id="botoes">
            <button type="button" onClick={toggleModal}>
              Cancelar
            </button>
            <button type="button" onClick={handleVinculoPatch}>
              Adicionar
            </button>
          </div>
        </div>
      </section>
    ) : (
      <section id="escurecimento">
        <div id="vinculo-modal">
          <h1 id="titulo-modal">Adicionar Vínculo</h1>
          <hr />
          <p className="titulo-vinculo">
            Nome: <span className="enfase">{nome}</span>
          </p>
          <p className="titulo-vinculo">
            Local: <span className="enfase">{local}</span>
          </p>
          <p className="titulo-vinculo">
            Função: <span className="enfase">{funcao}</span>
          </p>
          <div className="informacoes-vinculo">
            <p className="titulo-vinculo">
              Operador: <span className="enfase">{operadorCodigo}</span>
            </p>
            <p className="titulo-vinculo">
              Profissional: <span className="enfase">{profissionalCodigo}</span>
            </p>
          </div>
          <div id="botoes">
            <button type="button" onClick={toggleModal}>
              Cancelar
            </button>
            <button type="button" onClick={patchVinculo}>
              Adicionar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="vinculo">
        <div>
          <p id="tipo-vinculo">+Novo!</p>
          <p className="enfase">{nome}</p>
          <p className="enfase">{local}</p>
          <div id="datas">
            <p className="enfase">
              Criação: <span className="destaque">{criacao}</span>
            </p>
            <p className="enfase">
              Inicio: <span className="destaque">{inicio}</span>
            </p>
            <p className="enfase">
              Tipo: <span className="destaque">{tipo}</span>
            </p>
          </div>
        </div>
        <div id="button-container">
          <button type="button" id="botao-adicionar" onClick={toggleModal}>
            +Adicionar
          </button>
        </div>
      </section>
      {modalIsVisible && selectModal()}
    </>
  );
}

Vinculo.propTypes = {
  profissionalID: PropTypes.string.isRequired,
  vinculoID: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  local: PropTypes.string.isRequired,
  criacao: PropTypes.string.isRequired,
  inicio: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  rg: PropTypes.string.isRequired,
  expedicaoRG: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  nomeMae: PropTypes.string.isRequired,
  nomePai: PropTypes.string.isRequired,
  cns: PropTypes.string.isRequired,
  funcao: PropTypes.string.isRequired,
  operadorCodigo: PropTypes.string.isRequired,
  profissionalCodigo: PropTypes.string.isRequired,
};
