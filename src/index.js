import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import axios from 'axios';
import Router from "./Router"
import 'fontsource-roboto';
import { AuthProvider } from './context/AuthContext';

// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:4004/api/v1';
// axios.defaults.headers = { 'Content-Type': 'application/json' }

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
