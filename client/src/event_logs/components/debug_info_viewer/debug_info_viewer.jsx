/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactJsonView from 'react-json-view';
import { ContentSpinner } from '../../../core/';

import './style.scss';

export default class DebugInfoView extends React.PureComponent {
  render() {
    const { isLoading, debugInfo } = this.props;
    if (isLoading) return <ContentSpinner />;
    return (
      <div className="debig-info-viewer">
        {
          debugInfo ? <ReactJsonView src={debugInfo} displayDataTypes={false} /> : 'Empty debug info'
        }
      </div>
    );
  }
}

DebugInfoView.defaultProps = {
  debugInfo: null,
};

DebugInfoView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  debugInfo: PropTypes.object,
};
