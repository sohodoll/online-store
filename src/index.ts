import './index.css';
import headerTemplate from './pages/header/header';
import footerTemplate from './pages/footer/footer';

const header: HTMLElement = document.getElementById('header') as HTMLElement;
//const main: HTMLElement = document.getElementById('main') as HTMLElement;
const footer: HTMLElement = document.getElementById('footer') as HTMLElement;

header.innerHTML = headerTemplate();
footer.innerHTML = footerTemplate();