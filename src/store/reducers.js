/* eslint-disable default-param-last */
import * as types from './types';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
};

const initialMenuState = {
  currentMenu: 'Vínculos CNES/IDS',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...initialState };
      newState.isLoggedIn = true;
      newState.accessToken = action.payload.access;
      newState.refreshToken = action.payload.refresh;
      return newState;
    }

    default: {
      return state;
    }
  }
}

export function menuChangeReducer(state = initialMenuState, action) {
  switch (action.type) {
    case types.MENU_CHANGE: {
      const newState = { ...initialMenuState };
      const { newMenu } = action.payload;
      newState.currentMenu = newMenu;
      return newState;
    }

    default: {
      return state;
    }
  }
}
