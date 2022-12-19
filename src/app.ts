import './index.css';
import MainPage from './pages/main/main';
import CartPage from './pages/cart/cart';
import Page from './pages/templates/page';
import DescriptionPage from './pages/description/description';
import Header from './pages/components/header/header';

export const enum PageIDs {
    MainPage = 'main',
    CartPage = 'cart',
    DescriptionPage = 'description',
}

class App {
    private static container: HTMLElement = <HTMLElement>document.body;
    private static mainHTML: HTMLElement = <HTMLElement>document.querySelector('main');
    private header: Header;

    static renderNewPage(pageId: string) {
        App.mainHTML.innerHTML = '';
        let page: Page | null = null;

        if (pageId === PageIDs.MainPage) {
            page = new MainPage(pageId);
        } else if (pageId === PageIDs.CartPage) {
            page = new CartPage(pageId);
        } else if (pageId === PageIDs.DescriptionPage) {
            page = new DescriptionPage(pageId);
        }

        if (page) {
            const pageHTML = page.render();
            this.mainHTML.appendChild(pageHTML);
        }
    }

    private handleRouting() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
            // const currentURL = new URL(window.location.href);
            // currentURL.searchParams.set('brand', 'adidas');
            // currentURL.searchParams.set('model', 'adistar');
            // console.log(currentURL);
        });
    }

    constructor() {
        this.header = new Header('header', 'header');
    }

    run() {
        App.container.prepend(this.header.render());
        App.renderNewPage('main');
        this.handleRouting();
    }
}

// getHeader() {
//     this.header = document.getElementById('header') as HTMLElement;
//     return this.header;
// }

// const header: HTMLElement = document.getElementById('header') as HTMLElement;
// //const main: HTMLElement = document.getElementById('main') as HTMLElement;
// const footer: HTMLElement = document.getElementById('footer') as HTMLElement;

// run() {

//     header.innerHTML = headerTemplate();
//     footer.innerHTML = footerTemplate();

// }

export default App;
