import { HOST, METHODS } from './Constants';
import { DataQuery, HTTPMethod, RequestOptions } from './types';
import queryStringify from './utils/queryStringify';

class HTTP {
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
    const { headers = {}, method, data } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
        const urlWithQuery = this._baseUrl + url + queryStringify(data as DataQuery);
        xhr.open(method, urlWithQuery);
      } else {
        xhr.open(method, this._baseUrl + url);
      }

      Object.keys(headers).forEach(header=>{
        xhr.setRequestHeader(header, headers[header]);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as FormData);
      }
    });
  };
}

export default HTTP;
