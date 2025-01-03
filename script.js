



const board = (function() {
    const board = [];
    const rows = 3;
    const cols = 3;
    let divBoard = document.querySelector(".board")
    
        for (let i = 0; i < rows;  i++) {
            board[i] = [];
            for (let j = 0; j < cols;  j++) {
                board[i][j] = {row: i, col: j, val: null};
                const boardCell = document.createElement('div');
                boardCell.id = `${i}_${j}`;
                boardCell.className = "boardCell";
                divBoard.appendChild(boardCell);
           }
        }
        return board
})();



function displayBoard() {
    console.table(board.map(row => row.map(cell => cell.val)));
}

function createPlayerNames() {
    // let player1Name = prompt('Enter your name Player 1' || 'Player 1');
    // let player2Name = prompt('Enter your name Player 2' || 'Player 2');

    const player1Input = document.querySelector('#p1')
    const player2Input = document.querySelector('#p2')

    let player1Name = player1Input.value || 'Player 1'
    let player2Name = player2Input.value || 'Player 2'


    return {player1Name, player2Name}
}

function createPlayer(name, XorO) {
    return {
        name: name,
        XorO: XorO,
        greet: function() {
            alert(`Welcome ${this.name}! You are ${this.XorO} and are Player 1`)
            }            
        }
}; 

function setUpPlayers() {
    const {player1Name, player2Name} = createPlayerNames();
    const divName1 = document.querySelector("#p1")
    const divName2 = document.querySelector("#p2")

    const player1 = createPlayer(player1Name, 'X');
    const player2 = createPlayer(player2Name, 'O');

    divName1.textContent = player1Name + " ❌";
    divName2.textContent = player2Name + " ⭕";

    return {player1, player2}
}


// winning functions

function checkRow(board) {
    const rows = board.length

    for (let i = 0; i < rows; i++) {
        const row = board[i];
        const firstValue = row[0].val;
        // console.log(`The ${i} row is ${row}`);
        // console.log(row);
        // console.log(`The firstValue is ${firstValue}`);

        if (firstValue !== null &&
            row.every(cell => cell.val === firstValue)
        ) {
            return firstValue;
        }
    }
    return null;

}
function checkColumn(board) {
    for (let i = 0; i < 3; i++) {
        // console.log(`i is ${i}`);
        const firstValue = board[0][i].val;

        if (firstValue === null) {
            continue
        }

        let winningColumn = true;

        for (let j = 0; j < 3; j++) {
            const cell = board[j][i];
            // console.log(`Row ${j}, Column ${i}: ${cell.val}`);

            if (cell.val !== firstValue)  {
                winningColumn = false;
                break;
            }
        }
        if (winningColumn) {
            return firstValue;
        }
    }
    return null
}
function checkDiagonal(board) {
    const topLeftValue = board[0][0].val;
    const topRightValue = board[0][2].val;
    
    if (board[1][1].val === topLeftValue && 
        board[2][2].val === topLeftValue
    ) {
        return topLeftValue;
    } else if (
        board[2][0].val === topRightValue &&
        board[1][1].val === topRightValue
    ) {
        return topRightValue;
    } else {
        return null
    }
}
function win(board) {
    const winningColumn = checkColumn(board);
    const winningDiag = checkDiagonal(board);
    const winningRow = checkRow(board);

    if (winningColumn !== null) {
        console.log(`Winning column with ${winningColumn}`);
        return winningColumn
     } else if (winningRow !== null) {
        console.log(`Winning row with ${winningRow}`);
        return winningRow
     } else if (winningDiag !== null) {
        console.log(`Winning diagonal with ${winningDiag}`);
        return winningDiag
     } else {
        return null
     }
}


// function resetBoard(gameState) {
//     const divCellP = document.querySelectorAll(".boardCell p")

//     divCellP.forEach(p => p.remove());

//     // Reset the board data structure
//     for (let i = 0; i < board.length; i++) {
//         for (let j = 0; j < board[i].length; j++) {
//             board[i][j].val = null;
//         }
//     }
    
//     // Reset the game state
//     gameState.isGameOver = false;
//     gameState.currentPlayer = gameState.player1;

//      // Re-enable the input fields
//      const player1Input = document.querySelector('#p1');
//      const player2Input = document.querySelector('#p2');
//      player1Input.disabled = false;
//      player2Input.disabled = false;
// }


// Create a game state manager
const game = {
    state: null,

    initialize() {
        const startButton = document.querySelector('#start-button');
        startButton.addEventListener('click', () => {
            if (!this.state) {
                this.start();
            }
        });
        
        const resetButton = document.querySelector('#reset-button');
        resetButton.addEventListener('click', () => {
            if (this.state) {
                this.reset();
            }
        });
    },
    
    start() {
        const player1Input = document.querySelector('#p1');
        const player2Input = document.querySelector('#p2');
        
        if (!player1Input.value || !player2Input.value) {
            alert('Please enter names for both players!');
            return;
        }
        
        const {player1, player2} = setUpPlayers();
        
        this.state = {
            currentPlayer: player1,
            player1: player1,
            player2: player2,
            isGameOver: false
        };
        
        player1Input.disabled = true;
        player2Input.disabled = true;
        
        this.setupBoardListeners();
    },

    handleCellClick(event) {
        if (this.state.isGameOver) return;
    
        const [row, col] = event.target.id.split('_').map(Number);
    
        if (board[row][col].val !== null) {
            return; // Cell is already occupied
        }
    
        board[row][col].val = this.state.currentPlayer.XorO;
        createMark(this.state.currentPlayer, row, col);
        console.log(`Current player is ${this.state.currentPlayer.name}`);
    
        if (win(board) !== null) {
            alert(`${this.state.currentPlayer.name} wins! Game over`);
            
            const winningPlayerNameElement = document.querySelector(
                this.state.currentPlayer === this.state.player1 ? '#p1' : '#p2'
            );
            winningPlayerNameElement.classList.add('winner');
            
            this.state.isGameOver = true;
            return;
        }
    
        this.state.currentPlayer = 
            this.state.currentPlayer === this.state.player1
            ? this.state.player2
            : this.state.player1;
    },
    
    reset() {
        // Remove winner class from both players
        document.querySelector('#p1').classList.remove('winner');
        document.querySelector('#p2').classList.remove('winner');

        // Clear the board UI
        const divCellP = document.querySelectorAll(".boardCell p");
        divCellP.forEach(p => p.remove());

        // Reset the board data structure
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j].val = null;
            }
        }
        
        // Reset the game state
        this.state.isGameOver = false;
        this.state.currentPlayer = this.state.player1;

        // Re-enable the input fields
        const player1Input = document.querySelector('#p1');
        const player2Input = document.querySelector('#p2');
        player1Input.disabled = false;
        player2Input.disabled = false;

        // Reset the state itself
        this.state = null;
    },
    
    setupBoardListeners() {
        const gameboard = document.querySelectorAll('.boardCell');
        gameboard.forEach(cell => {
            cell.addEventListener('click', (event) => {
                this.handleCellClick(event);
            });
        });
    }
};

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    game.initialize();
});



function createMark(currentPlayer, userRow, userCol) {
    // let [userRow, userCol] = cellPrompt(currentPlayer);
    const cell = `${userRow}_${userCol}`;
    console.log(`${currentPlayer.name} selected a cell with id ${cell}`)
    const divCell = document.querySelector(`[id = "${cell}"]`)
    const marker = document.createElement("p");
    marker.innerText = currentPlayer.XorO;
    divCell.appendChild(marker);

}


