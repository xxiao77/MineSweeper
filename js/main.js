const ROW = [1,2,3,4,5,6,7,8,9,10];
const COLUMN = [1,2,3,4,5,6,7,8,9,10];
const TOTALMINES = 12;
const BOARD = [];
var minesID = [];
var gameOver;
var win;
var boardComplete;

let table = document.querySelector('.myTable');

class Cell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.isMine = false;
        this.isHint= false;
        this.revealBlock = false;
        this.clicked = false;
        this.isFlag = false;
        this.hint = 0;
    }
}

init();

// *** init function ***
function init() {
    boardComplete = false;
    gameOver = false;
    board();
    randomMines();
    populateHints();
    render();
    // winWin();
}

// *** create board BOARD, and add block ***
function board() {
    for (let x=0; x<ROW.length; x++) {
        var arr = [];
        for (let y=0; y<COLUMN.length; y++) {
            var grid = new Cell(x,y);
            arr.push(grid);
        }
        BOARD.push(arr);
    }
}

// *** Random mines BOARD & check if duplicate***   
function randomMines() {
    while (minesID.length < TOTALMINES) {
        var x = Math.floor(Math.random() * BOARD.length);
        var y = Math.floor(Math.random() * BOARD.length);
        if(BOARD[x][y].isMine) {
            continue;
        } else {
            minesID.push(BOARD[x][y]);
            BOARD[x][y].isMine = true;
        }       
    }
}

    // *** findNeighbors ***
function findNeighbors(element) {
    var rowLimit = BOARD.length-1;
    var columnLimit = BOARD[0].length-1;
    var neighbors = [];
    for(var i = Math.max(0, element.x-1); i <= Math.min(element.x+1, rowLimit); i++) {
        for(var j = Math.max(0, element.y-1); j <= Math.min(element.y+1, columnLimit); j++) {
            if(i !== element.x || j !== element.y) {
               neighbors.push(BOARD[i][j]);
            }
        }
    }
    return neighbors;
}

// *** collect neighbors and count hints ***
function populateHints() {
    for(let mine of minesID) {
        var hintsID = [];
        var neighborsOfMines = findNeighbors(mine);
        for(let neighbor of neighborsOfMines) {
            var neiOfNeighbors = findNeighbors(neighbor);
            let numberOfMines = 0;
            for(let i of neiOfNeighbors) {
                if(i.isMine) {
                    numberOfMines++;
                    hintsID.push(findNeighbors[i]);
                }
            }
            neighbor.hint = numberOfMines;
            if(numberOfMines > 0 ) {
                neighbor.isHint = true;
            }
        }
    }
}

// *** make grid all clickalbe on board *** //
$('table').on('click', 'td', function(evt) {
    // toString make sure id turns to string, and split to two numbers
    let clickedId = evt.target.id.toString().split(',');

    // turn two id number to array Index, to link the cell
    let clickedCell = BOARD[clickedId[0]][clickedId[1]];
    clickGrid(clickedCell);
});

// *** right click add flag(turn red) *** //
$('table').on('contextmenu', 'td', function(evt) {
    evt.preventDefault();
    let clickedId = evt.target.id.toString().split(',');
    let clickedCell = BOARD[clickedId[0]][clickedId[1]];

    if(clickedCell.isFlag) {
        clickedCell.isFlag = false;
    } else {
        clickedCell.isFlag = true;
    }
    render();
});

// Click button and page will reload
$('#reset').on('click', function() {
    window.location.reload(true); 
});

// *** click grid and check hints /or mines *** //
function clickGrid(clickedCell) {
    if(clickedCell.isMine) {
        gameOver = true;
    } else {
        revealGrid(clickedCell);
        win = isPlayerWin();
        if (win) {
            gameOver = true;
        }
    }
    render();
}

// *** Check if need reveal neighbors *** //
function revealGrid(clickedCell) {
    if (clickedCell.clicked) {
        return;
    }
    
    clickedCell.clicked = true;
    if (clickedCell.isHint) {
    } else {
        let currentNeighbors = findNeighbors(clickedCell);
        for(let i of currentNeighbors) {
            revealGrid(i);
        }
    }
}

// *** Return true if player win the game *** //
function isPlayerWin() {
    for(let row of BOARD) {
        for(let i of row) {
            if(!i.clicked && !i.isMine){
                return false;
            }
        }
    }
    return true;
}

// *** render *** //
function render() {
    // create board view
    if (!boardComplete) {
        for(let i of BOARD) {
            // every row have same 'x' value, take the first one to create <tr>
            let x = i[0].x;
            let row = table.insertRow(x);
            for(let j of i) {
                let y = j.y;
                let column = row.insertCell(y);
                column.id = `${x},${y}`;
            }
        }
        boardComplete = true;
    }

    for(let row of BOARD) {
        for(let i of row) {
            if(i.clicked) {
                document.getElementById(`${i.x},${i.y}`).style.backgroundColor = "#e5c29f";
                if(i.isHint) {
                    document.getElementById(`${i.x},${i.y}`).textContent = i.hint;
                }
            } else if (i.isFlag) {
                document.getElementById(`${i.x},${i.y}`).style.backgroundColor = "#d55844";
            } else {
                document.getElementById(`${i.x},${i.y}`).style.backgroundColor = "#b3e25c";
            }
        }
    }

    if(gameOver) {
        var btn = document.createElement("button");
        if(win) {
            btn.innerText = "You Win! Play Again"
        } else {
            btn.innerText = "Try Again";
        }
        document.getElementById("reset").appendChild(btn);
        for(let i of minesID) {
            document.getElementById(`${i.x},${i.y}`).style.backgroundColor = "#b1bbc0";
        }
        $('table').off('contextmenu');
        $('table').off('click');
    }
    
}

// -- finished -- //

// *** test win condition *** //
function winWin() {
    for(let row of BOARD) {
        for(let i of row) {
            if(!i.isMine) {
                clickGrid(i);
                if (win) {
                    return;
                }
            }
        }    
    }
}
