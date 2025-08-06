import Block from '../Block';
import Route from './Route';
import { Nullable } from '../types';
import store from '../store/store';
import isObjectEmpty from '../../utils/isObjectEmpty';
import { PROTECTEDROUTES, PUBLICROUTES } from './Constants';
import { setUser } from '../../controllers/auth';

export interface BlockConstructor {
  new (): Block;
}

// Responsible for changing url and evokes Route
class Router {
  private static __instance: Router;
  private routes: Route[];
  private _currentRoute: Nullable<Route>;
  private history: History;
  private _rootQuery = '#app';

  constructor() {
    if (Router.__instance) {
      console.log('router old');
      return Router.__instance;
    }
    console.log('router new');
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructor) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const pathname = (event.currentTarget as Window).location.pathname;
      this.go(pathname);
    };

    const pathname = window.location.pathname;
    this.go(pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.getRoute('/not-found')?.render();
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    if (PROTECTEDROUTES.includes(pathname) && isObjectEmpty(store.getState())) {
      setUser().then(() => {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
      }).catch(() => {
        this.go('/sign-in');
      });
    } else if (PUBLICROUTES.includes(pathname)) {
      if (!isObjectEmpty(store.getState())) {
        this.go('/messenger');
      } else {
        setUser().then(() => {
          this.go('/messenger');
        }).catch(() => {
          this.history.pushState({}, '', pathname);
          this._onRoute(pathname);
        });
      }
    } else {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default Router;
