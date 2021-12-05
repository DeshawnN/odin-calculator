const display = document.querySelector(".display");
let operands = [];
let operator;

const clearButton = document.querySelector('.calculation-buttons button[data-operation="clear"]');
clearButton.addEventListener('click', clear);

const backspaceButton = document.querySelector('.calculation-buttons button[data-operation="backspace"]');
backspaceButton.addEventListener('click', backspace);

const addButton = document.querySelector(`.calculation-buttons button[data-operation="add"]`);
addButton.addEventListener('click', function() {
    operands[0] = +display.textContent;
    display.textContent = "";
    operator = add;
});

const subtractButton = document.querySelector('.calculation-buttons button[data-operation="subtract"]');
subtractButton.addEventListener('click', function() {
    operands[0] = +display.textContent;
    display.textContent = "";
    operator = subtract;
});

const multiplyButton = document.querySelector('.calculation-buttons button[data-operation="multiply"]');
multiplyButton.addEventListener('click', () => {
    operands[0] = +display.textContent;
    display.textContent = "";
    operator = multiply;
});

const divideButton = document.querySelector('.calculation-buttons button[data-operation="divide"]');
divideButton.addEventListener('click', () => {
    operands[0] = +display.textContent;
    display.textContent = "";
    operator = divide;
});

const equalButton = document.querySelector('.calculation-buttons button[data-operation="operate"]');
equalButton.addEventListener('click', function() {
    operands[1] = +display.textContent;
    let result = operator(operands[0], operands[1]);
    if (Math.floor(result) !== result) {
        result = result.toFixed(2);
    }
    operands[0] = result;
    display.textContent = result;
});

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

function operate(action, a, b) {
    const result = action(a, b);
    operands = [result];
    operator = null;
    return result;
}

function clear() {
    operands = [];
    operator = null;
    display.textContent = '';
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}