// Player Factory Function
const createPlayer = (name, symbol) => {
    return { name, symbol }
}

// Game Board Object
const gameBoard = (() => {
    let board = []
    for (i = 0; i < 9; i++) {
        board.push('');
    }

    let squares = document.querySelector('.squares');

    board.forEach((item, index) => {
        const square = document.createElement('div');
        square.className = 'square';
        squares.appendChild(square);
    })

    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
            square.classList.add(game.activePlayer.symbol);
            square.setAttribute('data', game.activePlayer.symbol);
            board[index] = game.activePlayer.symbol;
            square.style.pointerEvents = 'none';
            game.remainingSpots -= 1;

            game.checkWinner();
            if (game.winnerDeclared == false) {
                if (game.remainingSpots > 0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if (game.remainingSpots == 0) {
                    game.tieGame();
                }
            }
        })
    });

    let reset = document.querySelector('.btnReset')
    reset.addEventListener('click', () => {
        location.reload();
        return false;
    })

    return {
        board
    };
})();

// Game Object
const game = (() => {
    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');

    let activePlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;

    let gameInfo = document.querySelector('.gameInfo');
    let playerName = document.querySelector('.activePlayer');

    const winningMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    function checkWinner() {
        winningMoves.forEach((item, index) => {
            if (gameBoard.board[item[0]] === this.activePlayer.symbol &&
                gameBoard.board[item[1]] === this.activePlayer.symbol &&
                gameBoard.board[item[2]] === this.activePlayer.symbol) {
                gameInfo.innerHTML = `<b>${this.activePlayer.name} wins!</b>`
                this.winnerDeclared = true;
            }
        })
    }

    function alertNextPlayer() {
        this.activePlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1';
    }

    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
    }

    function tieGame() {
        gameInfo.textContent = 'Tie Game!'
    }

    return {
        activePlayer,
        winnerDeclared,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        tieGame
    };
})();

