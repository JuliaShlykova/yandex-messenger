import './input.scss';
import template from './input.hbs?raw';
import Block, { BlockProps } from '../../modules/Block';
import InputField from './input-field';

class Input extends Block {
  constructor(props: BlockProps) {
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
