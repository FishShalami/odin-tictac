



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
    let player1Name = prompt('Enter your name Player 1' || 'Player 1');
    let player2Name = prompt('Enter your name Player 2' || 'Player 2');
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


// function cellSelect(currentPlayer, callback) {
//     const gameboard = document.querySelectorAll('.boardCell');

//     gameboard.forEach(cell => {
//         cell.addEventListener('click', function() {
//             const [userRow, userCol] = this.id.split('-').map(Number);
//             console.log([userRow, userCol]);
            
//             callback(currentPlayer, userRow, userCol);
//         });
//     });

// }

// function cellPrompt(currentPlayer) {
//     let userRow = prompt(`${currentPlayer.name} enter row number 0, 1, 2:`);
//     if (userRow === null) {
//         return; //break out of the function early
//     }
//     let userCol = prompt(`${currentPlayer.name} enter column number 0, 1, 2:`);
//     if (userCol === null) {
//         return; //break out of the function early
//     }
//     return [Number(userRow), Number(userCol)];
// }




// function playTurn(currentPlayer) {
//     let [userRow, userCol] = cellPrompt(currentPlayer);
//     console.log(`${currentPlayer} selected cell: ${userRow}, ${userCol}`);

//     if (board[userRow][userCol].val !== null) {
//         console.log('Cell is already occupied. Try again.');
//         return;
//     } 
//     board[userRow][userCol].val = currentPlayer.XorO;
//     console.log("createMark called with:", currentPlayer, userRow, userCol);
//     createMark(currentPlayer, userRow, userCol);
//     console.log(`Board updated with ${currentPlayer.XorO} at (${userRow}, ${userCol})`);
    
// }


function playGame() {
    const {player1, player2} = setUpPlayers()
    let currentPlayer = player1;

    const gameState = {
        currentPlayer: currentPlayer,
        player1: player1,
        player2: player2,
        isGameOver: false
    };

    const gameboard = document.querySelectorAll('.boardCell');

    gameboard.forEach(cell => {
        cell.addEventListener('click', function(event) {
            if (!gameState.isGameOver) {
                handleCellClick(event, gameState);
            }
        });
    });

    const resetButton = document.querySelector('#reset-button');  // You'll need to add this to your HTML
    resetButton.addEventListener('click', function() {
        resetBoard(gameState);
        // Maybe add a message to show the game is reset?
        console.log('Game reset! ' + gameState.currentPlayer.name + ' goes first');
    });

}


function handleCellClick(event, gameState) {
    if (gameState.isGameOver) {
        return;
    }

    const [row, col] = event.target.id.split('_').map(Number);

    if (board[row][col].val !== null) {
        return; // Cell is already occupied
    }

    board[row][col].val = gameState.currentPlayer.XorO;
    createMark(gameState.currentPlayer, row, col)
    console.log(`Current player is ${gameState.currentPlayer.name}`);

    if (win(board) !== null) {
        alert(`${gameState.currentPlayer.name} wins! Game over`);
        gameState.isGameOver = true;
        return;
    }

    gameState.currentPlayer = 
        gameState.currentPlayer === gameState.player1
        ? gameState.player2
        : gameState.player1;
}


function resetBoard(gameState) {
    const divCellP = document.querySelectorAll(".boardCell p")

    divCellP.forEach(p => p.remove());

    // Reset the board data structure
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j].val = null;
        }
    }
    
    // Reset the game state
    gameState.isGameOver = false;
    gameState.currentPlayer = gameState.player1;
}


function createMark(currentPlayer, userRow, userCol) {
    // let [userRow, userCol] = cellPrompt(currentPlayer);
    const cell = `${userRow}_${userCol}`;
    console.log(`${currentPlayer} selected a cell with id ${cell}`)
    const divCell = document.querySelector(`[id = "${cell}"]`)
    const marker = document.createElement("p");
    marker.innerText = currentPlayer.XorO;
    divCell.appendChild(marker);

}
