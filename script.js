// Game Flow object (module pattern)
const GameFlow = (() => {
  const gameState = {
    xTurn: true,
    xState: [],
    oState: [],
    winningStates: [
      // rows
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      // columns
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      // diagonal
      ["0", "4", "8"],
      ["2", "4", "6"],
    ],
  };

  const restart = () => {
    gameState.xTurn = true;
    gameState.xState = [];
    gameState.oState = [];
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.remove("x");
      cells[i].classList.remove("o");
    }
  };

  const init = () => {
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", restart);
  };

  const checkWinner = () => {
    gameState.winningStates.forEach((winningState) => {
      const xWins = winningState.every((state) =>
        gameState.xState.includes(state)
      );
      const oWins = winningState.every((state) =>
        gameState.oState.includes(state)
      );

      // If someone has won
      if (xWins || oWins) {
        console.log("We have a winner!");
        const winnerText = document.getElementById("winnerText");
        winnerText.textContent = xWins
          ? "Player 1 has won!"
          : "Player 2 has won!";
      }
    });
  };
  return {
    init,
    gameState,
    checkWinner,
  };
})();

// Gameboard object (module pattern)
const Gameboard = (() => {
  const board = Array(3)
    .fill()
    .map(() => Array(3).fill(""));

  const renderBoard = () => {
    // Used to count number of cell
    let cellCount = 0;

    // Display board on page
    const gameboard = document.getElementById("gameboard");

    // Render the cells
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("data-value", `${cellCount}`);

        // Add click event listener
        cell.addEventListener("click", addMark);

        gameboard.appendChild(cell);
        cellCount++;
      }
    }
  };
  const addMark = (e) => {
    const cell = e.target;
    const cellValue = cell.getAttribute("data-value");

    if (cell.classList == "cell x" || cell.classList == "cell o") {
      cell.classList.add("disabled");
      return;
    }

    if (GameFlow.gameState.xTurn === true) {
      cell.classList.add("x");
      GameFlow.gameState.xState.push(cellValue);
    } else {
      cell.classList.add("o");
      GameFlow.gameState.oState.push(cellValue);
    }
    GameFlow.gameState.xTurn = !GameFlow.gameState.xTurn;

    // Check winner through GameFlow
    GameFlow.checkWinner();
  };

  return {
    renderBoard,
  };
})();

// Player object (factory function)
const Player = () => {};

/* ~~~This is where my code runs~~~ */
// Create the game
Gameboard.renderBoard();

// Add event listeners to clear button
GameFlow.init();
