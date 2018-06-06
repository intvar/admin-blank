import createHistory from 'history/createBrowserHistory';

const history = createHistory();

/**
 * Implemented, because <Link /> cannot be disabled.
 * @param {*} route
 */
export function onLinkClick(route) {
  return () => history.push(route);
}

export function objToQSParams(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    let val = obj[key];
    let str = '';
    if (Array.isArray(val) && !val.length) {
      return acc + str;
    }
    if (val !== null) {
      if (acc) str = '&';
      if (val instanceof Date) {
        val = val.toISOString();
      }
      str += `${key}=${val}`;
    }
    return acc + str;
  }, '');
}

const addSecondChar = (val) => {
  const strVal = String(val);
  if (strVal.length === 1) {
    return `0${strVal}`;
  }
  return strVal;
};

/**
 * Get Date as string format 13.10.2017 17:08
 */
export const getDateTimeStr = (date = new Date()) => {
  const year = date.getFullYear();
  const month = addSecondChar(date.getMonth() + 1);
  const day = addSecondChar(date.getDate());
  const hours = addSecondChar(date.getHours());
  const minutes = addSecondChar(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

/**
 * Helper for handling field changes.
 * @param {Object} component - React component instance.
 * @param {String | Bool} formName - If false, value will be writed in root of state.
 * @param {String} fieldName
 * @param {Bool} isSelectField
 * @param {Function} stateModifier
 */
export function onFormFieldChange(
  component, formName, fieldName, isSelectField, stateModifier = () => {},
) {
  return (event, newValue, payload) => {
    if (formName) {
      component.setState({
        [formName]: {
          ...component.state[formName],
          [fieldName]: isSelectField ? payload : newValue,
          ...stateModifier(isSelectField ? payload : newValue),
        },
      });
    } else {
      component.setState({
        [fieldName]: isSelectField ? payload : newValue,
        ...stateModifier(isSelectField ? payload : newValue),
      });
    }
  };
}

export default history;

export const isValidContractAddress = address => (/^(0x)[0-9a-f]{40}$/i.test(address));

/**
 * Removes zeros from the end of the line.
 * @param {String} number
 * @return {String}
 */
export function beautifyNumber(number) {
  if (!number) return '0';
  const lastChar = number[number.length - 1];

  return lastChar === '0' || lastChar === '.' ? beautifyNumber(number.slice(0, -1)) : number;
}

/**
 * Parse query string to object
 * @param {String} str query string with "?" or without.
 * @return {Object}
 */
export const parseQueryString = (str) => {
  if (!str) return {};
  const queryString = str[0] === '?' ? str.slice(1) : str;

  return queryString.split('&').reduce((acc, fullStringParam) => {
    const paramSeperatorIndex = fullStringParam.indexOf('=');
    const paramName = fullStringParam.slice(0, paramSeperatorIndex);
    const paramValue = fullStringParam.slice(paramSeperatorIndex + 1);

    acc[paramName] = paramValue;

    return acc;
  }, {});
};

/**
 * Pick props from object to new object
 * @param {Array} props - Object with needed props.
 * @param {Object} from - Source object.
 * @return {Object}
 */
export function pick(props, from) {
  return props
    /* eslint no-return-assign: 0 */
    .reduce((acc, propName) => (Object.prototype.hasOwnProperty.call(from, propName) ?
      (acc[propName] = from[propName], acc) : acc), {});
}
