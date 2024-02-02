import React from 'react';

import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../services/history';
import * as actions from '../../store/actions';

export default function Icon({ itemIcon, name, link }) {
  const dispatch = useDispatch();

  function redirect(place) {
    history.push(place);
    history.go();
  }

  return (
    <div
      role="button"
      tabIndex="0"
      onClick={() => {
        redirect(link);
        dispatch(actions.changeMenu({ newMenu: name }));
      }}
      onKeyDown={(e) => {
        if (e.key === 'v') {
          redirect(link);
        }
      }}
    >
      <img src={itemIcon} alt="teste" />
      <p>{name}</p>
    </div>
  );
}

Icon.propTypes = {
  itemIcon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
