import Block from '../modules/Block';

const applyPage = <T extends Block> (page:T, query: string = '#app') => {
  const app = document.querySelector(query);
  if (app) {
    const child = app.firstElementChild;
    if (child) {
      child.replaceWith(page.getContent());
    } else {
      app.appendChild(page.getContent());
    }

    page.dispatchComponentDidMount();
  }
};

export default applyPage;
