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
  if (input.innerHTML.length >= 21) { 
    output.innerHTML += '<p>Number of character limits reached!</p>'; 
    return; }
  input.innerHTML += n
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

window.addEventListener('keydown', e => {
  const key = e.key;
  const regExp = /[1234567890*+-./]/i
  
  if (key === 'Enter') {
    calc()
    return;
  } else if (key === 'Backspace') {
    displayControl('del')
    return;
  } else if(!key.match(regExp) || key.length != 1) {
    return;
  }
  displayControl(key.toString())
})