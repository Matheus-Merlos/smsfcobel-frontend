import React from 'react';
import PropTypes from 'prop-types';

import './Style.css';

export default function Vinculo({ nome, local, criacao, inicio, tipo }) {
  return (
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
        <button type="button" id="botao-adicionar">
          +Adicionar
        </button>
      </div>
    </section>
  );
}

Vinculo.propTypes = {
  nome: PropTypes.string.isRequired,
  local: PropTypes.string.isRequired,
  criacao: PropTypes.string.isRequired,
  inicio: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
};
