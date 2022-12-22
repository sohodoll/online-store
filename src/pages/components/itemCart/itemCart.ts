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
        const itemAmount: HTMLInputElement = document.createElement('input');
        const itemPrice: HTMLParagraphElement = document.createElement('p');

        item.className = 'cart__item';

        //Tumbnail
        itemTumb.className = 'cart__item-img';
        itemTumb.src = this.thumbnail;
        itemTumb.alt = `${this.brand}\n${this.name}`;

        //Item Information
        itemName.className = 'cart__item-name';
        itemName.textContent = this.name;
        itemBrand.className = 'cart__item-brand';
        itemBrand.textContent = this.brand;
        itemAmount.className = 'cart__item-amount';
        itemAmount.value = this.amount.toString();
        itemPrice.className = 'cart__item-brand';
        itemPrice.textContent = this.getTotalPrice().toString();

        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemBrand);
        itemInfo.appendChild(itemAmount);
        itemInfo.appendChild(itemPrice);
        //---------

        item.appendChild(itemTumb);
        item.appendChild(itemInfo);
        return item;
    }
}

export default ItemCart;
