import { PageIDs } from '../../../helpers/appFunctions';

export default function Header(): HTMLElement {
    const header: HTMLElement = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
        <div class="header-wrapper wrapper">
            <div class="header__logo">
                <a href="#${PageIDs.MainPage}" ><img class="header__logo-img" src="./assets/png/store-logo.png" alt="Online Store" /></a>
            </div>
            <div class="header__total">
                <span class="header__total-price">0</span>
            </div>
            <div class="header__cart">
                <!--<span class="header__cart-title">Cart:</span>-->
                <span class="header__cart-count">0</span>
                <a href="#${PageIDs.CartPage}"><img class="header__cart-img" src="./assets/png/cart.png" alt="Cart" /></a>
            </div>
        </div>
    `;
    return header;
}
