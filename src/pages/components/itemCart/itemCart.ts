import Promocode from '../../templates/promocode';
import { getArrCart, removeItemFromCart, updateHeader } from '../../../app';
import iconsSVG from '../../templates/icons';
//import { updatePaginParam } from '../../cart/cart';

const promoList: Promocode[] = [];
promoList.push(new Promocode(promoList.length, 'rs', 10));
promoList.push(new Promocode(promoList.length, 'epm', 15));

function appendChildElements(parentElem: HTMLElement, arr: HTMLElement[]): void {
    arr.forEach((el) => {
        parentElem.appendChild(el);
    });
}

//update total price in receint
function updateTotalPrice(): void {
    const totalPrice = <HTMLElement>document.querySelector('.receipt__total-price');
    if (!totalPrice.classList.contains('used-promo'))
        totalPrice.classList.add('used-promo');
    const promoPrice = <HTMLElement>document.querySelector('.receipt__total-promo');
    if (promoPrice.classList.contains('hidden'))
        promoPrice.classList.remove('hidden');

    const totalSale: number = promoList.filter((el) => el.getUsed() === true).reduce((a, b) => a + b.getValue(), 0);
    promoPrice.textContent = (parseFloat(String(totalPrice.textContent)) * (1 - (totalSale / 100))).toFixed(2);
}

function removePromoCode(codeID: number): void {
    const totalPrice = <HTMLElement>document.querySelector('.receipt__total-price');
    const promoPrice = <HTMLElement>document.querySelector('.receipt__total-promo');

    const totalSale: number = promoList.filter((el) => el.getUsed() === true).reduce((a, b) => a + b.getValue(), 0);
    const newSale: number = totalSale - promoList[codeID - 1].getValue();
    const price = parseInt(String(totalPrice.textContent));
    promoPrice.textContent = (price * (1 - (newSale / 100))).toFixed(2);
    promoList[codeID - 1].setNotUsed();
}

function changeReceiptPrice(oldPrice: number, newPrice: number): void {
    const receiptItemsPrice: HTMLParagraphElement = <HTMLParagraphElement>document.querySelector('.receipt__items-price');
    const receiptDelivery: HTMLParagraphElement = <HTMLParagraphElement>document.querySelector('.receipt__delivery');
    const receiptTotalPrice: HTMLParagraphElement = <HTMLParagraphElement>document.querySelector('.receipt__total-price');
    
    let tempPrice = parseInt(String(receiptItemsPrice.textContent));
    let delivery = 0, totalPrice = 0;
    tempPrice += (newPrice - oldPrice);
    delivery = tempPrice * .1;
    totalPrice = Number(tempPrice * 1.1);

    receiptItemsPrice.textContent = tempPrice.toFixed(2);
    receiptDelivery.textContent = delivery.toFixed(2);
    receiptTotalPrice.textContent = totalPrice.toFixed(2);
}

function addUsedPromoCode(promo: Promocode): HTMLDivElement {
    const usedPromoCode: HTMLDivElement = document.createElement('div');
    const codeName: HTMLSpanElement = document.createElement('span');
    const codeSeparator: HTMLSpanElement = document.createElement('span');
    const codeValue: HTMLSpanElement = document.createElement('span');
    const codeRemove: HTMLButtonElement = document.createElement('button');

    usedPromoCode.className = 'promo__code';
    usedPromoCode.id = `promo-${promo.getID()}`;

    codeName.className = 'promo__name';
    codeName.textContent = promo.name;
    codeSeparator.className = 'promo__separator';
    codeSeparator.textContent = ' - ';
    codeValue.className = 'promo__value';
    codeValue.textContent = `${promo.getValue()}`;
    codeRemove.className = 'promo__remove btn';
    codeRemove.value = `${promo.getID()}`;
    codeRemove.innerHTML = '&#8211;';
    //Remove Promo Code
    codeRemove.addEventListener('click', function () {
        const codeID: number = parseInt(this.value);
        const usedPromoPanel: HTMLDivElement = <HTMLDivElement>document.querySelector('.promo__used-promo-panel');
        const usedPromoCode: HTMLElement = <HTMLElement>document.querySelector(`#promo-${codeID}`);
        removePromoCode(codeID);
        usedPromoCode.remove();
        if (promoList.every((el) => el.getUsed() === false)) {
            const totalPrice = document.querySelector('.receipt__total-price');
            const promoPrice = document.querySelector('.receipt__total-promo');
            totalPrice?.classList.remove('used-promo');
            promoPrice?.classList.add('hidden');
            usedPromoPanel.classList.add('hidden');
        }
    });

    appendChildElements(usedPromoCode, [codeName, codeSeparator, codeValue, codeRemove]);
    return usedPromoCode;
}

function createPromoPanel(): HTMLDivElement {
    const promoPanel: HTMLDivElement = document.createElement('div');
    const promoTitlePanel: HTMLHeadingElement = document.createElement('h2');
    const promoCode: HTMLInputElement = document.createElement('input');
    const promoAdd: HTMLButtonElement = document.createElement('button');
    const usedPromoPanel: HTMLDivElement = document.createElement('div');
    const usedPromoPanelTitle: HTMLHeadingElement = document.createElement('h2');

    let findCode: Promocode | undefined;

    promoPanel.className = 'receipt__promo-panel';

    promoTitlePanel.className = 'promo__title-panel';
    promoTitlePanel.textContent = 'Enter your promo code';

    promoCode.className = 'promo__value-code';
    promoCode.type = 'text';
    promoCode.placeholder = 'Enter promo code';
    promoAdd.className = 'promo__add-button';

    promoCode.addEventListener('input', function () {
        findCode = promoList.find((el) => el.name === this.value.toLowerCase());
        if (findCode !== undefined) {
            promoCode.classList.add('find');
            promoAdd.classList.add('enable');
        } else {
            promoCode.classList.remove('find');
            promoAdd.classList.remove('enable');
        }
    });    
    promoAdd.textContent = 'Use';
    promoAdd.addEventListener('click', function () {
        if (promoAdd.classList.contains('enable') && (findCode !== undefined)) {
            if (findCode.getUsed()) {
                alert('This promo code has already been used');
            } else {
                usedPromoPanel.appendChild(addUsedPromoCode(findCode));
                usedPromoPanel.classList.remove('hidden');
                findCode.setUsed();
                updateTotalPrice();
            }
        }
    });    

    usedPromoPanel.className = 'promo__used-promo-panel hidden';
    usedPromoPanelTitle.className = 'promo-panel__title';
    usedPromoPanelTitle.textContent = 'Used promo codes:';

    usedPromoPanel.appendChild(usedPromoPanelTitle);

    appendChildElements(promoPanel, [promoTitlePanel, promoCode, promoAdd, usedPromoPanel]);
    return promoPanel;
}

function countItemsInCart(): number {
    let count: number = 0;
    getArrCart().forEach((el) => count += el.getAmount());
    return count;
}

function createReceipt(array: ItemCart[]): HTMLDivElement {
    const receipt: HTMLDivElement = document.createElement('div');
    const receiptTitle: HTMLHeadingElement = document.createElement('h2');
    const itemsCount: HTMLDivElement = document.createElement('div');

    //Promo Code
    let promoPanel: HTMLDivElement = document.createElement('div');
    //-----------

    const receiptItemsPrice: HTMLParagraphElement = document.createElement('p');
    const receiptDelivery: HTMLParagraphElement = document.createElement('p');
    const hr: HTMLHRElement = document.createElement('hr');
    const receiptTotalPrice: HTMLParagraphElement = document.createElement('p');
    const receiptPriceWithPromo: HTMLParagraphElement = document.createElement('p');

    //Buy Now
    const receiptBuyNow: HTMLButtonElement = document.createElement('button');

    receiptTitle.className = 'receipt__title';
    receiptTitle.textContent = 'Your receipt';

    itemsCount.className = 'receipt__item-count';    
    itemsCount.textContent = `${countItemsInCart()}`;

    promoPanel = createPromoPanel();
    
    let itemsPrice = 0, totalPrice = 0, delivery = 0;
    

    array.forEach((el) => {
        itemsPrice += el.getTotalPrice();
    });
    delivery = itemsPrice * .1;
    totalPrice = itemsPrice * 1.1;
    
    receiptItemsPrice.className = 'receipt__items-price';
    receiptItemsPrice.textContent = itemsPrice.toFixed(2);
    receiptDelivery.className = 'receipt__delivery';
    receiptDelivery.textContent = delivery.toFixed(2);
    receiptTotalPrice.className = 'receipt__total-price';
    receiptTotalPrice.textContent = totalPrice.toFixed(2);
    receiptPriceWithPromo.className = 'receipt__total-promo hidden';

    receiptBuyNow.className = 'receipt__button-buy btn';
    receiptBuyNow.textContent = 'Buy now';

    receipt.className = 'cart__receipt';
    appendChildElements(receipt, [receiptTitle, itemsCount, promoPanel, receiptItemsPrice, receiptDelivery, hr, receiptTotalPrice, receiptPriceWithPromo, receiptBuyNow]);
    return receipt;
}

class ItemCart {
    id: number;
    name: string;
    brand: string;
    category: string;
    thumbnail: string;
    amount: number;
    limit: number;
    price: number;
    constructor(id: number, name: string, brand: string, category: string, thumbnail: string, amount: number, stock: number, price: number) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail;
        this.amount = amount;
        this.limit = stock;
        this.price = price;        
    }

    addAmount(): void {
        if (this.amount < this.limit) this.amount++;
    }

    delAmount(): void {
        if (this.amount > 0) this.amount--;
    }

    getAmount(): number {
        return this.amount;
    }

    getTotalPrice(): number {
        return this.amount * this.price;
    }

    /*
     * @param {Number} index - index item in array arrCart
     */
    createHTMLElement(index: number): HTMLDivElement {
        const item: HTMLDivElement = document.createElement('div');
        const itemIndex: HTMLDivElement = document.createElement('div');;
        const itemTumb: HTMLImageElement = document.createElement('img');
        const itemInfo: HTMLDivElement = document.createElement('div');
        const itemName: HTMLParagraphElement = document.createElement('p');
        const itemBrand: HTMLParagraphElement = document.createElement('p');
        const itemCategory: HTMLParagraphElement = document.createElement('p');

        const itemPanelAmount: HTMLDivElement = document.createElement('div');
        const itemAmountTitle: HTMLSpanElement = document.createElement('span');
        const itemAmount: HTMLInputElement = document.createElement('input');
        const itemAmountUp: HTMLButtonElement = document.createElement('button');
        const itemAmountDown: HTMLButtonElement = document.createElement('button');
        const itemLimit: HTMLSpanElement = document.createElement('span');

        const itemPrice: HTMLParagraphElement = document.createElement('p');
        const itemRemove: HTMLButtonElement = document.createElement('button');

        item.className = 'cart__item';

        itemIndex.className = 'cart__item-index';
        itemIndex.textContent = `${index + 1}`;

        //Tumbnail
        itemTumb.className = 'cart__item-img';
        itemTumb.src = this.thumbnail;
        itemTumb.alt = `${this.brand}\n${this.name}`;

        //Item Information
        itemName.className = 'cart__item-name';
        itemName.textContent = `${this.name}`;
        itemBrand.className = 'cart__item-brand';
        itemBrand.textContent = `${this.brand}`;
        itemCategory.className = 'cart__item-category';
        itemCategory.textContent = `${this.category}`;

        //Amount Panel
        itemPanelAmount.className = 'cart__item-panel-amount';

        itemAmountTitle.className = 'cart__item-amount-title'
        itemAmountTitle.textContent = 'Count: ';

        itemAmountDown.className = 'cart__item-amount-down btn';
        itemAmountDown.value = this.id.toString();
        itemAmountDown.innerHTML = '&#8211;';
        itemAmountDown.addEventListener('click', () => {
            if (this.getAmount() === 1) {
                removeItemFromCart(index);
            } else {
                const oldPrice = this.getTotalPrice();
                this.delAmount();
                const newPrice = this.getTotalPrice();
                itemPrice.textContent = `${this.getTotalPrice().toString()}`;
                itemAmount.stepDown(1);
                changeReceiptPrice(oldPrice, newPrice);
                updateHeader();
                const itemsCount: HTMLDivElement = <HTMLDivElement>document.querySelector('.receipt__item-count');
                itemsCount.textContent = `${countItemsInCart()}`;
            }
        });

        itemAmount.type = 'number';
        itemAmount.className = 'cart__item-amount';
        itemAmount.id = `item-${this.id.toString()}`;        
        itemAmount.min = '1';
        itemAmount.max = `${this.limit}`;
        itemAmount.value = `${this.amount}`;
        itemAmount.readOnly = true;

        itemAmountUp.className = 'cart__item-amount-up btn';
        itemAmountUp.value = this.id.toString();
        itemAmountUp.textContent = '+';
        itemAmountUp.addEventListener('click', () => {
            const oldPrice = this.getTotalPrice();
            this.addAmount();
            const newPrice = this.getTotalPrice();
            itemAmount.stepUp(1);
            itemPrice.textContent = `${this.getTotalPrice().toString()}`;
            changeReceiptPrice(oldPrice, newPrice);
            updateHeader();
            countItemsInCart();
            const itemsCount: HTMLDivElement = <HTMLDivElement>document.querySelector('.receipt__item-count');
            itemsCount.textContent = `${countItemsInCart()}`;
        });

        itemLimit.className = 'cart__item-limit';
        itemLimit.textContent = `${this.limit.toString()}`;

        appendChildElements(itemPanelAmount, [itemAmountTitle, itemAmountDown, itemAmount, itemAmountUp, itemLimit]);
        //-------------------

        itemPrice.className = `cart__item-price item-${this.id.toString()}`;
        itemPrice.textContent = `${this.getTotalPrice().toString()}`;
        itemRemove.className = 'cart__item-remove btn';
        itemRemove.addEventListener('click', function () {
            console.log(index);
            removeItemFromCart(index);
        });
        itemRemove.value = `${index}`//`${this.id.toString()}`;
        /*itemRemove.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                <g>
                    <path d="M784.3,127.4H631.7C624.1,61.4,568,10,500,10c-68,0-124.1,51.4-131.7,117.4H215.7c-61.7,0-112,50.2-112,112v5.7c0,47.2,29.4,87.6,70.8,104V878c0,61.7,50.2,112,112,112h427.1c61.7,0,112-50.2,112-112V349.1c41.4-16.5,70.8-56.8,70.8-104v-5.7C896.2,177.6,846,127.4,784.3,127.4L784.3,127.4z M500,63.1c38.7,0,71,27.7,78.1,64.3H421.9C429.1,90.8,461.3,63.1,500,63.1L500,63.1z M772.4,878c0,32.5-26.4,58.9-58.9,58.9H286.5c-32.4,0-58.9-26.4-58.9-58.9v-521h544.8V878z M843.1,245.1c0,32.5-26.4,58.9-58.9,58.9H215.7c-32.4,0-58.9-26.4-58.9-58.9v-5.7c0-32.5,26.4-58.9,58.9-58.9h568.6c32.4,0,58.9,26.4,58.9,58.9V245.1L843.1,245.1z"/><path d="M357.7,869c14.7,0,26.5-11.9,26.5-26.5V543.5c0-14.7-11.9-26.6-26.5-26.6c-14.7,0-26.5,11.9-26.5,26.6v298.9C331.1,857.1,343,869,357.7,869L357.7,869z"/><path d="M500,869c14.7,0,26.5-11.9,26.5-26.5V543.5c0-14.7-11.9-26.6-26.5-26.6c-14.7,0-26.5,11.9-26.5,26.6v298.9C473.5,857.1,485.3,869,500,869L500,869z"/><path d="M642.3,869c14.7,0,26.5-11.9,26.5-26.5V543.5c0-14.7-11.9-26.6-26.5-26.6c-14.7,0-26.5,11.9-26.5,26.6v298.9C615.8,857.1,627.7,869,642.3,869z"/>
                </g>
            </svg>`;*/
        itemRemove.innerHTML = iconsSVG.remove;

        itemInfo.className = 'cart__item-info';
        appendChildElements(itemInfo, [itemName, itemBrand, itemCategory, itemPanelAmount, itemPrice, itemRemove]);
        //---------        
        appendChildElements(item, [itemIndex, itemTumb, itemInfo]);
        return item;
    }
}

export { ItemCart, createReceipt, appendChildElements };