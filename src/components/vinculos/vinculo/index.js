/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Style.css';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';

export default function Vinculo({
  profissionalID,
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
}) {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [operador, setOperador] = useState('');
  const [profissional, setProfissional] = useState('');

  function toggleModal() {
    setModalIsVisible(!modalIsVisible);
  }

  async function handleVinculoPatch() {
    const vinculoPatch = {
      operador: parseInt(operador, 10),
      profissional: parseInt(profissional, 10),
    };

    try {
      await axios.patch(
        `/vinculos/api/funcionarios/${profissionalID}/`,
        vinculoPatch
      );
      toast.success('Vínculo atualizado com sucesso!');

      toggleModal();
      setOperador('');
      setProfissional('');
    } catch (error) {
      toast.error(`Erro interno do sistema: ${error}`);
    }
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
      {modalIsVisible && (
        <section id="escurecimento">
          <div id="vinculo-completo-modal">
            <h1 id="titulo-modal-vinculo-completo">Adicionar Vínculo</h1>
            <hr />
            <p className="titulo-vinculo">
              Nome: <span className="enfase">{nome}</span>
            </p>
            <div className="informacoes-vinculo-completo">
              <p className="titulo-vinculo">
                CPF: <span className="enfase">{cpf}</span>
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
            <div className="informacoes-vinculo-completo">
              <p className="titulo-vinculo">
                Nome da Mãe: <span className="enfase">{nomeMae}</span>
              </p>
              <p className="titulo-vinculo">
                Nome do Pai: <span className="enfase">{nomePai}</span>
              </p>
            </div>
            <p className="titulo-vinculo">
              CNS: <span className="enfase">{cns}</span>
            </p>
            <p className="titulo-vinculo">
              Função: <span className="enfase">{funcao}</span>
            </p>
            <div className="informacoes-vinculo-completo inputs-vinculo-completo">
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
      )}
    </>
  );
}

Vinculo.propTypes = {
  profissionalID: PropTypes.string.isRequired,
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
};
