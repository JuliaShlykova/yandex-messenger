import './button.scss';
import template from './button.hbs?raw';
import Block from '../../modules/Block';
import { PropType } from '../../modules/EventBus';

class Button extends Block {
  constructor(props: PropType) {
    super({
      ...props,
      settings: { withInternalId: true }
    });
  }

  render() {
    return template;
  }
}

export default Button;
