import React from 'react';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function PrivateRoute({ element }) {
  const isLoggedIn = useSelector((state) => state.reducer.isLoggedIn);
  if (isLoggedIn) {
    return element;
  }

  return <Navigate to="/login/" />;
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
