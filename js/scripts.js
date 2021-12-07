const currentOperation = document.querySelector('[data-current-operation]');
const previousOperation = document.querySelector('[data-previous-operation]');
let currentOperand = "";
let previousOperand = "";
let operator = undefined;
let operationSymbol = undefined;

const clearButton = document.querySelector('[data-clear]');
clearButton.addEventListener('click', clear);

const backspaceButton = document.querySelector('[data-backspace]');
backspaceButton.addEventListener('click', backspace);

const addButton = document.querySelector('[data-add]');
addButton.addEventListener('click', () => {
    setOperator(add);
    updateDisplay();
});

const subtractButton = document.querySelector('[data-subtract]');
subtractButton.addEventListener('click', () => {
    setOperator(subtract);
    updateDisplay();
});

const multiplyButton = document.querySelector('[data-multiply]');
multiplyButton.addEventListener('click', () => {
    setOperator(multiply);
    updateDisplay();
});

const divideButton = document.querySelector('[data-divide]');
divideButton.addEventListener('click', () => {
    setOperator(divide);
    updateDisplay();
});

const equalsButton = document.querySelector("[data-equals]");
equalsButton.addEventListener('click', () => {
    if (!currentOperand || !previousOperand) return;
    if (operator === divide && currentOperand == 0) {
        alert("division-by-zero operation detected, we'll be in touch...");
        return;
    }
    operate(operator, +previousOperand, +currentOperand);
    updateDisplay();
});

const buttons = document.querySelectorAll("[data-number]");
buttons.forEach(button => button.addEventListener('click', event => {
    appendNumber(event.target.textContent);
    updateDisplay();
}));

function updateDisplay() {
    currentOperation.textContent = currentOperand;
    if (operationSymbol != null) {
        previousOperation.textContent = `${previousOperand} ${operationSymbol}`;
    }
}

function getOperatorFromSymbol(symbol) {
    switch(symbol) {
        case "+":
            return add;
        case "-":
            return subtract;
        case "*":
            return multiply;
        case "/":
        case "÷":
            return divide;
        default:
            return;
    }
}

function setOperationSymbol() {
    switch (operator) {
        case add:
            return "+";
        case subtract:
            return "-";
        case multiply:
            return "*";
        case divide:
            return "÷";
        default:
            return;
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + number;
}

function setOperator(operation) {
    if (!currentOperand) return;
    if (previousOperand !== '') {
        operate(operator, +previousOperand, +currentOperand);
    }
    operator = operation;
    operationSymbol = setOperationSymbol(operator);
    previousOperand = currentOperand;
    currentOperand = '';
}

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
    let result = action(a, b);
    console.log(typeof result);
    if (Math.floor(result) !== result) {
        result = result.toFixed(2);
    }
    currentOperand = result.toString();
    previousOperand = "";
    operator = undefined;
    operationSymbol = '';
}

function clear() {
    previousOperand = '';
    currentOperand = '';
    operator = undefined;
    operationSymbol = '';
    clearDisplay();
}

function clearDisplay() {
    updateDisplay();
}

function backspace() {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
}

const operators = ["+", "-", "/", "*", "="];

window.addEventListener('keydown', (event) => {
    const pressedKey = event.key;

    if (!isValidKey(pressedKey)) return;

    if (operators.includes(pressedKey)) {
        setOperator(getOperatorFromSymbol(pressedKey));
    } else if (!isNaN(pressedKey) || pressedKey === ".") {
        appendNumber(pressedKey);
    } else if (pressedKey === "Enter") {
        operate(operator, +previousOperand, +currentOperand);
    } else {
        backspace();
    }
    updateDisplay();
    
});

function isValidKey(key) {
    if ((isNaN(key) && 
        !operators.includes(key) && 
        key !== '.') && (key !== "Backspace" && key !== "Enter")) return;
    return true;
}