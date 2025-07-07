import template from './not-found.hbs?raw';
import Block from '../../modules/Block';

class NotFoundPage extends Block {
  constructor() {
    super();
  }

  render() {
    return template;
  }
}

export { NotFoundPage as NotFound };
