const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");
const displayedText = document.getElementById("displayedText");
const figureSize = 20;

let boardState = [["", "", ""], ["", "", ""], ["", "", ""]];
let winningStates = [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],
                    [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],
                    [[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]];
let player = ["X", "O"];
let playerTurn = 0;
let gameCount = 0;

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawX(x, y) {
    drawLine(x - figureSize, y - figureSize, x + figureSize, y + figureSize);
    drawLine(x + figureSize, y - figureSize, x - figureSize, y + figureSize);
}

function drawO(x, y) {
    ctx.moveTo(x + figureSize, y);
    ctx.arc(x, y, figureSize, 0, 2 * Math.PI, true);
    ctx.stroke();
}

function drawBoard() {
    drawLine(100, 0, 100, 300);    
    drawLine(200, 0, 200, 300);
    drawLine(0, 100, 300, 100);
    drawLine(0, 200, 300, 200);
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (boardState[i][j] == "X") {
                drawX(i * 100 + 50, j * 100 +50);
            }
            if (boardState[i][j] == "O") {
                drawO(i * 100 + 50, j * 100 +50);
            }
        }
    }
}

function checkWinner() {
    let result = false;
    winningStates.forEach(state => {
        if (boardState[state[0][0]][state[0][1]] === boardState[state[1][0]][state[1][1]] && 
            boardState[state[1][0]][state[1][1]] === boardState[state[2][0]][state[2][1]] && 
            boardState[state[0][0]][state[0][1]] != "") {
                result = true;
            }
    })
    return result;
}

function resetBoard() {
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            boardState[i][j] = "";
        }
    }
}

function startGame() {
    gameCanvas.hidden = false;
    displayedText.hidden = false;
    playerTurn = 0;
    gameCount = 0;
    displayedText.innerHTML = "Player " + (playerTurn + 1) + " to choose!";
    resetBoard();
    ctx.clearRect(0, 0, 300, 300);
    drawBoard();
}

function checkGame(event) {
    let rect = gameCanvas.getBoundingClientRect();
    let mx = Math.floor((event.clientX - rect.left) / 100);
    let my = Math.floor((event.clientY - rect.top) / 100);
    if (boardState[mx][my] == "" && !checkWinner()) {
        boardState[mx][my] = player[playerTurn];
    }
    if (checkWinner()) {
        displayedText.innerHTML = "Player " + (playerTurn + 1) + " wins!";
    } else if (gameCount === 8) {
        displayedText.innerHTML = "Draw game!";
    } else {
        playerTurn = ++playerTurn % 2;
        ++gameCount;
        displayedText.innerHTML = "Player " + (playerTurn + 1) + " to choose!";
    }
    drawBoard();
}