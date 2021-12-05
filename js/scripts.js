const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clear);

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
    const display = document.querySelector(".display");
    display.textContent = '';
}