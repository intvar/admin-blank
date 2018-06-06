import { appName } from '../../config';

export const moduleName = 'left_menu';
const prefix = `${appName}/${moduleName}`;

export const TOGGLE = `${prefix}/TOGGLE`;

export default (state = true, { type }) => {
  switch (type) {
    case TOGGLE:
      return !state;
    default:
      return state;
  }
};

export const getLeftMenu = state => state.ui[moduleName];
