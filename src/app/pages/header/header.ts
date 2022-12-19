export default function Header(): string {
    return `
        <div class="header-wrapper wrapper">
            <div class="header__logo">
                <img class="header__logo-img" src="./assets/png/store-logo.png" alt="Online Store" />
            </div>
            <div class="header__total">
                <span class="header__total-title">Total:</span>
                <span class="header__total-price">0</span>                    
            </div>
            <div class="header__cart">
                <span class="header__cart-title">Cart:</span>
                <span class="header__cart-count">0</span>
                <img class="header__cart-img" src="./assets/png/cart.png" alt="Cart" />
            </div>
        </div>
    `;
}