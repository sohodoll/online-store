import { ItemCart, createReceipt, appendChildElements } from '../components/itemCart/itemCart';
import Page from '../templates/page';

function createComboBox(): HTMLDivElement {
    const comboBox: HTMLDivElement = document.createElement('div');
    const comboBoxText: HTMLDivElement = document.createElement('div');
    const comboBoxOptions: HTMLDivElement = document.createElement('div');

    comboBox.className = 'pagination__combobox';

    comboBoxText.className = 'pagination__combobox-text';
    comboBoxText.textContent = 'Item per page';
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

function createPagination(): HTMLDivElement {
    const paginPanel: HTMLDivElement = document.createElement('div');
    const comboBox: HTMLDivElement = createComboBox();

    paginPanel.className = 'pagination';
    appendChildElements(paginPanel, [comboBox]);
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
        const itemCartCollection: HTMLDivElement = document.createElement('div');
        let receipt: HTMLDivElement = document.createElement('div');

        mainDivCart.className = 'cart';        

        //Item Collection
        itemCartCollection.className = 'cart__item-collection';
        if (this.arrCart.length === 0) {
            itemCartCollection.innerHTML = '<h1>Cart is empty</h1>';
        } else {
            this.arrCart.forEach((el, index) => {
                itemCartCollection.appendChild(el.createHTMLElement(index));
            });
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
