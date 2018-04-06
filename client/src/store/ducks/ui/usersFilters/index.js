import { Map } from 'immutable';
import { fetchUsers } from '../../data/users';

export const SEARCH_CRITERION_CHANGE = 'users_filters/SEARCH_CRITERION_CHANGE';
export const STATUS_CHANGE = 'users_filters/STATUS_CHANGE';
export const KYC_STATUS_CAHNGE = 'users_filters/KYC_STATUS_CAHNGE';
export const RESET_FILTERS = 'users_filters/RESET_FILTERS';

export const searchCriterionChange = search_criterion => ({
  type: SEARCH_CRITERION_CHANGE,
  search_criterion,
});

export const statusChange = status => ({
  type: STATUS_CHANGE,
  status,
});

export const kycStatusChange = kyc_status => ({
  type: KYC_STATUS_CAHNGE,
  kyc_status,
});

export const resetFilters = () => ({ type: RESET_FILTERS });

export const initialState = Map({
  kyc_status: null,
  status: null,
  search_criterion: '',
});

export default (state = initialState,
  {
    type,
    search_criterion,
    status,
    kyc_status,
  }) => {
  switch (type) {
    case SEARCH_CRITERION_CHANGE:
      return state.set('search_criterion', search_criterion);
    case STATUS_CHANGE:
      return state.set('status', status);
    case KYC_STATUS_CAHNGE:
      return state.set('kyc_status', kyc_status);
    case RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
};

export const resetFiltersAndRefetchUsers = () => (dispatch) => {
  dispatch(resetFilters());
  dispatch(fetchUsers());
};
