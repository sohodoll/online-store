import { addItemToCart } from '../../app';
import { appendChildElements } from '../components/itemCart/itemCart';
import iconsSVG from './icons';

interface IPrototypeItem {
    id: number;
    brand: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    thumbnail: string;
    images: string[];
}
/*
class Item {
    id: number;
    brand: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    thumbnail: string;
    images: string[];

    constructor(options: IPrototypeItem) {
        this.id = options.id;
        this.brand = options.brand;
        this.name = options.name;
        this.description = options.description;
        this.price = options.price;
        this.stock = options.stock;
        this.category = options.category;
        this.thumbnail = options.thumbnail;
        this.images = options.images;
    }*/

function createCartItemFromMain(item: IPrototypeItem): HTMLDivElement {
    const elem: HTMLDivElement = document.createElement('div');
    const brandLogo: HTMLImageElement = document.createElement('img');
    const elemTumb: HTMLImageElement = document.createElement('img');
    const elemTitle: HTMLDivElement = document.createElement('div');
    const elemName: HTMLParagraphElement = document.createElement('p');
    const elemPrice: HTMLParagraphElement = document.createElement('p');
    const elemButtons: HTMLDivElement = document.createElement('div');
    const elemBtnView: HTMLButtonElement = document.createElement('button');
    const elemBtnToCart: HTMLButtonElement = document.createElement('button');

    //const logoBrands = brandsLogo;

    elem.className = 'main__item';
    elem.id = `main__item_${item.id}`;

    //Brand Logo
    brandLogo.className = 'main__item-brand-logo';
    brandLogo.src = `./assets/svg/${item.brand.toLowerCase()}.svg`;

    //Tumbnail
    elemTumb.className = 'main__item-tumb';
    elemTumb.src = item.thumbnail;
    elemTumb.alt = `${item.brand} ${item.name}`;

    //Title
    elemTitle.className = 'main__item-title';
    elemName.className = 'main__item-name';
    elemName.textContent = `${item.brand} ${item.name}`;
    elemPrice.className = 'main__item-price';
    elemPrice.textContent = `${item.price.toString()}`;

    appendChildElements(elemTitle, [elemName, elemPrice]) //Name and Price

    //Buttons
    elemButtons.className = 'main__item_btn-collection';

    //-- View
    elemBtnView.className = 'main__item-btn btn-view';
    elemBtnView.textContent = 'View';
    elemBtnView.value = item.id.toString();

    //-- Add to Cart
    elemBtnToCart.className = 'main__item-btn btn-to-cart';
    elemBtnToCart.value = item.id.toString();    
    elemBtnToCart.innerHTML = iconsSVG.cart;
    elemBtnToCart.addEventListener('click', function () {
        addItemToCart(item.id);
    });

    appendChildElements(elemButtons, [elemBtnView, elemBtnToCart]);
    //------------

    appendChildElements(elem, [brandLogo, elemTumb, elemTitle, elemButtons]); //Brand Logo, Tumbnail, Title and Button View
    return elem;
}
//}

export { createCartItemFromMain, IPrototypeItem };
