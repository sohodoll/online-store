import { ItemCart, createReceipt, appendChildElements } from '../components/itemCart/itemCart';
import Page from '../templates/page';
import { getArrCart, saveLocalStorage } from '../../app';
import { Form } from '../components/form/form';
import iconsSVG from '../templates/icons';

export let perPage: number;
export let currPage: number;
export let pageCount: number;

//Modal Window
let modalWindow: HTMLDivElement;

function createModalWindow(show: boolean): HTMLDivElement {
    const closeModal: HTMLDivElement = document.createElement('div');
    const modalForm: HTMLFormElement = new Form().render();

    modalWindow = document.createElement('div');
    modalWindow.className = 'receipt__modal-window';
    if (!show) modalWindow.classList.add('hide');

    closeModal.className = 'modal-close';
    closeModal.innerHTML = iconsSVG.close;
    closeModal.addEventListener('click', () => {
        modalWindow.classList.toggle('hide');
    });

    modalForm.prepend(closeModal);

    modalWindow.append(modalForm);
    return modalWindow;
}

function setPerPage(value: number): void {
    perPage = value;
}

function setCurrPage(value: number): void {
    currPage = value;
}

function getPerPage(): number {
    return perPage;
}

function getCurrPage(): number {
    return currPage;
}

function loadPage(parentElem: Element, numPage: number, perPage: number): void {
    //HTMLDivElement {
    //const items: HTMLDivElement = document.createElement('div');
    //items.className = 'cart__item-collection';
    const tempArray: ItemCart[] = getArrCart();
    if (tempArray.length > 0) {
        parentElem.innerHTML = '';
        const n = Math.min(perPage, tempArray.length - (currPage - 1) * perPage);
        for (let i = 0; i < n; i += 1) {
            const index = (numPage - 1) * perPage + i;
            parentElem.appendChild(tempArray[index].createHTMLElement(index));
        }
    }
    //return items;
}

function buttonPaginStyle(): void {
    const firstPage: HTMLButtonElement = <HTMLButtonElement>document.querySelector('.pagination__first-btn');
    const prevPage: HTMLButtonElement = <HTMLButtonElement>document.querySelector('.pagination__prev-btn');
    const nextPage: HTMLButtonElement = <HTMLButtonElement>document.querySelector('.pagination__next-btn');
    const lastPage: HTMLButtonElement = <HTMLButtonElement>document.querySelector('.pagination__last-btn');
    
    if (currPage === 1) {
        firstPage.classList.add('disable');
        prevPage.classList.add('disable');
        nextPage.classList.add('disable');
        lastPage.classList.add('disable');
        if (currPage !== pageCount) {
            nextPage.classList.remove('disable');
            lastPage.classList.remove('disable');
        }
    } else {
        if (currPage === pageCount) {
            nextPage.classList.add('disable');
            lastPage.classList.add('disable');
            if (currPage !== 1) {
                firstPage.classList.remove('disable');
                prevPage.classList.remove('disable');
            }
        } else {
            firstPage.classList.remove('disable');
            prevPage.classList.remove('disable');
            nextPage.classList.remove('disable');
            lastPage.classList.remove('disable');
        }
    }
}

function updatePaginParam(): void {
    pageCount = Math.ceil(getArrCart().length / perPage);
    const cartItemCollection = <HTMLDivElement>document.querySelector('.cart__item-collection');
    //cartItemCollection.innerHTML = loadPage(currPage, perPage).innerHTML;
    if (currPage > pageCount) currPage = pageCount;
    const currPageInput: HTMLInputElement = <HTMLInputElement>document.querySelector('.pagination__num-current-page');
    currPageInput.value = `${currPage}`;
    loadPage(cartItemCollection, currPage, perPage);
    buttonPaginStyle();
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
            saveLocalStorage();
            /*
            const cartItemCollection = <HTMLDivElement>document.querySelector('.cart__item-collection');
            cartItemCollection.innerHTML = loadPage(currPage, perPage).innerHTML;*/
        });
        option.addEventListener('mouseenter', function (): void {
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

function perPagePanel(): HTMLDivElement {
    const perpagePanel: HTMLDivElement = document.createElement('div');
    const comboBoxTitle: HTMLSpanElement = document.createElement('span');
    const comboBox: HTMLDivElement = createComboBox();

    perpagePanel.className = 'pagination__perpage-panel';

    comboBoxTitle.className = 'pagination__combobox-title';
    comboBoxTitle.textContent = 'Item per page';

    appendChildElements(perpagePanel, [comboBoxTitle, comboBox]);
    return perpagePanel;
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
        //cartItemCollection.outerHTML = loadPage(currPage, perPage).outerHTML;
        loadPage(cartItemCollection, currPage, perPage);
        buttonPaginStyle();
        saveLocalStorage();
    }

    btnFirstPage.className = 'pagination__first-btn btn';
    if (currPage === 1) btnFirstPage.classList.add('disable');
    btnFirstPage.textContent = '<<';
    btnFirstPage.addEventListener('click', function () {
        currPage = 1;
        clickPaginButton();
    });

    btnPrevPage.className = 'pagination__prev-btn btn';
    if (currPage === 1) btnPrevPage.classList.add('disable');
    btnPrevPage.textContent = '<';
    btnPrevPage.addEventListener('click', function () {
        if (currPage > 1) currPage -= 1;
        clickPaginButton();
    });

    btnNextPage.className = 'pagination__next-btn btn';
    if (currPage === pageCount) btnNextPage.classList.add('disable');
    btnNextPage.textContent = '>';
    btnNextPage.addEventListener('click', function () {
        if (currPage < pageCount) currPage += 1;
        clickPaginButton();
    });

    btnLastPage.className = 'pagination__last-btn btn';
    if (currPage === pageCount) btnLastPage.classList.add('disable');
    btnLastPage.textContent = '>>';
    btnLastPage.addEventListener('click', function () {
        currPage = pageCount;
        clickPaginButton();
    });

    inputNumCurrentPage.className = 'pagination__num-current-page';
    inputNumCurrentPage.readOnly = true;
    inputNumCurrentPage.type = 'text';
    inputNumCurrentPage.step = '1';
    inputNumCurrentPage.min = '1';
    inputNumCurrentPage.value = `${currPage}`;
    inputNumCurrentPage.max = pageCount.toString();

    pagesList.className = 'pagincation__page-list';
    appendChildElements(pagesList, [btnFirstPage, btnPrevPage, inputNumCurrentPage, btnNextPage, btnLastPage]);

    return pagesList;
}

function createPagination(): HTMLDivElement {
    const paginPanel: HTMLDivElement = document.createElement('div');
    const pagesList: HTMLDivElement = createPagesList();
    const perpagePanel: HTMLDivElement = perPagePanel();

    paginPanel.className = 'pagination';
    appendChildElements(paginPanel, [pagesList, perpagePanel, modalWindow]);
    return paginPanel;
}

class CartPage extends Page {
    public arrCart: ItemCart[];
    showModalWindow: boolean;

    constructor(id: string, arrayItemCart: ItemCart[], showModalWindow: boolean) {
        super(id);
        this.arrCart = arrayItemCart;
        this.showModalWindow = showModalWindow;
    }

    /*
    removeButton(ID: number): void {
        this.arrCart.splice(ID - 1, 1);
    }*/

    render(): HTMLElement {
        const mainDivCart: HTMLDivElement = document.createElement('div');
        let paginPanel: HTMLDivElement = document.createElement('div');
        const itemCartCollection: HTMLDivElement = document.createElement('div');
        let receipt: HTMLDivElement = document.createElement('div');
        const modalWindow: HTMLDivElement = createModalWindow(this.showModalWindow);

        mainDivCart.className = 'cart';
        //pageCount = Math.ceil(this.arrCart.length / perPage);
        pageCount = Math.ceil(getArrCart().length / perPage);
        //currPage = 1;

        //Item Collection
        itemCartCollection.className = 'cart__item-collection';
        if (this.arrCart.length === 0) {
            itemCartCollection.innerHTML = '<h1>Cart is empty</h1>';
        } else {
            //itemCartCollection = loadPage(currPage, perPage);
            loadPage(itemCartCollection, currPage, perPage);
            /*
            this.arrCart.forEach((el, index) => {
                itemCartCollection.appendChild(el.createHTMLElement(index));
            });*/
            //Receipt
            receipt = createReceipt(this.arrCart);
            paginPanel = createPagination();
        }

        appendChildElements(mainDivCart, [itemCartCollection, receipt]);
        appendChildElements(this.container, [mainDivCart, paginPanel, modalWindow]);

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

export { CartPage, updatePaginParam, setPerPage, setCurrPage, getPerPage, getCurrPage };
