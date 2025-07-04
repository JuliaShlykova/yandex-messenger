import './input.scss';
import template from './input.hbs?raw';
import Block from '../../modules/Block';
import { PropType } from '../../modules/EventBus';

class Input extends Block {
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

export default Input;
