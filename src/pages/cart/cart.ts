import { ItemCart, createReceipt, appendChildElements } from '../components/itemCart/itemCart';
import Page from '../templates/page';
import { getArrCart } from '../../app';

let perPage = 3;
let currPage = 1;
let pageCount: number;

function loadPage(numPage: number, perPage: number): HTMLDivElement {
    const items: HTMLDivElement = document.createElement('div');
    items.className = 'cart__item-collection';
    const n = Math.min(perPage, getArrCart().length - ((currPage - 1) * perPage));
    const tempArray: ItemCart[] = getArrCart();
    for (let i = 0; i < n; i += 1) {
        const index = (numPage - 1) * perPage + i;
        items.appendChild(tempArray[index].createHTMLElement(index));
    }
    return items;
}

function updatePaginParam(): void {
    pageCount = Math.ceil(getArrCart().length / perPage);
    const cartItemCollection = <HTMLDivElement>document.querySelector('.cart__item-collection');
    cartItemCollection.innerHTML = loadPage(currPage, perPage).innerHTML;
}

function createComboBox(): HTMLDivElement {
    const comboBox: HTMLDivElement = document.createElement('div');
    const comboBoxText: HTMLDivElement = document.createElement('div');
    const comboBoxOptions: HTMLDivElement = document.createElement('div');

    comboBox.className = 'pagination__combobox';

    comboBoxText.className = 'pagination__combobox-text';
    comboBoxText.textContent = perPage.toString();
    comboBoxText.addEventListener('click', () => {
        comboBoxOptions.classList.toggle('hidden');
        comboBoxText.classList.toggle('open');
    });

    comboBoxOptions.className = 'pagination__combobox-options hidden';
    for (let i = 0; i < 5; i += 1) {
        const option: HTMLDivElement = document.createElement('div');
        option.className = 'combobox-option';
        option.dataset.items = (i + 1).toString();
        option.textContent = (i + 1).toString();
        option.addEventListener('click', function () {
            comboBoxOptions.classList.toggle('hidden');
            comboBoxText.classList.toggle('open');
            comboBoxText.textContent = this.textContent;
            perPage = parseInt(String(this.textContent));
            //pageCount = Math.ceil(getArrCart().length / perPage);
            updatePaginParam();
            /*
            const cartItemCollection = <HTMLDivElement>document.querySelector('.cart__item-collection');
            cartItemCollection.innerHTML = loadPage(currPage, perPage).innerHTML;*/
        });
        option.addEventListener('mouseenter', function(): void {
            this.classList.add('select');
        });
        option.addEventListener('mouseleave', function (): void {
            this.classList.remove('select');
        });
        comboBoxOptions.appendChild(option);
    }

    appendChildElements(comboBox, [comboBoxText, comboBoxOptions]);
    return comboBox;
}

function createPagesList(): HTMLDivElement {
    const pagesList: HTMLDivElement = document.createElement('div');
    const btnFirstPage: HTMLButtonElement = document.createElement('button');
    const btnPrevPage: HTMLButtonElement = document.createElement('button');
    const btnNextPage: HTMLButtonElement = document.createElement('button');
    const btnLastPage: HTMLButtonElement = document.createElement('button');
    const inputNumCurrentPage: HTMLInputElement = document.createElement('input');

    function clickPaginButton(): void {
        inputNumCurrentPage.value = currPage.toString();
        const cartItemCollection = <HTMLDivElement>document.querySelector('.cart__item-collection');
        cartItemCollection.outerHTML = loadPage(currPage, perPage).outerHTML;
    }

    btnFirstPage.className = 'pagination__first-btn btn';
    btnFirstPage.textContent = '<<';
    btnFirstPage.addEventListener('click', function () {
        currPage = 1;
        clickPaginButton();
    });

    btnPrevPage.className = 'pagination__prev-btn btn';
    btnPrevPage.textContent = '<';
    btnPrevPage.addEventListener('click', function () {
        if (currPage > 1)
            currPage -= 1;
        clickPaginButton();
    });

    btnNextPage.className = 'pagination__next-btn btn';
    btnNextPage.textContent = '>';
    btnNextPage.addEventListener('click', function () {
        if (currPage < pageCount)
            currPage += 1;
        clickPaginButton();
    });

    btnLastPage.className = 'pagination__last-btn btn';
    btnLastPage.textContent = '>>';
    btnLastPage.addEventListener('click', function () {
        currPage = pageCount;
        clickPaginButton();
    });

    inputNumCurrentPage.className = 'pagination__num-current-page';
    inputNumCurrentPage.readOnly = true;
    inputNumCurrentPage.type = 'number';
    inputNumCurrentPage.step = '1';
    inputNumCurrentPage.min = '1';
    inputNumCurrentPage.value = '1';
    inputNumCurrentPage.max = pageCount.toString();

    pagesList.className = 'pagincation__page-list';
    appendChildElements(pagesList, [btnFirstPage, btnPrevPage, inputNumCurrentPage, btnNextPage, btnLastPage]);

    return pagesList;
}

function createPagination(): HTMLDivElement {
    const paginPanel: HTMLDivElement = document.createElement('div');
    const pagesList: HTMLDivElement = createPagesList();
    const comboBox: HTMLDivElement = createComboBox();

    paginPanel.className = 'pagination';
    appendChildElements(paginPanel, [pagesList, comboBox]);
    return paginPanel;
}

class CartPage extends Page {
    public arrCart: ItemCart[];

    constructor(id: string, arrayItemCart: ItemCart[]) {
        super(id);
        this.arrCart = arrayItemCart;
    }

    /*
    removeButton(ID: number): void {
        this.arrCart.splice(ID - 1, 1);
    }*/

    render(): HTMLElement {
        const mainDivCart: HTMLDivElement = document.createElement('div');
        let paginPanel: HTMLDivElement = document.createElement('div');
        let itemCartCollection: HTMLDivElement = document.createElement('div');
        let receipt: HTMLDivElement = document.createElement('div');

        mainDivCart.className = 'cart';
        pageCount = Math.ceil(this.arrCart.length / perPage);

        //Item Collection
        itemCartCollection.className = 'cart__item-collection';
        if (this.arrCart.length === 0) {
            itemCartCollection.innerHTML = '<h1>Cart is empty</h1>';
        } else {
            itemCartCollection = loadPage(currPage, perPage);
            /*
            this.arrCart.forEach((el, index) => {
                itemCartCollection.appendChild(el.createHTMLElement(index));
            });*/
            //Receipt
            receipt = createReceipt(this.arrCart);
            paginPanel = createPagination();
        }

        appendChildElements(mainDivCart, [itemCartCollection, receipt]);
        appendChildElements(this.container, [mainDivCart, paginPanel]);

        /*buttonsItemRemove.forEach((button) => {
            button.addEventListener('click', () => {
                const id: number = parseInt((button as HTMLButtonElement).value);
                console.log(id);
                //this.removeButton(id);
            });
        });*/

        return this.container;
    }
}

export default CartPage;
