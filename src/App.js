import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Funcionarios from './pages/vinculos/funcionarios';

import PrivateRoute from './services/PrivateRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login/" element={<Login />} />
          <Route
            path="/vinculos/funcionarios/"
            element={<PrivateRoute element={<Funcionarios />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
