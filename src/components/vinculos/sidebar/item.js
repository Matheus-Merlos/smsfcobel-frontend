import React from 'react';
import PropTypes from 'prop-types';

import history from '../../../services/history';

export default function Item({ linkToRedirect, icon, name }) {
  function redirect(link) {
    history.push(link);
    history.go();
  }

  function handleKeyPress(event) {
    if (event.key === 'v') {
      redirect(linkToRedirect);
    }
  }

  return (
    <>
      <div onClick={() => redirect(linkToRedirect)} onKeyUp={handleKeyPress}>
        <img src={icon} alt={name} />
        <h1>{name}</h1>
      </div>
      <hr />
    </>
  );
}

Item.propTypes = {
  linkToRedirect: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};
