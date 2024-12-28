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


//create a player function that creates a player

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

const player1 = createPlayer('Dave', 'X');
const player2 = createPlayer('Bob', 'O');
board[0][0].val = '3'
board[0][1].val = '2'
board[0][2].val = '3'
board[1][0].val = '4'
board[1][1].val = '3'
board[1][2].val = '3'
board[2][0].val = '8'
board[2][1].val = '8'
board[2][2].val = '3'

const displayBoard = board.map(row => row.map(cell => cell.val));



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





//game round number variable

//game number variable

//player one goes first. Player 1 turn indicator = true 
//Player one picks a cell on the grid. Cell value is changed to 'X'. 
//Change the player 1 turn indicator to false

//player two picks a cell. Cell value is changed to 'O'. 
//Store values as Round One.
//After each round, check for winning pattern in a row, column, or the two diagonals. 
    //If winning pattern detected, check whether 'X' (Player one) or 'O'  (Player two) pattern is detected. Set winner
//Player one turn indicator is set to true







// each cell should be a p element that can be selected or modified

