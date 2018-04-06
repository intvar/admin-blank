import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import ui from './ui/';
import data from './data/';

const rootReducer = combineReducers({
  ui,
  data,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
