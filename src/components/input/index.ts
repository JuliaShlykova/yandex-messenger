import './input.scss';
import template from './input.hbs?raw';
import Block, { BlockProps } from '../../modules/Block';
import InputField from './input-field';

interface InputType {
  label?: string,
  id?: string,
  error?: string
}

class Input extends Block<InputType> {
  constructor(props: BlockProps) {
    super({
      ...props,
      settings: { withInternalId: true },
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
