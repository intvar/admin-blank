import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import UserIcon from 'material-ui/svg-icons/social/person';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { ADMIN_STATUSES } from '../../constants';
import { SearchNotFound, ContentSpinner, InfiniteScroll, ContentAddButton } from '../../../core/';

const listStyles = {
  padding: '0px',
};
const listItemStyle = {
  textDecoration: 'none',
};
const linkStyle = {
  textDecoration: 'none',
};

export default class Admins extends React.Component {
  static getSecondaryText(admin) {
    return `${ADMIN_STATUSES[admin.status]}.`;
  }

  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.reload();
  }

  onDeleteClick(e, AdminId) {
    e.preventDefault();
    this.props.onDeleteAdmin(AdminId);
  }

  render() {
    const {
      admins,
      isLoading,
      hasMoreAdmins,
      onDataRequest,
    } = this.props;

    const renderAdmins = () => (
      <List className="users" style={listStyles}>
        {
          admins.map(admin => (
            <Link to={`/admins/${admin.id}`} key={String(admin.id)} style={linkStyle}>
              <Paper className="users__item">
                <ListItem
                  leftAvatar={<Avatar src={admin.photo} icon={<UserIcon />} />}
                  primaryText={`${admin.first_name} ${admin.last_name}`}
                  secondaryText={Admins.getSecondaryText(admin)}
                  style={listItemStyle}
                  rightIconButton={
                    <IconButton onClick={e => this.onDeleteClick(e, admin.id)}>
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
        hasMore={hasMoreAdmins}
      >
        {hasMoreAdmins || Admins.length ? renderAdmins() : <SearchNotFound />}
        <Link to="/admins/add"><ContentAddButton /></Link>
        { isLoading ? <ContentSpinner /> : null }
      </InfiniteScroll>
    );
  }
}

Admins.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape({
    photo: PropTypes.string,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onDataRequest: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
  onDeleteAdmin: PropTypes.func.isRequired,
  hasMoreAdmins: PropTypes.bool.isRequired,
};

