



const board = (function() {
    const board = [];
    const rows = 3;
    const cols = 3;
    
        for (let i = 0; i < rows;  i++) {
            board[i] = [];
            for (let j = 0; j < cols;  j++) {
                board[i][j] = {row: i, col: j, val: null};
           }
        }
        return board
})();

function displayBoard() {
    console.table(board.map(row => row.map(cell => cell.val)));
}



function createPlayer(name, XorO) {
    return {
        name: name,
        XorO: XorO,
        greet: function() {
            //player one is 'X'. Player two is 'O'
            if (XorO === 'X') {
                console.log(`Welcome ${this.name}! You chose ${this.XorO} and are Player 1`)
            } else if (XorO === 'O') {
                console.log(`Welcome ${this.name}! You chose ${this.XorO} and are Player 2`)
            } else {
                console.log(`Try again, you must pick 'X' or 'O'`);
            }
            
        }
    }; 
} 





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
            console.log(`Row ${j}, Column ${i}: ${cell.val}`);

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
// This isn't working, need to add in logic to return the right value
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

function playRound(player1, player2){
    displayBoard()
    console.log("Player 1's turn");
    playTurn(player1);
    console.log("Player 2's turn");
    playTurn(player2);
    displayBoard()
}

function cellPrompt(currentPlayer) {
    let userRow = prompt(`${currentPlayer.name} enter row number 0, 1, 2:`);
    let userCol = prompt(`${currentPlayer.name} enter column number 0, 1, 2:`);
    return [Number(userRow), Number(userCol)];
}


function playTurn(currentPlayer) {
    let [userRow, userCol] = cellPrompt(currentPlayer);
    console.log(`${currentPlayer.name} selected cell: ${userRow}, ${userCol}`);

    while (board[userRow][userCol].val !== null) {
        alert(`${currentPlayer.name}, that cell is already occupied. Try again.`);
        console.log('Cell is already occupied. Try again.');
        [userRow, userCol] = cellPrompt(currentPlayer);
    } 
    board[userRow][userCol].val = currentPlayer.XorO;

}


// Need to turn this into a loop or something
function playGame() {
    const player1 = createPlayer('Dave', 'X');
    const player2 = createPlayer('Bob', 'O');

    while (win(board) === null) {
        playRound(player1, player2);
    }

    if (win(board) === player1.XorO) {
        alert(`${player1.name} wins!`) 
    } else {
        alert(`${player2.name} wins!`)
    }
}

