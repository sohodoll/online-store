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
        const brandFilter = <HTMLDivElement>document.createElement('div');
        const adidasFilter = <HTMLDivElement>document.createElement('div');
        const asicsFilter = <HTMLDivElement>document.createElement('div');
        const main = <HTMLElement>document.querySelector('main');
        adidasFilter.innerText = 'Adidas';
        asicsFilter.innerText = 'Asics';
        adidasFilter.classList.add('brand');
        asicsFilter.classList.add('brand');
        asicsFilter.id = 'asics-filter';
        adidasFilter.id = 'adidas-filter';
        brandFilter.classList.add('brand__filter');
        brandFilter.appendChild(adidasFilter);
        brandFilter.appendChild(asicsFilter);
        main.prepend(brandFilter);
        this.listen();
    }

    private listen() {
        const adidasButton = <HTMLDivElement>document.querySelector('#adidas-filter');
        const asicsButton = <HTMLDivElement>document.querySelector('#asics-filter');
        const buttons: HTMLDivElement[] = [];
        buttons.push(adidasButton, asicsButton);

        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const brand = button.innerText;
                button.classList.toggle('brand_active');
                if (button.classList.contains('brand_active')) {
                    setSearchParams(brand);
                    const filteredArray = filterItems(shoes, brand);
                    this.createListItem(filteredArray);
                } else {
                    removeSearchParams();
                    this.createListItem(shoes);
                }
                viewButtonAddClick();
            });
        });
        // const brand = adidasButton.innerText;
        // adidasButton.addEventListener('click', (e) => {
        //     adidasButton.classList.toggle('brand_active');
        //     if (adidasButton.classList.contains('brand_active')) {
        //         setSearchParams(brand);
        //         const filteredArray = filterItems(shoes, brand);
        //         this.createListItem(filteredArray);
        //     } else {
        //         removeSearchParams();
        //         this.createListItem(shoes);
        //     }
        //     viewButtonAddClick();
        // });
    }

    private handleQueryStorage(params: URLSearchParams) {
        const brand = <string>params.get('brand');
        setSearchParams(brand);
        const filteredArray = filterItems(shoes, brand);
        this.createListItem(filteredArray);

        setTimeout(() => {
            if (brand) {
                const adidasButton = <HTMLDivElement>document.querySelector('#adidas-filter');
                const asicsButton = <HTMLDivElement>document.querySelector('#asics-filter');
                const buttons: HTMLDivElement[] = [];
                buttons.push(adidasButton, asicsButton);
                buttons.forEach((button) => {
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
