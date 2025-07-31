import './button.scss';
import template from './button.hbs?raw';
import Block from '../../modules/Block';
import { PropType } from '../../modules/types';

class Button extends Block {
  constructor(props: PropType) {
    super({
      ...props,
      settings: { withInternalId: true }
    });
  }

  show() {
    this.getContent().style.display = 'inline-block';
  }

  render() {
    return template;
  }
}

export default Button;
