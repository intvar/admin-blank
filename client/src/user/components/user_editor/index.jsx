import React, { Component } from 'react';
import { Field } from 'redux-form';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { USER_STATUSES } from '../../constants';
import { ContentSpinner } from '../../../core';
import './style.scss';

export default class UserEditor extends Component {
  componentDidMount() {
    const { onUserFetch, id } = this.props;
    if (id) onUserFetch(id);
  }
  render() {
    const { id, handleSubmit, isLoading } = this.props;
    if (isLoading) return <ContentSpinner />;
    return (
      <Paper>
        <form className="profile__settings-form" onSubmit={handleSubmit}>
          <h3>{id ? 'Edit User' : 'Add User'}</h3>
          <div className="profile__settings-form-field">
            <Field
              name="first_name"
              component={TextField}
              className="profile__settings-form-input"
              floatingLabelText="First name"
              fullWidth
            />
            <Field
              name="last_name"
              component={TextField}
              className="profile__settings-form-input"
              floatingLabelText="Last name"
              fullWidth
            />
          </div>
          <div className="profile__settings-form-field">
            <Field
              name="email"
              component={TextField}
              className="profile__settings-form-input"
              floatingLabelText="Email"
              fullWidth
              disabled
            />
            <Field
              name="birthdate"
              component={DatePicker}
              className="profile__settings-form-input"
              floatingLabelText="Birthdate"
              style={{ width: '100%' }}
              format={null}
            />
          </div>
          <div className="profile__settings-form-field">
            <Field
              name="status"
              component={SelectField}
              className="profile__settings-form-input"
              floatingLabelText="Status"
              fullWidth
            >
              {
                Object.keys(USER_STATUSES)
                  .map(statusId => (
                    <MenuItem
                      key={statusId}
                      value={+statusId}
                      primaryText={USER_STATUSES[statusId]}
                    />
                  ))
              }
            </Field>
            <Field
              name="gender"
              component={SelectField}
              className="profile__settings-form-input"
              floatingLabelText="Gender"
              fullWidth
            >
              <MenuItem
                key={0}
                value={null}
              />
              <MenuItem
                key={1}
                value={0}
                primaryText="Female"
              />
              <MenuItem
                key={2}
                value={1}
                primaryText="Male"
              />
            </Field>
          </div>
          <RaisedButton type="submit" label="Save" primary className="profile__settings-form-actions" />
          <RaisedButton label="Cancel" containerElement={<Link to="/users" />} />
        </form>
      </Paper>
    );
  }
}

UserEditor.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onUserFetch: PropTypes.func.isRequired,
  id: PropTypes.string,
};

UserEditor.defaultProps = {
  id: null,
};
