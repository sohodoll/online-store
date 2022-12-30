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

function setSearchParams(brand: string, category: string) {
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
    window.history.replaceState(null, 'null', url);
    // URL.search = userSearchParams.toString();
}

function removeSearchParams() {
    const url = new URL(window.location.href);
    url.searchParams.delete('brand');
    window.history.replaceState(null, 'null', url);
}

function filterItems(array: IPrototypeItem[], brand: string, category: string): IPrototypeItem[] {
    let filteredArray: IPrototypeItem[] = [];
    if (brand) {
        filteredArray = array.filter((element) => element.brand === brand);
    } else if (category) {
        filteredArray = array.filter((element) => element.category === category);
    }
    return filteredArray;
}

export { setSearchParams, removeSearchParams, filterItems };
