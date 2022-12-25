import { ItemCart, createReceipt } from '../components/itemCart/itemCart';
import Page from '../templates/page';

class CartPage extends Page {
    public arrCart: ItemCart[];

    constructor(id: string, arrayItemCart: ItemCart[]) {
        super(id);
        this.arrCart = arrayItemCart;
    }
    /*
    removeButton(ID: number): void {
        this.arrCart.splice(ID - 1, 1);
    }*/

    render(): HTMLElement {
        const itemCartCollection: HTMLDivElement = document.createElement('div');
        let receipt: HTMLDivElement = document.createElement('div');

        //Item Collection
        itemCartCollection.className = 'cart__item-collection';
        if (this.arrCart.length === 0) {
            itemCartCollection.innerHTML = '<h1>Cart is empty</h1>';
        } else {
            this.arrCart.forEach((el, index) => {
                itemCartCollection.appendChild(el.createHTMLElement(index));
            });
            //Receipt
            receipt = createReceipt(this.arrCart);
        }

        //Нужно доделать удаление из карзины. Элемент удаляется, страница перерисовывается, но в хедере не меняется

        this.container.appendChild(itemCartCollection);
        this.container.appendChild(receipt);

        /*buttonsItemRemove.forEach((button) => {
            button.addEventListener('click', () => {
                const id: number = parseInt((button as HTMLButtonElement).value);
                console.log(id);
                //this.removeButton(id);
            });
        });*/

        return this.container;
    }
}

export default CartPage;
