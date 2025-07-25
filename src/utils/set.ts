import merge from './merge';

type Indexed<T = unknown> = {
  [key: string]: T;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
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
