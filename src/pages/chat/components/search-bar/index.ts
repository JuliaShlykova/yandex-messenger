import './search-bar.scss';
import Block from '../../../../modules/Block';
import template from './search-bar.hbs?raw';

class SearchBar extends Block {
  constructor() {
    super({
      settings: {
        withInternalId: true
      }
    });
  }

  render() {
    return template;
  }
}

export default SearchBar;
