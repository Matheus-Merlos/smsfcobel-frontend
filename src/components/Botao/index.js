import React from 'react';
import PropTypes from 'prop-types';

import './Style.css';

export default function Botao({ nome, disabled }) {
  return (
    <button type="submit" id="botao-envio-formulario" disabled={disabled}>
      {nome}
    </button>
  );
}

Botao.defaultProps = {
  disabled: false,
};

Botao.propTypes = {
  nome: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
