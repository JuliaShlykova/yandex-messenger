import template from './inputField.hbs?raw';
import Block, { BlockProps } from '../../../modules/Block';
import validate from '../../../utils/validate';
import showValidationError from '../../../utils/showValidationError';

interface InputFieldType {
  type?: string,
  id?: string,
  name?: string,
  accept?: string,
  required?: boolean
}

class InputField extends Block<InputFieldType> {
  constructor(props: BlockProps) {
    super({
      ...props,
      settings: {
        withInternalId: true
      },
      events: {
        ...props.events,
        blur: event => {
          const showError = props.onBlur as (x:string) => void;
          const target = event.target as HTMLInputElement;
          if (!validate(target.name, target.value)) {
            const errorText = showValidationError(target.name);
            showError(errorText);
          } else {
            showError('');
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
