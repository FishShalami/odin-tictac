
//use coordinate system to track rows and columns
// access specific rows or column with:
    // board.filter((obj) => obj.row === 1)


// function createGameboard() {
//     const board = [];
//     const rows = 3;
//     const cols = 3;
    
//         for (let i = 0; i < (rows);  i++) {
//             for (let j = 0; j < (cols);  j++) {
//             board.push({'row': i, 'col': j, 'val': null});
//            }
//         }
//         return board
// }

// const board = createGameboard();


const board = (function() {
    const board = [];
    const rows = 3;
    const cols = 3;
    
        for (let i = 0; i < (rows);  i++) {
            for (let j = 0; j < (cols);  j++) {
            board.push({'row': i, 'col': j, 'val': null});
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
