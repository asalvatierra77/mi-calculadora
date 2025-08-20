let currentDisplay = '0';
let previousDisplay = '';
let operation = null;
let shouldResetScreen = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentDisplay;
}

function append(number) {
    if (currentDisplay === '0' || shouldResetScreen) {
        currentDisplay = '';
        shouldResetScreen = false;
    }
    currentDisplay += number;
    updateDisplay();
}

function clearDisplay() {
    currentDisplay = '0';
    previousDisplay = '';
    operation = null;
    updateDisplay();
}

function deleteLast() {
    currentDisplay = currentDisplay.toString().slice(0, -1);
    if (currentDisplay === '') {
        currentDisplay = '0';
    }
    updateDisplay();
}

function chooseOp(op) {
    if (operation !== null) calculate();
    previousDisplay = currentDisplay;
    operation = op;
    shouldResetScreen = true;
}

function calculate() {
    let computation;
    const prev = parseFloat(previousDisplay);
    const current = parseFloat(currentDisplay);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    currentDisplay = computation.toString();
    operation = null;
    previousDisplay = '';
    updateDisplay();
}

// Esta función se llama desde el HTML con el operador como argumento
// La necesitamos para los botones +, -, *, /, %
function setOperation(op) {
    chooseOp(op);
}

// Sobrescribir la función append para manejar operadores
// Nota: Este código reemplaza la función append anterior si la tienes.
// Pero en este caso, la lógica de operadores se maneja en el HTML con `onclick="setOperation('+')"` etc.
// Para que funcione con el HTML proporcionado, necesitamos una función global `calculate`
// y una función global `append`. Ya están definidas arriba.