import { clickItem, PageIDs } from './helpers/appFunctions';
import { CartPage } from './pages/cart/cart';
import { arrCart } from './helpers/appFunctions';
import MainPage from './pages/main/main';
import Page from './pages/templates/page';
import shoes from './db/shoes';
import ErrorPage from './pages/error404/error404';
import DescriptionPage from './pages/description/description';
import Header from './pages/components/header/header';
import Footer from './pages/components/footer/footer';
import { saveLocalStorage } from './helpers/appFunctions';
import { loadLocalStorage } from './helpers/appFunctions';
import { IPrototypeItem } from './pages/templates/items';

let clickedItem: IPrototypeItem = clickItem;

export class App {
    private static container: HTMLElement = <HTMLElement>document.body;
    private static mainHTML: HTMLElement = <HTMLElement>document.querySelector('.main');
    private header: HTMLElement;
    private footer: HTMLElement;

    private handleRouting() {
        window.addEventListener('hashchange', (e) => {
            e.preventDefault();
            window.location.pathname = '/';
            if (window.location.hash === '') {
                App.renderNewPage('error404');
            }
            const hash = window.location.hash.slice(1).split('/')[0];
            const currentShoe = window.location.hash.slice(1).split('/')[1];
            console.log(currentShoe);
            App.renderNewPage(hash);
        });
    }

    static renderNewPage(pageId: string, showModalWindow?: boolean): void {
        App.mainHTML.innerHTML = '';
        let page: Page | null = null;
        if (pageId === PageIDs.MainPage) {
            page = new MainPage(pageId);
        } else if (pageId === PageIDs.CartPage) {
            if (!showModalWindow) showModalWindow = false;
            page = new CartPage(pageId, arrCart, showModalWindow);
        } else if (pageId === PageIDs.DescriptionPage) {
            const currentShoe = window.location.hash.slice(1).split('/')[1];
            if (currentShoe) {
                clickedItem = <IPrototypeItem>shoes.find((el) => el.id === Number(currentShoe));
            }
            page = new DescriptionPage(pageId, clickedItem);
        } else {
            page = new ErrorPage(PageIDs.ErrorPage);
        }

        if (page) {
            const pageHTML = page.render();
            this.mainHTML.appendChild(pageHTML);
        }
    }

    constructor() {
        this.header = Header();
        this.footer = Footer();
    }

    run() {
        App.container.prepend(this.header);
        loadLocalStorage();
        if (window.location.hash === '' || window.location.hash === '#') {
            App.renderNewPage('');
        } else {
            const hash = window.location.hash.slice(1).split('/')[0];
            const currentShoe = window.location.hash.slice(1).split('/')[1];
            App.renderNewPage(hash);
        }

        App.container.appendChild(this.footer);
        this.handleRouting();
    }
}
