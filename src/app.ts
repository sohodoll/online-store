import './index.css';
import MainPage from './pages/main/main';
import CartPage from './pages/cart/cart';
import Page from './pages/templates/page';
import DescriptionPage from './pages/description/description';
import ErrorPage from './pages/error404/error404';
import Header from './pages/components/header/header';
import Footer from './pages/components/footer/footer';
import ItemCart from './pages/components/itemCart/itemCart';
import { IPrototypeItem } from './pages/templates/items';
import shoes from './db/shoes';

//let itemsAddCartButton: NodeList;
const arrCart: ItemCart[] = [];
let clickItem: IPrototypeItem;

export const enum PageIDs {
    //MainPage = 'main',
    MainPage = '',
    CartPage = 'cart',
    DescriptionPage = 'description',
    ErrorPage = 'error404',
}

function updateCartAmount(arr: ItemCart[]): void {
    const headerCartCount: HTMLImageElement = <HTMLImageElement>document.querySelector('.header__cart-count');
    headerCartCount.textContent = arr.length.toString();
}

function updateCartPrice(arr: ItemCart[]): void {
    const headerTotalPrice: HTMLImageElement = <HTMLImageElement>document.querySelector('.header__total-price');
    let total = 0;
    arr.forEach((el) => {
        total += el.getTotalPrice();
    });
    headerTotalPrice.textContent = `$${total.toString()}`;
}

function viewButtonAddClick(): void {
    const itemsViewButton: NodeList = <NodeList>document.querySelectorAll('.btn-view');

    itemsViewButton.forEach((el) => {
        el.addEventListener('click', () => {
            const itemID: number = parseInt((el as HTMLButtonElement).value);
            clickItem = <IPrototypeItem>shoes.find((el) => el.id === itemID);
            document.location.href = '#description' + `/${itemID}`;
        });
    });
}

function cartButtonAddClick(): void {
    const itemsAddCartButton: NodeList = <NodeList>document.querySelectorAll('.btn-to-cart');

    itemsAddCartButton.forEach((el) => {
        el.addEventListener('click', () => {
            const itemID: number = parseInt((el as HTMLButtonElement).value);
            const clickItem: IPrototypeItem = <IPrototypeItem>shoes.find((el) => el.id === itemID);
            const cartItem: ItemCart = new ItemCart(
                clickItem.id,
                clickItem.name,
                clickItem.brand,
                clickItem.thumbnail,
                1,
                clickItem.price
            );
            if (arrCart.length === 0) {
                arrCart.push(cartItem);
            } else {
                const findElem: ItemCart | undefined = arrCart.find((el) => el.id === itemID);
                if (findElem !== undefined) {
                    findElem.addAmount();
                } else {
                    arrCart.push(cartItem);
                }
            }
            updateCartAmount(arrCart);
            updateCartPrice(arrCart);
        });
    });
}

class App {
    private static container: HTMLElement = <HTMLElement>document.body;
    private static mainHTML: HTMLElement = <HTMLElement>document.querySelector('.main');
    private header: HTMLElement; // = <HTMLElement>document.createElement('header');
    private footer: HTMLElement; // = <HTMLElement>document.createElement('footer');

    private handleRouting() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1).split('/')[0];
            const currentShoe = window.location.hash.slice(1).split('/')[1];
            console.log(currentShoe);
            App.renderNewPage(hash);
        });
    }

    static renderNewPage(pageId: string): void {
        App.mainHTML.innerHTML = '';
        let page: Page | null = null;
        if (pageId === PageIDs.MainPage) {
            page = new MainPage(pageId);
        } else if (pageId === PageIDs.CartPage) {
            page = new CartPage(pageId, arrCart);
        } else if (pageId === PageIDs.DescriptionPage) {
            const currentShoe = window.location.hash.slice(1).split('/')[1];
            if (currentShoe) {
                clickItem = <IPrototypeItem>shoes.find((el) => el.id === Number(currentShoe));
            }
            page = new DescriptionPage(pageId, clickItem);
            console.log(currentShoe);
            const Desc = new DescriptionPage(pageId, clickItem);
            setTimeout(() => {
                Desc.listen();
            }, 500);
        } else {
            page = new ErrorPage(PageIDs.ErrorPage);
        }

        if (page) {
            const pageHTML = page.render();
            this.mainHTML.appendChild(pageHTML);
            if (page instanceof MainPage) {
                viewButtonAddClick();
                cartButtonAddClick();
            }
        }
    }

    constructor() {
        this.header = Header();
        this.footer = Footer();
    }

    run() {
        App.container.prepend(this.header);
        if (window.location.hash === '' || window.location.hash === '#') {
            App.renderNewPage('');
        } else {
            const hash = window.location.hash.slice(1).split('/')[0];
            const currentShoe = window.location.hash.slice(1).split('/')[1];
            console.log(currentShoe);
            App.renderNewPage(hash);
        }

        App.container.appendChild(this.footer);
        this.handleRouting();

        //viewButtonAddClick();
        //cartButtonAddClick();

        /*
        const headerCartImg = document.querySelector('.header__cart-img');
        headerCartImg?.addEventListener('click', () => {
            console.log(arrCart);
        });*/
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
