const resultEl = document.getElementById("result");
const clilBoardEl = document.getElementById("clipboard");
const btnGenerateEl = document.getElementById("btnGenerate");
const inputLengthEl = document.getElementById("length");
const inputUpperCaseEl = document.getElementById("uppercase");
const inputLowerCaseEl = document.getElementById("lowercase");
const inputNumbersEl = document.getElementById("numbers");
const inputSymbolsEl = document.getElementById("symbols");

clilBoardEl.addEventListener("click", (e) => {
  console.log(resultEl.textContent);
  if (
    resultEl.textContent == undefined ||
    resultEl.textContent.lenght < 4 ||
    resultEl.textContent == ""
  ) {
    alert("No hay nada que copiar al porta papeles!");
  } else {
    navigator.clipboard.writeText(resultEl.textContent);
    alert("Contraseña copiada al portapapeles!");
  }
});
btnGenerateEl.addEventListener("click", generate);

const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "@#$%&/()=?¿ç+";

function generate() {
  if (
    !inputUpperCaseEl.checked &&
    !inputLowerCaseEl.checked &&
    !inputNumbersEl.checked &&
    !inputSymbolsEl.checked
  ) {
    alert("Debes seleccionar algun simbolo!");
    return;
  }
  let randomString = "";
  let lenght = inputLengthEl.value;
  let charGetting = false;
  for (let i = 0; i < lenght; i++) {
    charGetting = false;
    do {
      let randomCharOption = Math.round(Math.random() * 4);
      switch (randomCharOption) {
        case 0:
          if (inputUpperCaseEl.checked) {
            let elemento = getUpperCaseChar();
            randomString += elemento;
            charGetting = true;
          }
          break;
        case 1:
          if (inputLowerCaseEl.checked) {
            let elemento = getLowerCaseChar();
            randomString += elemento;
            charGetting = true;
          }
          break;
        case 2:
          if (inputNumbersEl.checked) {
            let elemento = getNumber();
            randomString += elemento;
            charGetting = true;
          }
          break;
        case 3:
          if (inputSymbolsEl.checked) {
            let elemento = getSymbol();
            randomString += elemento;
            charGetting = true;
          }
          break;
      } //fin switch
    } while (randomString.length < lenght && !charGetting);
  }
  resultEl.innerText = "";
  resultEl.innerText = randomString;
}

function getUpperCaseChar() {
  let randomIndex = Math.floor(Math.random() * letters.length);
  let char = letters.charAt(randomIndex);
  return char;
}
function getLowerCaseChar() {
  let randomIndex = Math.floor(Math.random() * letters.length);
  let charLower = letters.charAt(randomIndex);
  return charLower.toLowerCase();
}
function getNumber() {
  let randomIndex = Math.floor(Math.random() * numbers.length);
  let number = numbers.charAt(randomIndex);
  return number;
}
function getSymbol() {
  let randomIndex = Math.floor(Math.random() * symbols.length);
  let symbol = symbols.charAt(randomIndex);
  return symbol;
}
