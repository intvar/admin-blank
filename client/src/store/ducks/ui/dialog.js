import { Map } from 'immutable';

const SHOW = 'dialog/SHOW';
const HIDE = 'dialog/HIDE';
const OUTSIDE_HIDE = 'dialog/OUTSIDE_HIDE';
const ACCEPT = 'dialog/ACCEPT';
const CANCEL = 'dialog/CANCEL';

const initialState = Map({
  open: false,
  title: '',
  message: '',
  // react component
  component: null,
  componentProps: null,
  element: null,
  isDialog: false,
  showHideButton: true,
  maxWidth: '',
  modal: false,
  // action or callback,
  onAccept: null,
  onCancel: null,
  onHide: null,
  onOutsideHide: null,
});

export default function dialog(state = initialState, action) {
  const {
    type,
    title,
    message,
    component,
    componentProps,
    element,
    isDialog = false,
    showHideButton = true,
    maxWidth = '',
    modal = false,
    onAccept = null,
    onCancel = null,
    onHide = null,
    onOutsideHide = null,
  } = action;

  switch (type) {
    case SHOW:
      return state.merge(Map({
        open: true,
        title,
        message,
        component,
        componentProps,
        element,
        isDialog,
        showHideButton,
        maxWidth,
        modal,
        onAccept,
        onCancel,
        onHide,
        onOutsideHide,
      }));

    case HIDE:
    case OUTSIDE_HIDE:
      return state.merge(initialState);

    case ACCEPT:
    case CANCEL:
      return state.merge(initialState);

    default:
      return state;
  }
}

export function showDialog(options) {
  const {
    title,
    message,
    component,
    componentProps,
    element,
    isDialog,
    showHideButton,
    maxWidth = '760px',
    modal,
    onAccept,
    onCancel,
    onHide,
    onOutsideHide,
  } = options;

  return (dispatch, getState) => {
    const dialogState = getState().ui.dialog.toJS();
    const showAction = {
      type: SHOW,
      title,
      message,
      component,
      componentProps,
      element,
      isDialog,
      showHideButton,
      maxWidth,
      modal,
      onAccept,
      onCancel,
      onHide,
      onOutsideHide,
    };

    if (dialogState.open) {
      dispatch({
        type: HIDE,
      });

      setTimeout(() => {
        dispatch(showAction);
      }, 500);
    } else {
      dispatch(showAction);
    }
  };
}

export function hideDialog() {
  return (dispatch, getState) => {
    const onHide = getState().ui.dialog.toJS().onHide;

    if (onHide) {
      if (onHide instanceof Function) {
        onHide();
      } else if (onHide instanceof Object && onHide.type) {
        dispatch(onHide);
      }
    }

    dispatch({
      type: HIDE,
    });
  };
}

export function outsideHideDialog() {
  return (dispatch, getState) => {
    const onOutsideHide = getState().ui.dialog.toJS().onOutsideHide;

    if (onOutsideHide) {
      if (onOutsideHide instanceof Function) {
        onOutsideHide();
      } else if (onOutsideHide instanceof Object && onOutsideHide.type) {
        dispatch(onOutsideHide);
      }
    }

    dispatch({
      type: OUTSIDE_HIDE,
    });
  };
}

/**
 * Resolve dialog with accept or cancel.
 * @param {bool} accept - If true - accept, else - cancel.
 */
function resolveDialog(accept) {
  const stateProp = accept ? 'onAccept' : 'onCancel';
  const actionToDispatch = accept ? ACCEPT : CANCEL;

  return (dispatch, getState) => {
    const dialogState = getState().ui.dialog.toJS();

    dispatch({ type: actionToDispatch });

    if (dialogState[stateProp]) {
      if (dialogState[stateProp] instanceof Function) {
        dispatch(dialogState[stateProp]);
      } else if (dialogState[stateProp] instanceof Object && dialogState[stateProp].type) {
        dispatch(dialogState[stateProp]);
      }
    }
  };
}

export function acceptDialog() {
  return resolveDialog(true);
}

export function cancelDialog() {
  return resolveDialog(false);
}
