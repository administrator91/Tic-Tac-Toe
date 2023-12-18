const board = document.getElementById('board');
const resultElement = document.getElementById('result');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let isGameActive = true;
let cells = Array.from({ length: 9 });

// Initialize the board
function initializeBoard() {
    board.innerHTML = '';
    cells = Array.from({ length: 9 });

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(i));
        board.appendChild(cell);
        cells[i] = cell;
    }
}

// Make a move on the board
function makeMove(index) {
    if (!isGameActive || cells[index].textContent !== '') return;

    cells[index].textContent = currentPlayer;
    if (checkWinner()) {
        resultElement.textContent = currentPlayer === 'O' ? 'Administrator wins!😂' : `Yon wins!🎉🥳`;
        isGameActive = false;
    } else if (cells.every(cell => cell.textContent !== '')) {
        resultElement.textContent = 'It\'s a draw!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            // AI makes a move
            makeAIMove();
        }
    }
}

// Check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (
            cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            return true;
        }
    });
}

// AI makes a random move
function makeAIMove() {
    const emptyCells = cells.filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const move = emptyCells[randomIndex];
        setTimeout(() => makeMove(cells.indexOf(move)), 500);
    }
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    isGameActive = true;
    resultElement.textContent = '';
    initializeBoard();
}

// Initialize the game
initializeBoard();
