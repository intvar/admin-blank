import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';

import './style.scss';

const style = {
  background: '#fff',
};

export default () => (
  <FloatingActionButton className="content-add-button" mini={false} style={style} zDepth={2}>
    <ContentAddIcon />
  </FloatingActionButton>
);
