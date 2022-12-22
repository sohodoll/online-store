interface IPrototypeItem {
    id: number;
    brand: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    thumbnail: string;
    images: string[];
}
/*
class Item {
    id: number;
    brand: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    thumbnail: string;
    images: string[];

    constructor(options: IPrototypeItem) {
        this.id = options.id;
        this.brand = options.brand;
        this.name = options.name;
        this.description = options.description;
        this.price = options.price;
        this.stock = options.stock;
        this.category = options.category;
        this.thumbnail = options.thumbnail;
        this.images = options.images;
    }*/

function createCartItemFromMain(item: IPrototypeItem): HTMLDivElement {
    const elem: HTMLDivElement = document.createElement('div');
    const elemTumb: HTMLImageElement = document.createElement('img');
    const elemTitle: HTMLDivElement = document.createElement('div');
    const elemName: HTMLParagraphElement = document.createElement('p');
    const elemPrice: HTMLParagraphElement = document.createElement('p');
    const elemButtons: HTMLDivElement = document.createElement('div');
    const elemBtnView: HTMLButtonElement = document.createElement('button');
    const elemBtnToCart: HTMLButtonElement = document.createElement('button');

    elem.className = 'main__item';
    elem.id = `main__item_${item.id}`;

    //Tumbnail
    elemTumb.className = 'main__item-tumb';
    elemTumb.src = item.thumbnail;
    elemTumb.alt = `${item.brand} ${item.name}`;

    //Title
    elemTitle.className = 'main__item-title';
    elemName.className = 'main__item-name';
    elemName.textContent = `${item.brand} ${item.name}`;
    elemPrice.className = 'main__item-price';
    elemPrice.textContent = `Price: $${item.price.toString()}`;

    elemTitle.appendChild(elemName); //Name
    elemTitle.appendChild(elemPrice); //Price

    //Buttons
    elemButtons.className = 'main__item_btn-collection';

    //-- View
    elemBtnView.className = 'main__item-btn btn-view';
    elemBtnView.textContent = 'View';
    elemBtnView.value = item.id.toString();

    //-- Add to Cart
    elemBtnToCart.className = 'main__item-btn btn-to-cart';
    elemBtnToCart.value = item.id.toString();

    elemButtons.appendChild(elemBtnView);
    elemButtons.appendChild(elemBtnToCart);
    //------------

    elem.appendChild(elemTumb); //Tumbnail
    elem.appendChild(elemTitle); //Title
    elem.appendChild(elemButtons); //Button View
    return elem;
}
//}

export { createCartItemFromMain, IPrototypeItem };