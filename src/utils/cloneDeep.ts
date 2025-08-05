type Indexed<T = any> = {
  [key: string]: T;
};

function cloneDeep<T extends Indexed>(obj: T) {
  return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] | unknown[] {
    if (item === null || !(typeof item === 'object')) {
      return item;
    }

    if (item instanceof Array) {
      const arr: unknown[] = [];
      for (const v of item) {
        arr.push(_cloneDeep(v));
      }
      return arr;
    }

    if (item instanceof Set) {
      const s: Set<unknown> = new Set();
      item.forEach(i => s.add(_cloneDeep(i)));
      return s;
    }

    if (item instanceof Map) {
      const m: Map<unknown, unknown> = new Map();
      item.forEach((v, k) => m.set(k, _cloneDeep(v)));
      return m;
    }

    if (item instanceof Object) {
      const o: Indexed = {};
      Object.keys(item).forEach(key => {
        o[key] = _cloneDeep(item[key]);
      });
      return o;
    }

    throw new Error('impossible to clone');
  })(obj);
}

export default cloneDeep;
