import React from 'react';
import PropTypes from 'prop-types';

import './Style.css';

export default function Botao({ nome }) {
  return (
    <button type="submit" id="botao-envio-formulario">
      {nome}
    </button>
  );
}

Botao.propTypes = {
  nome: PropTypes.string.isRequired,
};
