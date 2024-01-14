import React from 'react';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element }) {
  const isLoggedIn = true;
  if (isLoggedIn) {
    return element;
  }

  return <Navigate to="/login/" />;
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
