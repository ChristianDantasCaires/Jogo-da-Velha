const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const gameEndElement = document.getElementById("gameEndElement");
const gameEndMessage = document.querySelector("[data-game-end-message]");
const restartButton = document.getElementById("restartButton");

const xClass = "x";
const oClass = "o";
let xTurn;

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startGame = () => {
    xTurn = true;
    board.classList.add("x");

    cells.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        board.classList.replace("o", "x");

        cell.addEventListener("click", handleClick, { once: true });
    })

    restartButton.addEventListener("click", startGame);
    gameEndElement.classList.remove("show");
    document.querySelector("main").classList.remove("end");
}

const handleClick = (e) => {
    const cell = e.target;
    let turnClass = xTurn ? xClass : oClass;
    placeMark(cell, turnClass);

    if (checkWin(turnClass)) {
        endGame(false);
    }
    else if (checkDraw()) {
        endGame(true);
    }

    swapTurn();
    setBoardHover();
}

const placeMark = (cell, turnClass) => {
    cell.classList.add(turnClass);
}

const swapTurn = () => {
    xTurn = !xTurn;
}

const setBoardHover = () => {
    xTurn ? board.classList.replace("o", "x") : board.classList.replace("x", "o");
}

const checkWin = (turnClass) => {
    return lines.some(line => {
        return line.every(index => {
            return cells[index].classList.contains(turnClass);
        })
    })
}

const checkDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(xClass);
    })
}

const endGame = (draw) => {
    if (draw) {
        gameEndMessage.textContent = "Empatou!";
    }
    else {
        gameEndMessage.textContent = `${xTurn ? "X" : "O"} venceu!`;
    }

    gameEndElement.classList.add("show");

    document.querySelector("main").classList.add("end");
}

startGame();