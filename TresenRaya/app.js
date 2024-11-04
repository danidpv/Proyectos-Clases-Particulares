document.addEventListener("DOMContentLoaded", () => {
  //const cells = document.getElementsByClassName("cell");
  const cells = document.querySelectorAll(".cell");
  const turnSpan = document.getElementById("turn");
  const winningMessage = document.getElementById("message");
  const btnPlay = document.getElementById("btnPlay");
  const display = document.getElementById("display");
  const scores = Json.parse(localStorage.getItem("scores"));
  let currentPlayer = "X";
  let playActive = false;
  let segs = 0;
  let mins = 0;
  let hours = 0;
  console.log(scores);

  if (!scores) {
    var data = [];
    localStorage.setItem("scores", JSON.stringify(data));
  }

  function start() {
    if (segs < 59) {
      segs++;
    } else {
      segs = 0;
      if (mins < 59) {
        mins++;
      } else if (hours < 23) {
        mins = 0;
        hours++;
      } else {
        segs = 0;
        mins = 0;
        hours = 0;
      }
    }
    display.textContent = `${hours < 10 ? "0" + hours : hours}: ${
      mins < 10 ? "0" + mins : mins
    }: ${segs < 10 ? "0" + segs : segs}`;
  }

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  turnSpan.textContent = currentPlayer;
  btnPlay.addEventListener("click", play());
  cells.forEach((cell) => {
    cell.addEventListener("click", playerMove);
  });

  function playerMove(event) {
    const cell = event.target;
    if (cell.textContent === "" && !checkWin() && playActive) {
      cell.textContent = currentPlayer;
      if (checkWin()) {
        winningMessage.textContent = `El jugador ${currentPlayer} ha ganado!`;
        playActive = false;
        clearInterval(time);
        let timeDisplay = display.textContent;
        let scores = JSON.parse(localStorage.getItem("scores"));
        scores.push({ player: currentPlayer, time: timeDisplay });
        localStorage.setItem("scores", JSON.stringify(scores));
      } else if (checkDraw()) {
        winningMessage.textContent = "Ha habido empate";
        playActive = false;
        clearInterval(time);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnSpan.textContent = currentPlayer;
      }
    } else {
      alert("Juego detenido, pulsa en jugar");
    }
  }

  function checkWin() {
    /** Some ejecuta un callback y recorre un array hasta que encuentre un true y devuelve un valor true */
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        /**Every recorre un array con otro callback en el cual mira uno a uno los elementos segun la condicion, si la condicion es conrrecta entera
         * devuelve un true si hay una false devuelve automaticamente false
         */
        return cells[index].textContent === currentPlayer;
      });
    });
  }

  function checkDraw() {
    return [...cells].every((cell) => cell.textContent !== "");
    /**Cojo la copia de cells y la recorro entero, si todo es true en cell me duevuelve la copia en true. */
  }
});
function play() {
  //Detener setinterval previo
  segs = 0;
  mins = 0;
  hours = 0;
  display.textContent = `00:00:00`;
  winningMessage.textContent = "";
  currentPlayer = "X";
  playActive = true;
  turnSpan.textContent = currentPlayer;
  cells.forEach((cell) => (cell.textContent = ""));
  time = setInterval(start, 1000);
}
