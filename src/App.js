import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Login from './pages/Login';
import Funcionarios from './pages/vinculos/funcionarios';
import Vincular from './pages/vinculos/vincular';

import VinculosIDS from './pages/vinculos_pendentes/vinculos_ids';

import PrivateRoute from './services/PrivateRoute';
import store, { persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={3000} className="toast-container" />
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/login/" element={<Login />} />
            <Route
              path="/vinculos/funcionarios/"
              element={<PrivateRoute element={<Funcionarios />} />}
            />
            <Route
              path="/vinculos/vincular/"
              element={<PrivateRoute element={<Vincular />} />}
            />
            <Route
              path="/vinculos/vinculos-ids/"
              element={<PrivateRoute element={<VinculosIDS />} />}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
