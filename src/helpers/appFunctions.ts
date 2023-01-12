import '../index.css';
import MainPage from '../pages/main/main';
import {
    CartPage,
    getCurrPage,
    getPerPage,
    perPage,
    setCurrPage,
    setPerPage,
    updatePaginParam,
} from '../pages/cart/cart';
import Page from '../pages/templates/page';
import DescriptionPage from '../pages/description/description';
import ErrorPage from '../pages/error404/error404';
import Header from '../pages/components/header/header';
import Footer from '../pages/components/footer/footer';
import { ItemCart } from '../pages/components/itemCart/itemCart';
import { IPrototypeItem } from '../pages/templates/items';
import shoes from '../db/shoes';
import iconsSVG from '../pages/templates/icons';
import { Form } from '../pages/components/form/form';
import { removeSearchParams } from '../pages/templates/filters';
import { App } from '../app';

let arrCart: ItemCart[];
let clickItem: IPrototypeItem;
let mainLayout: string;

function findInCart(itemID: number): number {
    const findIndex = arrCart.findIndex((el) => el.id === itemID);
    return findIndex;
}

function loadIconForItems(): void {
    const items: NodeList = document.querySelectorAll('.btn-to-cart');
    items.forEach(function (el) {
        if (findInCart(parseInt(String((el as HTMLButtonElement).value))) >= 0) {
            (el as HTMLButtonElement).innerHTML = iconsSVG.remove;
            (el as HTMLButtonElement).dataset.icon = 'removeCart';
        } else {
            (el as HTMLButtonElement).innerHTML = iconsSVG.cart;
            (el as HTMLButtonElement).dataset.icon = 'cart';
        }
    });
}

export const enum PageIDs {
    MainPage = '',
    CartPage = 'cart',
    DescriptionPage = 'description',
    ErrorPage = 'error404',
}

function updateCartAmount(): void {
    const headerCartCount: HTMLImageElement = <HTMLImageElement>document.querySelector('.header__cart-count');
    headerCartCount.textContent = arrCart.reduce((a = 0, el) => a + el.getAmount(), 0).toString();
}

function updateCartPrice(): void {
    const headerTotalPrice: HTMLImageElement = <HTMLImageElement>document.querySelector('.header__total-price');
    let total = 0;
    arrCart.forEach((el) => {
        total += el.getTotalPrice();
    });
    headerTotalPrice.textContent = `${total.toString()}`;
}

export function viewButtonAddClick(): void {
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
    updateCartAmount();
    updateCartPrice();
}

function getArrCart(): ItemCart[] {
    return arrCart;
}

function getMainLayout(): string {
    return mainLayout;
}
function setMainLayout(value: string): void {
    mainLayout = value;
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

function clearCart(): void {
    arrCart.splice(0, arrCart.length);
    setPerPage(3);
    saveLocalStorage();
    removeSearchParams(['category']);
}

function shoesImportToItemCart(shoe: IPrototypeItem): ItemCart {
    const newItemCart: ItemCart = new ItemCart(
        shoe.id,
        shoe.name,
        shoe.brand,
        shoe.category,
        shoe.thumbnail,
        1,
        shoe.stock,
        shoe.price
    );
    return newItemCart;
}

//Add / Remove Item Cart
function addItemToCart(itemID: number): void {
    if (findInCart(itemID) < 0) {
        arrCart.push(shoesImportToItemCart(shoes[itemID - 1]));
    } else {
        arrCart.splice(findInCart(itemID), 1);
    }
    updateHeader();
}

//Buy Now
function buyNow(itemID: number): void {
    if (findInCart(itemID) < 0) arrCart.push(shoesImportToItemCart(shoes[itemID - 1]));
    updateHeader();
    App.renderNewPage(PageIDs.CartPage, true);
    new Form().listen();
}

//loading parameter from localStorage
function loadLocalStorage() {
    if (localStorage.getItem('arrCart')) {
        arrCart = JSON.parse(String(localStorage.getItem('arrCart'))).map((el: ItemCart) => {
            const { id, name, brand, category, thumbnail, amount, limit, price } = el;
            return new ItemCart(id, name, brand, category, thumbnail, amount, limit, price);
        });
        updateHeader();
        loadIconForItems();
    } else {
        arrCart = [];
    }
    if (localStorage.getItem('perPage')) {
        setPerPage(parseInt(String(localStorage.getItem('perPage'))));
    } else {
        setPerPage(3);
    }
    if (localStorage.getItem('currPage')) {
        setCurrPage(parseInt(String(localStorage.getItem('currPage'))));
    } else {
        setCurrPage(1);
    }

    if (localStorage.getItem('mainLayout')) {
        mainLayout = String(localStorage.getItem('mainLayout'));
    } else {
        if (document.body.clientWidth < 750) mainLayout = 'list';
        else mainLayout = 'grid';
    }
}

function saveLocalStorage() {
    localStorage.setItem('arrCart', JSON.stringify(arrCart));
    localStorage.setItem('perPage', getPerPage().toString());
    localStorage.setItem('currPage', getCurrPage().toString());
    localStorage.setItem('mainLayout', mainLayout);
}

export {
    saveLocalStorage,
    removeItemFromCart,
    updateHeader,
    addItemToCart,
    buyNow,
    getArrCart,
    findInCart,
    arrCart,
    getMainLayout,
    setMainLayout,
    clearCart,
    clickItem,
    loadLocalStorage,
};
