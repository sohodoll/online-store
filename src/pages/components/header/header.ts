import Component from '../../templates/components';

import { PageIDs } from '../../../app';

const Buttons = [
    {
        id: PageIDs.MainPage,
    },
    {
        id: PageIDs.CartPage,
    },
    {
        id: PageIDs.DescriptionPage,
    },
];

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    createHeaderHTML() {
        return `
        <div class="header-wrapper wrapper">
            <div class="header__logo">
                <a href="#${PageIDs.MainPage}" ><img class="header__logo-img" src="./assets/png/store-logo.png" alt="Online Store" /></a>
            </div>
            <div class="header__total">
                <a href="#${PageIDs.DescriptionPage}" ><span class="header__total-title">Total:</span></a>
                <span class="header__total-price">0</span>
            </div>
            <div class="header__cart">
                <a href="#${PageIDs.CartPage}"><span class="header__cart-title">Cart:</span></a>
                <span class="header__cart-count">0</span>
                <img class="header__cart-img" src="./assets/png/cart.png" alt="Cart" />
            </div>
        </div>
    `;
    }

    render() {
        this.container.innerHTML = this.createHeaderHTML();
        return this.container;
    }
}

export default Header;
