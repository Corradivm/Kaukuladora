// Parenthesis configuration
// This will give the values to display the brackets correctly,
// since the interface has only one button for '(' and ')'
const configP = {
  activeParen: '(',
  restParen: ')',
  parenCount: 0,
  toClose: false,
  correct() {
    const element = document.getElementById('par');
    
    element.value = this.activeParen;
  }
}

function inputHandler(input) {
  if (input === '=') {
  // Calculates the value of the expression and displays it
    let output;
    try {
      output = calculator();
    } catch (error) {
      displayHandler(error);
      return;
    }

    displayHandler(output);
    return;
  }

  evalInput(input);
}

function displayHandler(output) {
  const display = document.getElementById('main-display');

  if (output === undefined) {
    return;
  } else if (output === Infinity) {
    output = new Error('Value too large');
  } 
  
  if (output instanceof Error) {
    document.getElementById('error-display').innerHTML = output.message;
    return;
  }

  // If 'output' is given from 'calculator', it will have a 'number' type.
  // Keyboard entries are not converted, so they are treated as character strings.
  // Since the calculation is the only 'output' coverted into a number,
  // this conditional will recognize this and then the screen will be cleared
  // and show the result.
  if (typeof output === 'number') {
    display.innerHTML = output;
    return;
  }

  // If output is a string or an action:
  switch (output) {
    case 'Backspace':
      const value = display.innerHTML;
      const newValue = value.slice(0, value.length-1);
      const excludeVal = value.slice(value.length - 1, value.length);

      if (excludeVal === '(') {
        configP.parenCount -= 1;
      } else if (excludeVal === ')') {
        configP.parenCount += 1;
        configP.toClose = true;
      }

      display.innerHTML = newValue;
      break;
    case 'Delete': 
      // Clears the display and reset configP
      display.innerHTML = '';

      // Resets 'configP' properties
      configP.activeParen = '(';
      configP.restParen = ')';
      configP.parenCount = 0;
      configP.toClose = false;
      configP.correct();

      break;
    default:
      display.innerHTML += output;
  }
}

function evalInput(input) {
  const inputRegex = /[0123456789+\-*\/\(\)\^×÷%]|π|e|Delete|Backspace/;
  const inputFRegex = /sin\s+\(|cos\s+\(|tan\s+\(|ln\s+\(|log2\s+\(|log10\s+\(/;
  const f = /f/i; // Prevents entries like 'F5' from being considered
  const numRange = /[0-9]|e|π/;

  // Parenthesis control
  if (input === '(') {
    configP.parenCount += 1;
  }

  if (input === ')' && !(configP.parenCount === 0)) {
    configP.parenCount -= 1;
  } 
  else if (input === ')' && configP.parenCount === 0) 
  {
    const buffer1 = configP.activeParen;
    const buffer2 = configP.restParen;

    configP.activeParen = buffer2;
    configP.restParen = buffer1;
    configP.parenCount = 1;
    configP.toClose = false;
    configP.correct();
    input = '(';
  }
  
  if (numRange.test(input) && configP.toClose === false) {
    const buffer1 = configP.activeParen;
    const buffer2 = configP.restParen;

    configP.activeParen = buffer2;
    configP.restParen = buffer1;
    configP.toClose = true;
    configP.correct();
  }

  // Evaluates and pass to displayHandler()
  if (inputFRegex.test(input) && !f.test(input)) {
		displayHandler(input);
		configP.parenCount += 1;
		
		console.log(configP.parenCount); // To delete
		
	} else if (inputRegex.test(input) && !f.test(input)) {
    displayHandler(input);
  } 
}

function calculator() {
  const errorDisplay = document.getElementById('error-display');
  let expr = document.getElementById('main-display').innerHTML;
  
  errorDisplay.innerHTML = '';

  // Evaluates the expression before calculating it
  try {

    expr = evalExpr(expr);
    console.log(expr); // To delete
    const calculation = new Function('return ' + expr);
    const result = calculation();

    return result;
  }
  catch (error)
  {
    if (error.name === 'SyntaxError') {
      error.message = 'Format error';
    }

    throw error;
  }
}

function evalExpr(expr) {
  const diviByZero = /([0-9]\/0)|([0-9]÷0)/;
  const zeroPwZero = /(0\*\*0)|(0\^0)/;

  try {
    if(diviByZero.test(expr))
    {
      throw new Error('Cannot divide by zero');
    }
    else if (zeroPwZero.test(expr)) 
    {
      throw new Error('0^0 is ambiguous');
    }
  }
  catch (error)
  {
    throw error;
  }

  // Converts characters before the calculation
  if (/\^/.test(expr)) {
    expr = expr.replaceAll(/\^/g, '**');
  }

  if (/×/.test(expr)) {
    expr = expr.replaceAll(/×/g, '*');
  }
  
  if (/÷/.test(expr)) {
    expr = expr.replaceAll(/÷/g, '/');
  }

  if (/%/.test(expr)) {
    expr = expr.replaceAll(/%/g, '/100');
  }
  
  // Converts contants symbols before calculation
  if (/e/.test(expr)) {
	  expr = expr.replaceAll(/e/g, 'Math.E');
	}
	
	if (/π/.test(expr)) {
	  expr = expr.replaceAll(/π/g, 'Math.PI');
	}

  // If 9(5) => 9*(5), if (5)9 => (5)*9 and if (9+2)(3-1) => (9+2)*(3-1)
  // For '(' cases
  if (/9\(/.test(expr)) {
    expr = expr.replaceAll(/9\(/g, '9*(');
  } 
  if (/8\(/.test(expr)) {
    expr = expr.replaceAll(/8\(/g, '8*(');
  }
  if (/7\(/.test(expr)) {
    expr = expr.replaceAll(/7\(/g, '7*(');
  } 
  if (/6\(/.test(expr)) {
    expr = expr.replaceAll(/6\(/g, '6*(');
  } 
  if (/5\(/.test(expr)) {
    expr = expr.replaceAll(/5\(/g, '5*(');
  }
  if (/4\(/.test(expr)) {
    expr = expr.replaceAll(/4\(/g, '4*(');
  }
  if (/3\(/.test(expr)) {
    expr = expr.replaceAll(/3\(/g, '3*(');
  }
  if (/2\(/.test(expr)) {
    expr = expr.replaceAll(/2\(/g, '2*(');
  }
  if (/1\(/.test(expr)) {
    expr = expr.replaceAll(/1\(/g, '1*(');
  }
  if (/0\(/.test(expr)) {
    expr = expr.replaceAll(/0\(/g, '0*(');
  }
  
  // For ')' cases
  if (/\)9/.test(expr)) {
    expr = expr.replaceAll(/\)9/g, ')*9');
  }
  if (/8\(/.test(expr)) {
    expr = expr.replaceAll(/8\(/g, '8*(');
  }
  if (/7\(/.test(expr)) {
    expr = expr.replaceAll(/7\(/g, '7*(');
  }
  if (/6\(/.test(expr)) {
    expr = expr.replaceAll(/6\(/g, '6*(');
  }
  if (/5\(/.test(expr)) {
    expr = expr.replaceAll(/5\(/g, '5*(');
  }
  if (/4\(/.test(expr)) {
    expr = expr.replaceAll(/4\(/g, '4*(');
  }
  if (/3\(/.test(expr)) {
    expr = expr.replaceAll(/3\(/g, '3*(');
  }
  if (/2\(/.test(expr)) {
    expr = expr.replaceAll(/2\(/g, '2*(');
  }
  if (/1\(/.test(expr)) {
    expr = expr.replaceAll(/1\(/g, '1*(');
  }
  if (/0\(/.test(expr)) {
    expr = expr.replaceAll(/0\(/g, '0*(');
  }
  // For ')(' cases
  if (/\)\(/.test(expr)) {
    expr = expr.replaceAll(/\)\(/g, ')*(');
  }
  
  // Converts functions before calculation
  if (/sin\s\(/.test(expr)) {
    expr = expr.replaceAll(/sin\s\(/g, 'Math.sin((Math.PI / 180) *');
  }
  
  if (/cos\s\(/.test(expr)) {
    expr = expr.replaceAll(/cos\s\(/g, 'Math.cos((Math.PI / 180) *');
  }
  
  if (/tan\s\(/.test(expr)) {
    expr = expr.replaceAll(/tan\s\(/g, 'Math.tan((Math.PI / 180) *');
  }
  
  if (/ln\s\(/.test(expr)) {
    expr = expr.replaceAll(/ln\s\(/g, 'Math.log(');
  }
  
  if (/log2\s\(/.test(expr)) {
    expr = expr.replaceAll(/log2\s\(/g, 'Math.log2(');
  }
  
  if (/log10\s\(/.test(expr)) {
    expr = expr.replaceAll(/log10\s\(/g, 'Math.log10(');
  }

  return expr;
}

document.addEventListener('keydown', e => {
  const key = e.key;

  inputHandler(key);
});

document.querySelectorAll('.main-btns-container button').forEach(button => {
  button.addEventListener('click', () => inputHandler(button.value) );
});

document.querySelectorAll('.btns-container button').forEach(button => {
  button.addEventListener('click', () => inputHandler(button.value) );
});
