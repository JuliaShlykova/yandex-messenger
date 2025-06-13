import '../../style.scss';
import './login.scss';
import Handlebars from 'handlebars';
import loginPage from './login.hbs?raw';

import Button from '../../components/button/button.js';
import Footer from '../../components/footer/footer.js';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Footer', Footer);

const app = document.querySelector('#app');

let template = Handlebars.compile(loginPage);

app.innerHTML = template();