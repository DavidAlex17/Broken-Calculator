class Calculator {
  constructor(firstNumberTextElement, secondNumberTextElement) {
    this.firstNumberTextElement = firstNumberTextElement;
    this.secondNumberTextElement = secondNumberTextElement;
    this.clear();
  }

  // clear function sets variables to empty defaults 
  clear() {
    this.firstNumber = '';
    this.secondNumber = '';
    this.operation = undefined;
  }

  // clicks on a number to add to display
  appendNumber(number) {
    // if number is equal to period symbol && that we dont already have a period symbol
    if (number === '.' && this.secondNumber.includes('.')) return;
    // add string values together
    this.secondNumber = this.secondNumber.toString() + number.toString();
  }

  // clicks on operations
  chooseOperation(operation) {
    // if second operand is empty, then return
    if (this.secondNumber === '') return;
    // if first operand does not equal to empty string, then return compute function
    if (this.firstNumber !== '') {
      this.compute();
    }
    // variable to parameter 
    this.operation = operation;
    // second operand switch to first operand after operation is clicked
    this.firstNumber = this.secondNumber;
    // new second operand will be an empty string
    this.secondNumber = '';
  }

  // take values to compute a single value on display
  compute() {
    let computation;
    const firstNumber = parseFloat(this.firstNumber); // converting first string to number
    const secondNumber = parseFloat(this.secondNumber); // converting second string to number

    // if NaN for first value or NaN for second value, then return to cancel function
    if (isNaN(firstNumber) || isNaN(secondNumber)) return;
    if (this.operation === '+') computation = firstNumber + secondNumber;
    if (this.operation === '-') computation = firstNumber - secondNumber;
    if (this.operation === 'X') computation = firstNumber * secondNumber;
    if (this.operation === '%') computation = firstNumber / secondNumber;
    // second operand = result of computation
    this.secondNumber = computation;
    this.operation = undefined;
    this.firstNumber = '';
  }

  // update values on display
  updateDisplay() {
    // second inner text with default empty string to new string value 
    this.secondNumberTextElement.innerText = this.secondNumber;
    // inner text to concatenate operation symbol if operation symbol is not undefined
    if (this.operation != null) {
      this.firstNumberTextElement.innerText = `${this.firstNumber} ${this.operation}`;
    } else {
      this.firstNumberTextElement.innerText = '';
    }
  }
}

const firstNumberTextElement = document.querySelector('[data-previous-operand');
const secondNumberTextElement = document.querySelector('[data-current-operand]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const calculator = new Calculator(firstNumberTextElement, secondNumberTextElement);

// For each click, operate click event with class of calculator using appendNumber function to change inner text
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    // after button inner text changes--call function updateDisplay to update on the display
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    // after button inner text changes--call function updateDisplay to update on the display
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute(); // call compute function
  calculator.updateDisplay(); // call updateDisplay function
})

allClearButton.addEventListener('click', button => {
  calculator.clear(); // call clear function
  calculator.updateDisplay(); // call updateDisplay function
})