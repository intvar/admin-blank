import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { USER_STATUSES, USER_KYC_STATUSES } from '../../../../constants';
import './style.scss';

const UsersFilters = ({
  search_criterion,
  status,
  kyc_status,
  onChangeSearchCriterion,
  onChangeStatus,
  onChangeKycStatus,
  onClickApply,
  onClickReset,
}) => (
  <Paper className="users-filter">
    <SelectField
      floatingLabelText="KYC status"
      value={kyc_status}
      onChange={(e, k) => onChangeKycStatus(k)}
    >
      {
        Object.keys(USER_KYC_STATUSES).map(
          statusId => (
            <MenuItem
              primaryText={USER_KYC_STATUSES[statusId]}
              value={+statusId}
              key={statusId}
            />
          ),
        )
      }
    </SelectField>
    <SelectField
      floatingLabelText="status"
      value={status}
      onChange={(e, k) => onChangeStatus(k)}
      className="users-filter__status"
    >
      {
        Object.keys(USER_STATUSES).map(
          statusId => (
            <MenuItem
              primaryText={USER_STATUSES[statusId]}
              value={+statusId}
              key={statusId}
            />
          ),
        )
      }
    </SelectField>
    <TextField
      onChange={(e, v) => onChangeSearchCriterion(v)}
      value={search_criterion}
      floatingLabelText="search"
      className="users-filter__search_criterion"
    />
    <div className="users-filter__actions">
      <RaisedButton label="Apply" primary onClick={onClickApply} />
      <RaisedButton label="Reset" className="users-filter__actions-reset" onClick={onClickReset} />
    </div>
  </Paper>
);

UsersFilters.propTypes = {
  search_criterion: PropTypes.string.isRequired,
  status: PropTypes.number,
  kyc_status: PropTypes.number,
  onChangeSearchCriterion: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onChangeKycStatus: PropTypes.func.isRequired,
  onClickApply: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
};

UsersFilters.defaultProps = {
  status: null,
  kyc_status: null,
};

export default UsersFilters;
