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

formElement.addEventListener('input', (event) => {
    event.preventDefault();
    console.log('input');
    validateAllInputs();
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
});

const setErrorMessage = (element, message) => {
    const inputControl = element.parentElement;
    const input = inputControl.querySelector('input');
    const errorDisplay = inputControl.querySelector('.error');
    console.log('error set');
    errorDisplay.innerText = message;
    input.classList.add('err');
    input.classList.remove('success');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const input = inputControl.querySelector('input');
    const errorDisplay = inputControl.querySelector('.error');
    console.log('success!!!');
    errorDisplay.innerText = '';
    input.classList.add('success');
    input.classList.remove('err');
};

const validateName = (value) => {
    const currName = value.split(' ');
    if (Boolean(value.match(/\d/))) {
        setErrorMessage(nameField, 'Username Required');
    } else {
        if (currName[0]) {
            if (currName[0].length < 3) {
                setErrorMessage(nameField, 'Username Required');
            }
        }
        if (currName[1]) {
            if (currName[1].length < 3) {
                setErrorMessage(nameField, 'Username Required');
            }
        }
        if (currName[0] && currName[1]) {
            if (currName[0].length >= 3 && currName[1].length >= 3) setSuccess(nameField);
        }
    }
};

const validateAllInputs = () => {
    const nameValue = nameField.value.trim();
    const phoneValue = phoneField.value.trim();
    const addressValue = addressField.value.trim();
    const emailValue = emailField.value.trim();
    const cardNumValue = cardNumField.value;
    const cardValidValue = cardValidField.value.trim();
    const cardCVVValue = cardCVVField.value;
    console.log(nameValue, phoneValue, addressValue, emailValue, cardNumValue, cardValidValue, cardCVVValue);

    validateName(nameValue);

    // if (nameValue === '') {
    //     setErrorMessage(nameField, 'Username Required');
    // } else {
    //     setSuccess(nameField);
    // }
};

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
