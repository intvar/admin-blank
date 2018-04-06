import React from 'react';
import PropTypes from 'prop-types';
import MaterialDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Dialog = ({ options, onCancelDialog, onAcceptDialog, onHideDialog, onOutsideHideDialog }) => {
  const {
    open,
    title,
    message,
    component,
    componentProps,
    element,
    isDialog = false,
    showHideButton = true,
    maxWidth = '',
    modal = false,
  } = options;

  const Component = component;
  const actions = [];
  const dialogContentStyle = {
    maxWidth,
  };

  if (isDialog) {
    actions.push(
      <FlatButton label="Cancel" primary onClick={onCancelDialog} />,
      <FlatButton label="Accept" primary onClick={onAcceptDialog} />,
    );
  } else if (showHideButton) {
    actions.push(<FlatButton label="Hide" primary onClick={onHideDialog} />);
  }

  return (
    <MaterialDialog
      title={title}
      modal={modal}
      open={open}
      actions={actions}
      contentStyle={dialogContentStyle}
      onRequestClose={onOutsideHideDialog}
    >
      { component ? <Component {...componentProps} /> : message }
      { element || null }
    </MaterialDialog>
  );
};

export default Dialog;

Dialog.propTypes = {
  options: PropTypes.shape({
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    component: PropTypes.component,
    componentProps: PropTypes.object,
    element: PropTypes.node,
    isDialog: PropTypes.bool,
    showHideButton: PropTypes.bool,
    maxWidth: PropTypes.string,
    modal: PropTypes.bool,
  }).isRequired,
  onAcceptDialog: PropTypes.func.isRequired,
  onCancelDialog: PropTypes.func.isRequired,
  onHideDialog: PropTypes.func.isRequired,
  onOutsideHideDialog: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  onAcceptDialog: null,
  onCancelDialog: null,
};
