const displayContent = document.querySelector(".display-content");
const calcProcessDisplay = document.querySelector(".calc-process");
const allDigitBtns = document.querySelectorAll(".digit");
const allOperatorBtns = document.querySelectorAll(".operand");
const equalToBtn = document.querySelector(".equal-to-btn");
const exponentBtn = document.querySelector(".exponent-btn");
const clearBtn = document.querySelector(".clear-btn");
const backspaceBtn = document.querySelector(".backspace-btn");
const decimalBtn = document.querySelector(".decimal-btn");
const plusMinusBtn = document.querySelector(".plus-minus-btn");
let firstVariable;
let secondVariable;
let operator;
let prevOperand;

document.addEventListener("keydown", handleKeyboardInput);
clearBtn.addEventListener("click", clear);
decimalBtn.addEventListener("click", checkDecimal);
backspaceBtn.addEventListener("click", backSpace);
equalToBtn.addEventListener("click", calculate);

allDigitBtns.forEach((btn) => {
  btn.addEventListener("click", () => updateDisplay(btn.value));
});

allOperatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => getOperator(btn.value));
});

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
    if (b === 0){
        displayContent.textContent = "Dey play!😏";
        calcProcessDisplay.textContent = "";
        setTimeout(reset, 750)
        return
    }
  return a / b;
}
function exponential2(a) {
  return +(a * a).toFixed(6);
}
function operate(a, b, operated) {
  const result = operated(a, b);
  return +result.toFixed(6);
}

function updateDisplay(number) {
  displayContent.textContent += number;
}

function getOperator(btn) {
  let btnText;

  if (btn === "+") {
    btnText = "+";
    operator = add;
  } else if (btn === "-") {
    btnText = "-";
    operator = subtract;
  } else if (btn === "*") {
    btnText = "x";
    operator = multiply;
  } else if (btn === "/") {
    btnText = "÷";
    operator = divide;
  }
  // Checking for text longer than display screen (just because don't stress me biko)
  if (displayContent.textContent.length > 12) {
    displayContent.textContent = "Dey play!😏";
    calcProcessDisplay.textContent = "I'm just a simple calculator🙄";
    return;
  }
  // Trying to make app calculate when operator is clicked after first set of calculations...
  if (firstVariable && !calcProcessDisplay.textContent.includes("=")) {
    if (displayContent.textContent === 0) return;
    secondVariable = Number(displayContent.textContent);
    const result = operate(firstVariable, secondVariable, prevOperand);
    calcProcessDisplay.textContent = `${result} ${btnText}`;
    displayContent.textContent = "";
    firstVariable = result;
    prevOperand = operator;
  } else {
    prevOperand = operator;
    firstVariable = Number(displayContent.textContent);
    calcProcessDisplay.textContent = `${firstVariable} ${btnText}`;
    displayContent.textContent = "";
  }
}

function calculate() {
  if (
    calcProcessDisplay.textContent.includes("=") ||
    !calcProcessDisplay.textContent
  ) {
    return;
  }
  secondVariable = Number(displayContent.textContent);
  calcProcessDisplay.textContent += ` ${secondVariable} =`;
  const result = operate(firstVariable, secondVariable, operator);
  displayContent.textContent = result;
  firstVariable = result;
  secondVariable = 0;
}

// Clear Button Functionality
function clear() {
  firstVariable = 0;
  secondVariable = 0;
  displayContent.textContent = "";
  calcProcessDisplay.textContent = "";
}

// Backspace functionality
function backSpace() {
  let str = displayContent.textContent;
  displayContent.textContent = str.substring(0, str.length - 1);
}

// Decimal point button functionality
function checkDecimal() {
  if (displayContent.textContent.includes(".")) {
    return;
  } else {
    displayContent.textContent += ".";
  }
}

// square root btn functionality
exponentBtn.addEventListener("click", () => {
  if (displayContent.textContent) {
    let a = Number(displayContent.textContent);
    displayContent.textContent = exponential2(a);
    calcProcessDisplay.textContent = `${a}² =`;
  }
});

// Plus Minus btn functionality
plusMinusBtn.addEventListener("click", () => {
  if (displayContent.textContent.includes("-")) {
    displayContent.textContent = displayContent.textContent.slice(1);
  } else {
    displayContent.textContent = "-" + displayContent.textContent;
  }
});

// Handling Keyboard Input
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) updateDisplay(e.key);
  if (e.key === ".") checkDecimal();
  if (e.key === "=" || e.key === "Enter") calculate();
  if (e.key === "Backspace") backSpace();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    getOperator(e.key);
}

function reset(){
    displayContent.textContent = ''
}