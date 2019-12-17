const ROW = [1,2,3,4,5,6,7,8,9,10];
const COLUMN = [1,2,3,4,5,6,7,8,9,10];
const TOTALMINES = 10;
const ID = [];
var minesID = [];

class Grid {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.isMine = false;
        this.isHint= false;
        this.revealBlock = false;
        this.hint = 0;
    }
}

init();

// *** init function, call board(), call minesID() ***
function init() {
    board();
    randomMines();
    populateHints();
    render();
} 

// *** create board ID, and add block ***
function board() {
    var table = document.querySelector('#myTable');
    for (let x=0; x<ROW.length; x++) {
        var arr = [];
        // insert <tr>, create row
        var row = table.insertRow(x);
        for (let y=0; y<COLUMN.length; y++) {
            var grid = new Grid(x,y);
            arr.push(grid);
            // insert <td>, create column
            var column = row.insertCell(y);
        }
        ID.push(arr);
    }
}

// *** function minesID(), random mines ID & check if duplicate***
function randomMines() {
    while (minesID.length < TOTALMINES) {
        var x = Math.floor(Math.random() * ID.length);
        var y = Math.floor(Math.random() * ID.length);
        minesID.push(ID[x][y]);
        ID[x][y].isMine = true;
        minesID.forEach(function() {
            if (ID[x][y] === minesID) {
            return false;
            }
        });
    }
    render();
}    

    // *** findNeighbors ***
function findNeighbors(element) {
    var rowLimit = ID.length-1;
    var columnLimit = ID[0].length-1;
    var neighbors = [];
    for(var i = Math.max(0, element.x-1); i <= Math.min(element.x+1, rowLimit); i++) {
        for(var j = Math.max(0, element.y-1); j <= Math.min(element.y+1, columnLimit); j++) {
            if(i !== element.x || j !== element.y) {
               neighbors.push(ID[i][j]);
            }
        }
    }
    return neighbors;
}

// *** collect neighbors and count hints ***
function populateHints() {
    for(let mine of minesID) {
        var neighborsOfMines = findNeighbors(mine);
        for(let neighbor of neighborsOfMines) {
            var neiOfNeighbors = findNeighbors(neighbor);
            let numberOfMines = 0;
            for(let i of neiOfNeighbors) {
                if(i.isMine) {
                    numberOfMines++;
                }
            }
            neighbor.hint = numberOfMines;
            if(numberOfMines > 0 ) {
                neighbor.isHint = true;
            }
        }
    }
}
    // *** click block and check ***
function blockClick() {
    block.addEventListener('click', compare);
}

// *** open Grid ***
function openGrid(clickBlock) {
    if(clickBlock.revealBlock === true) {
        return false;
    } else {
        clickBlock.revealBlock === true;
        
    }
}

// *** render ***
function render() {

}
// *** populate hints around mines ***
// var neighborsOfMines = [];
// function findNeighbors(minesID, x, y) {
//     // var rowLimit = ID.length-1;
//     // var columnLimit = ID[0].length-1;
//     var neighborsOfMines = [];
//     getNeighbors();
//     return neighborsOfMines;
// }



// *** check neighbors Of neighbors ***
// var neiOfNeighborsBlock = [];
// function neiOfNeighbores(neighborsOfMines, m, n) {
//     var rowLimit = neighborsOfMines.length-1;
//     var columnLimit = neighborsOfMines[0].length-1;
//     var neighborsBlock = [];
//     for(var x = Math.max(0, m-1); x <= Math.min(m+1, rowLimit); x++) {
//         for(var y = Math.max(0, n-1); y <= Math.min(n+1, columnLimit); y++) {
//           if(x !== i || y !== j) {
//              neiOfNeighborsBlock.push(neighborsOfMines[x][y]);
//           }
//         }
//     }
//     return neighborsBlock;
// }
