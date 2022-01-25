let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let box = 32;

let snake = [];
snake[0] = {
    x: 8*box,
    y: 8*box
}
let snakeDirection = 'right';

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBackground(){
    context.fillStyle = 'lightblue';
    context.fillRect(0, 0, 16*box, 16*box);
}

function createSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = 'gray';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood(){
    context.fillStyle = 'green';
    context.fillRect(food.x, food.y, box, box);
}

function updateGame(){

    if(snake[0].x > 15*box && snakeDirection == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && snakeDirection == 'left') snake[0].x = 16*box;
    if(snake[0].y > 15*box && snakeDirection == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && snakeDirection == 'up') snake[0].y = 16*box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(updateGame);
            alert('Game over :(');
        }
    }

    createBackground();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeDirection == 'right') snakeX += box;
    if(snakeDirection == 'left') snakeX -= box;
    if(snakeDirection == 'up') snakeY -= box;
    if(snakeDirection == 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

document.addEventListener('keydown', updateDirection);
function updateDirection(event){
    if(event.keyCode == 37 && snakeDirection != 'right') snakeDirection = 'left';
    if(event.keyCode == 38 && snakeDirection != 'down') snakeDirection = 'up';
    if(event.keyCode == 39 && snakeDirection != 'left') snakeDirection = 'right';
    if(event.keyCode == 40 && snakeDirection != 'up') snakeDirection = 'down';
}

let game = setInterval(updateGame, 100);