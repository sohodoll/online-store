import Page from '../templates/page';
import { createCartItemFromMain, IPrototypeItem } from '../templates/items';
//import ItemCart from '../components/itemCart/itemCart';
import shoes from '../../db/shoes';
import { setSearchParams, removeSearchParams, filterItems } from '../templates/filters';

//let itemsAddCartButton: NodeList;
//let arrCart: ItemCart[];

import { viewButtonAddClick } from '../../app';

let selectBrand: HTMLDivElement | undefined;
let selectCategory: HTMLDivElement | undefined;

let tempArray: IPrototypeItem[] = shoes;
let previousState: IPrototypeItem[] = [];
let previousType: string = '';

let brandFilter: string | '';
let catFilter: string | '';

class MainPage extends Page {
    /*static TextObject = {
        MainTitle: 'Choose your perfect shoes for 2023!',
    };*/

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
        // this.listen();

        // const adidasFilter = <HTMLDivElement>document.createElement('div');
        // const asicsFilter = <HTMLDivElement>document.createElement('div');
        // const pumaFilter = <HTMLDivElement>document.createElement('div');
        // const hokaFilter = <HTMLDivElement>document.createElement('div');

        // const runningFilter = <HTMLDivElement>document.createElement('div');
        // const trailFilter = <HTMLDivElement>document.createElement('div');
        // const casualFilter = <HTMLDivElement>document.createElement('div');
        // const basketballFilter = <HTMLDivElement>document.createElement('div');
        // const volleyballFilter = <HTMLDivElement>document.createElement('div');

        // filters.push(adidasFilter, asicsFilter, pumaFilter, hokaFilter);
        // catFilters.push(runningFilter, trailFilter, casualFilter, basketballFilter, volleyballFilter);

        // adidasFilter.innerText = 'Adidas';
        // asicsFilter.innerText = 'Asics';
        // pumaFilter.innerText = 'Puma';
        // hokaFilter.innerText = 'Hoka';
        // asicsFilter.id = 'asics-filter';
        // adidasFilter.id = 'adidas-filter';
        // pumaFilter.id = 'puma-filter';
        // hokaFilter.id = 'hoka-filter';

        // runningFilter.innerText = 'Running';
        // trailFilter.innerText = 'Trail';
        // casualFilter.innerText = 'Casual';
        // basketballFilter.innerText = 'Basketball';
        // volleyballFilter.innerText = 'Volleyball';
        // runningFilter.id = 'running-filter';
        // trailFilter.id = 'trail-filter';
        // casualFilter.id = 'casual-filter';
        // basketballFilter.id = 'basketball-filter';
        // volleyballFilter.id = 'volleyball-filter';

        // filterElement.classList.add('main__filters');
        // filterElement.classList.add('wrapper');
        // brandFilter.classList.add('brand__filter');
        // categoryFilter.classList.add('category__filter');
        // brandFilters.forEach((filter) => {
        //     filter.classList.add('brand');
        //     brandFilter.appendChild(filter);
        // });
        // catFilters.forEach((filter) => {
        //     filter.classList.add('category');
        //     categoryFilter.appendChild(filter);
        // });
        // filterElement.append(categoryFilter, brandFilter);
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
                            // if (previousType !== type) {
                            //     previousState = tempArray;
                            //     tempArray = filterItems(tempArray, brandFilter, catFilter);
                            // } else {
                            //     tempArray = filterItems(previousState, brandFilter, catFilter);
                            // }
                            tempArray = filterItems(shoes, brandFilter, catFilter);
                            this.createListItem(tempArray);
                        } else {
                            brandFilter = '';
                            tempArray = filterItems(shoes, brandFilter, catFilter);
                            // if (!selectCategory) {
                            //     tempArray = shoes;
                            // } else {
                            //     tempArray = previousState;
                            // }
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
                        // previousState = tempArray;
                        // previousType = type;
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
                            // if (previousType !== type) {
                            //     previousState = tempArray;
                            //     tempArray = filterItems(tempArray, '', filter);
                            // } else {
                            //     tempArray = filterItems(previousState, '', filter);
                            // }
                            tempArray = filterItems(shoes, brandFilter, catFilter);
                            this.createListItem(tempArray);
                        } else {
                            catFilter = '';
                            // if (!selectBrand) {
                            //     tempArray = shoes;
                            // } else {
                            //     tempArray = previousState;
                            // }
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
                        // setSearchParams('', filter);
                        // previousState = tempArray;
                        // previousType = type;
                        tempArray = filterItems(shoes, brandFilter, catFilter);
                        this.createListItem(tempArray);
                    }
                }

                viewButtonAddClick();
                // if (elementDiv.classList.contains('brand_active')) {
                //     setSearchParams(brand, '');
                //     const filteredArray = filterItems(shoes, brand, '');
                //     this.createListItem(filteredArray);
                // } else {
                // removeSearchParams();
                // this.createListItem(shoes);
                // elementDiv.classList.remove('brand_active');
                // }
            });

            filterElement.appendChild(elementDiv);
        });
        return filterElement;
    }

    private listen() {
        const buttonsList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.brand');
        const buttonsArr: HTMLDivElement[] = Array.from(buttonsList);
        const catButtonsList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.category');
        const catButtonsArr: HTMLDivElement[] = Array.from(catButtonsList);

        // buttonsArr.forEach((button) => {
        //     button.addEventListener('click', (e) => {
        //         const brand = button.innerText;
        //         button.classList.toggle('brand_active');
        //         buttonsArr.forEach((innerButton) => {
        //             if (innerButton.innerText !== button.innerText) {
        //                 innerButton.classList.remove('brand_active');
        //             }
        //         });
        //         if (button.classList.contains('brand_active')) {
        //             setSearchParams(brand, '');
        //             const filteredArray = filterItems(shoes, brand, '');
        //             this.createListItem(filteredArray);
        //         } else {
        //             removeSearchParams();
        //             this.createListItem(shoes);
        //         }
        //         viewButtonAddClick();
        //     });
        // });

        // catButtonsArr.forEach((button) => {
        //     button.addEventListener('click', () => {
        //         const category = button.innerText;
        //         button.classList.toggle('category_active');
        //         catButtonsArr.forEach((innerButton) => {
        //             if (innerButton.innerText !== button.innerText) {
        //                 innerButton.classList.remove('category_active');
        //             }
        //         });
        //         if (button.classList.contains('category_active')) {
        //             setSearchParams('', category);
        //             const filteredArray = filterItems(shoes, '', category);
        //             this.createListItem(filteredArray);
        //         } else {
        //             removeSearchParams();
        //             this.createListItem(shoes);
        //         }
        //         viewButtonAddClick();
        //     });
        // });
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
        /*const title = this.createHTML(MainPage.TextObject.MainTitle);
        this.container.appendChild(title);*/
        //this.createHTML(MainPage.TextObject.MainTitle);
        if (window.location.search) {
            const userSearchParams = new URLSearchParams(window.location.search);
            this.handleQueryStorage(userSearchParams);
        } else {
            this.createListItem(shoes);
        }
        const main = <HTMLElement>document.querySelector('main');
        // main.classList.add('wrapper');
        this.createFilters();
        return this.container;
    }

    // filter(array: IPrototypeItem[]): void {
    //     this.createListItem(array);
    // }
}

export default MainPage;
