import './footer.scss';
import Handlebars from 'handlebars';

Handlebars.registerHelper('addBtn', function(aString) {
  return 'btn-' + aString;
});

export { default } from './footer.hbs?raw';
