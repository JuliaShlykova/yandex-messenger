import { PrimitiveType } from '../types';

export type DataQuery = Record<string, PrimitiveType | PrimitiveType[] | Record<string, PrimitiveType>>;

export type Data = DataQuery | FormData;

export interface Options {
  headers?: Record<string, string>
  data?: Data,
  timeout?: number
}

export interface RequestOptions extends Options {
  method: string;
}

export type HTTPMethod<R> = (url: string, options?: Options) => Promise<R>;
