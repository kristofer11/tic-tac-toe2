//Track who's turn it is, player 1(x) or player 2(o)
//Allow player to make selection and toggle turn. check for win or tie.
const player1 = {
    isTurn: true,
    isWinner: true
}

const player2 = {
    isTurn: false,
    isWinner: false
}

const gameBoard = {
    spaces: ['x', 'x', 'x', null, null, null, null, null, null]
};

function checkWinner() {
    const winner = 'x';
    const declareWinner = (player) => {
        console.log(`${player} is the winner!`)
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
    } else {
        return
    }
    if (player1.isWinner) {
        declareWinner('Player1')
    };
    if (player2.isWinner) {
        declareWinner('Player 2')
    }
};

//This call needs to be within gameplay. Remove here after dev.
checkWinner(); 

function gamePlay() {
    const turnIndicator = document.querySelector('#turnIndicator');
    const winner = false;
    if (player1.isTurn === true) {
        console.log('player 1 turn')
        turnIndicator.textContent = "Player 1 (X), it is your turn"
    }
    // if (gameBoard.gameBoard.spaces[choice]) {
    //     console.log(`Error! Space ${choice} is already taken!`)
    // } else {
    //     gameBoard.gameBoard.spaces[choice] = choice;
    //     console.log(`You chose space ${choice}`)
    // }
}


gamePlay();


















const displayBoard = (() => {
    const squares = Array.from(document.getElementsByClassName('square')) 

    const drawBoard = () => {
        squares.forEach((square, index) => {
            let styleString = '';
            if (index < 3) {
                styleString += 'border-bottom: 3px solid var(--purple);';
            }
            if (index % 3 === 0) {
                styleString += 'border-right: 3px solid var(--purple);'
            }
            if (index % 3 === 2) {
                styleString += 'border-left: 3px solid var(--purple);'
            }
            if (index > 5) {
                styleString += 'border-top: 3px solid var(--purple);'
            }
            if (gameBoard.spaces[index] === null) {
                styleString += 'background-color: lightgrey;'
            }
            if (gameBoard.spaces[index] === 'x') {
                square.textContent = 'X'
            }
            if (gameBoard.spaces[index] === 'o') {
                square.textContent = 'O'
            }
            square.style = styleString;
            square.addEventListener('click', squareClicked);
        })
    }
    return {
        drawBoard
    };
})();

const squareClicked  = (e) => {
    const id = e.target.id
    console.log(id);
};
displayBoard.drawBoard()
