import { PrimitiveType } from './types';

type DataQuery = Record<string, PrimitiveType | PrimitiveType[] | Record<string, PrimitiveType>>;

type Data = DataQuery | FormData;

interface Options {
  method: string,
  headers?: Record<string, string>
  data?: Data,
  timeout?: number
}

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

function queryStringify(data: DataQuery) {
  const query: string[] = [];

  Object.keys(data).forEach(opt => {
    query.push(opt.toString() + '=' + data[opt].toString());
  });

  return '?' + query.join('&');
}

class HTTPTransport {
  get = (url: string, options: Options): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  put = (url: string, options: Options): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post = (url: string, options: Options): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  delete = (url: string, options: Options): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: Options, timeout: number = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
        const urlWithQuery = url + queryStringify(data as DataQuery);
        xhr.open(method, urlWithQuery);
      } else {
        xhr.open(method, url);
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

export default HTTPTransport;
