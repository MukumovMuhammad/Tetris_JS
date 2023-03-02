window.addEventListener('DOMContentLoaded', () => {
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.querySelector('#start-button');
    let game = true;



  
  



    let timerId;
    const width = 10;

    let score = 0;

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


    const theTetrominoes = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino];

    let currentPosition = 4;
    let currentRotation = 0;
    

    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];
    // 0 < Math.random() < 1



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
    random = Math.floor(Math.random()*theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];

    
    
    draw();

    for(let i = 0; i < 200; i+=10){
      if(squares[i].classList.contains('taken')){
        if(Checkline(i)){
          DestroyLine(i);
          // MoveLinesDown(i);
        }
      }
    }
  
  


    
  }
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



function moveRight(){
  undraw()
  
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
  if(!isAtRightEdge)currentPosition += 1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition -= 1
  }
  
  
  draw()
}

function moveLeft(){
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if(!isAtLeftEdge)currentPosition -= 1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition += 1
  }
  draw()
}


function ChangeRotate(){

    undraw()
    if(currentRotation != 3) currentRotation++; else currentRotation = 0;
    current = theTetrominoes[random][currentRotation];
    draw();

  

}



function MoveLinesDown(n){
  for (let i = 189; i > 10; i--){
    if(squares[i].classList.contains('taken')){
        squares[i].classList.remove('taken');
        squares[i].classList.remove('tetromino');

        squares[i* 10].classList.add('taken');
        squares[i * 10].classList.add('tetromino');
    }
  }
}


function Checkline(n){
  let m_HasTaken = 0;
    for (let i = 0; i < width; i++){
      if(squares[n + i].classList.contains('taken')){
        m_HasTaken++;
      }
      console.log(m_HasTaken);
    }

    if(m_HasTaken === width){
      
      return true;
    }
    else{
      return false;
    }
}

function DestroyLine(n){
  for (let i = 0; i < width; i++){
    squares[n + i].classList.remove('taken');
    squares[n + i].classList.remove('tetromino');
    console.log(i);
  }
}





startBtn.addEventListener("click", () => {game = !game;})


});













