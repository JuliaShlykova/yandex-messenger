type Indexed<T = unknown> = {
  [key: string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  // Код здесь
  Object.keys(rhs).forEach(key => {
    const x = rhs[key];

    try {
      if (typeof x === 'object' && x!.constructor === Object!) {
        lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        lhs[key] = x;
      }
    } catch {
      lhs[key] = x;
    }
  });
  return lhs;
}

export default merge;
