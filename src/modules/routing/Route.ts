import applyPage from '../../utils/applyPage';
import Block, { BlockConstructorType } from '../Block';
// import { BlockConstructor } from './Router';
import { Nullable } from '../types';

interface RouteProps {
  rootQuery: string;
}

// saves URL and block; shows, hides and creates block
export default class Route {
  private _pathname: string;
  private _blockClass: BlockConstructorType;
  private _block: Nullable<Block>;
  private _props: RouteProps;

  constructor(pathname: string, view: BlockConstructorType, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      // this._block.hide();
      this._block = null;
    }
  }

  match(pathname: string) {
    return this._pathname === pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      applyPage(this._block, this._props.rootQuery);
      return;
    }

    this._block.show();
  }
}
