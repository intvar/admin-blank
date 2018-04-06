import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import './style.scss';

const ContentSpinner = () => (
  <div className="content-spinner">
    <CircularProgress size={60} thickness={5} style={{ margin: 'auto' }} />
  </div>
);

export default ContentSpinner;
