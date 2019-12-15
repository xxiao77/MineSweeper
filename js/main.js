const ROW = [1,2,3,4,5,6,7,8,9,10];
const COLUMN = [1,2,3,4,5,6,7,8,9,10];
const TOTALMINES = 10;
const ID = [];

init();

// *** init function, call board(), call minesID() ***
function init() {
    var mines = [];
    board();
    randomID();
    populateHints();
    render();
} 

// *** create board ID, and add block ***
function board() {
    for (let a=0; a<ROW.length; a++) {
        for (let b=0; b<COLUMN.length; b++) {
            ID = [[a][b]];
            const block = document.getElementById('board').createElement('div');
            block.classList.add('block');
            block.addEventListener('click', blockClick);
            block.appendChild(ID);
         }
    }
    render();
}

// *** function minesID(), random mines ID & check if duplicate***
var minesID = [];
function randomID() {
    var minesBlock = Math.floor(Math.random() * ID.length);
    minesID.forEach(function() {
        if ([minesBlock] !== minesID) {
         minesID = [minesBlock];
        }
    });
    populateHints();
}

// *** populate hints around mines ***
function populateHints(minesID) {
    minesID.forEach(function() {
         
    });
}

// *** click block and check ***


// // Call render


function blockClick(event){
    const selected = document.querySelector('#board .block.selected');
    if(selected != null){
      selected.classList.remove('selected');
    }
    document.querySelector('#coords').innerHTML = this.id;
    this.classList.add('selected');
  }
  
  function createBoard(cols, rows, blockSize){
  
    this._boardDom = document.getElementById('board');
    const noBlocks = cols * rows;
    
    for(let i = 0; i < noBlocks; i++){
      
      const block = document.createElement('div');
      const y = Math.ceil((i + 1)/rows);
      const x = (i + 1) - ((y - 1)*rows);
      block.id = `${x}:${y}`
      // block.innerHTML = `${x}:${y}`; // uncomment this to render x:y
      block.style.width = `${blockSize}px`;
      block.style.height = `${blockSize}px`;
      block.classList.add('block');
      
      block.addEventListener('click', blockClick);
      
      this._boardDom.appendChild(block);
    
    }
    
    this._boardDom.style.width = `${(blockSize*cols) + 2*(rows)}px`
  
  }
  
  createBoard(8,8,30)


// leftClick use normal 'click'

// rightClick
//(html) <div id="myDIV" contextmenu="mymenu"></div>
// document.getElementById("#div id").addEventListener("contextmenu", myFunction);
// myFunction() {show flag image; 
//     if(flagNum !== 0) return (flatNum-1);
//     else return ('no more flag')}
