import React from 'react';
import { Field } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

const CodesFilter = ({ codes }) =>
  (
    <Field
      name="codes"
      component={SelectField}
      floatingLabelText="Select a codes"
      multiple
      className="events-filters__codes"
    >
      {codes.map(code => (
        <MenuItem
          key={code}
          insetChildren
          value={code}
          primaryText={code}
        />
      ))}
    </Field>
  );

CodesFilter.propTypes = {
  codes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CodesFilter;
