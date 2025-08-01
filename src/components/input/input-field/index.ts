import template from './inputField.hbs?raw';
import Block, { BlockProps } from '../../../modules/Block';
import validate from '../../../utils/validate';
import showValidationError from '../../../utils/showValidationError';

class InputField extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      events: {
        blur: event => {
          const showError = props.onBlur as (x:string) => void;
          showError('');
          const target = event.target as HTMLInputElement;
          if (!validate(target.name, target.value)) {
            const errorText = showValidationError(target.name);
            showError(errorText);
          }
        }
      }
    });
  }

  render() {
    return template;
  }
}

export default InputField;
