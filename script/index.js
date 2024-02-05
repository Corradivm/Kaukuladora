function displayControl(n) {
  const input = document.getElementById('input');
  let output = document.getElementById('output');
  // controles
  if (n === 'del') {
    input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length - 1)
    return;
  } else if (n === 'reset') {
    input.innerHTML = '';
    output.innerHTML = '';
    return;
  }
  // limite
  if (input.innerHTML.length >= 16) { 
    output.innerHTML += '<p>Number of character limits reached!</p>'; 
    return; }
  input.innerHTML += `${n}`
}

function calc() {
  let input = document.getElementById('input');
  let output = document.getElementById('output') ;
  const result = eval(input.innerHTML);

  if (result == input.innerHTML || result == undefined) { return; } else 
  {
    output.innerHTML += `<p>${result}</p>`
    input.innerHTML = '';
  }
}

document.addEventListener('keydown', (e) => {
  let key = e.key
  console.log(key)
  
  if (key.match(/[0-9]/).length == 1) {
    return displayControl(key);;
  } else {
    return;
  }
}) 

/*
 Quando tento colocar outras expressões como [/+-*] para a calculadora receber os operadores o console retorna: "key.match() is null".
 Solucionar isso mais tarde!
*/