import Handlebars from 'handlebars';

const app = document.querySelector('#app');

const applyPage = (page) => {
  let template = Handlebars.compile(page);
  app.innerHTML = template();
};

export default applyPage;