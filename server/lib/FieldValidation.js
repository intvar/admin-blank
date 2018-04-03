const { createError } = require('./util');
const {
  isEmail, isISO8601, isMobilePhone, isDataURI, isHexColor, isAlpha, isJSON,
} = require('validator');

class FV {
  constructor(fieldName, fieldValue) {
    this.fieldName = fieldName;
    this.readableFieldName = `${fieldName.slice(0, 1).toUpperCase()}${fieldName.slice(1).replace(/_/g, ' ')}`;
    this.value = fieldValue;
  }
  isNonEmpty() {
    if (this.value === null || this.value === undefined) {
      throw createError(`${this.readableFieldName} required`, 400, `err_${this.fieldName}_required`);
    }
    return this;
  }
  isString(condition = {}) {
    const { min = 0, max = Infinity } = condition;

    if (typeof this.value !== 'string') {
      throw createError(`${this.readableFieldName} must be a string`, 400, `err_${this.fieldName}_not_string`);
    }
    if (this.value.length < min) {
      throw createError(`${this.readableFieldName} must be min ${min} character length`, 400, `err_${this.fieldName}_min_length`);
    }
    if (this.value.length > max) {
      throw createError(`${this.readableFieldName} must be max ${max} character length`, 400, `err_${this.fieldName}_max_length`);
    }
    return this;
  }
  isEmail() {
    if (!this.value || !isEmail(this.value)) {
      throw createError(`${this.readableFieldName} must be valid email`, 400, 'err_not_valid_email');
    }
    return this;
  }
  isMobilePhone(locale) {
    if (!isMobilePhone(this.value, locale)) {
      throw createError(`${this.readableFieldName} must be valid phone`, 400, 'err_not_valid_phone');
    }
    return this;
  }
  isInteger(condition = {}) {
    const { min = -Infinity, max = Infinity } = condition;

    if (!Number.isInteger(this.value)) {
      throw createError(`${this.readableFieldName} must be an integer`, 400, `err_${this.fieldName}_not_integer`);
    }
    if (this.value < min) {
      throw createError(`${this.readableFieldName} must be min ${min}`, 400, `err_${this.fieldName}_min`);
    }
    if (this.value > max) {
      throw createError(`${this.readableFieldName} must be max ${max}`, 400, `err_${this.fieldName}_max`);
    }
    return this;
  }
  oneOf(variants) {
    if (!variants.some(variant => variant === this.value)) {
      throw createError(`${this.readableFieldName} not match`, 400, `err_${this.fieldName}_not_match`);
    }
    return this;
  }
  isISODate() {
    if (!isISO8601(this.value)) {
      throw createError(`${this.readableFieldName} must be valid date format ISO 8601`, 400, `err_${this.fieldName}_not_valid_date`);
    }
    return this;
  }
  isArray() {
    if (!Array.isArray(this.value)) {
      throw createError(`${this.readableFieldName} must be an array`, 400, `err_${this.fieldName}_not_array`);
    }
    return this;
  }
  isNumeric(condition = {}) {
    const { min = -Infinity, max = Infinity } = condition;
    if (this.value < min) {
      throw createError(`${this.readableFieldName} must be min ${min}`, 400, `err_${this.fieldName}_min`);
    }
    if (this.value > max) {
      throw createError(`${this.readableFieldName} must be max ${max}`, 400, `err_${this.fieldName}_max`);
    }
    if (!Number.isNaN(parseFloat(this.value)) && Number.isFinite(this.value)) {
      return this;
    }
    throw createError(`${this.readableFieldName} must be an numeric`, 400, `err_${this.fieldName}_not_numeric`);
  }
  isDataURL() {
    if (isDataURI(this.value)) {
      return this;
    }
    throw createError(`${this.readableFieldName} must be a data image`, 400, `err_${this.fieldName}_not_data_url`);
  }
  isEthereumAddress() {
    if (/^(0x)?[0-9a-f]{40}$/i.test(this.value)) {
      return this;
    }
    throw createError(`${this.readableFieldName} not valid address`, 400, `err_${this.fieldName}_not_valid`);
  }
  isDomain() {
    if (/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(this.value)) {
      return this;
    }

    throw createError(`${this.readableFieldName} not domain`, 400, `err_${this.fieldName}_not_domain`);
  }
  isHexColor() {
    if (isHexColor(this.value)) {
      return this;
    }

    throw createError(`${this.readableFieldName} not contain hex color`, 400, `err_${this.fieldName}_not_valid`);
  }
  isAlpha() {
    if (isAlpha(this.value)) {
      return this;
    }

    throw createError(`${this.readableFieldName} not contain alpha-3 code`, 400, `err_${this.fieldName}_not_valid`);
  }
  isJSON() {
    if (isJSON(this.value)) {
      return this;
    }

    throw createError(`${this.readableFieldName} not JSON`, 400, `err_${this.fieldName}_not_valid`);
  }
}

module.exports = (fieldName, fieldValue) => new FV(fieldName, fieldValue);
