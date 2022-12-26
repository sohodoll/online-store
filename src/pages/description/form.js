// const formElement = <HTMLFormElement>document.querySelector('#form');
// const nameField = <HTMLInputElement>document.querySelector('#name');
// const phoneField = <HTMLInputElement>document.querySelector('#phone');
// const addressField = <HTMLInputElement>document.querySelector('#address');
// const emailField = <HTMLInputElement>document.querySelector('#address');
// const cardNumField = <HTMLInputElement>document.querySelector('#card-num');
// const cardValidField = <HTMLInputElement>document.querySelector('#card-valid');
// const cardCVVField = <HTMLInputElement>document.querySelector('#card-cvv');
// const submitButton = <HTMLButtonElement>document.querySelector('.submit');

const formElement = document.querySelector('#form');
const nameField = document.querySelector('#name');
const phoneField = document.querySelector('#phone');
const addressField = document.querySelector('#address');
const emailField = document.querySelector('#email');
const cardNumField = document.querySelector('#card-num');
const cardValidField = document.querySelector('#card-valid');
const cardCVVField = document.querySelector('#card-cvv');
const submitButton = document.querySelector('.submit-button');

// const inputs = [];
// inputs.push(nameField, phoneField, addressField, emailField, cardNumField, cardValidField, cardCVVField);

// formElement.addEventListener('input', (event) => {
//     event.preventDefault();
//     validateAllInputs();
// });

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
});

const setErrorMessage = (element, message) => {
    const inputControl = element.parentElement;
    const input = inputControl.querySelector('input');
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    input.classList.add('err');
    input.classList.remove('success');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const input = inputControl.querySelector('input');
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    input.classList.add('success');
    input.classList.remove('err');
};

const validateName = () => {
    const value = nameField.value.trim();
    const currName = value.split(' ');
    const error = setErrorMessage(nameField, 'Username required or wrong format');
    if (value === '') {
        error;
    }
    if (Boolean(value.match(/\d/))) {
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
};

const validatePhone = () => {
    const value = phoneField.value.trim();
    const sliced = value.slice(1);
    const error = setErrorMessage(phoneField, 'Phone required or wrong format');
    const check = /^\d{9,}$/;
    if (sliced.match(check) && value[0] === '+') {
        setSuccess(phoneField);
    } else {
        error;
    }
};

const validateAddress = () => {
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
};

const validateEmail = () => {
    const value = emailField.value.trim();
    const valid =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const error = setErrorMessage(emailField, 'Email required or wrong format');

    if (value.match(valid)) {
        setSuccess(emailField);
    } else {
        error;
    }
};

const validateAllInputs = () => {
    const phoneValue = phoneField.value.trim();
    const addressValue = addressField.value.trim();
    const emailValue = emailField.value.trim();
    const cardNumValue = cardNumField.value;
    const cardValidValue = cardValidField.value.trim();
    const cardCVVValue = cardCVVField.value;

    validateName(nameValue);

    // validatePhone(phoneValue);

    // if (nameValue === '') {
    //     setErrorMessage(nameField, 'Username Required');
    // } else {
    //     setSuccess(nameField);
    // }
};

nameField.addEventListener('input', validateName);
phoneField.addEventListener('input', validatePhone);
addressField.addEventListener('input', validateAddress);
emailField.addEventListener('input', validateEmail);

// console.log(
//     formElement,
//     nameField,
//     phoneField,
//     addressField,
//     emailField,
//     cardCVVField,
//     cardNumField,
//     cardValidField,
//     submitButton
// );

// class Form {
//     form: HTMLFormElement;
//     nameField: HTMLInputElement;
//     phoneField: HTMLInputElement;
//     addressField: HTMLInputElement;
//     emailField: HTMLInputElement;
//     cardNumField: HTMLInputElement;
//     cardValidField: HTMLInputElement;
//     cardCVVField: HTMLInputElement;

//     constructor(form: HTMLFormElement, nameField)

// }
