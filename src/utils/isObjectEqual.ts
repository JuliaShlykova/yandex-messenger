import { PlainObject } from '../modules/types';
import { isArrayOrObject } from './checkTypes';

function isObjectEqual(a: PlainObject | unknown[], b: PlainObject | unknown[]): boolean {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const [key, value] of Object.entries(a)) {
    const bValue = (b as PlainObject)[key];
    if (isArrayOrObject(value) && isArrayOrObject(bValue)) {
      if (!isObjectEqual(value, bValue)) {
        return false;
      }
    } else if (value !== bValue) {
      return false;
    }
  }

  return true;
}

export default isObjectEqual;
