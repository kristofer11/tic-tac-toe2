//Variables to track turn and winner states.
let player1 = {
    isTurn: true,
    isWinner: false
}

let player2 = {
    isTurn: false,
    isWinner: false
}

//Array tracks whether X or O has claimed a square
const gameBoard = {
    spaces: [null, null, null, null, null, null, null, null, null]
};

//Checks every possible winning scenario and changes player's winning state if condition is met
function checkWinner() {
    const winner = 'x';
    const turnIndicator = document.querySelector('#turnIndicator');

    //Changes turn indicator into a declaration of the winner
    const declareWinner = (player) => {
        const title = document.querySelector('#title');

        turnIndicator.textContent = `${player}, you win!`
        turnIndicator.style.color = 'red';
        turnIndicator.style.border = '2px dashed red';
        turnIndicator.style.alignSelf = 'center';
        turnIndicator.style.fontSize = '4rem';
        title.style.display = 'none'
    };

    const declareTie = () => {
        turnIndicator.textContent = 'No one wins, it is a TIE!';
        turnIndicator.style.color = 'red';
        turnIndicator.style.alignSelf = 'center';
    }

    if (
        (gameBoard.spaces[0] === 'x' && gameBoard.spaces[1] === 'x' && gameBoard.spaces[2] === 'x') ||
        (gameBoard.spaces[0] === 'x' && gameBoard.spaces[3] === 'x' && gameBoard.spaces[6] === 'x') ||
        (gameBoard.spaces[0] === 'x' && gameBoard.spaces[4] === 'x' && gameBoard.spaces[8] === 'x') ||
        (gameBoard.spaces[1] === 'x' && gameBoard.spaces[4] === 'x' && gameBoard.spaces[7] === 'x') ||
        (gameBoard.spaces[2] === 'x' && gameBoard.spaces[5] === 'x' && gameBoard.spaces[8] === 'x') ||
        (gameBoard.spaces[2] === 'x' && gameBoard.spaces[4] === 'x' && gameBoard.spaces[6] === 'x') ||
        (gameBoard.spaces[3] === 'x' && gameBoard.spaces[4] === 'x' && gameBoard.spaces[5] === 'x') ||
        (gameBoard.spaces[6] === 'x' && gameBoard.spaces[7] === 'x' && gameBoard.spaces[8] === 'x')
    ) {
        player1.isWinner = true;
        player1.isTurn = false;
        player2.isTurn = false;
    } else if (
        (gameBoard.spaces[0] === 'o' && gameBoard.spaces[1] === 'o' && gameBoard.spaces[2] === 'o') ||
        (gameBoard.spaces[0] === 'o' && gameBoard.spaces[3] === 'o' && gameBoard.spaces[6] === 'o') ||
        (gameBoard.spaces[0] === 'o' && gameBoard.spaces[4] === 'o' && gameBoard.spaces[8] === 'o') ||
        (gameBoard.spaces[1] === 'o' && gameBoard.spaces[4] === 'o' && gameBoard.spaces[7] === 'o') ||
        (gameBoard.spaces[2] === 'o' && gameBoard.spaces[5] === 'o' && gameBoard.spaces[8] === 'o') ||
        (gameBoard.spaces[2] === 'o' && gameBoard.spaces[4] === 'o' && gameBoard.spaces[6] === 'o') ||
        (gameBoard.spaces[3] === 'o' && gameBoard.spaces[4] === 'o' && gameBoard.spaces[5] === 'o') ||
        (gameBoard.spaces[6] === 'o' && gameBoard.spaces[7] === 'o' && gameBoard.spaces[8] === 'o')
    ) {
        player2.isWinner = true;
        player1.isTurn = false;
        player2.isTurn = false;
    } else if (
        gameBoard.spaces[0] &&
        gameBoard.spaces[1] &&
        gameBoard.spaces[2] &&
        gameBoard.spaces[3] &&
        gameBoard.spaces[4] &&
        gameBoard.spaces[5] &&
        gameBoard.spaces[6] &&
        gameBoard.spaces[7] &&
        gameBoard.spaces[8]
    ){
        player1.isTurn = false;
        player2.isTurn = false;
        declareTie();
    } else {
        return
    }
    if (player1.isWinner) {
        declareWinner('Player 1 (X)')
    };
    if (player2.isWinner) {
        declareWinner('Player 2 (O)')
    }
};

//Module containing game play logic.
const displayBoard = (() => {
    const squares = Array.from(document.getElementsByClassName('square'))

    const drawBoard = () => {
        const restartBtn = document.querySelector('#restartBtn');
        restartBtn.addEventListener('click', displayBoard.resetBoard)

        squares.forEach((square, index) => {
            let styleString = '';

            if (index < 3) {
                styleString += 'border-bottom: 3px solid var(--green, purple);';
            }
            if (index % 3 === 0) {
                styleString += 'border-right: 3px solid var(--green);'
            }
            if (index % 3 === 2) {
                styleString += 'border-left: 3px solid var(--green);'
            }
            if (index > 5) {
                styleString += 'border-top: 3px solid var(--green);'
            }
            if (gameBoard.spaces[index] === 'x') {
                square.textContent = 'X';
            }
            if (gameBoard.spaces[index] === 'o') {
                square.textContent = 'O'
            }
            if (gameBoard.spaces[index] === null) {
                square.textContent = ''
            }
            square.style = styleString;
            square.addEventListener('click', squareClicked);
        })
    };

    const displayTurn = (player) => {
        const turnIndicator = document.querySelector('#turnIndicator');
        turnIndicator.textContent = `${player}, you may take your turn.`
    };

    const resetBoard = () => {
        const title = document.querySelector('#title');
        const turnIndicator = document.querySelector('#turnIndicator');

        gameBoard.spaces = [null, null, null, null, null, null, null, null, null];
        player1 = {
            isTurn: true,
            isWinner: false
        };
        player2 = {
            isTurn: false,
            isWinner: false
        }
        console.log(gameBoard.spaces);
        displayBoard.drawBoard();
        turnIndicator.textContent = `Player 1 go first, you'll be "X"`;
        turnIndicator.style.border = '2px solid var(--green)';
        turnIndicator.style.color = 'var(--green)';
        turnIndicator.style.fontSize = '1rem';
        title.style.display = 'flex';
    }

    return {
        drawBoard,
        displayTurn,
        resetBoard
    };
})();

const squareClicked = (e) => {
    const turnIndicator = document.querySelector('#turnIndicator');
    const id = e.target.id

    if (!gameBoard.spaces[id]) {
        if (player1.isTurn) {
            gameBoard.spaces[id] = 'x';
            e.target.textContent = 'X';
            e.target.style.backgroundColor = '#eb07b911';
            turnIndicator.style.alignSelf = 'end';
        }
        if (player2.isTurn) {
            gameBoard.spaces[id] = 'o';
            e.target.textContent = 'O';
            e.target.style.backgroundColor = '#0779eb11';
            turnIndicator.style.alignSelf = 'start';
        }
    }
    e.target.removeEventListener('click', squareClicked);
    checkWinner();
    toggleTurn();
};

function toggleTurn() {
    if (player1.isTurn) {
        player1.isTurn = false;
        player2.isTurn = true;
        displayBoard.displayTurn('Player 2')
        console.log(`P1 turn: ${player1.isTurn}; P2 turn: ${player2.isTurn}`)
    } else if (player2.isTurn) {
        player2.isTurn = false;
        player1.isTurn = true;
        displayBoard.displayTurn('Player 1')
        console.log(`P1 turn: ${player1.isTurn}; P2 turn: ${player2.isTurn}`)
    } else {
        return
    }
    console.log(gameBoard.spaces)
};

displayBoard.drawBoard()

