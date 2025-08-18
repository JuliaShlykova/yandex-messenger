import './button.scss';
import template from './button.hbs?raw';
import Block, { BlockProps } from '../../modules/Block';

interface ButtonType {
  class?: string,
  disabled?: boolean,
  type?: string,
  imgSrc?: string,
  text?: string,
  alt?: string
}

class Button extends Block<ButtonType> {
  constructor(props: ButtonType & BlockProps) {
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
