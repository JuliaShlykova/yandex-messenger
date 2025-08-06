import { isPlainObject } from './checkTypes';

export default function isObjectEmpty(obj: unknown) {
  if (isPlainObject(obj)) {
    return Object.keys(obj).length === 0;
  } else {
    throw new Error('not an object');
  }
}
