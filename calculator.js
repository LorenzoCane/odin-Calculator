/*
Project: Calculator - Odin Project Foundation
Author : Lorenzo Cane

Last version: 20/01/2026
*/

// ======================================================
// CONSTANTS & VARAIBLES
const log = console.log;
const sep = '-----------------------------------------';

const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const decimalBtn = document.querySelector('.decimal');
const equalBtn = document.querySelector('#equals');
const clearBtn =  document.querySelector('.clear');
const allCleanBtn = document.querySelector('.allClean');

const userInput = document.querySelector('#userInput');
const resultDisplay = document.querySelector('#results');


//Check
log('Digit Buttons:' + digitBtns);
log(sep);
log('Operator Buttons:' + operatorBtns);
log(sep);
log('Equal Buttons:' + equalBtn);
log(sep);
log('Decimal Buttons:' + decimalBtn);
log(sep);
log('Clean Buttons:' + clearBtn);
log(sep);
log('AllClean Buttons:' + allCleanBtn);
log(sep);

//--------------------------------------------------------
var firstValue = '';
var secondValue = '';
var operatorValue = '';

const maxDigits = 10000000000;

var decimalIsOn = false;
var secValIsOn = false;

let operatorsMap = {
    '+': function(a,b){ return a+b },
    '-': function(a,b){ return a-b },
    '*': function(a,b){ return a*b },
    '/': function(a,b){ return a/b },   
};

// ======================================================
// FUNCTIONS

// Check lenght, concatenates the user input to the current value and returns the new value.
function updateValue(currentValue, userInput){
    if (currentValue.length >= maxDigits){
        alert('Maximum number of digits reached');
        return currentValue;
    }
    var newValue = currentValue.toString() + userInput.toString();
    return newValue
}

// Main function, takes the two values and the operator, checks if they are valid and returns the result of the operation.
function operate(firstValue, secondValue, operatorValue){
    if (firstValue === '' || secondValue === '' || operatorValue === ''){
        // Missing values check.
        alert('Please insert two values and an operator before pressing equals');
    }
    if (secondValue === '0' && operatorValue === '/'){
        // Division by zero, reset the calculator and alert the user.
        cleanAll();
        log('Division by zero');
        alert('Division by zero is not allowed. Press OK to reset the calculator');
        return "NaN";
    }
    var number1 = Number(firstValue);
    var number2 = Number(secondValue);

    result = parseFloat(operatorsMap[operatorValue](number1, number2).toFixed(10));
    firstValue = result;
    secValIsOn = true;

    return result.toString();
}

// Updates the display with the current values and operator.
function updateDisplay(value){
    userInput.textContent = firstValue + "" + operatorValue + "" +  secondValue;
}

// Utility functions to check if the second value is present
function checkSecondValue(){
    if (secondValue === ''){
        return false;
    } else {
        return true;
    }
}

// Utility function to check if the current value already has a decimal point, to prevent multiple decimals in the same number.
function checkDecimal(currentValue){
    if (currentValue.includes('.')){
        return true;
    } else {
        return false;
    }
}


function cleanAll(){
    firstValue = '';
    secondValue = '';
    operatorValue = '';
    secValIsOn = false;
    decimalIsOn = false;
    userInput.textContent = 'Insert value';
    resultDisplay.textContent = '0';
}


// ======================================================
// ACTIONS

digitBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        log('Digit Button Pressed');
        var value = e.target.value;
        if (secValIsOn){
            secondValue = updateValue(secondValue, value);
            log('Second Value: ' + secondValue);
        } else {
            firstValue = updateValue(firstValue, value);
            log('First Value: ' + firstValue);
        }
        updateDisplay();
    })
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        log('Operator Button Pressed');
        if (checkSecondValue()){
            var result = operate(firstValue, secondValue, operatorValue);
            firstValue = result;
            secondValue = '';
            resultDisplay.textContent = firstValue;
        } else if (firstValue === ''){
            firstValue = 0;
        } 
        var value = e.target.value;
        operatorValue = value;
        log('Operator Value: ' + operatorValue);
        updateDisplay();
        secValIsOn = true;  
    })
});

equalBtn.addEventListener('click', function(e){
    log('Equal Button Pressed');
    var result = operate(firstValue, secondValue, operatorValue);
    if (result === "NaN"){;
        return;
    }
    resultDisplay.textContent = result;
    firstValue = result;
    operatorValue = '';
    secondValue = '';
    resultDisplay.textContent = firstValue;
    updateDisplay();
});

allCleanBtn.addEventListener('click', function(e){
    log('All Clean Button Pressed');
    cleanAll();
});

clearBtn.addEventListener('click', function(e){
    log('Clean Button Pressed');
    if (secValIsOn){
        secondValue = '';
    } else {
        firstValue = '';
    }
    updateDisplay();
});

decimalBtn.addEventListener('click', function(e){
    log('Decimal Button Pressed');
    if (secValIsOn){
        currentValue = secondValue;
    } else {
        currentValue = firstValue;
    }
    if (checkDecimal(currentValue)){
        alert('Decimal point already present');
        return;
    }
    if (currentValue === ''){
        currentValue = '0';
    }
    currentValue = updateValue(currentValue, '.');
    if (secValIsOn){
        secondValue = currentValue;
    } else {
        firstValue = currentValue;
    }
    updateDisplay();    
});