import { App } from './app';

const app = new App();

app.run();

window.addEventListener('load', (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
        App.renderNewPage('error404');
    }
});
