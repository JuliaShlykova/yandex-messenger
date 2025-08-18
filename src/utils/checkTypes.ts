import { PlainObject } from '../modules/types';

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'; // in case toString was overridden for value
}

export function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
  return isPlainObject(value) || isArray(value);
}
