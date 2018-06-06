import 'regenerator-runtime/runtime';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
// import theme from './theme';
import App from './core/containers/app';
import './core/axios.settings';

import './core/scss/main.scss';

ReactDOM.render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
);
