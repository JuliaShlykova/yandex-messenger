import { expect, use } from 'chai';
import Router from './Router';
import Block from '../Block';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ROUTES } from './Constants';

describe('Router', () => {
  const router = new Router();
  class TestPage extends Block {
    render() {
      return '<div id="test">Test</div>';
    }
  }
  const testRoute = '/test';
  use(sinonChai);

  it('регистрирует страницы с помощью метода use', () => {
    router.use(testRoute, TestPage);
    expect(router.getRoute(testRoute)).to.exist;
  });

  it('переходит на страницу с помощью метода go', () => {
    router.go(testRoute);
    expect(window.location.pathname).to.equal(testRoute);
    expect(document.querySelector('#test')?.textContent).to.equal('Test');
  });

  it('возвращает 404, если страницы не существует', () => {
    class Page404 extends Block {
      render() {
        return '<div id="test">404</div>';
      }
    }
    router.use(ROUTES.Error404, Page404);
    const invalidRoute = '/invalid';
    router.go(invalidRoute);
    expect(router.getRoute(invalidRoute)).to.be.undefined;
    expect(document.querySelector('#test')?.textContent).to.equal('404');
  });

  describe('переходит', () => {
    let clock: sinon.SinonFakeTimers;
    const first = '/test/1';
    const second = '/test/2';

    beforeEach(() => {
      clock = sinon.useFakeTimers();
      router.go(first);
      router.go(second);
    });

    afterEach(() => {
      clock.restore();
    });

    it('назад с помощью метода back', () => {
      router.back();
      clock.tick(100);
      expect(window.location.pathname).to.equal(first);
    });

    it('вперед с помощью метода forward', () => {
      router.back();
      clock.tick(100);
      router.forward();
      clock.tick(100);
      expect(window.location.pathname).to.equal(second);
    });
  });
});
