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

export function changeMenu(payload) {
  return {
    type: actionTypes.MENU_CHANGE,
    payload,
  };
}

export function userLogout() {
  return {
    type: actionTypes.USER_LOGOUT,
  };
}
