import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { TextField, SelectField } from 'redux-form-material-ui';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { ADMIN_STATUSES } from '../../constants';
import { ContentSpinner } from '../../../core';
import './style.scss';

class AdminEditor extends Component {
  componentDidMount() {
    const { adminId } = this.props;
    if (adminId) {
      this.props.onAdminFetch(adminId);
    }
  }
  render() {
    const { handleSubmit, adminId, isLoading } = this.props;
    if (isLoading) return <ContentSpinner />;
    return (
      <Paper className="admin-editor">
        <form onSubmit={handleSubmit} className="admin-editor__form">
          <h3>{adminId ? 'Edit Admin' : 'Add Admin'}</h3>
          <div className="admin-editor__form-container">
            <Field name="first_name" component={TextField} floatingLabelText="First name" />
            <Field name="last_name" component={TextField} floatingLabelText="Last name" />
          </div>
          <div className="admin-editor__form-container">
            <Field name="email" component={TextField} floatingLabelText="Email" disabled={!!adminId} />
            <Field name="status" component={SelectField} floatingLabelText="Status" disabled={!adminId}>
              {
                Object.keys(ADMIN_STATUSES)
                  .map(statusId => (
                    <MenuItem
                      key={statusId}
                      value={+statusId}
                      primaryText={ADMIN_STATUSES[statusId]}
                    />
                  ))
              }
            </Field>
          </div>
          <div className="admin-editor__buttons">
            <RaisedButton primary type="submit" label="save" />
            <RaisedButton label="cancel" containerElement={<Link to="/admins" />} className="admin-editor__button-cancel" />
          </div>
        </form>
      </Paper>
    );
  }
}

AdminEditor.propTypes = {
  adminId: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAdminFetch: PropTypes.func.isRequired,
};

AdminEditor.defaultProps = {
  adminId: null,
};

export default AdminEditor;
