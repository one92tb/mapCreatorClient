import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {store} from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
  ,document.getElementById('root'));
registerServiceWorker();
