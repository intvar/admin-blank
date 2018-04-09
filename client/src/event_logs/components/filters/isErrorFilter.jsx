import React from 'react';
import { Field } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

const isErrorFilter = () => {
  const ALL = null;
  const OK = 0;
  const IS_ERROR = 1;

  return (
    <Field name="is_error" component={SelectField} floatingLabelText="Select an error status">
      <MenuItem value={ALL} primaryText="" />
      <MenuItem value={IS_ERROR} primaryText="Error" />
      <MenuItem value={OK} primaryText="Ok" />
    </Field>
  );
};

export default isErrorFilter;
