import { IPrototypeItem } from '../templates/items';
import Page from '../templates/page';
import { addItemToCart, buyNow } from '../../app';

class DescriptionPage extends Page {
    shoeId: number;
    shoeBrand: string;
    shoeName: string;
    shoeDescription: string;
    shoePrice: string;
    shoeStock: string;
    shoeCategory: string;
    shoeThumbnail: string;
    shoePictures: string[];
    //private item: IPrototypeItem;

    constructor(id: string, shoe: IPrototypeItem) {
        super(id);
        this.shoeId = shoe.id;
        this.shoeBrand = shoe.brand;
        this.shoeName = shoe.name;
        this.shoeDescription = shoe.description;
        this.shoePrice = String(shoe.price);
        this.shoeStock = String(shoe.stock);
        this.shoeCategory = shoe.category;
        this.shoeThumbnail = shoe.thumbnail;
        this.shoePictures = shoe.images;
    }

    render() {
        this.container.innerHTML = `
        <div class="description__bread bread">
            <div class="bread__store bread__item"><a href="/">Store</a></div>
                <div class="bread__separator">>></div>
                <div class="bread__type bread__item">Shoes</div>
                <div class="bread__separator ">>></div>
                <div class="bread__name bread__item">${this.shoeBrand}</div>
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
        </div>`;
        return this.container;
    }

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
            buyNow(this.shoeId);
        });

        buttonAddCart.addEventListener('click', () => {
            addItemToCart(this.shoeId);
        });
        console.log(highlightImage);
    }
}

export default DescriptionPage;