import PropTypes from 'prop-types';

export default {
  id: PropTypes.number.isRequired,
  event_id: PropTypes.string.isRequired,
  event_date: PropTypes.string.isRequired,
  is_error: PropTypes.number.isRequired,
  description: PropTypes.string,
  user_id: PropTypes.number,
};
