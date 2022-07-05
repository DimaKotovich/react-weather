import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const strictMode = process.env.NODE_ENV === 'production';

root.render(
  (strictMode && (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )) || <App />,
);

