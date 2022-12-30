import Page from '../templates/page';
import { createCartItemFromMain, IPrototypeItem } from '../templates/items';
//import ItemCart from '../components/itemCart/itemCart';
import shoes from '../../db/shoes';
import { setSearchParams, removeSearchParams, filterItems } from '../templates/filters';

//let itemsAddCartButton: NodeList;
//let arrCart: ItemCart[];

import { viewButtonAddClick } from '../../app';

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
        const filterElement = <HTMLDivElement>document.createElement('div');
        const brandFilter = <HTMLDivElement>document.createElement('div');
        const categoryFilter = <HTMLDivElement>document.createElement('div');

        const adidasFilter = <HTMLDivElement>document.createElement('div');
        const asicsFilter = <HTMLDivElement>document.createElement('div');
        const pumaFilter = <HTMLDivElement>document.createElement('div');
        const hokaFilter = <HTMLDivElement>document.createElement('div');

        const runningFilter = <HTMLDivElement>document.createElement('div');
        const trailFilter = <HTMLDivElement>document.createElement('div');
        const casualFilter = <HTMLDivElement>document.createElement('div');
        const basketballFilter = <HTMLDivElement>document.createElement('div');
        const volleyballFilter = <HTMLDivElement>document.createElement('div');

        const filters: HTMLDivElement[] = [];
        const catFilters: HTMLDivElement[] = [];

        filters.push(adidasFilter, asicsFilter, pumaFilter, hokaFilter);
        catFilters.push(runningFilter, trailFilter, casualFilter, basketballFilter, volleyballFilter);

        const main = <HTMLElement>document.querySelector('main');
        adidasFilter.innerText = 'Adidas';
        asicsFilter.innerText = 'Asics';
        pumaFilter.innerText = 'Puma';
        hokaFilter.innerText = 'Hoka';
        asicsFilter.id = 'asics-filter';
        adidasFilter.id = 'adidas-filter';
        pumaFilter.id = 'puma-filter';
        hokaFilter.id = 'hoka-filter';

        runningFilter.innerText = 'Running';
        trailFilter.innerText = 'Trail';
        casualFilter.innerText = 'Casual';
        basketballFilter.innerText = 'Basketball';
        volleyballFilter.innerText = 'Volleyball';
        runningFilter.id = 'running-filter';
        trailFilter.id = 'trail-filter';
        casualFilter.id = 'casual-filter';
        basketballFilter.id = 'basketball-filter';
        volleyballFilter.id = 'volleyball-filter';

        filterElement.classList.add('main__filters');
        brandFilter.classList.add('brand__filter');
        categoryFilter.classList.add('category__filter');
        filters.forEach((filter) => {
            filter.classList.add('brand');
            brandFilter.appendChild(filter);
        });
        catFilters.forEach((filter) => {
            filter.classList.add('category');
            categoryFilter.appendChild(filter);
        });
        filterElement.append(categoryFilter, brandFilter);
        main.prepend(filterElement);
        this.listen();
    }

    private listen() {
        const buttonsList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.brand');
        const buttonsArr: HTMLDivElement[] = Array.from(buttonsList);
        const catButtonsList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.category');
        const catButtonsArr: HTMLDivElement[] = Array.from(catButtonsList);

        buttonsArr.forEach((button) => {
            button.addEventListener('click', (e) => {
                const brand = button.innerText;
                button.classList.toggle('brand_active');
                buttonsArr.forEach((innerButton) => {
                    if (innerButton.innerText !== button.innerText) {
                        innerButton.classList.remove('brand_active');
                    }
                });
                if (button.classList.contains('brand_active')) {
                    setSearchParams(brand, '');
                    const filteredArray = filterItems(shoes, brand, '');
                    this.createListItem(filteredArray);
                } else {
                    removeSearchParams();
                    this.createListItem(shoes);
                }
                viewButtonAddClick();
            });
        });

        catButtonsArr.forEach((button) => {
            button.addEventListener('click', () => {
                const category = button.innerText;
                button.classList.toggle('category_active');
                catButtonsArr.forEach((innerButton) => {
                    if (innerButton.innerText !== button.innerText) {
                        innerButton.classList.remove('category_active');
                    }
                });
                if (button.classList.contains('category_active')) {
                    setSearchParams('', category);
                    const filteredArray = filterItems(shoes, '', category);
                    this.createListItem(filteredArray);
                }
            });
        });
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
        main.classList.add('wrapper');
        this.createFilters();
        return this.container;
    }

    // filter(array: IPrototypeItem[]): void {
    //     this.createListItem(array);
    // }
}

export default MainPage;
