import { IPrototypeItem } from '../templates/items';
import Page from '../templates/page';
import shoes from '../../app/db/shoes';
import { IPrototypeItem } from '../../app/items';

class DescriptionPage extends Page {
    private static shoeBrand: string;
    private static shoeName: string;
    private static shoeDescription: string;
    private static shoePrice: string;
    private static shoeStock: string;
    private static shoeCategory: string;
    private static shoeThumbnail: string;
    private static shoePictures: string[];
    static TextObject = {
        MainTitle: 'Description of the shoes',
    };*/
    private item: IPrototypeItem;

    constructor(id: string, shoe: IPrototypeItem) {
        super(id);
        DescriptionPage.shoeBrand = shoe.brand;
        DescriptionPage.shoeName = shoe.name;
        DescriptionPage.shoeDescription = shoe.description;
        DescriptionPage.shoePrice = String(shoe.price);
        DescriptionPage.shoeStock = String(shoe.stock);
        DescriptionPage.shoeCategory = shoe.category;
        DescriptionPage.shoeThumbnail = shoe.thumbnail;
        DescriptionPage.shoePictures = shoe.images;
    }

    render() {
        const title = this.createTitle(DescriptionPage.TextObject.MainTitle);
        this.container.appendChild(title);
        this.container.innerHTML = `<div class="description__container">
        <div class="description__left">
            <div class="description__highlights">
                <img class="description__image" src="${DescriptionPage.shoeThumbnail}" alt="${DescriptionPage.shoeName}" />
                <div class="item__price">$<span class="item__price-number">${DescriptionPage.shoePrice}</span></div>
            </div>
            <div class="description__images">
                        <div class="description__image-choice">
                            <img class="image-choice" src="${DescriptionPage.shoePictures[0]}" alt="${DescriptionPage.shoeName}" />
                        </div>
                        <div class="description__image-choice">
                            <img class="image-choice" src="${DescriptionPage.shoeThumbnail}" alt="${DescriptionPage.shoeName}" />
                        </div>
                        <div class="description__image-choice">
                            <img class="image-choice" src="${DescriptionPage.shoePictures[1]}" alt="${DescriptionPage.shoeName}" />
                        </div>
                    </div>
            <div class="description__buttons">
                <div class="description__buy">Buy Now</div>
                <div class="description__add">Add To Cart</div>
            </div>
        </div>
        <div class="description__right item">
            <div class="item__left">
                <div class="item__naming naming">
                    <div class="naming__upper">
                        <div class="naming__names">
                            <div class="item__name">${DescriptionPage.shoeBrand}</div>
                            <div class="item__model">${DescriptionPage.shoeName}</div>
                        </div>
                        <div class="item__description">${DescriptionPage.shoeDescription}</div>
                    </div>
                    <div class="naming__bottom">
                        <div class="item__stock">In stock: <span class="item__stock-number">${DescriptionPage.shoeStock}</span></div>
                        <div class="item__category">
                            Category: <span class="item__category-name">${DescriptionPage.shoeCategory}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        return this.container;
    }

    listen() {
        let highlightImage = <HTMLImageElement>document.querySelector('.description__image');
        const smallerImages = Array.from(document.querySelectorAll('.image-choice')) as HTMLImageElement[];
        console.log(smallerImages);
        smallerImages.forEach((image) => {
            image.addEventListener('click', () => {
                highlightImage.src = image.src;
            });
        });
        console.log(highlightImage);
    }
}

export default DescriptionPage;
