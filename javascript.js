let boxes = document.querySelectorAll(".box");
let turnText = document.getElementById("turn");
let timerText = document.getElementById("timer");

let currentPlayer = "X";
let gameActive = true;
let timer;
let timeLeft = 10;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // columns
  [0,4,8], [2,4,6]            // diagonals
];

// Start 10-sec timer
function startTimer() {
  clearInterval(timer); // clear existing
  timeLeft = 10;
  timerText.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      switchPlayer(); // auto switch turn if time out
    }
  }, 1000);
}

// Switch turn
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnText.textContent = `Player ${currentPlayer === "X" ? 1 : 2}'s Turn`;
  startTimer();
}

// Check if player has won
function checkWin() {
  for (let pattern of winPatterns) {
    let [a,b,c] = pattern;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      gameActive = false;
      clearInterval(timer);
      turnText.textContent = `🎉 Player ${currentPlayer === "X" ? 1 : 2} Wins!`;
      strikeLine(pattern);
      return;
    }
  }

  let filled = [...boxes].every(box => box.textContent !== "");
  if (filled) {
    gameActive = false;
    clearInterval(timer);
    turnText.textContent = `It's a Draw!`;
  }
}

// On click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameActive || box.textContent !== "") return;
    box.textContent = currentPlayer;
    checkWin();
    if (gameActive) switchPlayer();
  });
});

function resetGame() {
  boxes.forEach((box) => (box.textContent = ""));
  gameActive = true;
  currentPlayer = "X";
  turnText.textContent = "Player 1's Turn";
  startTimer();
}


let resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Game";
resetBtn.style.marginTop = "15px";
resetBtn.onclick = resetGame;
document.body.appendChild(resetBtn);

startTimer();