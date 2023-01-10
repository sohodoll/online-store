import { IPrototypeItem } from '../templates/items';
import Page from '../templates/page';
import { appendChildElements } from '../components/itemCart/itemCart';
import { addItemToCart, buyNow, getArrCart, arrCart, saveLocalStorage } from '../../app';
import { setCurrPage } from '../cart/cart';

let selectImg: HTMLImageElement;

//create breadcrubms
function createBreadCrumbs(brand: string, name: string): HTMLDivElement {
    const breadcrumbs: HTMLDivElement = document.createElement('div');
    const breadSeparator: HTMLDivElement = document.createElement('div');
    const breadStore: HTMLDivElement = document.createElement('div');
    const breadType: HTMLDivElement = document.createElement('div');
    const breadBrand: HTMLDivElement = document.createElement('div');
    const breadName: HTMLDivElement = document.createElement('div');

    breadStore.className = 'bread__store bread__item';
    breadStore.innerHTML = `<a href="#">Store</a>`;

    breadSeparator.className = 'bread__separator';
    breadSeparator.textContent = '>>';

    breadType.className = 'bread__type bread__item';
    breadType.textContent = 'Shoes';

    breadBrand.className = 'bread__brand bread__item';
    breadBrand.textContent = brand;

    breadName.className = 'bread__name bread__item';
    breadName.innerHTML = name;
    breadcrumbs.className = 'description__bread bread';
    appendChildElements(breadcrumbs, [
        breadStore,
        breadSeparator,
        breadType,
        <HTMLDivElement>breadSeparator.cloneNode(true),
        breadBrand,
        <HTMLDivElement>breadSeparator.cloneNode(true),
        breadName,
    ]);

    return breadcrumbs;
}

//create left description panel
function createLeftDescriptionPanel(shoe: IPrototypeItem): HTMLDivElement {
    const descriptionLeft: HTMLDivElement = document.createElement('div');
    const highlights: HTMLDivElement = document.createElement('div');
    const image: HTMLImageElement = document.createElement('img');
    const imgCollection: HTMLDivElement = document.createElement('div');

    descriptionLeft.className = 'description__left';

    //Create Left Panel
    highlights.className = 'description__highlights';
    image.className = 'description__image';
    image.src = `${shoe.thumbnail}`;
    image.alt = `${shoe.name}`;
    highlights.appendChild(image);

    imgCollection.className = 'description__images';
    for (let i = 0; i < shoe.images.length + 1; i += 1) {
        const imageChoice: HTMLImageElement = document.createElement('img');
        imageChoice.className = 'image-choice';
        if (i === 0) {
            imageChoice.classList.toggle('select');
            selectImg = imageChoice;
            imageChoice.src = shoe.thumbnail;
        } else
            imageChoice.src = shoe.images[i - 1];
        imageChoice.alt = shoe.name;
        //click image
        imageChoice.addEventListener('click', function () {
            image.src = this.src;
            if (selectImg)
                selectImg.classList.toggle('select');
            this.classList.toggle('select');
            selectImg = <HTMLImageElement>this;
        });
        imgCollection.appendChild(imageChoice);
    }
    
    descriptionLeft.append(highlights, imgCollection);
    return descriptionLeft;
}

//create right description panel
function createRightDescriptionPanel(shoe: IPrototypeItem): HTMLDivElement {
    const descriptionRight: HTMLDivElement = document.createElement('div');
    const itemBrand: HTMLDivElement = document.createElement('div');
    const itemModel: HTMLDivElement = document.createElement('div');
    const itemDescription: HTMLDivElement = document.createElement('div');
    const itemStock: HTMLDivElement = document.createElement('div');
    const itemCategory: HTMLDivElement = document.createElement('div');
    const itemPrice: HTMLDivElement = document.createElement('div');
    const buttons: HTMLDivElement = document.createElement('div');
    const btnBuyNow: HTMLButtonElement = document.createElement('button');
    const btnAddToCart: HTMLButtonElement = document.createElement('button');

    descriptionRight.className = 'description__right';

    itemBrand.className = 'item__brand';
    itemBrand.textContent = shoe.brand;
    itemModel.className = 'item__model';
    itemModel.textContent = shoe.name;

    itemDescription.className = 'item__description';
    itemDescription.textContent = shoe.description;

    itemStock.className = 'item__stock';
    itemStock.textContent = shoe.stock.toString();
    itemCategory.className = 'item__category';
    itemCategory.textContent = shoe.category;

    itemPrice.className = 'item__price';
    itemPrice.textContent = `${shoe.price}`;

    buttons.className = 'description__buttons';
    btnBuyNow.className = 'description__button-buy-now btn';
    btnBuyNow.textContent = 'Buy Now';
    btnBuyNow.addEventListener('click', () => {
        buyNow(shoe.id);
    });

    btnAddToCart.className = 'description__button-add-cart btn';
    if (arrCart.findIndex((el) => el.id === shoe.id) < 0)
        btnAddToCart.textContent = 'Add To Cart';
    else
        btnAddToCart.textContent = 'Remove From Cart';
    btnAddToCart.addEventListener('click', function () {
        addItemToCart(shoe.id);
        if (this.textContent === 'Add To Cart')
            this.textContent = 'Remove From Cart';
        else
            this.textContent = 'Add To Cart';
        saveLocalStorage();
    });
    buttons.append(btnBuyNow, btnAddToCart);

    descriptionRight.append(itemBrand, itemModel, itemCategory, itemStock, itemPrice, itemDescription, buttons);
    return descriptionRight;
}

//create description panel
function createDescriptionPanel(shoe: IPrototypeItem): HTMLDivElement {
    const descriptionContainer: HTMLDivElement = document.createElement('div');

    descriptionContainer.className = 'description__container';
    descriptionContainer.append(
        createLeftDescriptionPanel(shoe),
        createRightDescriptionPanel(shoe)
    );
    return descriptionContainer;
}

class DescriptionPage extends Page {
    shoe: IPrototypeItem;

    constructor(id: string, shoe: IPrototypeItem) {
        super(id);
        this.shoe = shoe;
    }

    render() {
        let breadcrumbs: HTMLDivElement = document.createElement('div');

        setCurrPage(1);
        breadcrumbs = createBreadCrumbs(this.shoe.brand, this.shoe.name);
        this.container.append(breadcrumbs, createDescriptionPanel(this.shoe));
         return this.container;
    }
}

export default DescriptionPage;
