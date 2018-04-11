import React from 'react';
import { shallow } from 'enzyme';
import UsersFilters from './index';

describe('<UsersFilters />', () => {
  let props;
  let renderedComponent;
  const usersFilters = () => {
    if (!renderedComponent) {
      renderedComponent = shallow(<UsersFilters {...props} />);
    }
    return renderedComponent;
  };
  beforeEach(() => {
    props = {
      search_criterion: 'test',
      status: 1,
      kyc_status: 1,
      onChangeSearchCriterion: jest.fn(),
      onChangeStatus: jest.fn(),
      onChangeKycStatus: jest.fn(),
      onClickApply: jest.fn(),
      onClickReset: jest.fn(),
    };
    renderedComponent = null;
  });

  it('should pass params to KYC status selector', () => {
    const { kyc_status } = props;
    const kycSelectField = usersFilters().find('SelectField').get(0);
    expect(kycSelectField.props.value).toBe(kyc_status);
  });

  it('should pass params to status selector', () => {
    const { status } = props;
    const statusSelectField = usersFilters().find('SelectField').get(1);
    expect(statusSelectField.props.value).toBe(status);
  });

  it('should pass params to text field search criterion', () => {
    const { search_criterion } = props;
    const searchCriterionTextField = usersFilters().find('TextField').get(0);
    expect(searchCriterionTextField.props.value).toBe(search_criterion);
  });

  it('should call onClickApply by click apply button', () => {
    const { onClickApply } = props;
    usersFilters().find('RaisedButton').at(0).simulate('click');
    expect(onClickApply).toBeCalled();
  });

  it('should call onClickReset by click reset button', () => {
    const { onClickReset } = props;
    usersFilters().find('RaisedButton').at(1).simulate('click');
    expect(onClickReset).toBeCalled();
  });
});
