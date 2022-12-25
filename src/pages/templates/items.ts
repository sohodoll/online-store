import { appendChildElements } from '../components/itemCart/itemCart';

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
    const brandLogo: HTMLImageElement = document.createElement('img');
    const elemTumb: HTMLImageElement = document.createElement('img');
    const elemTitle: HTMLDivElement = document.createElement('div');
    const elemName: HTMLParagraphElement = document.createElement('p');
    const elemPrice: HTMLParagraphElement = document.createElement('p');
    const elemButtons: HTMLDivElement = document.createElement('div');
    const elemBtnView: HTMLButtonElement = document.createElement('button');
    const elemBtnToCart: HTMLButtonElement = document.createElement('button');

    //const logoBrands = brandsLogo;

    elem.className = 'main__item';
    elem.id = `main__item_${item.id}`;

    //Brand Logo
    brandLogo.className = 'main__item-brand-logo';
    brandLogo.src = `./assets/svg/${item.brand.toLowerCase()}.svg`;

    //Tumbnail
    elemTumb.className = 'main__item-tumb';
    elemTumb.src = item.thumbnail;
    elemTumb.alt = `${item.brand} ${item.name}`;

    //Title
    elemTitle.className = 'main__item-title';
    elemName.className = 'main__item-name';
    elemName.textContent = `${item.brand} ${item.name}`;
    elemPrice.className = 'main__item-price';
    elemPrice.textContent = `${item.price.toString()}`;

    appendChildElements(elemTitle, [elemName, elemPrice]) //Name and Price

    //Buttons
    elemButtons.className = 'main__item_btn-collection';

    //-- View
    elemBtnView.className = 'main__item-btn btn-view';
    elemBtnView.textContent = 'View';
    elemBtnView.value = item.id.toString();

    //-- Add to Cart
    elemBtnToCart.className = 'main__item-btn btn-to-cart';
    elemBtnToCart.value = item.id.toString();
    elemBtnToCart.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="114.000000pt" height="100.000000pt" viewBox="0 0 114.000000 100.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
fill="#ffffff" stroke="none">
<path d="M9 984 c-6 -7 -9 -23 -7 -36 3 -20 12 -25 68 -36 35 -7 68 -16 71
-20 4 -4 50 -141 104 -304 88 -269 96 -301 86 -330 -20 -58 -39 -78 -72 -78
-38 0 -89 -48 -89 -84 0 -85 91 -125 150 -66 14 14 20 34 20 65 l0 45 215 0
215 0 0 -41 c0 -52 12 -73 49 -89 93 -38 167 80 90 144 l-31 26 -195 0 -195 0
32 36 c17 20 36 47 42 60 13 28 15 29 258 49 178 15 210 23 210 50 0 7 25 97
55 200 34 115 52 192 47 197 -5 5 -74 14 -153 20 -755 51 -772 53 -780 68 -4
8 -15 37 -24 63 -19 53 -32 61 -107 69 -33 4 -51 1 -59 -8z m358 -239 c22 -85
21 -86 -44 -83 l-58 3 -22 60 c-12 33 -22 64 -22 68 -1 4 29 7 66 5 l67 -3 13
-50z m188 33 c1 -2 5 -29 9 -61 l6 -58 -72 3 -72 3 -13 50 c-21 81 -23 79 63
72 42 -3 77 -7 79 -9z m163 -8 l43 0 -3 -57 -3 -57 -70 3 c-38 1 -71 4 -73 6
-2 1 -6 29 -9 61 l-6 57 39 -6 c21 -4 58 -7 82 -7z m216 -16 c11 -4 14 -14 11
-30 -17 -81 -9 -74 -80 -74 l-65 0 0 55 0 55 59 0 c33 0 66 -3 75 -6z m144
-12 c10 -7 10 -16 -1 -48 -13 -37 -16 -39 -61 -42 l-48 -3 7 33 c13 67 14 68
53 68 20 0 43 -4 50 -8z m-671 -177 c19 -77 20 -76 -39 -73 l-51 3 -18 50
c-27 76 -27 76 38 73 l57 -3 13 -50z m175 -5 c3 -30 5 -57 3 -59 -3 -2 -30 -4
-61 -5 -63 -1 -61 -3 -78 87 l-7 38 68 -3 68 -3 7 -55z m152 50 c19 0 21 -5
18 -55 l-4 -55 -58 0 c-56 0 -58 1 -64 31 -3 17 -6 45 -6 62 0 30 0 30 46 23
26 -3 56 -6 68 -6z m180 -47 c-3 -27 -7 -49 -8 -50 -1 -1 -28 -5 -59 -9 l-57
-7 0 57 0 56 66 0 65 0 -7 -47z m136 41 c0 -3 -5 -25 -11 -50 -11 -43 -13 -44
-50 -44 -42 0 -45 6 -33 69 6 29 9 31 50 31 24 0 44 -3 44 -6z m-160 -161 c0
-58 -9 -71 -53 -76 -23 -2 -45 -1 -49 2 -4 3 -4 25 -1 48 6 44 12 49 76 52 23
1 27 -3 27 -26z m120 21 c0 -4 -5 -24 -12 -45 -10 -35 -15 -39 -44 -39 -32 0
-32 0 -23 38 5 20 9 40 9 45 0 9 70 10 70 1z m-416 -26 c19 -95 18 -98 -54
-98 -36 0 -38 2 -49 44 -16 64 -16 65 37 69 26 2 50 4 54 5 4 1 10 -8 12 -20z
m156 -15 c0 -51 -9 -61 -56 -69 -37 -5 -42 -4 -47 17 -4 13 -7 39 -7 57 l0 32
55 0 55 0 0 -37z m-303 -28 c17 -68 19 -65 -31 -65 -44 0 -44 1 -60 47 -24 71
-23 75 31 71 l47 -3 13 -50z m73 -100 c0 -3 -12 -24 -27 -46 -31 -47 -68 -69
-116 -69 l-35 0 19 37 c10 21 19 45 19 55 0 13 10 18 43 21 77 7 97 7 97 2z
m-236 -171 c31 -31 11 -84 -33 -84 -16 0 -41 30 -41 50 0 22 25 50 45 50 7 0
21 -7 29 -16z m601 -4 c36 -40 -7 -96 -55 -70 -25 14 -27 65 -2 79 25 15 37
13 57 -9z"/>
</g>
</svg>`;

    appendChildElements(elemButtons, [elemBtnView, elemBtnToCart]);
    //------------

    appendChildElements(elem, [brandLogo, elemTumb, elemTitle, elemButtons]); //Brand Logo, Tumbnail, Title and Button View
    return elem;
}
//}

export { createCartItemFromMain, IPrototypeItem };
