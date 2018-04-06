import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';

const LinearLoader = ({ isLoading }) => (
  <div className="loader-wrapper">
    {isLoading ? <LinearProgress mode="indeterminate" /> : null }
  </div>
);

LinearLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LinearLoader;
