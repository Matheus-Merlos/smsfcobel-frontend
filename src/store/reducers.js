import * as types from './types';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
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
