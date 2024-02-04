import React from 'react';

import PropTypes from 'prop-types';

import './Style.css';

export default function Title({ title, spec }) {
  return (
    <>
      <h1 id="titulo">{title}</h1>
      <h3 id="descricao">{spec}</h3>
      <hr />
      <p id="aviso">Insira os dados abaixo:</p>
    </>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  spec: PropTypes.string.isRequired,
};
