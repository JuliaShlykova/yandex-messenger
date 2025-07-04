import Block from '../modules/Block';

const app = document.querySelector('#app');

const applyPage = <T extends Block> (page:T) => {
  if (app) {
    const child = app.firstChild;
    if (child) {
      child.replaceWith(page.getContent());
    } else {
      app.appendChild(page.getContent());
    }

    page.dispatchComponentDidMount();
  }
};

export default applyPage;
