export type PrimitiveType = string | number | boolean;

export type Nullable<T> = T | null;

export interface LoginFormModel {
  email: string;
  password: string;
}

export type PlainObject<T = unknown> = {
  [k: string]: T;
};
