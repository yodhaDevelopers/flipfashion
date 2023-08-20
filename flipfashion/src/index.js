import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import reducer, { initialState } from './reducer';
import { StateProvider } from './StateProvider';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
