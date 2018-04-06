import 'regenerator-runtime/runtime';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store';
import theme from './theme';
import App from './core/containers/app';

import './core/scss/main.scss';

/**
 * @todo move in separate file
 */
axios.interceptors.response.use(res => res, (error) => {
  if (error.response.status === 401) {
    console.log('unauthorized');
  }
  else return Promise.reject(error);
});

ReactDOM.render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <App />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
);
