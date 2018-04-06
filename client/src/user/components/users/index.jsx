import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import UserIcon from 'material-ui/svg-icons/social/person';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import ReactInfinite from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { USER_STATUSES, USER_KYC_STATUSES } from '../../constants';
import { ContentAddButton, SearchNotFound, ContentSpinner } from '../../../core/';
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

export default class Users extends React.Component {
  static getPermissionsText(permissions) {
    /* eslint no-confusing-arrow: 0 */
    return permissions ?
      Object.keys(permissions)
        .reduce(
          (acc, permission) => permissions[permission] ? `${acc} ${permission.slice(0, 1).toUpperCase()}${permission.slice(1)}.` : '',
          '',
        )
      :
      '';
  }

  static getSecondaryText(user) {
    return `${USER_STATUSES[user.status]}.
    ${Users.getPermissionsText(user.permissions)}
    KYC status: ${USER_KYC_STATUSES[user.kyc_status].toLowerCase()}.
    ${user.whitelist_status ? 'Included in whitelist.' : ''}`;
  }

  constructor() {
    super();

    this.onDeleteClick = (e) => {
      e.preventDefault();
      const userId = e.currentTarget.getAttribute('data-user-id');
      this.props.onDeleteUser(userId);
    };
  }

  componentWillMount() {
    this.props.onDataRequest();
  }

  render() {
    const { users, isLoading, hasMoreUsers, onMoreDataRequest, userPermission } = this.props;

    const renderUsers = () => (
      <List className="users" style={listStyles}>
        {
          users.map(user => (
            <Link to={`/users/edit/${user.id}`} key={String(user.id)} style={linkStyle}>
              <Paper className="users__item">
                <ListItem
                  leftAvatar={<Avatar src={user.photo} icon={<UserIcon />} />}
                  primaryText={`${user.first_name} ${user.last_name}`}
                  secondaryText={Users.getSecondaryText(user)}
                  style={listItemStyle}
                  rightIconButton={
                    <IconButton data-user-id={user.id} onClick={this.onDeleteClick}>
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
      <ReactInfinite
        next={onMoreDataRequest}
        hasMore={hasMoreUsers}
      >
        <UsersFilters />
        {hasMoreUsers || users.length ? renderUsers() : <SearchNotFound />}
        <Link to="/users/add/"><ContentAddButton /></Link>
        { isLoading ? <ContentSpinner /> : null }
      </ReactInfinite>
    );
  }
}

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    photo: PropTypes.string,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onDataRequest: PropTypes.func.isRequired,
  onMoreDataRequest: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  hasMoreUsers: PropTypes.bool.isRequired,
};

