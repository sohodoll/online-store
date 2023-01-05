import { IPrototypeItem } from './items';
import shoes from '../../db/shoes';

// interface IsearchParams {
//     brand?: string;
//     lowerPrice?: number;
//     upperPrice?: number;
//     stock?: number;
//     category?: string;
// }

// export { IsearchParams };

function setSearchParams(brand: string, category: string, searchString: string, sort: string) {
    // const brandElem = document.querySelector('.brand');
    // let paramsObject: { [key: string]: string } = {};
    // paramsObject.brand = brand;
    // const userSearchParams = new URLSearchParams(paramsObject);
    const url = new URL(window.location.href);
    if (brand) {
        url.searchParams.set('brand', brand);
    }
    if (category) {
        url.searchParams.set('category', category);
    }
    if (searchString) {
        url.searchParams.set('search', searchString);
    }
    if (sort) {
        url.searchParams.set('sort', sort);
    }
    window.history.replaceState(null, 'null', url);
}

function removeSearchParams(types: string[]) {
    const url = new URL(window.location.href);
    // types.forEach((element) => {
    //     url.searchParams.delete(element);
    // });
    const newUrl = window.location.href.split('?')[0];
    window.history.replaceState(null, 'null', newUrl);
}

function filterItems(array: IPrototypeItem[], parameters: string[][]): IPrototypeItem[] {
    let filteredArray: IPrototypeItem[] = array.concat();
    parameters.forEach((param) => {
        if (param[0] !== undefined) {
            if (param.length === 1) {                
                const key: string = param[0].split('=')[0];
                const value: string = param[0].split('=')[1];
                console.log(key, value);
                switch (key) {
                    case 'brand': filteredArray = filteredArray.filter((element) => element.brand === value); break;
                    case 'category': filteredArray = filteredArray.filter((element) => element.category === value); break;
                }
            } else {
                const key: string = param[0].split('>')[0];
                const min: number = parseInt(param[0].split('>')[1]);
                const max: number = parseInt(param[1].split('<')[1]);
                console.log(key, min, max);
                switch (key) {
                    case 'price': filteredArray = filteredArray.filter((element) => { return element.price >= min && element.price <= max }); break;
                    case 'stock': filteredArray = filteredArray.filter((element) => { return element.stock >= min && element.stock <= max }); break;
                }
            }
        } else {
            console.log(`${param} is undefined`);
        }
    });
    return filteredArray;
}

/*function filterItems(array: IPrototypeItem[], brand: string, category: string): IPrototypeItem[] {
    let filteredArray: IPrototypeItem[] = [];
    if (brand && category) {
        filteredArray = array.filter((element) => {
            return element.brand === brand && element.category === category;
        });
    } else {
        if (!brand && !category) {
            return array;
        }
        if (brand) {
            filteredArray = array.filter((element) => element.brand === brand);
        } else if (category) {
            filteredArray = array.filter((element) => element.category === category);
        }
    }
    return filteredArray;
}*/

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

export { setSearchParams, removeSearchParams, filterItems, sortItems };
