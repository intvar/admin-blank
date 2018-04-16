import React from 'react';
import PropTypes from 'prop-types';
import MaterialDialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';

const Dialog = ({ dialogProperties, component, componentProperties, closeDialog }) => {
  const Component = component;
  const open = !!component;
  if (!component) return null;
  return (
    <MaterialDialog {...dialogProperties} open={open} onRequestClose={closeDialog}>
      <Component {...componentProperties} />
    </MaterialDialog>
  );
};

export default Dialog;

// Dialog.propTypes = {
//   dialogProperties: PropTypes.object,
//   component: PropTypes.,
//   componentProperties: PropTypes.componentProperties,
// };

// Dialog.defaultProps = {
//   component: null,
//   componentProperties: null,
//   dialogProperties: null,
// };
