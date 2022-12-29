import './index.css';
import MainPage from './pages/main/main';
import { CartPage, updatePaginParam } from './pages/cart/cart';
import Page from './pages/templates/page';
import DescriptionPage from './pages/description/description';
import ErrorPage from './pages/error404/error404';
import Header from './pages/components/header/header';
import Footer from './pages/components/footer/footer';
import { ItemCart } from './pages/components/itemCart/itemCart';
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

function updateCartAmount(/*arr: ItemCart[]*/): void {
    const headerCartCount: HTMLImageElement = <HTMLImageElement>document.querySelector('.header__cart-count');
    //headerCartCount.textContent = arr.length.toString();
    headerCartCount.textContent = arrCart.length.toString();
}

function updateCartPrice(/*arr: ItemCart[]*/): void {
    const headerTotalPrice: HTMLImageElement = <HTMLImageElement>document.querySelector('.header__total-price');
    let total = 0;
    //arr.forEach((el) => {
    arrCart.forEach((el) => {
        total += el.getTotalPrice();
    });
    headerTotalPrice.textContent = `${total.toString()}`;
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

function updateHeader(): void {
    /*updateCartAmount(arrCart);
    updateCartPrice(arrCart);*/
    updateCartAmount();
    updateCartPrice();
}

function getArrCart(): ItemCart[] {
    return arrCart;
}

function addToCart(elem: Node): void {
    const itemID: number = parseInt((elem as HTMLButtonElement).value);
    const clickItem: IPrototypeItem = <IPrototypeItem>shoes.find((el) => el.id === itemID);    
    const cartItem: ItemCart = new ItemCart(
        clickItem.id,
        clickItem.name,
        clickItem.brand,
        clickItem.category,
        clickItem.thumbnail,
        1,
        clickItem.stock,
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
    console.log(arrCart);
    updateHeader();
}

function cartButtonAddClick(): void {
    const itemsAddCartButton: NodeList = <NodeList>document.querySelectorAll('.btn-to-cart');

    itemsAddCartButton.forEach((el) => {
        el.addEventListener('click', () => addToCart(el));
    });
}

//Remove Item from Cart
function removeItemFromCart(id: number): void {
    arrCart.splice(id, 1);
    updatePaginParam();
    updateHeader();
    App.renderNewPage('cart');
}

function shoesImportToItemCart(shoe: IPrototypeItem): ItemCart {
    const newItemCart: ItemCart = new ItemCart(
        shoe.id, shoe.name, shoe.brand, shoe.category, shoe.thumbnail, 1, shoe.stock, shoe.price
    );
    return newItemCart;
}

function findInCart(itemID: number): number {
    const findIndex = arrCart.findIndex((el) => el.id === itemID);
    return findIndex;
}

//Add Item To Cart
function addItemToCart(itemID: number): void {
    if (findInCart(itemID) < 0) {
        arrCart.push(shoesImportToItemCart(shoes[itemID - 1]));
    } else {
        arrCart.splice(findInCart(itemID), 1);
//        updateHeader();
    }
    /* else {
        arrCart[findIndex].addAmount();
    }*/
    updateHeader();
    //App.renderNewPage(PageIDs.CartPage);

    /*if (arrCart.length > 0) {
        if (arrCart.find((el) => el.id === itemID)) {
            const findIndex = arrCart.findIndex((el) => el.id === itemID);

        } else { //if not in cart
            arrCart.push(shoesImportToItemCart(shoes[itemID - 1]));
            App.renderNewPage(PageIDs.CartPage);
        }
    } else { //if cart is empty
        arrCart.push(shoesImportToItemCart(shoes[itemID - 1]));
        App.renderNewPage(PageIDs.CartPage);
    }*/
}

//Buy Now
function buyNow(itemID: number): void {
    if (findInCart(itemID) < 0)
        arrCart.push(shoesImportToItemCart(shoes[itemID - 1]));
    updateHeader();
    App.renderNewPage(PageIDs.CartPage);
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
            console.log(currentShoe);/*
            const Desc = new DescriptionPage(pageId, clickItem);
            setTimeout(() => {
                Desc.listen();
            }, 500);*/
        } else {
            page = new ErrorPage(PageIDs.ErrorPage);
        }

        if (page) {
            const pageHTML = page.render();
            this.mainHTML.appendChild(pageHTML);
            if (page instanceof MainPage) {
                //viewButtonAddClick();
                //cartButtonAddClick();
            }/*
            if (page instanceof CartPage) {
                const buttonsItemRemove: NodeList = document.querySelectorAll('.cart__item-remove');
                buttonsItemRemove.forEach((button) => {
                    const id: number = parseInt((button as HTMLButtonElement).value);
                    button.addEventListener('click', () => {
                        removeItemFromCart(id);
//                        this.renderNewPage(pageId);
                    });
                });
            }*/
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

export { App, removeItemFromCart, updateHeader, addItemToCart, buyNow, getArrCart, findInCart };
