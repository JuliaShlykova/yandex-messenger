// components/button/Button.js

import Block from "./Block";
import template from "./template.hbs?raw";

export default class Button extends Block {
  constructor(props) {
    super("button", props);
  }

  render() {
    return template;
  }
}