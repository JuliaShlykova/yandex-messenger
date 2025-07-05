import './input.scss';
import template from './input.hbs?raw';
import Block from '../../modules/Block';
import { PropType } from '../../modules/types';
import InputField from './input-field';

class Input extends Block {
  constructor(props: PropType) {
    super({
      ...props,
      inputField: new InputField({
        ...props,
        onBlur: (errorText:string) => {
          this.setProps({ error: errorText });
        }
      })
    });
  }

  render() {
    return template;
  }
}

export default Input;
