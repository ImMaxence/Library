import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider
    locale={frFR}
    theme={{
      "token": {
        "colorPrimary": "#ff7a59",
        "colorInfo": "#ff7a59"
      }
    }}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </ConfigProvider>
);
