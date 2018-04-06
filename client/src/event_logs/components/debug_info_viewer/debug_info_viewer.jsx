/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactJsonView from 'react-json-view';
import { ContentSpinner } from '../../../core/';

import './style.scss';

export default class DebugInfoView extends React.PureComponent {
  render() {
    const { isFetching, debugInfo, errorText } = this.props;

    return (
      <div className="debig-info-viewer">
        {
          isFetching ?
            <ContentSpinner />
            :
            (debugInfo && <ReactJsonView src={debugInfo} displayDataTypes={false} />) || errorText || 'Empty debug info'
        }
      </div>
    );
  }
}

DebugInfoView.defaultProps = {
  debugInfo: null,
  errorText: null,
};

DebugInfoView.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  debugInfo: PropTypes.object,
  errorText: PropTypes.string,
};
