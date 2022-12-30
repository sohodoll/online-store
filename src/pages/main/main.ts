import Page from '../templates/page';
import { createCartItemFromMain, IPrototypeItem } from '../templates/items';
//import ItemCart from '../components/itemCart/itemCart';
import shoes from '../../db/shoes';
import { setSearchParams, removeSearchParams, filterItems } from '../templates/filters';
import { viewButtonAddClick } from '../../app';

let selectBrand: HTMLDivElement | undefined;
let selectCategory: HTMLDivElement | undefined;

let tempArray: IPrototypeItem[] = shoes;

let brandFilter: string | '';
let catFilter: string | '';

class MainPage extends Page {
    constructor(id: string) {
        super(id);
    }

    private createListItem(array: IPrototypeItem[]): void {
        this.container.innerHTML = '';
        array.forEach((el) => {
            this.container.appendChild(createCartItemFromMain(el));
        });
    }

    private createFilters(): void {
        let brandArray: string[] = [];
        let catArray: string[] = [];

        shoes.forEach((shoe) => {
            if (!brandArray.includes(shoe.brand)) {
                brandArray.push(shoe.brand);
            }
            if (!catArray.includes(shoe.category)) {
                catArray.push(shoe.category);
            }
        });

        const filterElement = <HTMLDivElement>document.createElement('div');
        const brandFilters = this.createFilterElements(brandArray, 'brand');
        brandFilters.classList.add('brand__filter');
        const categoryFilters = this.createFilterElements(catArray, 'category');
        categoryFilters.classList.add('category__filter');
        filterElement.className = 'main__filters wrapper';
        filterElement.append(categoryFilters, brandFilters);

        const main = <HTMLElement>document.querySelector('main');
        main.prepend(filterElement);
    }

    createFilterElements(array: string[], type: string): HTMLDivElement {
        const filterElement = <HTMLDivElement>document.createElement('div');
        array.forEach((element) => {
            const elementDiv = document.createElement('div');
            elementDiv.className = type;
            elementDiv.id = `${element.toLowerCase()}-filter`;
            elementDiv.textContent = element;

            elementDiv.addEventListener('click', () => {
                let filteredArray: IPrototypeItem[] = [];

                if (type === 'brand') {
                    if (selectBrand) {
                        if (selectBrand !== elementDiv) {
                            selectBrand.classList.toggle(`${type}_active`);
                            elementDiv.classList.toggle(`${type}_active`);
                            selectBrand = <HTMLDivElement>elementDiv;
                            brandFilter = element;
                            setSearchParams(brandFilter, catFilter);
                            tempArray = filterItems(shoes, brandFilter, catFilter);
                            this.createListItem(tempArray);
                        } else {
                            brandFilter = '';
                            tempArray = filterItems(shoes, brandFilter, catFilter);

                            removeSearchParams([type]);
                            this.createListItem(tempArray);
                            elementDiv.classList.remove(`${type}_active`);
                            selectBrand = undefined;
                        }
                    } else {
                        brandFilter = element;
                        elementDiv.classList.toggle(`${type}_active`);
                        selectBrand = <HTMLDivElement>elementDiv;
                        setSearchParams(brandFilter, catFilter);
                        tempArray = filterItems(shoes, brandFilter, catFilter);
                        this.createListItem(tempArray);
                    }
                } else {
                    if (selectCategory) {
                        if (selectCategory !== elementDiv) {
                            selectCategory.classList.toggle(`${type}_active`);
                            elementDiv.classList.toggle(`${type}_active`);
                            selectCategory = <HTMLDivElement>elementDiv;
                            catFilter = element;
                            setSearchParams(brandFilter, catFilter);
                            tempArray = filterItems(shoes, brandFilter, catFilter);
                            this.createListItem(tempArray);
                        } else {
                            catFilter = '';
                            removeSearchParams([type]);
                            tempArray = filterItems(shoes, brandFilter, catFilter);
                            this.createListItem(tempArray);
                            elementDiv.classList.remove(`${type}_active`);
                            selectCategory = undefined;
                        }
                    } else {
                        catFilter = element;
                        setSearchParams(brandFilter, catFilter);
                        elementDiv.classList.toggle(`${type}_active`);
                        selectCategory = <HTMLDivElement>elementDiv;
                        tempArray = filterItems(shoes, brandFilter, catFilter);
                        this.createListItem(tempArray);
                    }
                }

                viewButtonAddClick();
            });

            filterElement.appendChild(elementDiv);
        });
        return filterElement;
    }

    private handleQueryStorage(params: URLSearchParams) {
        const brand = <string>params.get('brand');
        setSearchParams(brand, '');
        const filteredArray = filterItems(shoes, brand, '');
        this.createListItem(filteredArray);

        setTimeout(() => {
            if (brand) {
                const buttonsList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.brand');
                const buttonsArr: HTMLDivElement[] = Array.from(buttonsList);
                buttonsArr.forEach((button) => {
                    if (brand === button.innerText) {
                        button.classList.add('brand_active');
                    }
                });
            }
        }, 100);
    }

    render() {
        if (window.location.search) {
            const userSearchParams = new URLSearchParams(window.location.search);
            this.handleQueryStorage(userSearchParams);
        } else {
            this.createListItem(shoes);
        }
        const main = <HTMLElement>document.querySelector('main');
        this.createFilters();
        return this.container;
    }
}

export default MainPage;
