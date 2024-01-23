import { call, put, all, takeLatest } from 'redux-saga/effects';
import axios from '../services/axios';
import history from '../services/history';
import * as actions from './actions';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/api/token/', payload);

    yield put(actions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.access}`;

    history.push('/vinculos/funcionarios/');
    history.go();
  } catch {
    yield put(actions.loginFailure());
  }
}

export default all([takeLatest('LOGIN_REQUEST', loginRequest)]);
