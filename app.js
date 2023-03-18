window.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');

  for(let i = 0; i < 200; i++){
    grid.innerHTML += '<div></div>';
  }

  for (let i = 0; i < 10; i++){
    grid.innerHTML += `<div class ='taken'></div>`
  }
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.querySelector('#start-button');
    let game = true;


    let timerId;
    const width = 10;

    let score = 0;

    let NextRandom = 0;
    


  



    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
      ]
    
      const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [width,width+ 1,width *2 + 1,width*2+2],
        [2, width+1,width + 2,width*2+1]
      ]
    
      const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    
    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]


    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, tTetromino];
    NextRandom = Math.floor(Math.random()*theTetrominoes.length);
    let currentPosition = 4;
    let currentRotation = 0;
    

    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];
    // 0 < Math.random() < 1



timerId = setInterval(moveDown, 1000);

function moveDown(){
  if(game){
    undraw();
    currentPosition += width;
    draw();

    freeze();
  }
}


function freeze(){
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))

    currentRotation = 0;
    currentPosition = 4;

    random = NextRandom;
    
    NextRandom = Math.floor(Math.random()*theTetrominoes.length);

    current = theTetrominoes[random][currentRotation];

    draw();
    displayShape();
    diss();



    // for(let i = 0; i < 200; i+=10){
    //   if(squares[i].classList.contains('taken')){
    //     if(Checkline(i)){
    //       DestroyLine(i);

    //     }
    //   }
    // }
  
  


    
  }
}


function moveLeft(){

  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if(!isAtLeftEdge) currentPosition -= 1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition += 1;
  }
  draw()
}


function moveRight(){
  undraw()
  
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
  if(!isAtRightEdge)currentPosition += 1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition -= 1;
  }
  
  
  draw();
}

function isAtRight(){
    return current.some(index => (currentPosition + index + 1) % width === 0);
}

function isAtLeft(){
    return current.some(index => (currentPosition + index) % width === 0);
}


function checkRotatePosition(P){
// P = P || currentPosition;
P = currentPosition;
if((P + 1) % width < 4){
  if(isAtRight()){
    currentPosition += 1;
    checkRotatePosition(P);
  }
}else if((P) % width > 5){
  if(isAtLeft()){
    currentPosition -= 1;
    checkRotatePosition(P);
  }
}
}



function ChangeRotate(){


    undraw();
    currentRotation++;

    if(currentRotation === current.length){
      currentRotation = 0;
    }

    current = theTetrominoes[random][currentRotation];
    
    checkRotatePosition()
    draw();
    



    // undraw()
    // if(currentRotation != 3) currentRotation++; else currentRotation = 0;
    // current = theTetrominoes[random][currentRotation];
    // draw();

  

}

function control(e){
  



  if( e.keyCode == 37){
    moveLeft();
  }
  else if( e.keyCode == 39){
    moveRight();
  }
  else if(e.keyCode == 38){
  ChangeRotate()
  }
  else if(e.keyCode == 40){
    
    moveDown()
  }
}




addEventListener("keydown",  control);



function draw(){
  current.forEach(index => 
      squares[currentPosition + index].classList.add('tetromino')
      );

      // for(let i = 0; i< current.length;  i++){
      //   squares[currentPosition + current[i]].classList.add('tetromino')
      // }

  }


function undraw(){
  current.forEach(index => 
      squares[currentPosition + index].classList.remove('tetromino')
      );
}


startBtn.addEventListener("click", () => {game = !game;});


const displaySquares = document.querySelectorAll('.mini-grid div');

let displayWidth = 4;
let displayIndex = 0;

const upNextTetrominoes = [
  [1, displayWidth+1, displayWidth*2+1, 2],
  [0,displayWidth,displayWidth+1,displayWidth*2+1],
  [1,displayWidth,displayWidth+1,displayWidth+2],
  [0,1,displayWidth,displayWidth+1],
  [displayWidth,displayWidth+1,displayWidth+2,displayWidth+3],
]


function displayShape(){
  displaySquares.forEach(index =>
    index.classList.remove('tetromino')
    )

upNextTetrominoes[NextRandom].forEach(index =>
  displaySquares[displayIndex + index].classList.add('tetromino')
  )
  
}



function diss(){
  for (let i = 0; i < 199; i+=width){
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

    if(row.every(index => squares[index].classList.contains('taken'))){
      row.forEach(index =>{
        squares[index].classList.remove('taken');
        squares[index].classList.remove('tetromino')
      })

      const squaresRemoved = squares.splice(i, width);
      squares = squaresRemoved.concat(squares);
      squares.forEach(block => grid.appendChild(block));
    }
  }s
}


// ////////////////



// function Checkline(line){
//   let m_HasTaken = 0;
//     for (let i = 0; i < width; i++){
//       if(squares[line + i].classList.contains('taken')){
//         m_HasTaken++;
//       }
//       console.log(m_HasTaken);
//     }

//     if(m_HasTaken === width){
      
//       return true;
//     }
//     else{
//       return false;
//     }
// }

// function DestroyLine(line){
//   for (let i = 0; i < width; i++){
//     squares[line + i].classList.remove('taken');
//     squares[line + i].classList.remove('tetromino');
//     console.log(i);
//   }
  
// }








});













