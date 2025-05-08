let display = document.getElementById('display');

document.addEventListener('keydown', function(event) {
  resetIfError();

  const key = event.key;

  if (!isNaN(key)) {
    addNum(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    addOp(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key.toLowerCase() === 'c' || key === 'Escape') {
    clearDisplay();
  } else if (key === '.') {
    appendNumber('.');
  } else if (key === '%') {
    percent();
  } else if (key.toLowerCase() === 'n') {
    toggleSign();
  }
});
function resetIfError() {
  if (display.value === 'Похибка' || display.value === 'Infinity') {
    display.value = "Похибка";
  }
}

function addNum(number) {
  resetIfError();
  display.value += number;
}

function addOp(operator) {
  resetIfError();
  display.value += operator;
}

function clearDisplay() {
  display.value = '';
  document.getElementById('history').textContent = '';
}

function calculate() {
  try {
    const expression = display.value;
    let result = eval(expression);
    if (!isFinite(result)) throw new Error();
    document.getElementById('history').textContent = expression + ' =';

    display.value = result;
  } catch (e) {
    display.value = 'Помилка';
  }
}

function percent() {
  try {
    const current = display.value;
    const operatorMatch = current.match(/([-+]?\d+\.?\d*)([+\-*/])(\d+\.?\d*)$/);

    if (operatorMatch) {
      const [, firstNum, operator, secondNum] = operatorMatch;
      const base = parseFloat(firstNum);
      const percentValue = parseFloat(secondNum);

      let result;

      if (operator === '+' || operator === '-') {
        result = base * percentValue / 100;
        display.value = base + operator + result;
      } else if (operator === '*' || operator === '/') {
        result = percentValue / 100;
        display.value = base + operator + result;
      }
    }
  } catch (e) {
    display.value = 'Помилка';
  }
}

function toggleSign() {
  resetIfError();
  if (display.value.startsWith('-')) {
    display.value = display.value.slice(1);
  } else if (display.value !== '') {
    display.value = '-' + display.value;
  }
}
