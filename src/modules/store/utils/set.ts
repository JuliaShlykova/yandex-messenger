import { Indexed } from '../store';
import merge from './merge';

function set(object: Indexed, path: string, value: unknown): Indexed {
  // Код
  if (!object || !(object!.constructor === Object)) {
    return object;
  }
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const objFromPath = path
      .split('.')
      .reverse()
      .reduce((acc: unknown, cur) => ({ [cur]: acc }), value);

  object = merge(object as Indexed, objFromPath as Indexed);
  return object;
}

export default set;
