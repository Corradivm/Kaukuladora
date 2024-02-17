function validateInput(n, order) {
  let cmd = 0;
  const input = n;
  const lastInput = display.innerHTML.slice(display.innerHTML.length - 1);
  const regExp = /[+*/.-]/
  const operatorsExp1 = /[+-]/;
  const operatorsExp2 = /[/*]/;
  const bracketsBtn = document.getElementById('brackets');

  if (input == '(') {
    bracketsBtn.setAttribute("onclick", "validateInput(')')")
  } else if (input == ')') {
    bracketsBtn.setAttribute("onclick", "validateInput('(')")
  }
  
  if (order == 1) {
    cmd = 1
    displayInput(cmd, input)
    resetAll()
    return;
  }

  if (input == 'DEL') {
    cmd = 'DEL'
    displayInput(cmd)
    return;
  }
  if (input == 'AC') {
    cmd = 'AC'
    displayInput(cmd)
    return;
  }
  if ((lastInput.match(operatorsExp2) && input.match(operatorsExp2)) || (lastInput.match(operatorsExp1) && input.match(operatorsExp1))) {
    cmd = 3
    displayInput(cmd, input)
    return;
  }
  if ((lastInput.match(operatorsExp1) && input.match(operatorsExp2)) ) {
    return;
  }
  if ((input == lastInput && lastInput.match(regExp)) || (lastInput == '(' && input == ')')) {
    return;
  }
  displayInput(cmd, input)
}

function displayInput(cmd, input) {
  const display = document.getElementById('display');

  if (cmd == 'DEL') {
    display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length - 1);
    return;
  } else if (cmd == 'AC') {
    display.innerHTML = '';
    return;
  } else if (cmd == 1) {
    display.innerHTML = input;
    return;
  } else if (cmd == 3) {
    display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length - 1);
    display.innerHTML += input;
    return;
  }
  display.innerHTML += input;
}

function getAndcalc() {
  let operation = document.getElementById('display').innerHTML;
  let part1, part2;
  const regExp = /[1234567890]/
  const openBracket = operation.search(/[(]/);
  const beforeBracket = openBracket - 1;

  if (Boolean(operation.slice(openBracket - 1, openBracket).match(regExp)) == true) {
    part1 = operation.slice(0, beforeBracket + 1);
    part2 = operation.slice(beforeBracket + 1);
    operation = part1 + '*' + part2;
  }

  const calc = new Function('return ' + operation)();

  if (calc.toString().length > 18) {
    display.innerHTML = 'I cant display it!'
    setTimeout(() => display.innerHTML = '', 2000)
    return;
  }
  
  display.innerHTML = calc;
  setOrder()
}

function setOrder() {
  for (let i = 0; i < 10; i++) {
    document.getElementsByTagName('button')[i].setAttribute("onclick", `validateInput('${i}', 1)`)
  }
}

function resetAll() {
  for (let i = 0; i < 10; i++) {
    document.getElementsByTagName('button')[i].setAttribute("onclick", `validateInput('${i}')`)
  }
}

window.addEventListener('keydown', e => {
  const key = e.key;
  const regExp = /[1234567890+-/*.]/;
  let input = key.toString()
  console.log(key)
  
  if (key == 'Escape') {
    input = 'AC'
    validateInput(input)
    return;
  }
  if (key == 'Backspace') {
    input = 'DEL';
    setOrder()
    validateInput(input)
  }
  if (key == 'Enter') {
    getAndcalc()
    return;
  }
  if (key.match(regExp) && key.length == 1) {
    input = key.toString()
    validateInput(input)
  } 
})
