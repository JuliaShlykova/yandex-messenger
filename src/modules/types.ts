export type PrimitiveType = string | number | boolean;

export type Nullable<T> = T | null;

export type PlainObject<T = unknown> = {
  [k: string]: T;
};
