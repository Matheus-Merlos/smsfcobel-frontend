import * as actionTypes from './types';

export function loginRequest(payload) {
  return {
    type: actionTypes.LOGIN_REQUEST,
    payload,
  };
}

export function loginFailure() {
  return {
    type: actionTypes.LOGIN_FAILURE,
  };
}

export function loginSuccess(payload) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload,
  };
}
