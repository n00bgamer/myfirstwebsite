let squares = document.querySelectorAll('.square');
let opponentChoice = document.querySelectorAll('input[name="opponent"]');
let results = document.querySelector('#results');
let resetButton = document.querySelector('#reset');
let radioButtons = document.querySelectorAll('input[name="opponent"]');
let player1 = "X";
let player2 = "O";
let currentPlayer = player1;
let gameOver = false;
let selectedOpponent = null;

//Function for radio buttons
for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('change', resetGame);
}

function resetGame() {
  // Clear board
  let squares = document.querySelectorAll('.square');
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = '';
  }

  // Clear results
  let results = document.querySelector('#results');
  results.textContent = '';
}

// Function to switch players
function switchPlayers() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

// Function to check for a win or draw
function checkWin() {
  let winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winCombinations.length; i++) {
    let [a, b, c] = winCombinations[i];
    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    ) {
      results.textContent = `Player ${currentPlayer} wins!`;
      gameOver = true;
      break;
    }
  }
  let draw = [...squares].every(square => square.textContent !== "");
  if (draw && !gameOver) {
    results.textContent = "It's a draw!";
    gameOver = true;
  }
}

// Function to handle a move by the computer
function computerMove() {
  let openSquares = [...squares].filter(square => square.textContent === "");
  let randomIndex = Math.floor(Math.random() * openSquares.length);
  openSquares[randomIndex].textContent = currentPlayer;
  checkWin();
  switchPlayers();
}

// Function to handle a click on a square
function handleClick(e) {
  if (gameOver) {
    results.textContent = "Please reset the game.";
    return;
  }
  if (selectedOpponent) {
    results.textContent = "";
  } else {
    results.textContent = "Please select an opponent.";
    return;
  }
  if (e.target.textContent === "" && !gameOver) {
    e.target.textContent = currentPlayer;
    checkWin();
    switchPlayers();
    if (selectedOpponent === "computer" && !gameOver) {
    checkWin();
    computerMove();
    }
  }
}

// Event listeners for opponent choice and square clicks
opponentChoice.forEach(choice =>
  choice.addEventListener("change", () => {
    selectedOpponent = choice.value;
    gameOver = false;
    results.textContent = "";
  })
);
squares.forEach(square => square.textContent = "");
squares.forEach(square => square.addEventListener("click", handleClick));

// Reset button event listener
resetButton.addEventListener("click", function() {
  squares.forEach(square => (square.textContent = ""));
  results.textContent = "";
  gameOver = false;
  currentPlayer = player1;

  squares.forEach(square => square.classList.remove('red'));
});