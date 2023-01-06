// const formElement = <HTMLFormElement>document.querySelector('#form');

import { clearCart, updateHeader } from "../../../app";

// const nameField = <HTMLInputElement>document.querySelector('#name');
// const phoneField = <HTMLInputElement>document.querySelector('#phone');
// const addressField = <HTMLInputElement>document.querySelector('#address');
// const emailField = <HTMLInputElement>document.querySelector('#email');
// const cardNumField = <HTMLInputElement>document.querySelector('#card-num');
// const cardValidField = <HTMLInputElement>document.querySelector('#card-valid');
// const cardCVVField = <HTMLInputElement>document.querySelector('#card-cvv');
// const submitButton = <HTMLInputElement>document.querySelector('.submit-button');
// const cardFiller = <HTMLInputElement>document.querySelector('#card-filler');
// const inputs: HTMLInputElement[] = [];
// inputs.push(nameField, phoneField, addressField, emailField, cardNumField, cardValidField, cardCVVField);

export function validateIsNum(evt: UIEvent): void {
    if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
        evt.preventDefault();
    }
}

//handle wrong and right inputs

function setErrorMessage(element: HTMLElement, message: string): void {
    const inputControl = <HTMLElement>element.parentElement;
    const input = <HTMLElement>inputControl.querySelector('input');
    const errorDisplay = <HTMLElement>inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    input.classList.add('err');
    input.classList.remove('success');
}

export function setSuccess(element: HTMLElement): void {
    const inputControl = <HTMLElement>element.parentElement;
    const input = <HTMLElement>inputControl.querySelector('input');
    const errorDisplay = <HTMLElement>inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    input.classList.add('success');
    input.classList.remove('err');
}

//validation function for each input field

function validateName(): void {
    const nameField = <HTMLInputElement>document.querySelector('#name');
    const value = nameField.value.trim();
    const currName = value.split(' ');
    const error = setErrorMessage(nameField, 'Username required or wrong format');
    if (value === '') {
        error;
    }
    if (value.match(/\d/)) {
        error;
    } else if (currName[0] && currName[1]) {
        if (currName[0]) {
            if (currName[0].length < 3) {
                error;
            }
        }
        if (currName[1]) {
            if (currName[1].length < 3) {
                error;
            }
        }
        if (currName[0] && currName[1]) {
            if (currName[0].length >= 3 && currName[1].length >= 3) {
                setSuccess(nameField);
            }
        }
    }
}

function validatePhone(): void {
    const phoneField = <HTMLInputElement>document.querySelector('#phone');
    const value = phoneField.value.trim();
    const sliced = value.slice(1);
    const error = setErrorMessage(phoneField, 'Phone required or wrong format');
    const check = /^\d{9,}$/;
    if (sliced.match(check) && value[0] === '+') {
        setSuccess(phoneField);
    } else {
        error;
    }
}

function validateAddress(): void {
    const addressField = <HTMLInputElement>document.querySelector('#address');
    const value = addressField.value.trim();
    const currAddress = value.split(' ');
    const error = setErrorMessage(addressField, 'Address required or wrong format');
    if (currAddress[0] && currAddress[1] && currAddress[2]) {
        if (currAddress[0].length < 5 || currAddress[1].length < 5 || currAddress[2].length < 5) {
            error;
        } else {
            setSuccess(addressField);
        }
    } else {
        error;
    }
}

function validateEmail(): void {
    const emailField = <HTMLInputElement>document.querySelector('#email');
    const value = emailField.value.trim();
    const valid =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const error = setErrorMessage(emailField, 'Email required or wrong format');

    if (value.match(valid)) {
        setSuccess(emailField);
    } else {
        error;
    }
}

function validateCardNum(): void {
    const cardNumField = <HTMLInputElement>document.querySelector('#card-num');
    const cardFiller = <HTMLInputElement>document.querySelector('#card-filler');
    let value: string | number = cardNumField.value.trim();
    const stringValue = String(value);
    value = Number(value);
    const isNum = /^\d+$/.test(stringValue);
    const error = setErrorMessage(cardNumField, 'Card number required or wrong format');
    if (!stringValue.length) {
        cardFiller.src = '../../assets/png/card-filler.png';
    }
    if (stringValue.length) {
        switch (stringValue[0]) {
            case '4':
                cardFiller.src = '../../assets/svg/visa.svg';
                break;
            case '5':
                cardFiller.src = '../../assets/svg/mastercard.svg';
                break;
            case '6':
                cardFiller.src = '../../assets/svg/paypal.svg';
                break;
        }
        /*
        if (stringValue[0] === '4') {
            cardFiller.src = '../../assets/svg/visa.svg';
        }
        if (stringValue[0] === '5') {
            cardFiller.src = '../../assets/svg/mastercard.svg';
        }
        if (stringValue[0] === '6') {
            cardFiller.src = '../../assets/svg/paypal.svg';
        }*/
        if (stringValue.length === 16) {
            if (!isNum) {
                error;
            } else {
                setSuccess(cardNumField);
            }
        } else {
            error;
        }
    }
}

function validateValidDate(): void {
    const cardValidField = <HTMLInputElement>document.querySelector('#card-valid');
    const value = cardValidField.value;
    const error = setErrorMessage(cardValidField, 'Expiration date required or wrong format');
    const currValue = value.split('');
    if (currValue[0] && currValue[1] && !currValue[2]) {
        cardValidField.value = cardValidField.value + '/';
    }
    if (currValue[0] && currValue[2] && currValue[3] && currValue[4]) {
        if (Number(currValue[0] + currValue[1]) > 12 || (currValue[0] === '0' && currValue[1] === '0')) {
            error;
        } else if (Number(currValue[3] + currValue[4]) > 31 || (currValue[3] === '0' && currValue[4] === '0')) {
            error;
        } else {
            setSuccess(cardValidField);
        }
    }
}

function validateCVV(): void {
    const cardCVVField = <HTMLInputElement>document.querySelector('#card-cvv');
    const value = cardCVVField.value;
    const error = setErrorMessage(cardCVVField, 'CVV required or wrong format');
    if (value.length < 3) {
        error;
    } else {
        setSuccess(cardCVVField);
    }
}

function validateAllInputs(): boolean {
    const nameField = <HTMLInputElement>document.querySelector('#name');
    const phoneField = <HTMLInputElement>document.querySelector('#phone');
    const addressField = <HTMLInputElement>document.querySelector('#address');
    const emailField = <HTMLInputElement>document.querySelector('#email');
    const cardNumField = <HTMLInputElement>document.querySelector('#card-num');
    const cardValidField = <HTMLInputElement>document.querySelector('#card-valid');
    const cardCVVField = <HTMLInputElement>document.querySelector('#card-cvv');
    const submitButton = <HTMLInputElement>document.querySelector('.submit-button');
    const cardFiller = <HTMLInputElement>document.querySelector('#card-filler');
    const inputs: HTMLInputElement[] = [];
    validateName();
    validatePhone();
    validateAddress();
    validateEmail();
    validateCardNum();
    validateValidDate();
    validateCVV();
    inputs.push(nameField, phoneField, addressField, emailField, cardNumField, cardValidField, cardCVVField);
    let isValid = false;
    const classes: Array<boolean> = [];
    const values: string[] = [];
    inputs.forEach((input) => {
        values.push(input.value);
        classes.push(Array.from(input.classList).includes('err'));
    });
    if (classes.includes(true)) {
        isValid = false;
    } else {
        if (!values.includes('')) {
            isValid = true;
        }
    }
    return isValid;
}

export function submitFrom(): void {
    const isValid = validateAllInputs();
    if (isValid) {
        alert('Purchase completed!\n\nEmptying cart, redirecting to main...');
        clearCart();
        updateHeader();
        setTimeout(() => {
            window.location.hash = '';
        }, 1000);
    } else {
        alert('Invalid data entered, please try again!!!');
    }
}

class Form {
    render(): HTMLFormElement {
        const modalForm: HTMLFormElement = document.createElement('form');
        modalForm.id = 'form';
        modalForm.action = '/';
        modalForm.innerHTML = `
            <h1>Personal details</h1>
            <div class="input-control">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Casey Neistat" />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+4956902244" />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="address">Address</label>
                <input type="text" id="address" name="address" placeholder="United States, Washington" />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" placeholder="email@email.com" />
                <div class="error"></div>
            </div>
            <div class="input-control card-num-input-control">
                <label for="card-num">Card Number</label>
                <input
                    class="card-num__input"
                    type="number"
                    id="card-num"
                    name="card-num"
                    placeholder="4997557688956757"
                    onKeyPress="if(this.value.length==16) return false;"
                />
                <img id="card-filler" src="../../assets/png/card-filler.png" alt="card-brand" />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="card-valid">Valid Thru</label>
                <input
                    type="text"
                    id="card-valid"
                    name="card-valid"
                    placeholder="04/24"
                    onKeyPress="if(this.value.length==5) return false;"
                />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="card-cvv">CVV</label>
                <input
                    type="text"
                    id="card-cvv"
                    name="card-cvv"
                    placeholder="717"
                    onKeyPress="if(this.value.length==3) return false;"
                />
                <div class="error"></div>
            </div>
            <button class="submit-button" type="submit">Submit</button>`;
        return modalForm;
        /*        return `
        <form id="form" action="/">
            <h1>Personal details</h1>
            <div class="input-control">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Casey Neistat" />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+4956902244" />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="address">Address</label>
                <input type="text" id="address" name="address" placeholder="United States, Washington" />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" placeholder="email@email.com" />
                <div class="error"></div>
            </div>
            <div class="input-control card-num-input-control">
                <label for="card-num">Card Number</label>
                <input
                    class="card-num__input"
                    type="number"
                    id="card-num"
                    name="card-num"
                    placeholder="4997557688956757"
                    onKeyPress="if(this.value.length==16) return false;"
                />
                <img id="card-filler" src="../../assets/icons/card-filler.png" alt="card-brand" />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="card-valid">Valid Thru</label>
                <input
                    type="text"
                    id="card-valid"
                    name="card-valid"
                    placeholder="04/24"
                    onKeyPress="if(this.value.length==5) return false;"
                />
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="card-cvv">CVV</label>
                <input
                    type="text"
                    id="card-cvv"
                    name="card-cvv"
                    placeholder="717"
                    onKeyPress="if(this.value.length==3) return false;"
                />
                <div class="error"></div>
            </div>
            <button class="submit-button" type="submit">Submit</button>
        </form>`;*/
    }
    listen(): void {
        const nameField = <HTMLInputElement>document.querySelector('#name');
        const phoneField = <HTMLInputElement>document.querySelector('#phone');
        const addressField = <HTMLInputElement>document.querySelector('#address');
        const emailField = <HTMLInputElement>document.querySelector('#email');
        const cardNumField = <HTMLInputElement>document.querySelector('#card-num');
        const cardValidField = <HTMLInputElement>document.querySelector('#card-valid');
        const cardCVVField = <HTMLInputElement>document.querySelector('#card-cvv');
        const submitButton = <HTMLInputElement>document.querySelector('.submit-button');
        const cardFiller = <HTMLInputElement>document.querySelector('#card-filler');
        const inputs: HTMLInputElement[] = [];
        inputs.push(nameField, phoneField, addressField, emailField, cardNumField, cardValidField, cardCVVField);
        nameField.addEventListener('input', validateName);
        phoneField.addEventListener('input', validatePhone);
        addressField.addEventListener('input', validateAddress);
        emailField.addEventListener('input', validateEmail);
        cardNumField.addEventListener('input', validateCardNum);
        cardNumField.addEventListener('keypress', (event) => {
            validateIsNum(event);
        });
        cardValidField.addEventListener('input', validateValidDate);
        cardValidField.addEventListener('keydown', (event) => {
            validateIsNum(event);
            if (event.key === 'Backspace') {
                cardValidField.value = '';
            }
        });
        cardCVVField.addEventListener('input', validateCVV);
        cardCVVField.addEventListener('keydown', (event) => {
            validateIsNum(event);
        });
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            submitFrom();
        });
    }
}

export { Form };
