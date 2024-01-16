import { createStore } from 'redux';

const initialState = {
  isLoggedIn: false,
  acessToken: '',
  refreshToken: '',
};

function reducer(action, state = initialState) {
  switch (action.type) {
    case 'LOGIN_EFETUADO': {
      const newState = { ...state };
      newState.isLoggedIn = true;
      return newState;
    }
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
