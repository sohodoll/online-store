import Page from '../templates/page';
import { createCartItemFromMain, IPrototypeItem, searchItem } from '../templates/items';
//import ItemCart from '../components/itemCart/itemCart';
import shoes from '../../db/shoes';
import { setSearchParams, removeSearchParams, filterItems } from '../templates/filters';
import { getMainLayout, setMainLayout, updateHeader, viewButtonAddClick } from '../../app';
import iconsSVG from '../templates/icons';
import { setCurrPage } from '../cart/cart';

let selectBrand: HTMLDivElement | undefined;
let selectCategory: HTMLDivElement | undefined;

let tempArray: IPrototypeItem[] = shoes;

let brandFilter: string | '';
let catFilter: string | '';
let searchString: string | '';

class MainPage extends Page {
    private layout: string;
    constructor(id: string) {
        super(id);
        this.layout = getMainLayout();
    }

    private updateTotalCount(value: number): void {
        const totalCount: HTMLSpanElement = <HTMLSpanElement>(
            this.container.children[1].childNodes[0].childNodes[1].childNodes[1]
        );
        totalCount.textContent = `${value}`;
    }

    private searchItems(array: IPrototypeItem[]): IPrototypeItem[] {
        return array.filter((el) => searchItem(el, searchString));
    }

    private createSearchPanel(itemCollection: HTMLDivElement): HTMLDivElement {
        const searchPanel: HTMLDivElement = document.createElement('div');

        const paramPanel: HTMLDivElement = document.createElement('div');
        const copyQuery: HTMLDivElement = document.createElement('div');
        const resetFilters: HTMLDivElement = document.createElement('div');

        const foundTitleParam: HTMLSpanElement = document.createElement('span'); //Title for Total
        const foundParam: HTMLSpanElement = document.createElement('span'); //count item in search query
        const searchInputPanel: HTMLDivElement = document.createElement('div');
        const searchInputTitle: HTMLDivElement = document.createElement('div');
        const searchInput: HTMLInputElement = document.createElement('input');
        const searchInputCleaner: HTMLLabelElement = document.createElement('label');

        const layoutPanel: HTMLDivElement = document.createElement('div'); //grid or list
        const gridLayout: HTMLButtonElement = document.createElement('button');
        const listLayout: HTMLButtonElement = document.createElement('button');

        //Parameter Panel

        copyQuery.innerText = 'Copy Link';
        copyQuery.className = 'search__copy-query btn';
        copyQuery.id = 'copy-query';
        resetFilters.innerHTML = 'Reset';
        resetFilters.className = 'search__reset btn';
        resetFilters.id = 'reset';

        copyQuery.addEventListener('click', () => {
            const currentQuery = window.location.href;
            navigator.clipboard.writeText(currentQuery);
            copyQuery.classList.add('copy_active');
            copyQuery.innerText = 'Copied!';
            setTimeout(() => {
                copyQuery.classList.remove('copy_active');
                copyQuery.innerText = 'Copy Link';
            }, 1000);
        });

        resetFilters.addEventListener('click', () => {
            selectBrand?.classList.remove('brand_active');
            selectCategory?.classList.remove('category_active');
            brandFilter = '';
            catFilter = '';
            searchString = '';
            searchInput.value = '';
            selectBrand = undefined;
            selectCategory = undefined;
            const filteredArray = filterItems(shoes, brandFilter, catFilter);
            this.createListItem(filteredArray);
            this.createTitleButtons(filteredArray, [brandFilter, catFilter]);
            removeSearchParams(['brand', 'category', 'search']);
        });

        paramPanel.className = 'search__parameter-panel';
        paramPanel.append(resetFilters, copyQuery);

        //Search Input Panel
        foundTitleParam.className = 'search__found-title';
        foundTitleParam.textContent = 'Found:';

        foundParam.className = 'search__found-count';
        foundParam.textContent = '0';

        searchInputTitle.className = 'search__input-title';
        searchInputTitle.textContent = 'Search:';

        searchInput.className = 'search__input';
        searchInput.id = 'search__input';
        searchInput.type = 'text';
        searchInput.addEventListener('input', () => {
            if (searchInput.value) searchInputCleaner.classList.remove('hidden');
            else searchInputCleaner.classList.add('hidden');
        });
        searchInput.addEventListener('change', () => {
            if (searchInput.value) {
                searchString = String(searchInput.value);
                const filteredArray = filterItems(shoes, brandFilter, catFilter);
                const searchArray: IPrototypeItem[] = this.searchItems(filteredArray);
                setSearchParams(brandFilter, catFilter, searchString);
                this.createListItem(searchArray);
            } else {
                removeSearchParams(['search']);
                const filteredArray = filterItems(shoes, brandFilter, catFilter);
                this.createListItem(filteredArray);
            }
        });

        searchInputCleaner.className = 'search__input-cleaner hidden';
        searchInputCleaner.htmlFor = 'search__input';
        searchInputCleaner.innerHTML = iconsSVG.clean;
        searchInputCleaner.addEventListener('click', () => {
            searchInput.value = '';
            searchInputCleaner.classList.toggle('hidden');
        });

        searchInputPanel.className = 'search__input-panel';
        searchInputPanel.append(foundTitleParam, foundParam, searchInputTitle, searchInput, searchInputCleaner);

        //Layout Panel
        gridLayout.className = 'search__grid-layout btn';
        gridLayout.innerHTML = iconsSVG.grid;
        gridLayout.addEventListener('click', () => {
            gridLayout.classList.add('select');
            listLayout.classList.remove('select');
            itemCollection.classList.remove('list');
            itemCollection.classList.add('grid');
            setMainLayout('grid');
        });

        listLayout.className = 'search__list-layout btn';
        listLayout.innerHTML = iconsSVG.list;
        listLayout.addEventListener('click', () => {
            listLayout.classList.add('select');
            gridLayout.classList.remove('select');
            itemCollection.classList.remove('grid');
            itemCollection.classList.add('list');
            setMainLayout('list');
        });

        if (this.layout === 'grid') gridLayout.classList.add('select');
        else listLayout.classList.add('select');

        layoutPanel.className = 'search__layout-panel';
        layoutPanel.append(gridLayout, listLayout);

        //Search Panel
        searchPanel.className = 'main__search-panel';
        searchPanel.append(paramPanel, searchInputPanel, layoutPanel);
        return searchPanel;
    }

    private createMainItem(): HTMLDivElement {
        const mainItem: HTMLDivElement = document.createElement('div');
        const itemCollection: HTMLDivElement = document.createElement('div');

        itemCollection.className = `main__items-collection ${this.layout}`;
        mainItem.className = 'main__items';
        mainItem.append(this.createSearchPanel(itemCollection), itemCollection);
        return mainItem;
    }

    private createFilters(): HTMLDivElement {
        const brandArray: string[] = [];
        const catArray: string[] = [];

        shoes.forEach((shoe) => {
            if (!brandArray.includes(shoe.brand)) {
                brandArray.push(shoe.brand);
            }
            if (!catArray.includes(shoe.category)) {
                catArray.push(shoe.category);
            }
        });

        const filterElement: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        const brandFilters: HTMLDivElement = this.createFilterElements(brandArray, 'brand');
        const categoryFilters: HTMLDivElement = this.createFilterElements(catArray, 'category');

        brandFilters.classList.add('brand__filter');
        categoryFilters.classList.add('category__filter');
        filterElement.className = 'main__filters';
        filterElement.append(categoryFilters, brandFilters);

        return filterElement;
    }

    private createListItem(array: IPrototypeItem[]): void {
        (this.container.children[1].childNodes[1] as HTMLDivElement).innerHTML = ''; //main-wrapper -> main__items -> main__items-collection
        array.forEach((el) => {
            this.container.children[1].childNodes[1].appendChild(createCartItemFromMain(el));
        });
        this.updateTotalCount(array.length);
    }

    /* updateCount() {
        const brandFiltersList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.brand');
        const brandFilters = Array.from(brandFiltersList);
        const catFiltersList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.category');
        const catFilters = Array.from(catFiltersList);
        if (selectBrand) {
            brandFilters.forEach((brand) => {
                if (selectBrand !== brand) {
                    brand.children[0].textContent = '0/';
                } else {
                    const innerArray = filterItems(
                        shoes,
                        brand.id.substring(0, brand.id.indexOf('-')).charAt(0).toUpperCase() +
                            brand.id.substring(0, brand.id.indexOf('-')).slice(1),
                        catFilter
                    );
                    brand.children[0].textContent = `${innerArray.length}/`;
                }
            });
        } else if (selectCategory) {
            catFilters.forEach((category) => {
                if (selectCategory !== category) {
                    category.children[0].textContent = '0/';
                } else {
                    const innerArray = filterItems(
                        shoes,
                        brandFilter,
                        category.id.substring(0, category.id.indexOf('-')).charAt(0).toUpperCase() +
                            category.id.substring(0, category.id.indexOf('-')).slice(1)
                    );
                    category.children[0].textContent = `${innerArray.length}/`;
                }
            });
        } else {
            brandFilters.forEach((brand) => {
                if (selectBrand !== brand) {
                    const innerArray = filterItems(
                        shoes,
                        brand.id.substring(0, brand.id.indexOf('-')).charAt(0).toUpperCase() +
                            brand.id.substring(0, brand.id.indexOf('-')).slice(1),
                        catFilter
                    );
                    brand.children[0].textContent = `${innerArray.length}/`;
                }
            });
            catFilters.forEach((category) => {
                if (selectCategory !== category) {
                    const innerArray = filterItems(
                        shoes,
                        brandFilter,
                        category.id.substring(0, category.id.indexOf('-')).charAt(0).toUpperCase() +
                            category.id.substring(0, category.id.indexOf('-')).slice(1)
                    );
                    category.children[0].textContent = `${innerArray.length}/`;
                }
            });
        }
    }*/

    /**
     * @param array  - filtredArray after click to the filter button
     * */
    createTitleButtons(array: IPrototypeItem[], searchParam?: string[]): void {
        //const brandButtons: NodeListOf<HTMLDivElement> = document.querySelectorAll('.brand');
        //const categoryButtons: NodeListOf<HTMLDivElement> = document.querySelectorAll('.category');
        const brandButtons: NodeListOf<ChildNode> = this.container.children[0].childNodes[1].childNodes; //main-wrapper -> main__filter -> brand__filter -> items
        const categoryButtons: NodeListOf<ChildNode> = this.container.children[0].childNodes[0].childNodes; //main-wrapper -> main__filter -> category__filter -> items
        //const categoryButtons: NodeListOf<HTMLDivElement> = document.querySelectorAll('.category');
        /*brandButtons.forEach((button) => {
            const brandName = button.childNodes[0].textContent;
            const countItem = array.filter((el) => el.brand === brandName).length;
            button.children[0].textContent = `${countItem}/`;
            if (countItem === 0) {
                button.classList.add('disable');
            } else {
                button.classList.remove('disable');
            }
        });*/

        function addTitleAndCSS(button: ChildNode, countItem: number, type: string): void {
            button.childNodes[1].textContent = `${countItem}/`;
            if (countItem === 0) {
                (button as HTMLDivElement).classList.add('disable');
                (button as HTMLDivElement).classList.remove(`${type}_active`);
            } else {
                (button as HTMLDivElement).classList.remove('disable');
                if (searchParam?.includes(String(button.childNodes[0].textContent))) {
                    (button as HTMLDivElement).classList.add(`${type}_active`);
                    if (type === 'brand') selectBrand = <HTMLDivElement>button;
                    if (type === 'category') selectCategory = <HTMLDivElement>button;
                }
            }
        }

        brandButtons.forEach((button) => {
            const brandName = button.childNodes[0].textContent;
            const countItem = array.filter((el) => el.brand === brandName).length;
            addTitleAndCSS(button, countItem, 'brand');
        });
        categoryButtons.forEach((button) => {
            const categoryName = button.childNodes[0].textContent;
            const countItem = array.filter((el) => el.category === categoryName).length;
            addTitleAndCSS(button, countItem, 'category');
        });
    }

    createFilterElements(array: string[], type: string): HTMLDivElement {
        const filterElement = <HTMLDivElement>document.createElement('div');
        array.forEach((element) => {
            const elementDiv = document.createElement('div');
            const currCount = document.createElement('div');
            const maxCount = document.createElement('div');
            currCount.id = `${element}-count`;
            if (type === 'brand') {
                const filteredArray = filterItems(shoes, element, '');
                currCount.textContent = `${filteredArray.length}/`;
                maxCount.textContent = `${filteredArray.length}`;
            } else if (type === 'category') {
                const filteredArray = filterItems(shoes, '', element);
                currCount.textContent = `${filteredArray.length}/`;
                maxCount.textContent = `${filteredArray.length}`;
            }
            elementDiv.className = type;
            elementDiv.id = `${element.toLowerCase()}-filter`;
            elementDiv.textContent = element;
            elementDiv.append(currCount, maxCount);

            /* Click filter buttons */
            elementDiv.addEventListener('click', () => {
                if (!elementDiv.classList.contains('disable')) {
                    //let filteredArray: IPrototypeItem[] = [];
                    // if (type === 'brand') {
                    //     filteredArray = filterItems(shoes, element, '');
                    //     elementDiv.textContent = `${element}(${filteredArray.length})`;
                    // }
                    // if (type === 'category') {
                    //     const filteredArray = filterItems(shoes, '', element);
                    //     elementDiv.textContent = `${element}(${filteredArray.length})`;
                    // }

                    if (type === 'brand') {
                        if (selectBrand) {
                            if (selectBrand !== elementDiv) {
                                selectBrand.classList.toggle(`${type}_active`);
                                elementDiv.classList.toggle(`${type}_active`);
                                selectBrand = <HTMLDivElement>elementDiv;
                                brandFilter = element;
                                setSearchParams(brandFilter, catFilter, searchString);
                                //tempArray = filterItems(shoes, brandFilter, catFilter);
                                //this.createListItem(tempArray);
                            } else {
                                brandFilter = '';
                                removeSearchParams([type]);
                                elementDiv.classList.remove(`${type}_active`);
                                selectBrand = undefined;
                                if (selectCategory) {
                                    catFilter = String(selectCategory.childNodes[0].textContent);
                                }
                                //tempArray = filterItems(shoes, brandFilter, catFilter);
                                //this.createListItem(tempArray);
                            }
                        } else {
                            brandFilter = element;
                            elementDiv.classList.toggle(`${type}_active`);
                            selectBrand = <HTMLDivElement>elementDiv;
                            if (selectCategory) {
                                brandFilter = element;
                                catFilter = String(selectCategory.childNodes[0].textContent);
                            }
                            setSearchParams(brandFilter, catFilter, searchString);
                            //tempArray = filterItems(shoes, brandFilter, catFilter);
                            //this.createListItem(tempArray);
                        }
                    } else {
                        if (selectCategory) {
                            if (selectCategory !== elementDiv) {
                                selectCategory.classList.toggle(`${type}_active`);
                                elementDiv.classList.toggle(`${type}_active`);
                                selectCategory = <HTMLDivElement>elementDiv;
                                catFilter = element;
                                setSearchParams(brandFilter, catFilter, searchString);
                                //tempArray = filterItems(shoes, brandFilter, catFilter);
                                //this.createListItem(tempArray);
                            } else {
                                catFilter = '';
                                removeSearchParams([type]);
                                elementDiv.classList.remove(`${type}_active`);
                                selectCategory = undefined;
                                if (selectBrand) {
                                    brandFilter = String(selectBrand.childNodes[0].textContent);
                                }
                                //tempArray = filterItems(shoes, brandFilter, catFilter);
                                //this.createListItem(tempArray);
                            }
                        } else {
                            catFilter = element;
                            setSearchParams(brandFilter, catFilter, searchString);
                            elementDiv.classList.toggle(`${type}_active`);
                            if (selectBrand) {
                                catFilter = element;
                                brandFilter = String(selectBrand.childNodes[0].textContent);
                            }
                            selectCategory = <HTMLDivElement>elementDiv;
                            //tempArray = filterItems(shoes, brandFilter, catFilter);
                            //this.createListItem(tempArray);
                        }
                    }
                    tempArray = filterItems(shoes, brandFilter, catFilter);
                    this.createListItem(tempArray);
                    this.createTitleButtons(tempArray);
                    viewButtonAddClick();
                }
            });
            /* End Click filter buttons */

            filterElement.appendChild(elementDiv);
        });
        return filterElement;
    }

    private handleQueryStorage(params: URLSearchParams) {
        const brand: string = <string>params.get('brand');
        const category: string = <string>params.get('category');
        const search: string = <string>params.get('search');
        setSearchParams(brand, category, search);
        brandFilter = brand;
        catFilter = category;
        searchString = search;
        let searchArray: IPrototypeItem[];
        let filteredArray: IPrototypeItem[] = filterItems(shoes, brand, category);
        if (searchString) {
            const searchInput: HTMLInputElement = <HTMLInputElement>(
                this.container.children[1].childNodes[0].childNodes[1].childNodes[3]
            );
            searchInput.value = searchString;
            searchArray = this.searchItems(filteredArray);
            filteredArray = searchArray;
        }
        this.createListItem(filteredArray);
        this.createTitleButtons(filteredArray, [brand, category]);

        /*
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
        }, 100);*/
    }

    render() {
        this.container.append(this.createFilters(), this.createMainItem());
        //if (!window.location.href.includes('#')) {
        if (window.location.search) {
            const userSearchParams = new URLSearchParams(window.location.search);
            this.handleQueryStorage(userSearchParams);
        } else {
            setCurrPage(1);
            this.createListItem(shoes);
        }
        /* } else { //if click logo (Store Online) then del all href - simulate a new page load
            window.history.pushState({}, document.title, "/");
            this.createListItem(shoes);
        }*/
        /*const title = this.createHTML(MainPage.TextObject.MainTitle);
        this.container.appendChild(title);*/
        //this.createHTML(MainPage.TextObject.MainTitle);

        return this.container;
    }
}

export default MainPage;
