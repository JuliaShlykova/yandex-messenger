import { PlainObject } from '../modules/types';
import { isArrayOrObject } from './checkTypes';

function isObjectEqual(a: PlainObject, b: PlainObject): boolean {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const [key, value] of Object.entries(a)) {
    const bValue = b[key];
    if (isArrayOrObject(value) && isArrayOrObject(bValue)) {
      if (!isObjectEqual(value as PlainObject, bValue as PlainObject)) {
        return false;
      }
    } else if (value !== bValue) {
      return false;
    }
  }

  return true;
}

export default isObjectEqual;
