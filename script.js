const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high-score");

// let foodX = 13, foodY = 10;

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;

let snakeBody = [];
let gameOver = false;
let setIntervalId;

let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highscoreElement.innerText = `High Score: ${highScore}`;

const controls = document.querySelectorAll(".controls i");

const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay");
    location.reload();
}

const changeDirection = (e) =>{
    console.log(e); 
    //snake cant move on opposite side
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
//    initGame();
}

controls.forEach(key =>{
    key.addEventListener("click", () => 
    //console.log(key)
    changeDirection({key:key.dataset.key})
    )
})

const initGame = () =>{

    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX} "></div>`;
    
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
       // console.log(snakeBody);
       highScore = score >= highScore ? score : highScore;
       localStorage.setItem("high-score", highScore);
       scoreElement.innerText = `Score: ${score}`
       highscoreElement.innerText = `High Score: ${highScore}`;
    }
    //shifting forward the values of the elements in the snakebody by one
    for(let i = snakeBody.length -1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    //initial snake body
    snakeBody[0] = [snakeX,snakeY];
    //updating the snake head
    snakeX += velocityX;
    snakeY += velocityY;
    if(snakeX <=0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        // console.log("Game over")
        gameOver = true;
    }

    for(let i =0; i<snakeBody.length; i++){
        //adding div to snake body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]} "></div>`;
        //not hitting its body condition
        if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0])
        {
            gameOver = true;
        }
    }
       
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
// //speed of snake
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
// initGame();
