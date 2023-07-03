const displayContent = document.querySelector(".display-content")
const calcProcessDisplay = document.querySelector(".calc-process")
const allDigitBtns = document.querySelectorAll('.digit')
const allOperatorBtns = document.querySelectorAll('.operand')
const equalToBtn = document.querySelector('.equal-to-btn')
const exponentBtn = document.querySelector('.exponent-btn')
const clearBtn= document.querySelector('.clear-btn')
const backspaceBtn = document.querySelector('.backspace-btn')
const decimalBtn = document.querySelector('.decimal-btn')
const plusMinusBtn =  document.querySelector('.plus-minus-btn')
let firstVariable 
let secondVariable
let operator 


function add (a, b){
    return a + b
}
function subtract (a, b){
    return a - b
}
function multiply (a, b){
    return a * b
}
function divide (a, b){
    return a / b
}
function exponential2 (a){
    return a * a
}
 function operate (a, b, operated){
   const result = operated (a, b);
   return result
 }

 function updateDisplay(){
    allDigitBtns.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
           return displayContent.textContent += btn.value;
        })
    })
 }

 function getOperator(){
    updateDisplay()
    allOperatorBtns.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            firstVariable = Number(displayContent.textContent);
            calcProcessDisplay.textContent = `${firstVariable} ${btn.value}`
            displayContent.textContent = ''
            if (btn.value === '+'){
                operator = add
            } else if (btn.value === '-'){
                operator = subtract
            } else if (btn.value === 'x'){
                operator = multiply
            } else if (btn.value === '÷'){
                operator = divide
            }
        })
    })
 }

 function calculate (){
    getOperator()
    equalToBtn.addEventListener('click', ()=>{
        // if (firstVariable === undefined || secondVariable === 0 || operator === undefined){
        //     return
        // }
        // if(firstVariable > 100000000000 || secondVariable > 100000000000){
        //     calcProcessDisplay.textContent = ""
        //     displayContent.textContent = "Dey Play!"
        //     return
        // } else if (secondVariable === 0 && operator === divide){
        //     calcProcessDisplay.textContent = ""
        //     displayContent.textContent = "Dey Play!😏"
        //     return
        // } 
       secondVariable = Number(displayContent.textContent) 
       calcProcessDisplay.textContent += ` ${secondVariable} =`
       const result = operate(firstVariable, secondVariable, operator)
       displayContent.textContent = result
    })
 }


// Clear Button Functionality

clearBtn.addEventListener('click', ()=>{
    firstVariable = 0
    secondVariable = 0
    displayContent.textContent = ''
    calcProcessDisplay.textContent = ''
})

// Backspace functionality
backspaceBtn.addEventListener('click', ()=>{
   let str = displayContent.textContent
   displayContent.textContent = str.substring(0, str.length-1)
})
// Decimal point button functionality
function checkDecimal(){
    decimalBtn.addEventListener('click', ()=>{
        if (displayContent.textContent.includes(".")){
            return
        } else {displayContent.textContent += "."}
    })
}
// square root btn functionality

exponentBtn.addEventListener('click', ()=>{
    if (displayContent.textContent){
        let a = Number(displayContent.textContent)
        displayContent.textContent = exponential2(a)
        calcProcessDisplay.textContent = `${a}² =`
    }
    
})


plusMinusBtn.addEventListener('click', ()=>{
    if (displayContent.textContent.includes('-')){
        displayContent.textContent = displayContent.textContent.slice(1)
    } else {
        displayContent.textContent = "-" + displayContent.textContent
    }
})


checkDecimal()
 calculate()