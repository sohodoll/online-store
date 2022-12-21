import ItemCart from '../../app/pages/itemCart/itemCart';
import Page from '../templates/page';

class CartPage extends Page {
    /*static TextObject = {
        MainTitle: 'This is your cart',
    };*/
    private arrCart: ItemCart[];

    constructor(id: string, arrayItemCart: ItemCart[]) {
        super(id);
        this.arrCart = arrayItemCart;
    }

    render() {
        /*const title = this.createHTML(CartPage.TextObject.MainTitle);
        this.container.appendChild(title);*/
        if (this.arrCart.length === 0) {
            this.container.innerHTML = '<h1>Cart is empty</h1>';
        } else {
            this.arrCart.forEach((el) => {
                this.container.appendChild(el.createHTMLElement());
            });
        }
            //this.createHTML(CartPage.TextObject.MainTitle);
         return this.container;
    }
}

export default CartPage;
