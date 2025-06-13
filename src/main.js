import './style.scss';
import Handlebars from 'handlebars';
import Footer from './components/footer/footer.js';

const app = document.querySelector('#app');

let template = Handlebars.compile(Footer);

app.innerHTML = template();