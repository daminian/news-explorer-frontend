import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';
import App from '../src/components/App/App.js';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
