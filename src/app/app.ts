import headerTemplate from './pages/header/header';
import mainTemplate from './pages/main/main';
import footerTemplate from './pages/footer/footer';
import error404Template from './pages/error404/error404';
import ItemCart from './pages/itemCart/itemCart';
import { IPrototypeItem } from './items';
import shoes from './db/shoes';

let itemsAddCartButton: NodeList;
let arrCart: ItemCart[];

class App {
    start(): void {
        const header: HTMLElement = document.getElementById('header') as HTMLElement;
        const main: HTMLElement = document.getElementById('main') as HTMLElement;
        const footer: HTMLElement = document.getElementById('footer') as HTMLElement;

        header.innerHTML = headerTemplate();
        //main.innerHTML = error404Template();
        main.appendChild(mainTemplate());
        footer.innerHTML = footerTemplate();

        itemsAddCartButton = document.querySelectorAll('.btn-to-cart');

        arrCart = [];

        function updateCartAmount(arr: ItemCart[]): void {
            const headerCartCount: HTMLImageElement = document.querySelector('.header__cart-count') as HTMLImageElement;
            headerCartCount.textContent = arr.length.toString();
        }

        function updateCartPrice(arr: ItemCart[]): void {
            const headerTotalPrice: HTMLImageElement = document.querySelector('.header__total-price') as HTMLImageElement;
            let total = 0;
            arr.forEach((el) => {
                total += el.getTotalPrice();
            });
            headerTotalPrice.textContent = total.toString();
        }

        itemsAddCartButton?.forEach((el) => {
            el.addEventListener('click', () => {
                const itemID: number = parseInt((el as Element).getAttribute('itemID') as string);
                const clickItem: IPrototypeItem = shoes.find((el) => el.id === itemID) as IPrototypeItem;
                const cartItem: ItemCart = new ItemCart(clickItem.id, clickItem.name, clickItem.brand, clickItem.thumbnail, 1, clickItem.price);
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

        const headerCartImg = document.querySelector('.header__cart-img');
        headerCartImg?.addEventListener('click', () => {
            console.log(arrCart);
        });
    }
}
export default App;