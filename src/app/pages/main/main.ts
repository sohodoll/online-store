import { createCartItemFromMain, IPrototypeItem } from '../../items';
import ItemCart from '../cart/cart';
import shoes from '../../db/shoes';

let itemsAddCartButton: NodeList;
let arrCart: ItemCart[];
/*
const itemsAddCartButton: NodeList = document.querySelectorAll('.btn-to-cart');


itemsAddCartButton?.forEach((el) => {
    el.addEventListener('click', () => {
        const elem: Element = el as Element;
        const tempItem: ItemCart[] = arrCart.filter((item) => {
            item.id === parseInt(elem.getAttribute('itemID') as string);
        });

        if (tempItem.length > 0) {
            console.log(tempItem[0].id);
        }
    });
});*/

function createListItem(array: IPrototypeItem[]): HTMLDivElement {
    const result: HTMLDivElement = document.createElement('div');
    result.className = 'main-wrapper wrapper';
    array.forEach((el) => {
        result.appendChild(createCartItemFromMain(el));
    });
    return result;
}

export default function Main(): HTMLDivElement {    
    return createListItem(shoes);
}