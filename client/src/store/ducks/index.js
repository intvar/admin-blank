import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import ui from './ui/';
import data from './data/';

const rootPersistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  whitelist: ['ui', 'form'],
};

const rootReducer = combineReducers({
  ui,
  data,
  form: formReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
