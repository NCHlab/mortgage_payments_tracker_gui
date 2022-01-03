import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import Router from "./Router"
import 'fontsource-roboto';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
