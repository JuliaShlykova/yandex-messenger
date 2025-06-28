import Handlebars from 'handlebars';

const app = document.querySelector('#app');

const applyPage = (page:string) => {
  const template = Handlebars.compile(page);
  if (app) {
    app.innerHTML = template({});
  }
};

export default applyPage;
