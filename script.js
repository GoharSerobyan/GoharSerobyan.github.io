const board = document.getElementById("game-board");
const instractionText = document.getElementById("instraction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
const instructionText = document.getElementById("instruction-text") 

let gridSize = 25;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let danger = generateDanger()
let help = generateHelp();
let direction = "right";
let gameStarted = false;
let gameSpeed = 200;
let highScore = 0;
let gameIntervalId;
let help2 = false



function draw() {
    board.innerHTML = ""
    drawSnake();
    drawFood();
    snakeScore();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = creatElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });

}

function creatElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}


function drawFood() {
    let foodElement = creatElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}





function move() {
    let head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);

    if (head.x === help.x && head.y === help.y) {
        help2 = true
        help = generateHelp();
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            checkCollision();
            draw()
        }, gameSpeed);

    }


    if (head.x === food.x && head.y === food.y) {
        new Audio('audio1.wav').play();
        food = generateFood();
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();          
            checkCollision();
            draw()
        }, gameSpeed);
    }
    else {
        snake.pop();
    }


    if (head.x === danger.x && head.y === danger.y && help2 == true) {
        help2 = false;  
        // clearInterval(gameIntervalId);
    } else if (head.x === danger.x && head.y === danger.y) {
        resetGame();
    }

}

function startGame() {
    gameStarted = true;
    instractionText.style.display = "none";
    logo.style.display = "none";


    gameIntervalId = setInterval(() => {
        move();
        checkCollision()
        draw()
    }, gameSpeed);
}

function hendleKeyPress(e) {

    if ((!gameStarted && e.code === "Space") ||
        (!gameStarted && e.key === " ")) {
        startGame();
    } else {
        switch (e.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

function checkCollision() {
    let head = { ...snake[0] };
    if (head.x < 1 || head.x > gridSize ||
        head.y < 1 || head.y > gridSize) {
        resetGame()
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame()
        }
    }
}

function resetGame() {
    new Audio('audio3.wav').play();
    stopGame();
    snakeHighScore();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    gameSpeed = 200;
    help2 = false

    snakeScore();
}

function stopGame() {
    clearInterval(gameIntervalId);
    gameStarted = false; 
    logo.style.display = "block";
    instractionText.style.display = "block";
}


function snakeScore() {
    let currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");

    if (currentScore === 5 && gameSpeed == 200) {
        gameSpeed -= 30;
    } else if (currentScore === 10 && gameSpeed == 150) {
        gameSpeed -= 30;
    } else if (currentScore === 15 && gameSpeed == 100) {
        gameSpeed -= 30;
    }

    if (currentScore >= 5) {
        drawDanger();
    }
    if (currentScore >= 10) {
        drawHelp();
        // new Audio('audio2.wav').play();
    }
    if(currentScore >= 15){
        finishGame()
        new Audio('audio4.wav').play();
    }

}

function snakeHighScore() {
    let currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
    }


    highScoreText.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";


}


function drawDanger() {
    let dangerElement = creatElement("div", "danger");
    setPosition(dangerElement, danger);
    board.appendChild(dangerElement);
}

function generateDanger() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}

function drawHelp() {
    let helpElement = creatElement("div", "help");
    setPosition(helpElement, help);
    board.appendChild(helpElement);
}

function generateHelp() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }
}

function finishGame(){
    stopGame()
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    gameSpeed = 200;
    help2 = false
    snakeScore();
}

function clickListener(){
    startGame()
}


document.addEventListener("keydown", hendleKeyPress)


