/* eslint-disable default-param-last */
import * as types from './types';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  userId: '',
  userName: '',
  userCPF: '',
  userEmail: '',
  permissions: [],
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
      newState.userId = action.payload.user_id;
      newState.userName = action.payload.user;
      newState.userCPF = action.payload.cpf;
      newState.userEmail = action.payload.email;
      newState.permissions = action.payload.permissions;
      return newState;
    }

    case types.USER_LOGOUT: {
      return initialState;
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
