import Block from '../../modules/Block';
import template from './form-error.hbs?raw';
import './form-error.scss';

class FormError extends Block {
  render() {
    return template;
  }
}

export default FormError;
