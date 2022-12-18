import Page from '../templates/page';

class CartPage extends Page {
    static TextObject = {
        MainTitle: 'This is your cart',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createTitle(CartPage.TextObject.MainTitle);
        this.container.appendChild(title);
        return this.container;
    }
}

export default CartPage;
