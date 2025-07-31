import './search-bar.scss';
import Block from '../../../../modules/Block';
import template from './search-bar.hbs?raw';
import { PropType } from '../../../../modules/types';
import Button from '../../../../components/button';

class SearchBar extends Block {
  constructor(props: PropType) {
    super({
      ...props,
      buttonSearch: new Button({
        type: 'submit',
        imgSrc: '/search.svg',
        alt: 'search',
      })
    });
  }

  render() {
    return template;
  }
}

export default SearchBar;
