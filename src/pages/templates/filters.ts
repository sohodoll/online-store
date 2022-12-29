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

function setSearchParams(brand: string) {
    // const brandElem = document.querySelector('.brand');
    // let paramsObject: { [key: string]: string } = {};
    // paramsObject.brand = brand;
    // const userSearchParams = new URLSearchParams(paramsObject);
    const url = new URL(window.location.href);
    url.searchParams.set('brand', brand);
    window.history.replaceState(null, 'null', url);
    // URL.search = userSearchParams.toString();
}

function removeSearchParams() {
    const url = new URL(window.location.href);
    url.searchParams.delete('brand');
    window.history.replaceState(null, 'null', url);
}

function filterItems(array: IPrototypeItem[], brand: string): IPrototypeItem[] {
    const filteredArray = array.filter((element) => element.brand === brand);
    return filteredArray;
}

export { setSearchParams, removeSearchParams, filterItems };
