import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

const HideButton = ({
  clickHandler,
  label,
  primary,
}) => (<FlatButton
  label={label}
  primary={primary}
  onClick={clickHandler}
/>);

HideButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  primary: PropTypes.bool,
};

HideButton.defaultProps = {
  primary: true,
};

export default actionType => connect(null, {
  clickHandler: () => ({ type: actionType }),
})(HideButton);
