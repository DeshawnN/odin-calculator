const display = document.querySelector(".display");

const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clear);

clear();

const buttons = document.querySelectorAll(".number-buttons button");
buttons.forEach(button => button.addEventListener('click', event => {
    display.textContent += button.textContent;
}));

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function clear() {
    display.textContent = '';
}