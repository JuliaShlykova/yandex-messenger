import './search-bar.scss';
import Block, { BlockProps } from '../../../../modules/Block';
import template from './search-bar.hbs?raw';
import Button from '../../../../components/button';

class SearchBar extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      buttonSearch: new Button({
        type: 'submit',
        imgSrc: '/search.svg',
        alt: 'search'
      })
    });
  }

  render() {
    return template;
  }
}

export default SearchBar;
