import { IPrototypeItem } from './items';
import shoes from '../../db/shoes';

function setSearchParams(brand: string, category: string, searchString: string, price: string, stock: string, sort: string, layout: string) {
    const url = new URL(window.location.href);
    if (brand) {
        url.searchParams.set('brand', brand.split('=')[1]);
    }
    if (category) {
        url.searchParams.set('category', category.split('=')[1]);
    }
    if (searchString) {
        url.searchParams.set('search', searchString.split('=')[1]);
    }
    if (price) {
        url.searchParams.set('price', price.split('=')[1]);
    }
    if (stock) {
        url.searchParams.set('stock', stock.split('=')[1]);
    }
    if (sort) {
        url.searchParams.set('sort', sort.split('=')[1]);
    }
    if (layout) {
        url.searchParams.set('layout', layout.split('=')[1]);
    }
    window.history.replaceState(null, 'null', url);
}

function removeSearchParams(types: string[]) {
    const url = new URL(window.location.href);
    const newUrl = window.location.href.split('?')[0];
    window.history.replaceState(null, 'null', newUrl);
}

function searchItem(item: IPrototypeItem, searchString: string): boolean {
    if (item.brand.toLowerCase().includes(searchString)) return true;
    if (item.name.toLowerCase().includes(searchString)) return true;
    if (item.description.toLowerCase().includes(searchString)) return true;
    if (item.category.toLowerCase().includes(searchString)) return true;
    if (item.price >= parseInt(searchString)) return true;
    if (item.stock >= parseInt(searchString)) return true;
    return false;
}

function searchItems(array: IPrototypeItem[], searchString: string): IPrototypeItem[] {
    return array.filter((el) => searchItem(el, searchString));
}

function sortItems(array: IPrototypeItem[], parameter: string, order: string) {
    if (parameter === 'price') {
        if (order === 'asc') {
            return array.sort((a: IPrototypeItem, b: IPrototypeItem) => a.price - b.price);
        } else {
            return array.sort((a: IPrototypeItem, b: IPrototypeItem) => b.price - a.price);
        }
    } else {
        if (order === 'asc') {
            return array.sort((a: IPrototypeItem, b: IPrototypeItem) => a.stock - b.stock);
        } else {
            return array.sort((a: IPrototypeItem, b: IPrototypeItem) => b.stock - a.stock);
        }
    }
}

function filterItems(array: IPrototypeItem[], parameters: string[]): IPrototypeItem[] {
    let filteredArray: IPrototypeItem[] = array.concat();
    parameters.forEach((param) => {
        if (param) {
            const [key, value] = param.split('=');
            let min: number, max: number;
            let sortParam = '', order = '';
            if (key === 'price' || key === 'stock') {
                [min, max] = value.split('|').map((el) => parseInt(el));
            }
            if (key === 'sort') {
                [sortParam, order] = value.split('-');
            }
            switch (key) {
                case 'brand': filteredArray = filteredArray.filter((element) => element.brand === value); break;
                case 'category': filteredArray = filteredArray.filter((element) => element.category === value); break;
                case 'price': filteredArray = filteredArray.filter((element) => { return element.price >= min && element.price <= max }); break;
                case 'stock': filteredArray = filteredArray.filter((element) => { return element.stock >= min && element.stock <= max }); break;
                case 'search': filteredArray = searchItems(filteredArray, value.toLowerCase()); break;
                case 'sort': filteredArray = sortItems(filteredArray, sortParam, order); break;
            }
        }
    });
    return filteredArray;
}

export { setSearchParams, removeSearchParams, filterItems, sortItems };
