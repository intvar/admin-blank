import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import UserIcon from 'material-ui/svg-icons/social/person';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { USER_STATUSES } from '../../constants';
import { SearchNotFound, ContentSpinner, InfiniteScroll } from '../../../core/';
import UsersFilters from './containers/usersFilters';

import './style.scss';

const listStyles = {
  padding: '0px',
};
const listItemStyle = {
  textDecoration: 'none',
};
const linkStyle = {
  textDecoration: 'none',
};
/**
 * @todo Add filters
 */
export default class Users extends React.Component {
  static getSecondaryText(user) {
    return `${USER_STATUSES[user.status]}.`;
  }

  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.props.onDataRequest();
    }
  }

  onDeleteClick(e, userId) {
    e.preventDefault();
    this.props.onDeleteUser(userId);
  }

  render() {
    const {
      users,
      isLoading,
      hasMoreUsers,
      onDataRequest,
    } = this.props;

    const renderUsers = () => (
      <List className="users" style={listStyles}>
        {
          users.map(user => (
            <Link to={`/users/${user.id}`} key={user.id} style={linkStyle}>
              <Paper className="users__item">
                <ListItem
                  leftAvatar={<Avatar src={user.photo} icon={<UserIcon />} />}
                  primaryText={`${user.first_name} ${user.last_name}`}
                  secondaryText={Users.getSecondaryText(user)}
                  style={listItemStyle}
                  rightIconButton={
                    <IconButton onClick={e => this.onDeleteClick(e, user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                />
              </Paper>
            </Link>
          ))
        }
      </List>
    );

    return (
      <InfiniteScroll
        isLoading={isLoading}
        onLoadMore={onDataRequest}
        hasMore={hasMoreUsers}
      >
        <UsersFilters />
        {hasMoreUsers || users.length ? renderUsers() : <SearchNotFound />}
        { isLoading ? <ContentSpinner /> : null }
      </InfiniteScroll>
    );
  }
}

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    photo: PropTypes.string,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onDataRequest: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  hasMoreUsers: PropTypes.bool.isRequired,
};

