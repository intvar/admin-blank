import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

const Button = ({
  clickHandler,
  label,
  primary,
}) => (<FlatButton
  label={label}
  primary={primary}
  onClick={clickHandler}
/>);

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  primary: PropTypes.bool,
};

Button.defaultProps = {
  primary: true,
};

export default actions => connect(null, dispatch => ({
  clickHandler: () => {
    if (Array.isArray(actions)) actions.map(dispatch);
    else dispatch(actions);
  },
}))(Button);
