import Handlebars from 'handlebars';

import Footer from '../components/footer/footer.js';

const setFooter = () => {
  let footerTemplate = Handlebars.compile(Footer);
  const footer = document.querySelector('footer');
  footer.innerHTML = footerTemplate({
    pages: [
      {id: 'login', name: 'Авторизация'},
      {id: 'signup', name: 'Регистрация'},
      {id: 'chat', name: 'Чат'},
      {id: 'profile', name: 'Профиль'},
      {id: '404', name: '404'},
      {id: '500', name: '500'},
    ]
  })
}

export default setFooter