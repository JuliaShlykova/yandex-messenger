import { expect } from 'chai';
import sinon from 'sinon';
import HTTPTransport from './httpTransport';

describe('HTTPTransport', () => {
  let http: HTTPTransport;
  let fakeXHR: sinon.SinonFakeXMLHttpRequestStatic;
  let request: sinon.SinonFakeXMLHttpRequest;

  beforeEach(() => {
    http = new HTTPTransport();
    fakeXHR = sinon.useFakeXMLHttpRequest();
    fakeXHR.onCreate = xhr => {
      request = xhr;
    };
  });

  afterEach(() => {
    fakeXHR.restore();
  });

  it('делает get запрос', done => {
    http.get('/test')
        .then(() => {
          expect(request.method).to.equal('GET');
          expect(request.url).to.include('/test');
          done();
        })
        .catch(done);
    request.respond(200, { 'Content-Type': 'application/json' }, '');
  });

  it('преобразовывает data object в query в url для get запроса', done => {
    http.get('/test', { data: { a: '1', b: 2 } })
        .then(() => {
          expect(request.url).to.include('/test?a=1&b=2');
          done();
        })
        .catch(done);
    request.respond(200, { 'Content-Type': 'application/json' }, '');
  });

  it('возвращает причину ошибки', done => {
    http.get('/invalid')
        .then(() => {
          done(new Error('had to be invalid request'));
        })
        .catch( err => {
          expect(err.reason).to.equal('Not Found');
          done();
        });
    request.respond(404, { 'Content-Type': 'application/json' }, '{"reason": "Not Found"}');
  });

  it('делает post запрос с данными в формате простого объекта', done => {
    const data = { a: 1 };

    http.post('/test', { data })
        .then(() => {
          expect(request.method).to.equal('POST');
          expect(request.requestHeaders['Content-Type']).to.include('application/json');
          expect(request.requestBody).to.equal(JSON.stringify(data));
          done();
        })
        .catch(done);
    request.respond(200, { 'Content-Type': 'application/json' }, '');
  });

  it('делает post запрос с данными в формате FormData ', done => {
    const data = new FormData();
    data.append('avatar', new File(['avatar.png'], 'avatar.png'));

    http.post('/test', { data })
        .then(() => {
          expect(request.requestBody).to.be.a('FormData');
          expect(request.requestHeaders).to.not.have.key('Content-Type');
          done();
        })
        .catch(done);
    request.respond(200, { 'Content-Type': 'application/json' }, '');
  });

  it('делает put запрос', done => {
    const data = { a: 1 };

    http.put('/test', { data })
        .then(() => {
          expect(request.method).to.equal('PUT');
          expect(request.requestHeaders['Content-Type']).to.include('application/json');
          expect(request.requestBody).to.equal(JSON.stringify(data));
          done();
        })
        .catch(done);
    request.respond(200, { 'Content-Type': 'application/json' }, '');
  });

  it('делает delete запрос', done => {
    const data = { a: 1 };

    http.delete('/test', { data })
        .then(() => {
          expect(request.method).to.equal('DELETE');
          expect(request.requestHeaders['Content-Type']).to.include('application/json');
          expect(request.requestBody).to.equal(JSON.stringify(data));
          done();
        })
        .catch(done);
    request.respond(200, { 'Content-Type': 'application/json' }, '');
  });
});
