function inputFunction(n) {
  const display = document.getElementById('display');
  const input = n;
  const lastInput = display.innerHTML.slice(display.innerHTML.length - 1);
  const regExp = /[+*/.-]/;

  if (input == 'DEL') {
    display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length - 1);
    return;
  } else if (input == 'AC') {
    display.innerHTML = '';
    return;
  } else if (input == lastInput && lastInput.match(regExp)) {
    return;
  } else if (Boolean(lastInput.match(regExp)) == true && input.match(regExp)) {
    display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length - 1);
    display.innerHTML += input;
    return;
  }
  
  display.innerHTML  += input;
}

function calculate() {
  const operation = document.getElementById('display').innerHTML;
  const calc = new Function('return ' + operation)();
    
   if (calc.toString().length > 18) {
     display.innerHTML = 'I cant display it!'
     setTimeout(() => display.innerHTML = '', 2000)
     return;
   }
   
   display.innerHTML = calc;
}

window.addEventListener('keydown', e => {
  const key = e.key;
  const regExp = /[1234567890+-/*.]/;
  
  if (key.match(regExp) && key.length == 1) {
    inputFunction(key.toString())
  } 
})
