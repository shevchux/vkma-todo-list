import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import vkBridge from '@vkontakte/vk-bridge';

vkBridge.send('VKWebAppInit');

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
