function validateInput(n, order) {
  let cmd = 0;
  const input = n;
  const lastInput = display.innerHTML.slice(display.innerHTML.length - 1);
  const opExp = /[+*/.-]/
  const operatorsExp1 = /[+-]/;
  const operatorsExp2 = /[/*]/;
  const bracketsBtn = document.getElementById('brackets');

  if (input == '(') {
    bracketsBtn.setAttribute("onclick", "validateInput(')')");
  } else if (input == ')') {
    bracketsBtn.setAttribute("onclick", "validateInput('(')");
  }
  
  if (order == 1) {
    cmd = 1
    displayInput(cmd, input)
    resetAll()
    return;
  } else if (order == 2) {
    resetAll()
  }

  if (input == 'DEL') {
    cmd = 'DEL';
    displayInput(cmd)
    return;
  }
  if (input == 'AC') {
    cmd = 'AC';
    displayInput(cmd)
    return;
  }

  if ((lastInput.match(operatorsExp2) && input.match(operatorsExp2)) || (lastInput.match(operatorsExp1) && input.match(operatorsExp1))) {
    cmd = 3;
    displayInput(cmd, input)
    return;
  }
  if ((lastInput.match(operatorsExp1) && input.match(operatorsExp2)) ) {
    return;
  }
  if ((input == lastInput && lastInput.match(opExp)) || (lastInput == '(' && input == ')')) {
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
  const display = document.getElementById('display');

  let operation = display.innerHTML;
  let part1, part2;
  const numExp = /[1234567890]/;
  const opExp = /[+*/.-]/;
  const openBracket = operation.search(/[(]/);
  const beforeBracket = openBracket - 1;
  const lastInput = display.innerHTML.slice(display.innerHTML.length - 1);

  if (lastInput.match(opExp)) {
    return;
  }

  if (Boolean(operation.slice(openBracket - 1, openBracket).match(numExp)) == true) {
    part1 = operation.slice(0, beforeBracket + 1);
    part2 = operation.slice(beforeBracket + 1);
    operation = part1 + '*' + part2;
  }

  const calc = new Function('return ' + operation)();

  if (calc.toFixed(2).toString().length > 13) {
    console.log(calc.toString().length)

    display.innerHTML = 'I cant display it!'
    setTimeout(() => display.innerHTML = '', 2000)
    return;
  }

  setOrder()
  display.innerHTML = calc.toFixed(2);
}

function setOrder() {
  const opContainer = ['+', '-', '*', '/', '**', 'AC'];
  const button = document.getElementsByTagName('button');
  let i, c;

  for (i = 0; i < 10; i++) {
    button[i].setAttribute("onclick", `validateInput('${i}', 1)`)
  }
  for (i = 10, c = 0; i < 16, c < 6; i++, c++) {
    button[i].setAttribute("onclick", `validateInput('${opContainer[c]}', 2)`)
  }
}

function resetAll() {
  const opContainer = ['+', '-', '*', '/', '**', 'DEL'];
  const button = document.getElementsByTagName('button');
  let i, c;

  for (i = 0; i < 10; i++) {
    button[i].setAttribute("onclick", `validateInput('${i}')`);
  }
  for (i = 10, c = 0; i < 16, c < 6; i++, c++) {
    button[i].setAttribute("onclick", `validateInput('${opContainer[c]}')`);
  }
}

window.addEventListener('keydown', e => {
  const key = e.key;
  const keyExp = /[1234567890()+-/*.]/;
  let input = key.toString();
  
  if (key == 'r' || key == 'R') {
    input = 'AC'
    validateInput(input)
    return;
  }
  if (key == 'Backspace') {
    input = 'DEL';
    validateInput(input)
  }
  if (key == 'Enter') {
    getAndcalc()
    return;
  }
  if (key.match(keyExp) && key.length == 1) {
    input = key.toString()
    validateInput(input)
  } 
})
