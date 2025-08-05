import { HOST, METHODS } from './Constants';
import { DataQuery, HTTPMethod, RequestOptions } from './types';
import queryStringify from './utils/queryStringify';

class HTTPTransport {
  private _baseUrl: string;

  constructor(baseUrl: string = '') {
    this._baseUrl = HOST + baseUrl;
  }

  get: HTTPMethod<XMLHttpRequest> = (url, options) => {
    return this.request(url, { ...options, method: METHODS.GET }, options?.timeout);
  };

  put: HTTPMethod<XMLHttpRequest> = (url, options) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);
  };

  post: HTTPMethod<XMLHttpRequest> = (url, options) => {
    return this.request(url, { ...options, method: METHODS.POST }, options?.timeout);
  };

  delete: HTTPMethod<XMLHttpRequest> = (url, options) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);
  };

  request = (url: string, options: RequestOptions, timeout: number = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, signal, withCredentials = true, responseType = 'json' } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
        const urlWithQuery = this._baseUrl + url + queryStringify(data as DataQuery);
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
