import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Paper from 'material-ui/Paper';
import './style.scss';

export default class SearchNotFound extends React.PureComponent {
  render() {
    const { message } = this.props;
    return (
      <Paper className="search-not-found">
        <span className="search-not-found__text">{message}</span>
        <SearchIcon className="search-not-found__icon" />
      </Paper>
    );
  }
}

SearchNotFound.defaultProps = {
  message: 'Lines matching the search criteria were not found',
};

SearchNotFound.propTypes = {
  message: PropTypes.string,
};

