import template from './server-error.hbs?raw';
import Block from '../../modules/Block';

class ServerErrorPage extends Block {
  constructor() {
    super();
  }

  render() {
    return template;
  }
}

export { ServerErrorPage as ServerError };
