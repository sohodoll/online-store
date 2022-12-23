function appendChildElements(parentElem:HTMLDivElement, arr: HTMLElement[]): void {
    arr.forEach((el) => {
        parentElem.appendChild(el);
    });
}

class ItemCart {
    id: number;
    name: string;
    brand: string;
    thumbnail: string;
    amount: number;
    price: number;
    constructor(id: number, name: string, brand: string, thumbnail: string, amount: number, price: number) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.thumbnail = thumbnail;
        this.amount = amount;
        this.price = price;
    }

    addAmount(): void {
        this.amount++;
    }

    delAmount(): void {
        if (this.amount > 0) this.amount--;
    }

    getAmount(): number {
        return this.amount;
    }

    getTotalPrice(): number {
        return this.amount * this.price;
    }

    createHTMLElement(): HTMLDivElement {
        const item: HTMLDivElement = document.createElement('div');
        const itemTumb: HTMLImageElement = document.createElement('img');
        const itemInfo: HTMLDivElement = document.createElement('div');
        const itemName: HTMLParagraphElement = document.createElement('p');
        const itemBrand: HTMLParagraphElement = document.createElement('p');

        const itemPanelAmount: HTMLDivElement = document.createElement('div');
        const itemAmountTitle: HTMLSpanElement = document.createElement('span');
        const itemAmount: HTMLInputElement = document.createElement('input');
        const itemAmountUp: HTMLButtonElement = document.createElement('button');
        const itemAmountDown: HTMLButtonElement = document.createElement('button');

        const itemPrice: HTMLParagraphElement = document.createElement('p');
        const itemRemove: HTMLButtonElement = document.createElement('button');

        item.className = 'cart__item';

        //Tumbnail
        itemTumb.className = 'cart__item-img';
        itemTumb.src = this.thumbnail;
        itemTumb.alt = `${this.brand}\n${this.name}`;

        //Item Information
        itemName.className = 'cart__item-name';
        itemName.textContent = `Model: ${this.name}`;
        itemBrand.className = 'cart__item-brand';
        itemBrand.textContent = `Brand: ${this.brand}`;

        //Amount Panel
        itemPanelAmount.className = 'cart__item-panel-amount';

        itemAmountTitle.className = 'cart__item-amount-title'
        itemAmountTitle.textContent = 'Count: ';

        itemAmountDown.className = 'cart__item-amount-down btn';
        itemAmountDown.value = this.id.toString();
        itemAmountDown.innerHTML = '&#8211;';
        itemAmountDown.addEventListener('click', () => {
            console.log(`.item#${this.id.toString()}`);
            this.delAmount();
            itemPrice.textContent = `Price: $${this.getTotalPrice().toString()}`;
            itemAmount.stepDown(1);
        });
        
        itemAmount.className = 'cart__item-amount';
        itemAmount.id = `item#${this.id.toString()}`;
        itemAmount.readOnly = true;
        itemAmount.min = '0';
        itemAmount.type = 'number';
        itemAmount.value = this.amount.toString();

        itemAmountUp.className = 'cart__item-amount-up btn';
        itemAmountUp.value = this.id.toString();
        itemAmountUp.textContent = '+';
        itemAmountUp.addEventListener('click', () => {
            console.log(`.item#${this.id.toString()}`);
            this.addAmount();
            itemAmount.stepUp(1);
            itemPrice.textContent = `Price: $${this.getTotalPrice().toString()}`;
        });

        appendChildElements(itemPanelAmount, [itemAmountTitle, itemAmountDown, itemAmount, itemAmountUp]);
        //-------------------

        itemPrice.className = `cart__item-price item#${this.id.toString()}`;
        itemPrice.textContent = `Price: $${this.getTotalPrice().toString()}`;
        itemRemove.className = 'cart__item-remove btn';
        itemRemove.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                <g>
                    <path d="M784.3,127.4H631.7C624.1,61.4,568,10,500,10c-68,0-124.1,51.4-131.7,117.4H215.7c-61.7,0-112,50.2-112,112v5.7c0,47.2,29.4,87.6,70.8,104V878c0,61.7,50.2,112,112,112h427.1c61.7,0,112-50.2,112-112V349.1c41.4-16.5,70.8-56.8,70.8-104v-5.7C896.2,177.6,846,127.4,784.3,127.4L784.3,127.4z M500,63.1c38.7,0,71,27.7,78.1,64.3H421.9C429.1,90.8,461.3,63.1,500,63.1L500,63.1z M772.4,878c0,32.5-26.4,58.9-58.9,58.9H286.5c-32.4,0-58.9-26.4-58.9-58.9v-521h544.8V878z M843.1,245.1c0,32.5-26.4,58.9-58.9,58.9H215.7c-32.4,0-58.9-26.4-58.9-58.9v-5.7c0-32.5,26.4-58.9,58.9-58.9h568.6c32.4,0,58.9,26.4,58.9,58.9V245.1L843.1,245.1z"/><path d="M357.7,869c14.7,0,26.5-11.9,26.5-26.5V543.5c0-14.7-11.9-26.6-26.5-26.6c-14.7,0-26.5,11.9-26.5,26.6v298.9C331.1,857.1,343,869,357.7,869L357.7,869z"/><path d="M500,869c14.7,0,26.5-11.9,26.5-26.5V543.5c0-14.7-11.9-26.6-26.5-26.6c-14.7,0-26.5,11.9-26.5,26.6v298.9C473.5,857.1,485.3,869,500,869L500,869z"/><path d="M642.3,869c14.7,0,26.5-11.9,26.5-26.5V543.5c0-14.7-11.9-26.6-26.5-26.6c-14.7,0-26.5,11.9-26.5,26.6v298.9C615.8,857.1,627.7,869,642.3,869z"/>
                </g>
            </svg>`;

        itemInfo.className = 'cart__item-info';
        appendChildElements(itemInfo, [itemName, itemBrand, itemPanelAmount, itemPrice, itemRemove]);
        //---------        

        item.appendChild(itemTumb);
        item.appendChild(itemInfo);
        return item;
    }
}

export default ItemCart;
