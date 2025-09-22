import { HOST, METHODS } from './Constants';
import queryStringify from './utils/queryStringify';

interface Signal {
  handler?: () => void;
}

interface Options {
  headers?: Record<string, string>
  data?: Record<string, unknown> | FormData,
  timeout?: number,
  signal?: Signal,
  withCredentials?: boolean,
  responseType?: XMLHttpRequestResponseType
}

interface RequestOptions extends Options {
  method: string;
}

class HTTPTransport {
  private _baseUrl: string;

  constructor(baseUrl: string = '') {
    this._baseUrl = HOST + baseUrl;
  }

  get = <T>(url: string, options?: Options): Promise<T> => {
    return this.request<T>(url, { ...options, method: METHODS.GET }, options?.timeout);
  };

  put = <T>(url: string, options?: Options): Promise<T> => {
    return this.request<T>(url, { ...options, method: METHODS.PUT }, options?.timeout);
  };

  post = <T>(url: string, options?: Options): Promise<T> => {
    return this.request<T>(url, { ...options, method: METHODS.POST }, options?.timeout);
  };

  delete = <T>(url: string, options?: Options): Promise<T> => {
    return this.request<T>(url, { ...options, method: METHODS.DELETE }, options?.timeout);
  };

  request = <T>(url: string, options: RequestOptions, timeout: number = 10000): Promise<T> => {
    const { headers = {}, method, data, signal, withCredentials = true, responseType = 'json' } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
        const urlWithQuery = this._baseUrl + url + queryStringify(data as Record<string, unknown>);
        xhr.open(method, urlWithQuery);
      } else {
        xhr.open(method, this._baseUrl + url);
      }

      if (signal) {
        signal.handler = () => {
          xhr.abort();
        };
      }

      xhr.onload = function() {
        const status = xhr.status || 0;
        if (status >= 200 && status < 300) {
          resolve(xhr.response);
        } else {
          const message = {
            '0': 'abort',
            '100': 'Information',
            '200': 'OK',
            '300': 'Redirect failed',
            '400': 'Access error',
            '500': 'Internal server error'
          }[Math.floor(status / 100) * 100];
          reject({ status, reason: xhr.response?.reason || message });
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      Object.keys(headers).forEach(header=>{
        xhr.setRequestHeader(header, headers[header]);
      });

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
