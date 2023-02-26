const drawBoard = () => {
    const squares = Array.from(document.getElementsByClassName('square'));

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
        square.style = styleString
    })
}

drawBoard();