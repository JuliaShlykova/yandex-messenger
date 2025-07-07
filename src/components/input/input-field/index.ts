import template from './inputField.hbs?raw';
import Block from '../../../modules/Block';
import { PropType } from '../../../modules/types';
import validate from '../../../utils/validate';
import showValidationError from '../../../utils/showValidationError';

class InputField extends Block {
  constructor(props: PropType) {
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
