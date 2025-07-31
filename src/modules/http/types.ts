import { PrimitiveType } from '../types';

export type DataQuery = Record<string, PrimitiveType | PrimitiveType[] | Record<string, PrimitiveType>>;

export type Data = DataQuery | FormData;

interface Signal {
  handler?: () => void;
}

export interface Options {
  headers?: Record<string, string>
  data?: Data,
  timeout?: number,
  signal?: Signal,
  withCredentials?: boolean,
  responseType?: XMLHttpRequestResponseType
}

export interface RequestOptions extends Options {
  method: string;
}

export type HTTPMethod<R = unknown> = (url: string, options?: Options) => Promise<R>;
