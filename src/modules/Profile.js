import Block from "./Block";
import profileTemplate from "./profileTemplate.hbs?raw";

export default class UserProfile extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return profileTemplate;
  }
}