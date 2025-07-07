import Footer from '../components/footer/';

const setFooter = () => {
  const footer = document.querySelector('footer');
  if (footer) {
    const footerComponent = new Footer();
    footer.appendChild(footerComponent.getContent());
    // footer.innerHTML = footerTemplate({
    //   pages: [
    //     { id: 'login', name: 'Авторизация' },
    //     { id: 'signup', name: 'Регистрация' },
    //     { id: 'chat', name: 'Чат' },
    //     { id: 'profile', name: 'Профиль' },
    //     { id: '404', name: '404' },
    //     { id: '500', name: '500' }
    //   ]
    // });
  }
};

export default setFooter;
