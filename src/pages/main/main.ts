import Page from '../templates/page';
import { createCartItemFromMain, IPrototypeItem } from '../templates/items';
//import ItemCart from '../components/itemCart/itemCart';
import shoes from '../../db/shoes';
import { setSearchParams, removeSearchParams, filterItems, sortItems } from '../templates/filters';
import { arrCart, getMainLayout, saveLocalStorage, setMainLayout, updateHeader, viewButtonAddClick } from '../../app';
import iconsSVG from '../templates/icons';
import { setCurrPage } from '../cart/cart';

let selectBrand: HTMLDivElement | undefined;
let selectCategory: HTMLDivElement | undefined;

let tempArray: IPrototypeItem[] = shoes;

let brandFilter: string | '';
let catFilter: string | '';
let searchString: string | '';
let priceFilter: string | '';
let stockFilter: string | '';
let searchFilter: string | '';
let sortFilter: string | '';
let layoutFilter: string | '';

//let sortOption: string | '' = '';
let sortType: string | '' = '';

class MainPage extends Page {
    private layout: string;
    constructor(id: string) {
        super(id);
        this.layout = getMainLayout();
        layoutFilter = `layout=${this.layout}`;
    }

    private updateTotalCount(value: number): void {
        const totalCount: HTMLSpanElement = <HTMLSpanElement>this.container.children[0].childNodes[1].childNodes[1];
        totalCount.textContent = `${value}`;
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

        const sortBox: HTMLDivElement = document.createElement('div');
        const sortBoxText: HTMLDivElement = document.createElement('div');
        const sortBoxOptions: HTMLDivElement = document.createElement('div');

        sortBox.className = 'sort__combobox';

        sortBoxText.className = 'sort__combobox-text';
        sortBoxText.textContent = 'Sort';
        sortBoxText.addEventListener('click', () => {
            sortBoxOptions.classList.toggle('hidden');
            sortBoxText.classList.toggle('open');
        });

        sortBoxOptions.className = 'sort__combobox-options hidden';
        for (let i = 0; i < 4; i += 1) {
            const option: HTMLDivElement = document.createElement('div');
            option.className = 'sort__combobox-option';
            // option.dataset.items = (i + 1).toString();

            switch (i) {
                case 0:
                    option.textContent = 'Price Desc';
                    break;
                case 1:
                    option.textContent = 'Price Asc';
                    break;
                case 2:
                    option.textContent = 'Stock Desc';
                    break;
                case 3:
                    option.textContent = 'Stock Asc';
                    break;
            }

            option.addEventListener('click', () => {
                sortBoxOptions.classList.toggle('hidden');
                sortBoxText.classList.toggle('open');
                sortBoxText.textContent = option.textContent;
                //sortOption = String(option.textContent);
                
                const parameter = String(option.textContent).split(' ')[0].toLowerCase();
                const order = String(option.textContent).split(' ')[1].toLowerCase();
                sortType = `${parameter}-${order}`;
                sortFilter = `sort=${sortType}`;
                setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
                tempArray = sortItems(tempArray, parameter, order);
                this.createListItem(tempArray);
            });
            option.addEventListener('mouseenter', function (): void {
                this.classList.add('select');
            });
            option.addEventListener('mouseleave', function (): void {
                this.classList.remove('select');
            });
            sortBoxOptions.appendChild(option);
        }

        window.addEventListener('load', () => {
            const url = new URL(window.location.href);
            const sortType: string = <string>url.searchParams.get('sort');
            const options: NodeList = document.querySelectorAll('.sort__combobox-option');
            if (sortType) {
                Array.from(options).forEach((option) => {
                    if (sortType === option.textContent?.toLowerCase().split(' ').join('-')) {
                        sortBoxText.textContent = option.textContent;
                    }
                });
            }
        });

        sortBox.append(sortBoxText, sortBoxOptions);

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
            searchFilter = '';
            priceFilter = '';
            stockFilter = '';
            sortFilter = '';
            this.layout = 'grid';
            layoutFilter = 'layout=grid';
            sortBoxText.textContent = 'Sort';
            searchString = '';
            searchInput.value = '';
            selectBrand = undefined;
            selectCategory = undefined;
            /*const filteredArray = filterItems(shoes, [[brandFilter], [catFilter], [], []]);
            this.createListItem(filteredArray);
            this.createTitleButtons(filteredArray, [brandFilter, catFilter]);*/
            this.createListItem(shoes);
            this.createTitleButtons(shoes, [brandFilter, catFilter]);
            const priceSlider: HTMLDivElement = <HTMLDivElement>this.container.children[1].childNodes[0].childNodes[2];
            const stockSlider: HTMLDivElement = <HTMLDivElement>this.container.children[1].childNodes[0].childNodes[3];
            const maxPrice: number = Math.max(...shoes.map((shoe) => shoe.price));
            const maxStock: number = Math.max(...shoes.map((shoe) => shoe.stock));
            this.setValueSlider(priceSlider, '0', maxPrice.toString());
            this.setValueSlider(stockSlider, '0', maxStock.toString());
            removeSearchParams(['brand', 'category', 'search', 'price', 'stock', 'sort']);
        });

        paramPanel.className = 'search__parameter-panel';
        paramPanel.append(resetFilters, copyQuery);

        //Search Input Panel
        foundTitleParam.className = 'search__found-title';
        foundTitleParam.textContent = 'Found:';

        foundParam.className = 'search__found-count';
        foundParam.textContent = `${shoes.length}`;

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
                searchFilter = `search=${searchString}`;
                //tempArray = filterItems(shoes, [brandFilter, catFilter, priceFilter, stockFilter, searchFilter, sortFilter]);
                //const searchArray: IPrototypeItem[] = this.searchItems(filteredArray);
                setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
                //this.createListItem(searchArray);
                //this.createListItem(tempArray);
            } else {
                searchInput.value = '';
                searchInputCleaner.classList.toggle('hidden');
                removeSearchParams(['search']);                  
            }
            tempArray = filterItems(shoes, [brandFilter, catFilter, priceFilter, stockFilter, searchFilter, sortFilter]);
            this.createListItem(tempArray);
            this.createTitleButtons(tempArray);
            this.updateValueDualSliders(tempArray);
        });

        searchInputCleaner.className = 'search__input-cleaner hidden';
        searchInputCleaner.htmlFor = 'search__input';
        searchInputCleaner.innerHTML = iconsSVG.clean;
        searchInputCleaner.addEventListener('click', () => {
            searchFilter = '';
            searchString = '';
            searchInput.value = '';
            searchInputCleaner.classList.toggle('hidden');
            removeSearchParams(['search']);
            tempArray = filterItems(shoes, [brandFilter, catFilter, priceFilter, stockFilter, searchFilter, sortFilter]);
            this.createListItem(tempArray);
            this.createTitleButtons(tempArray);
            this.updateValueDualSliders(tempArray);
        });

        searchInputPanel.className = 'search__input-panel';
        searchInputPanel.append(foundTitleParam, foundParam, searchInputTitle, searchInput, searchInputCleaner);

        //Layout Panel
        gridLayout.className = 'search__grid-layout btn';
        gridLayout.innerHTML = iconsSVG.grid;
        gridLayout.addEventListener('click', () => {
            layoutFilter = `layout=grid`;
            gridLayout.classList.add('select');
            listLayout.classList.remove('select');
            itemCollection.classList.remove('list');
            itemCollection.classList.add('grid');
            setMainLayout('grid');
            setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
            saveLocalStorage();
        });

        listLayout.className = 'search__list-layout btn';
        listLayout.innerHTML = iconsSVG.list;
        listLayout.addEventListener('click', () => {
            layoutFilter = `layout=list`;
            listLayout.classList.add('select');
            gridLayout.classList.remove('select');
            itemCollection.classList.remove('grid');
            itemCollection.classList.add('list');
            setMainLayout('list');
            setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
            saveLocalStorage();
        });

        if (this.layout === 'grid') gridLayout.classList.add('select');
        else listLayout.classList.add('select');

        layoutPanel.className = 'search__layout-panel';
        layoutPanel.append(gridLayout, listLayout);

        //Search Panel
        searchPanel.className = 'main__search-panel';
        searchPanel.append(paramPanel, searchInputPanel, sortBox, layoutPanel);
        return searchPanel;
    }

    private createMainItem(itemCollection: HTMLDivElement): HTMLDivElement {
        const mainItem: HTMLDivElement = document.createElement('div');
        mainItem.className = 'main__items';
        mainItem.append(this.createFilters(), itemCollection);
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
        this.createDualSliders(filterElement);
        return filterElement;
    }

    //DUAL SLIDERS

    private getSlidersValues(): string[] {
        const priceFromSlider: HTMLInputElement = <HTMLInputElement>document.querySelector('#priceFromSlider');
        const priceToSlider: HTMLInputElement = <HTMLInputElement>document.querySelector('#priceToSlider');
        const stockFromSlider: HTMLInputElement = <HTMLInputElement>document.querySelector('#stockFromSlider');
        const stockToSlider: HTMLInputElement = <HTMLInputElement>document.querySelector('#stockToSlider');
        return [priceFromSlider.value, priceToSlider.value, stockFromSlider.value, stockToSlider.value];
    }

    private updateValueDualSliders(array: IPrototypeItem[]): void {
        const priceConteiner: HTMLDivElement = <HTMLDivElement>this.container.children[1].childNodes[0].childNodes[2];
        const stockConteiner: HTMLDivElement = <HTMLDivElement>this.container.children[1].childNodes[0].childNodes[3];

        const minPrice: number = Math.min(...array.map((shoe) => shoe.price));
        const maxPrice: number = Math.max(...array.map((shoe) => shoe.price));
        const minStock: number = Math.min(...array.map((shoe) => shoe.stock));
        const maxStock: number = Math.max(...array.map((shoe) => shoe.stock));

        this.setValueSlider(priceConteiner, minPrice.toString(), maxPrice.toString());
        this.setValueSlider(stockConteiner, minStock.toString(), maxStock.toString());
    }

    private setValueSlider(slider: HTMLDivElement, min: string, max: string): void {
        const minValueSlider: HTMLInputElement = <HTMLInputElement>slider.children[0].children[0];
        const maxValueSlider: HTMLInputElement = <HTMLInputElement>slider.children[0].children[1];
        const minValueInput: HTMLInputElement = <HTMLInputElement>slider.children[1].children[0].children[1];
        const maxValueInput: HTMLInputElement = <HTMLInputElement>slider.children[1].children[1].children[1];

        minValueSlider.value = min;
        maxValueSlider.value = max;
        minValueInput.value = min;
        maxValueInput.value = max;
    }

    private sliderEndChange(slider: string, maxValue: string): void {
        const [priceMin, priceMax, stockMin, stockMax] = this.getSlidersValues();
        if (slider === 'price') {
            if (priceMin === '0' && priceMax === maxValue) {
                removeSearchParams(['price']);
                priceFilter = '';
            }
            else
                priceFilter = `price=${priceMin}|${priceMax}`;
        }
        if (slider === 'stock') {
            if (stockMin === '0' && stockMax === maxValue) {
                removeSearchParams(['stock']);
                stockFilter = '';
            }
            else
                stockFilter = `stock=${stockMin}|${stockMax}`;
        }
        setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
        tempArray = filterItems(shoes, [brandFilter, catFilter, priceFilter, stockFilter, searchFilter, sortFilter]);
        this.createListItem(tempArray);
        this.createTitleButtons(tempArray);
    }

    private createSlider(maxValue: number, nameFilter: string): HTMLDivElement {
        const sliderContainer: HTMLDivElement = <HTMLDivElement>document.createElement('div');        
        const slidersControl: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        const fromSlider: HTMLInputElement = <HTMLInputElement>document.createElement('input');
        const toSlider: HTMLInputElement = <HTMLInputElement>document.createElement('input');
        /*
        function sliderFilter(type: string, minValue: number, maxValue: number): IPrototypeItem[] {
            let filteredArray: IPrototypeItem[];
            if (type === 'price') {
                filteredArray = tempArray.filter((el) => {
                    return el.price >= minValue && el.price <= maxValue;
                });
            } else {
                filteredArray = tempArray.filter((el) => {
                    return el.stock >= minValue && el.stock <= maxValue;
                });
            }
            return filteredArray;
        }*/

        fromSlider.id = `${nameFilter}FromSlider`;
        fromSlider.type = 'range';
        fromSlider.min = '0';
        fromSlider.max = `${maxValue}`;
        fromSlider.value = '0';
        fromSlider.addEventListener('mouseup', () => {
            this.sliderEndChange(nameFilter, `${maxValue}`);
        });

        toSlider.id = `${nameFilter}ToSlider`;
        toSlider.type = 'range';
        toSlider.min = '0';
        toSlider.max = `${maxValue}`;
        toSlider.value = `${maxValue}`;
        toSlider.addEventListener('mouseup', () => {
            this.sliderEndChange(nameFilter, `${maxValue}`);
        });

        slidersControl.className = `${nameFilter}-sliders`;
        slidersControl.append(fromSlider, toSlider);

        const sliderValues: HTMLDivElement = <HTMLDivElement>document.createElement('div');        
        const sliderValuesMin: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        const controlMin: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        const controlMinInput: HTMLInputElement = <HTMLInputElement>document.createElement('input');
            
        controlMin.className = 'slider-values-min-title';
        controlMin.innerText = 'Min';
        
        controlMinInput.className = 'slider-values-min-input';
        controlMinInput.id = `${nameFilter}FromInput`;
        controlMinInput.type = 'number';
        controlMinInput.value = '0';
        controlMinInput.min = '0';
        controlMinInput.max = `${maxValue}`;

        sliderValuesMin.className = 'slider-values-min';
        sliderValuesMin.append(controlMin, controlMinInput);

        const sliderValuesMax: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        const controlMax: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        const controlMaxInput: HTMLInputElement = <HTMLInputElement>document.createElement('input');

        controlMax.className = 'slider-values-max-title';
        controlMax.innerText = 'Max';
        
        controlMaxInput.className = 'slider-values-max-input';
        controlMaxInput.id = `${nameFilter}ToInput`;
        controlMaxInput.type = 'number';
        controlMaxInput.value = `${maxValue}`;
        controlMaxInput.min = '0';
        controlMaxInput.max = `${maxValue}`;

        sliderValuesMax.className = 'slider-values-max';
        sliderValuesMax.append(controlMax, controlMaxInput);

        sliderValues.className = `slider-values`;
        sliderValues.append(sliderValuesMin, sliderValuesMax);

        sliderContainer.className = `${nameFilter}__filter`;
        sliderContainer.append(slidersControl, sliderValues);

        this.manageSlider(fromSlider, toSlider, controlMinInput, controlMaxInput);
        return sliderContainer;
    }

    private createDualSliders(parent: HTMLDivElement): void {
        const maxPrice: number = Math.max(...shoes.map((shoe) => shoe.price));
        const maxStock: number = Math.max(...shoes.map((shoe) => shoe.stock));

        const priceContainer: HTMLDivElement = this.createSlider(maxPrice, 'price');
        const stockContainer: HTMLDivElement = this.createSlider(maxStock, 'stock');

        parent.append(priceContainer, stockContainer);
    }

    private manageSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput: HTMLInputElement): void {
        function controlFromInput(
            fromSlider: HTMLInputElement,
            fromInput: HTMLInputElement,
            toInput: HTMLInputElement,
            controlSlider: HTMLInputElement
        ) {
            const [from, to] = getParsed(fromInput, toInput);
            fillSlider(fromInput, toInput, '#C6C6C6', '#655588', controlSlider);
            if (from > to) {
                fromSlider.value = String(to);
                fromInput.value = String(to);
            } else {
                fromSlider.value = String(from);
            }
        }

        function controlToInput(
            toSlider: HTMLInputElement,
            fromInput: HTMLInputElement,
            toInput: HTMLInputElement,
            controlSlider: HTMLInputElement
        ) {
            const [from, to] = getParsed(fromInput, toInput);
            fillSlider(fromInput, toInput, '#C6C6C6', '#655588', controlSlider);
            setToggleAccessible(toInput);
            if (from <= to) {
                toSlider.value = String(to);
                toInput.value = String(to);
            } else {
                toInput.value = String(from);
            }
        }

        function controlFromSlider(
            fromSlider: HTMLInputElement,
            toSlider: HTMLInputElement,
            fromInput: HTMLInputElement
        ) {
            const [from, to] = getParsed(fromSlider, toSlider);
            fillSlider(fromSlider, toSlider, '#C6C6C6', '#655588', toSlider);
            if (from > to) {
                fromSlider.value = String(to);
                fromInput.value = String(to);
            } else {
                fromInput.value = String(from);
            }
        }

        function controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLInputElement) {
            const [from, to] = getParsed(fromSlider, toSlider);
            fillSlider(fromSlider, toSlider, '#C6C6C6', '#655588', toSlider);
            setToggleAccessible(toSlider);
            if (from <= to) {
                toSlider.value = String(to);
                toInput.value = String(to);
            } else {
                toInput.value = String(from);
                toSlider.value = String(from);
            }
        }

        function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
            const from = parseInt(currentFrom.value, 10);
            const to = parseInt(currentTo.value, 10);
            return [from, to];
        }

        function fillSlider(
            from: HTMLInputElement,
            to: HTMLInputElement,
            sliderColor: string,
            rangeColor: string,
            controlSlider: HTMLInputElement
        ) {
            const rangeDistance = Number(to.max) - Number(to.min);
            const fromPosition = Number(from.value) - Number(to.min);
            const toPosition = Number(to.value) - Number(to.min);
            controlSlider.style.background = `linear-gradient(
              to right,
              ${sliderColor} 0%,
              ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
              ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
              ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
              ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
              ${sliderColor} 100%)`;
        }

        function setToggleAccessible(currentTarget: HTMLInputElement) {
            //const toSlider = <HTMLInputElement>document.querySelector('#stockToSlider');
            if (Number(currentTarget.value) <= 0) {
                toSlider.style.zIndex = String(2);
            } else {
                toSlider.style.zIndex = String(0);
            }
        }
        /*
        const fromSlider = <HTMLInputElement>document.querySelector('#stockFromSlider');
        const toSlider = <HTMLInputElement>document.querySelector('#stockToSlider');
        const fromInput = <HTMLInputElement>document.querySelector('#stockFromInput');
        const toInput = <HTMLInputElement>document.querySelector('#stockToInput');*/
        // const controlSlider = document.querySelector('sliders_control');
        fillSlider(fromSlider, toSlider, '#C6C6C6', '#655588', toSlider);
        setToggleAccessible(toSlider);

        fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
        toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
        fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
        toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
    }

    private createListItem(array: IPrototypeItem[]): void {
        const itemsCollection: HTMLDivElement = <HTMLDivElement>this.container.children[1].childNodes[1];
        itemsCollection.innerHTML = ''; //main-wrapper -> main__items -> main__items-collection
        if (array.length > 0)
            array.forEach((el) => {
                itemsCollection.appendChild(createCartItemFromMain(el));
            });
        else itemsCollection.textContent = 'Nothing found.';
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
        const brandButtons: NodeListOf<ChildNode> = this.container.children[1].childNodes[0].childNodes[1].childNodes; //main-wrapper -> main__filter -> brand__filter -> items
        const categoryButtons: NodeListOf<ChildNode> =
            this.container.children[1].childNodes[0].childNodes[0].childNodes; //main-wrapper -> main__filter -> category__filter -> items
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
                //const filteredArray = filterItems(shoes, element, '');
                const filteredArray = shoes.filter((el) => el.brand === element);
                currCount.textContent = `${filteredArray.length}/`;
                maxCount.textContent = `${filteredArray.length}`;
            } else if (type === 'category') {
                //const filteredArray = filterItems(shoes, '', element);
                const filteredArray = shoes.filter((el) => el.category === element);
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
                                brandFilter = `brand=${element}`;
                                setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
                                //tempArray = filterItems(shoes, brandFilter, catFilter);
                                //this.createListItem(tempArray);
                            } else {
                                brandFilter = '';
                                removeSearchParams([type]);
                                elementDiv.classList.remove(`${type}_active`);
                                selectBrand = undefined;
                                if (selectCategory) {
                                    catFilter = `category=${String(selectCategory.childNodes[0].textContent)}`;
                                }
                                //tempArray = filterItems(shoes, brandFilter, catFilter);
                                //this.createListItem(tempArray);
                            }
                        } else {
                            brandFilter = `brand=${element}`;
                            elementDiv.classList.toggle(`${type}_active`);
                            selectBrand = <HTMLDivElement>elementDiv;
                            if (selectCategory) {
                                brandFilter = `brand=${element}`;
                                catFilter = `category=${String(selectCategory.childNodes[0].textContent)}`;
                            }
                            setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
                            //tempArray = filterItems(shoes, brandFilter, catFilter);
                            //this.createListItem(tempArray);
                        }
                    } else {
                        if (selectCategory) {
                            if (selectCategory !== elementDiv) {
                                selectCategory.classList.toggle(`${type}_active`);
                                elementDiv.classList.toggle(`${type}_active`);
                                selectCategory = <HTMLDivElement>elementDiv;
                                catFilter = `category=${element}`;
                                setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
                                //tempArray = filterItems(shoes, brandFilter, catFilter);
                                //this.createListItem(tempArray);
                            } else {
                                catFilter = '';
                                removeSearchParams([type]);
                                elementDiv.classList.remove(`${type}_active`);
                                selectCategory = undefined;
                                if (selectBrand) {
                                    brandFilter = `brand=${String(selectBrand.childNodes[0].textContent)}`;
                                }
                                //tempArray = filterItems(shoes, brandFilter, catFilter);
                                //this.createListItem(tempArray);
                            }
                        } else {
                            catFilter = `category=${element}`;
                            setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
                            elementDiv.classList.toggle(`${type}_active`);
                            if (selectBrand) {
                                catFilter = `category=${element}`;
                                brandFilter = `brand=${String(selectBrand.childNodes[0].textContent)}`;
                            }
                            selectCategory = <HTMLDivElement>elementDiv;
                            //tempArray = filterItems(shoes, brandFilter, catFilter);
                            //this.createListItem(tempArray);
                        }
                    }
                    tempArray = filterItems(shoes, [brandFilter, catFilter, priceFilter, stockFilter, searchFilter, sortFilter]);
                    this.createListItem(tempArray);
                    this.createTitleButtons(tempArray);
                    this.updateValueDualSliders(tempArray);
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
        const price: string = <string>params.get('price');
        const stock: string = <string>params.get('stock');
        const search: string = <string>params.get('search');
        const sortType: string = <string>params.get('sort');
        if (brand)
            brandFilter = `brand=${brand}`;
        if (category)
            catFilter = `category=${category}`;
        if (price) {
            priceFilter = `price=${price}`;
            const priceSlider: HTMLDivElement = <HTMLDivElement>this.container.children[1].childNodes[0].childNodes[2];
            this.setValueSlider(priceSlider, price.split('|')[0], price.split('|')[1]);
        }
        if (stock) {
            stockFilter = `stock=${stock}`;
            const stockSlider: HTMLDivElement = <HTMLDivElement>this.container.children[1].childNodes[0].childNodes[3];
            this.setValueSlider(stockSlider, stock.split('|')[0], stock.split('|')[1]);
        }
        if (search) {
            searchFilter = `search=${search}`;
            searchString = search;
            const searchInput: HTMLInputElement = <HTMLInputElement>(this.container.children[0].childNodes[1].childNodes[3]);
            const searchInputCleaner: HTMLLabelElement = <HTMLLabelElement>(this.container.children[0].childNodes[1].childNodes[4]);
            searchInput.value = searchString;
            searchInputCleaner.classList.toggle('hidden');
        }
        if (sortType) {
            sortFilter = `sort=${sortType}`;
            //filteredArray = sortItems(filteredArray, sortType.split('-')[0], sortType.split('-')[1]);
        }
        setSearchParams(brandFilter, catFilter, searchFilter, priceFilter, stockFilter, sortFilter, layoutFilter);
        
        //let searchArray: IPrototypeItem[];
        //const filteredArray: IPrototypeItem[] = filterItems(shoes, [brandFilter, catFilter, priceFilter, stockFilter, searchFilter, sortFilter]);
        tempArray = filterItems(shoes, [brandFilter, catFilter, priceFilter, stockFilter, searchFilter, sortFilter]);
        /*if (searchString) {
            const searchInput: HTMLInputElement = <HTMLInputElement>(
                this.container.children[0].childNodes[1].childNodes[3] //.childNodes[3]
            );
            searchInput.value = searchString;
            searchArray = this.searchItems(filteredArray);
            filteredArray = searchArray;
        }*/
        
        this.createListItem(tempArray);
        this.createTitleButtons(tempArray, [brand, category]);
        
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
        const itemCollection: HTMLDivElement = document.createElement('div');
        itemCollection.className = `main__items-collection ${this.layout}`;
        this.container.append(this.createSearchPanel(itemCollection), this.createMainItem(itemCollection));
        /*setTimeout(() => {
            this.createDualSliders();
        }, 300);*/
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
