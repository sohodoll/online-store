import { IPrototypeItem } from '../templates/items';
import Page from '../templates/page';
import { appendChildElements } from '../components/itemCart/itemCart';
import { addItemToCart, buyNow, findInCart, getArrCart, arrCart } from '../../app';

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
    const price: HTMLDivElement = document.createElement('div');
    const imgCollection: HTMLDivElement = document.createElement('div');
    const buttons: HTMLDivElement = document.createElement('div');
    const btnBuyNow: HTMLButtonElement = document.createElement('button');
    const btnAddToCart: HTMLButtonElement = document.createElement('button');

    descriptionLeft.className = 'description__left';

    //Create Left Panel
    highlights.className = 'description__highlights';
    image.className = 'description__image';
    image.src = `${shoe.thumbnail}`;
    image.alt = `${shoe.name}`;
    price.className = 'item__price';
    price.textContent = `${shoe.price}`;
    appendChildElements(highlights, [image, price]);

    imgCollection.className = 'description__images';
    for (let i = 0; i < shoe.images.length + 1; i += 1) {
        const imageChoice: HTMLImageElement = document.createElement('img');
        imageChoice.className = 'image-choice';
        if (i === 0) {
            imageChoice.classList.toggle('select');
            selectImg = imageChoice;
            imageChoice.src = shoe.thumbnail;
        } else imageChoice.src = shoe.images[i - 1];
        imageChoice.alt = shoe.name;
        //click image
        imageChoice.addEventListener('click', function () {
            image.src = this.src;
            if (selectImg) selectImg.classList.toggle('select');
            this.classList.toggle('select');
            selectImg = <HTMLImageElement>this;
        });
        imgCollection.appendChild(imageChoice);
    }

    buttons.className = 'description__buttons';
    btnBuyNow.className = 'description__button-buy-now btn';
    btnBuyNow.textContent = 'Buy Now';
    btnBuyNow.addEventListener('click', () => {
        buyNow(shoe.id);
    });

    btnAddToCart.className = 'description__button-add-cart btn';
    //if (findInCart(shoe.id) < 0)
    console.log(getArrCart());
    if (arrCart.findIndex((el) => el.id === shoe.id) < 0) btnAddToCart.textContent = 'Add To Cart';
    else btnAddToCart.textContent = 'Remove From Cart';
    btnAddToCart.addEventListener('click', function () {
        addItemToCart(shoe.id);
        if (this.textContent === 'Add To Cart') this.textContent = 'Remove From Cart';
        else this.textContent = 'Add To Cart';
    });
    appendChildElements(buttons, [btnBuyNow, btnAddToCart]);
    appendChildElements(descriptionLeft, [highlights, imgCollection, buttons]);
    return descriptionLeft;
}

//create right description panel
function createRightDescriptionPanel(shoe: IPrototypeItem): HTMLDivElement {
    const descriptionRight: HTMLDivElement = document.createElement('div');
    const itemLeft: HTMLDivElement = document.createElement('div');
    const itemNaming: HTMLDivElement = document.createElement('div');
    const namingUpper: HTMLDivElement = document.createElement('div');
    const namingBottom: HTMLDivElement = document.createElement('div');
    const namingNames: HTMLDivElement = document.createElement('div');
    const itemBrand: HTMLDivElement = document.createElement('div');
    const itemModel: HTMLDivElement = document.createElement('div');
    const itemDescription: HTMLDivElement = document.createElement('div');
    const itemStock: HTMLDivElement = document.createElement('div');
    const itemCategory: HTMLDivElement = document.createElement('div');

    descriptionRight.className = 'description__right item';
    itemLeft.className = 'item__left';
    itemNaming.className = 'item__naming naming';
    namingUpper.className = 'naming__upper';
    namingBottom.className = 'naming__bottom';
    namingNames.className = 'naming__names';
    itemBrand.className = 'item__brand';
    itemBrand.textContent = shoe.brand;
    itemModel.className = 'item__model';
    itemModel.textContent = shoe.name;
    appendChildElements(namingNames, [itemBrand, itemModel]);
    itemDescription.className = 'item__description';
    itemDescription.textContent = shoe.description;
    appendChildElements(namingUpper, [namingNames, itemDescription]);

    itemStock.className = 'item__stock';
    itemStock.textContent = shoe.stock.toString();
    itemCategory.className = 'item__category';
    itemCategory.textContent = shoe.category;
    appendChildElements(namingBottom, [itemStock, itemCategory]);

    appendChildElements(itemNaming, [namingUpper, namingBottom]);
    itemLeft.appendChild(itemNaming);
    appendChildElements(descriptionRight, [itemLeft]);
    return descriptionRight;
}

//create description panel
function createDescriptionPanel(shoe: IPrototypeItem): HTMLDivElement {
    const descriptionContainer: HTMLDivElement = document.createElement('div');
    let descriptionLeft: HTMLDivElement = document.createElement('div');
    let descriptionRight: HTMLDivElement = document.createElement('div');

    descriptionContainer.className = 'description__container';

    descriptionLeft = createLeftDescriptionPanel(shoe);
    descriptionRight = createRightDescriptionPanel(shoe);

    appendChildElements(descriptionContainer, [descriptionLeft, descriptionRight]);
    return descriptionContainer;
}

class DescriptionPage extends Page {
    /*shoeId: number;
    shoeBrand: string;
    shoeName: string;
    shoeDescription: string;
    shoePrice: string;
    shoeStock: string;
    shoeCategory: string;
    shoeThumbnail: string;
    shoePictures: string[];*/
    shoe: IPrototypeItem;

    constructor(id: string, shoe: IPrototypeItem) {
        super(id);
        this.shoe = shoe;
        /*
        this.shoeId = shoe.id;
        this.shoeBrand = shoe.brand;
        this.shoeName = shoe.name;
        this.shoeDescription = shoe.description;
        this.shoePrice = String(shoe.price);
        this.shoeStock = String(shoe.stock);
        this.shoeCategory = shoe.category;
        this.shoeThumbnail = shoe.thumbnail;
        this.shoePictures = shoe.images;*/
    }

    render() {
        let breadcrumbs: HTMLDivElement = document.createElement('div');
        let description__container: HTMLDivElement = document.createElement('div');
        breadcrumbs = createBreadCrumbs(this.shoe.brand, this.shoe.name);
        description__container = createDescriptionPanel(this.shoe);
        appendChildElements(this.container, [breadcrumbs, description__container]);
        /* this.container.innerHTML = `
        <div class="description__bread bread">
            <div class="bread__store bread__item"><a href="/">Store</a></div>
            <div class="bread__separator">>></div>
            <div class="bread__type bread__item">Shoes</div>
            <div class="bread__separator ">>></div>
            <div class="bread__brand bread__item">${this.shoeBrand}</div>
            <div class="bread__separator ">>></div>
            <div class="bread__name bread__item">${this.shoeName}</div>
        </div>

        <div class="description__container">
            <div class="description__left">
                <div class="description__highlights">
                    <img class="description__image" src="${this.shoeThumbnail}" alt="${this.shoeName}" />
                    <div class="item__price">$<span class="item__price-number">${this.shoePrice}</span></div>
                </div>
                <div class="description__images">
                    <div class="description__image-choice">
                        <img class="image-choice" src="${this.shoeThumbnail}" alt="${this.shoeName}" />
                    </div>
                    <div class="description__image-choice">
                        <img class="image-choice" src="${this.shoePictures[0]}" alt="${this.shoeName}" />
                    </div>
                    <div class="description__image-choice">
                        <img class="image-choice" src="${this.shoePictures[1]}" alt="${this.shoeName}" />
                    </div>
                </div>
                <div class="description__buttons">
                    <div class="description__button-buy-now">Buy Now</div>
                    <div class="description__button-add-cart">Add To Cart</div>
                </div>
            </div>
            <div class="description__right item">
                <div class="item__left">
                    <div class="item__naming naming">
                        <div class="naming__upper">
                            <div class="naming__names">
                                <div class="item__name">${this.shoeBrand}</div>
                                <div class="item__model">${this.shoeName}</div>
                            </div>
                            <div class="item__description">${this.shoeDescription}</div>
                        </div>
                        <div class="naming__bottom">
                            <div class="item__stock">In stock: <span class="item__stock-number">${this.shoeStock}</span></div>
                            <div class="item__category">
                                Category: <span class="item__category-name">${this.shoeCategory}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;*/
        return this.container;
    }
    /*
    listen() {
        const highlightImage = <HTMLImageElement>document.querySelector('.description__image');
        const smallerImages = Array.from(document.querySelectorAll('.image-choice')) as HTMLImageElement[];
        console.log(smallerImages);
        smallerImages.forEach((image) => {
            image.addEventListener('click', () => {
                highlightImage.src = image.src;
            });
        });
        const buttonBuyNow: HTMLDivElement = <HTMLDivElement>document.querySelector('.description__button-buy-now');
        const buttonAddCart: HTMLDivElement = <HTMLDivElement>document.querySelector('.description__button-add-cart');
        buttonBuyNow.addEventListener('click', () => {
            buyNow(this.shoe.id);
        });

        buttonAddCart.addEventListener('click', () => {
            addItemToCart(this.shoe.id);
        });
        console.log(highlightImage);
    }*/
}

export default DescriptionPage;
