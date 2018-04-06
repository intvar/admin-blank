import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  USER_STATUSES,
  USER_PERMISSIONS,
  USER_KYC_STATUSES,
  USER_KYC_STATUS_NOT_CHECKED,
  USER_KYC_STATUS_REJECTED,
} from '../../constants';
import { onFormFieldChange } from '../../../core/utils';

import './style.scss';

const ACTION_EDIT = 'edit';
const ACTION_ADD = 'add';
const reportsButtonstyle = { minWidth: '150px' };

export default class UserEditor extends React.Component {
  static getFormHash(form) {
    return `${Object.keys(form)}=${Object.values(form)}`;
  }

  static activePermissionsToArray(permissions) {
    return Object.keys(permissions)
      /* eslint no-confusing-arrow: 0 */
      .reduce((acc, permission) => permissions[permission] ?
        (acc.push(permission) && acc) : acc,
      []);
  }

  static permissionsArrayToObject(permissions) {
    return permissions
      /* eslint no-return-assign: 0 */
      .reduce((acc, permission) => (acc[permission] = true) && acc, {});
  }

  static formatUser(user) {
    return {
      ...user,
      permissions: UserEditor.activePermissionsToArray(user.permissions),
    };
  }

  static formatUserForApi(user) {
    return {
      ...user,
      permissions: UserEditor.permissionsArrayToObject(user.permissions),
    };
  }

  constructor() {
    super();

    this.state = {
      userSettings: {
        first_name: '',
        last_name: '',
        email: '',
        status: '',
        phone: '',
        company: '',
        vat_number: '',
        address: '',
        zip_code: '',
        city: '',
        country: '',
        ethereum_wallet: '',
        permissions: [],
        kyc_status: 0,
        kyc_details: '',
        kyc_message: '',
      },
      userSettingsHash: '',
    };

    this.state.userSettingsHash = UserEditor.getFormHash(this.state.userSettings);

    this.onFirstNameChange = onFormFieldChange(this, 'userSettings', 'first_name');
    this.onLastNameChange = onFormFieldChange(this, 'userSettings', 'last_name');
    this.onEmailChange = onFormFieldChange(this, 'userSettings', 'email');
    this.onStatusChange = onFormFieldChange(this, 'userSettings', 'status', true);
    this.onPermissionsChange = onFormFieldChange(this, 'userSettings', 'permissions', true);
    this.onKycStatusChange = onFormFieldChange(this, 'userSettings', 'kyc_status', true);
    this.onKycMessageChange = onFormFieldChange(this, 'userSettings', 'kyc_message');

    this.isSettingsSubmitDisabled = () =>
      !(
        this.state.userSettings.first_name
        && this.state.userSettings.last_name
        && this.isValidEmail()
        && this.state.userSettings.status
        && (!this.props.isLoading)
        && (this.state.userSettingsHash !== UserEditor.getFormHash(this.state.userSettings))
        && this.isValidKycMessage()
      );

    this.onUserSettingsSaveClick = () => {
      const {
        first_name,
        last_name,
        email,
        status,
        permissions,
        kyc_status,
        kyc_message,
      } = this.state.userSettings;
      const { action, onUserAdd, onUserSave } = this.props;

      if (action === ACTION_ADD) {
        onUserAdd(UserEditor.formatUserForApi({
          first_name, last_name, email, status, permissions,
        }));
      } else {
        onUserSave(this.props.id, UserEditor.formatUserForApi({
          first_name, last_name, email, status, permissions, kyc_status, kyc_message,
        }));
      }

      this.setState({
        userSettingsHash: UserEditor.getFormHash(this.state.userSettings),
      });
    };
  }

  componentWillMount() {
    const { user, action, onUserFetch, id } = this.props;

    if (action === ACTION_EDIT) {
      if (!user) {
        onUserFetch(id);
      } else {
        const initialUserSettingsState = this.getFilledFields(this.props.user);

        this.setState({
          userSettings: initialUserSettingsState,
          userSettingsHash: UserEditor.getFormHash(initialUserSettingsState),
        });
      }
    } else {
      //
    }
  }


  componentWillReceiveProps(nextProps) {
    const { user: newUser } = nextProps;
    const { user: oldUser } = this.props;

    if (newUser && newUser !== oldUser) {
      const initialUserSettingsState = this.getFilledFields(newUser);

      this.setState({
        userSettings: initialUserSettingsState,
        userSettingsHash: UserEditor.getFormHash(initialUserSettingsState),
      });
    }
  }

  getFilledFields(userFromProps) {
    const initialUserSettingsState = { ...this.state.userSettings };
    const userFields = Object.keys(userFromProps);

    userFields.forEach((field) => {
      if (initialUserSettingsState[field] === undefined) {
        return;
      }

      if (userFromProps[field] !== undefined && userFromProps[field] !== null) {
        initialUserSettingsState[field] = userFromProps[field];
      }
    });

    return UserEditor.formatUser(initialUserSettingsState);
  }

  getEmailErrorText() {
    const email = this.state.userSettings.email;
    return email && !this.isValidEmail() ? 'Email isn\'t correct' : '';
  }

  getKycMessageError() {
    return !this.isValidKycMessage() ? `min: 50 / ${this.state.userSettings.kyc_message.length} / max: 300` : '';
  }

  isValidKycMessage() {
    const { kyc_status, kyc_message } = this.state.userSettings;
    return (
      (kyc_status !== USER_KYC_STATUS_REJECTED) ||
      (kyc_message.length >= 50 && kyc_message.length <= 300)
    );
  }

  isValidEmail() {
    return /.+@.+\..+/i.test(this.state.userSettings.email);
  }

  render() {
    const { action } = this.props;

    return (
      <div>
        <Paper>
            <form className="profile__settings-form" name="profile_settings">
              <h3>{action === ACTION_EDIT ? 'Edit User' : 'Add User'}</h3>
              <div className="profile__settings-form-field">
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="First name *"
                  fullWidth
                  value={this.state.userSettings.first_name}
                  onChange={this.onFirstNameChange}
                />
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="Last name *"
                  fullWidth
                  value={this.state.userSettings.last_name}
                  onChange={this.onLastNameChange}
                />
              </div>
              <div className="profile__settings-form-field">
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="Email *"
                  fullWidth
                  value={this.state.userSettings.email}
                  onChange={this.onEmailChange}
                  errorText={this.getEmailErrorText()}
                />
                <SelectField
                  className="profile__settings-form-input"
                  floatingLabelText="Status *"
                  fullWidth
                  value={this.state.userSettings.status}
                  onChange={this.onStatusChange}
                >
                  {
                    Object.keys(USER_STATUSES)
                      .map(
                        statusId => (
                          <MenuItem
                            key={statusId}
                            value={+statusId}
                            primaryText={USER_STATUSES[statusId]}
                          />
                        ),
                      )
                  }
                </SelectField>
              </div>
              <div className="profile__settings-form-field">
                <SelectField
                  className="profile__settings-form-input"
                  floatingLabelText="Permissions"
                  fullWidth
                  multiple
                  value={this.state.userSettings.permissions}
                  onChange={this.onPermissionsChange}
                >
                  {
                    Object.keys(USER_PERMISSIONS)
                      .map(
                        permissionId => (
                          <MenuItem
                            key={permissionId}
                            value={permissionId}
                            primaryText={USER_PERMISSIONS[permissionId]}
                          />
                        ),
                      )
                  }
                </SelectField>
              </div>
              <div className="profile__settings-form-field">
                <SelectField
                  className="profile__settings-form-input"
                  floatingLabelText="KYC check status"
                  fullWidth
                  value={this.state.userSettings.kyc_status}
                  onChange={this.onKycStatusChange}
                  disabled={action === ACTION_ADD}
                >
                  {
                    Object.keys(USER_KYC_STATUSES)
                      .map(
                        kycStatus => (
                          <MenuItem
                            key={kycStatus}
                            value={+kycStatus}
                            primaryText={USER_KYC_STATUSES[kycStatus]}
                          />
                        ),
                      )
                  }
                </SelectField>
                {
                  this.state.userSettings.kyc_details &&
              this.state.userSettings.kyc_details.results_uri &&
              (this.state.userSettings.kyc_status !== USER_KYC_STATUS_NOT_CHECKED) ?
                    <a
                      target="_blank"
                      href={this.state.userSettings.kyc_details.results_uri}
                    >
                      <RaisedButton style={reportsButtonstyle}>view reports</RaisedButton>
                </a>
                    : null
                }
              </div>
              {
                this.state.userSettings.kyc_status === USER_KYC_STATUS_REJECTED ?
                  <div className="profile__settings-form-field">
                    <TextField
                      floatingLabelText="The KYC reject reason *"
                      fullWidth
                      onChange={this.onKycMessageChange}
                      multiLine
                      errorText={this.getKycMessageError()}
                      value={this.state.userSettings.kyc_message}
                    />
                  </div>
                  : null
              }
              <div className="profile__setings-form-tooltip">* Required</div>
              <div className="profile__settings-form-actions">
                <RaisedButton
                  disabled={this.isSettingsSubmitDisabled()}
                  onClick={this.onUserSettingsSaveClick}
                >
                Save
                </RaisedButton>
              </div>
              <div className="profile__settings-form-field">
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="Phone"
                  disabled
                  fullWidth
                  value={this.state.userSettings.phone}
                />
              </div>
              <div className="profile__settings-form-field">
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="Company"
                  disabled
                  fullWidth
                  value={this.state.userSettings.company}
                />
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="Vat number"
                  disabled
                  fullWidth
                  value={this.state.userSettings.vat_number}
                />
              </div>
              <div className="profile__settings-form-field">
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="Address"
                  disabled
                  fullWidth
                  value={this.state.userSettings.address}
                />
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="Zip code"
                  disabled
                  fullWidth
                  value={this.state.userSettings.zip_code}
                />
              </div>
              <div className="profile__settings-form-field">
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="City"
                  disabled
                  fullWidth
                  value={this.state.userSettings.city}
                />
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="Country"
                  disabled
                  fullWidth
                  value={this.state.userSettings.country}
                />
              </div>
              <div className="profile__settings-form-field">
                <TextField
                  className="profile__settings-form-input"
                  floatingLabelText="Ethereum wallet"
                  disabled
                  fullWidth
                  value={this.state.userSettings.ethereum_wallet}
                />
              </div>
            </form>
          </Paper>
      </div>
    );
  }
}

UserEditor.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.string,
    vat_number: PropTypes.string,
    address: PropTypes.string,
    zip_code: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
  onUserSave: PropTypes.func.isRequired,
  onUserAdd: PropTypes.func.isRequired,
  onUserFetch: PropTypes.func.isRequired,
  action: PropTypes.oneOf([ACTION_ADD, ACTION_EDIT]).isRequired,
  id: PropTypes.string,
};

UserEditor.defaultProps = {
  id: null,
  user: null,
};
