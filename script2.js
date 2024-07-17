const board2 = document.getElementById("game-board");
const instructionText2 = document.getElementById("instraction-text");
const logo2 = document.getElementById("logo")
const score2 = document.getElementById("score")
const highScore2 = document.getElementById("highscore")



let gridSize2 = 25;
let highscore = 0
let snake1 = [{ x: 5, y: 10 }];
let snake2 = [{ x: 15, y: 11 }];
let food1 = generateFood1();
let food2 = generateFood2()
let direction1 = "right";
let direction2 = "left";
let isGameStarted = false;
let gameSpeed1 = 200;
let gameIntervalId1;
let danger1 = generateDanger1();
let help1 = generateHelp1();
let help3 = false

function draw1() {
    board2.innerHTML = ""
    drawSnake1();
    drawFood1();
    drawSnake2();
    drawFood2();
    updateScore();
}

function drawSnake1() {
    snake1.forEach((segment) => {
        const snakeElement1 = createElement1("div", "snake1");
        setPosition1(snakeElement1, segment);
        board2.appendChild(snakeElement1);

    });
}

function createElement1(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition1(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

function drawFood1() {
    let foodElement1 = createElement1("div", "food1");
    setPosition1(foodElement1, food1);
    board2.appendChild(foodElement1);
}

function generateFood1() {
    let x = Math.floor(Math.random() * gridSize2) + 1;
    let y = Math.floor(Math.random() * gridSize2) + 1;

    return { x, y }

}

function drawFood2() {
    let foodElement2 = createElement1("div", "food2");
    setPosition1(foodElement2, food2);
    board2.appendChild(foodElement2);
}

function generateFood2() {
    let x = Math.floor(Math.random() * gridSize2) + 1;
    let y = Math.floor(Math.random() * gridSize2) + 1;

    return { x, y }

}

function drawDanger1() {
    let dangerElement1 = createElement1("div", "danger1");
    setPosition1(dangerElement1, danger1);
    board2.appendChild(dangerElement1);
}

function generateDanger1() {
    let x = Math.floor(Math.random() * gridSize2) + 1;
    let y = Math.floor(Math.random() * gridSize2) + 1;

    return { x, y }

}

function drawHelp1() {
    let helpElement2 = createElement1("div", "help1");
    setPosition1(helpElement2, help1);
    board2.appendChild(helpElement2);
}

function generateHelp1() {
    let x = Math.floor(Math.random() * gridSize2) + 1;
    let y = Math.floor(Math.random() * gridSize2) + 1;

    return { x, y }

}


function move1() {
    let head = { ...snake1[0] };

    switch (direction1) {
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
    snake1.unshift(head);

    if (head.x === help1.x && head.y === help1.y) {
        help1 = generateHelp1();
        help3 = true
        clearInterval(gameIntervalId1);
        gameIntervalId1 = setInterval(() => {
            move1();
            move2();
            checkCollision1();
            draw1();
        }, gameSpeed1);

    }


    if (head.x === food1.x && head.y === food1.y) {
        new Audio('audio1.wav').play();
        food1 = generateFood1();
        clearInterval(gameIntervalId1);
        gameIntervalId1 = setInterval(() => {
            move1();
            move2();
            checkCollision1();
            draw1();
        }, gameSpeed1);

    } else {
        snake1.pop()
    }

    if (head.x === danger1.x && head.y === danger1.y && help3 == true) {
        help3 = false;
    } else if (head.x === danger1.x && head.y === danger1.y) {
        resetGame1();
    }
}

function startGame1() {
    isGameStarted = true;
    instructionText2.style.display = "none";
    logo2.style.display = "none";

    gameIntervalId1 = setInterval(() => {
        move1();
        move2();
        checkCollision1();
        draw1();
    }, gameSpeed1);
}

function handleKeyPress1(e) {

    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame1();
    }
    else {
        switch (e.key) {
            case "ArrowUp":
                direction1 = "up"
                break;
            case "ArrowDown":
                direction1 = "down";
                break;
            case "ArrowLeft":
                direction1 = "left";
                break;
            case "ArrowRight":
                direction1 = "right";
                break;
        }
    }
}

function checkCollision1() {
    let head1 = { ...snake1[0] };
    let head2 = { ...snake2[0] };

    if (head1.x < 1 || head1.x > gridSize2 ||
        head1.y < 1 || head1.y > gridSize2) {
        resetGame1()
    }

    for (let i = 1; i < snake1.length; i++) {
        if (head1.x === snake1[i].x && head1.y === snake1[i].y) {
            resetGame1()
        }
    }

    if (head2.x < 1 || head2.x > gridSize2 ||
        head2.y < 1 || head2.y > gridSize2) {
        resetGame1()
    }

    for (let i = 1; i < snake2.length; i++) {
        if (head2.x === snake2[i].x && head2.y === snake2[i].y) {
            resetGame1()
        }
    }

    for (let i = 1; i < snake2.length; i++) {
        if (head1.x === snake2[i].x && head1.y === snake2[i].y) {
            resetGame1()
        }
    }

    for (let i = 1; i < snake1.length; i++) {
        if (head2.x === snake1[i].x && head2.y === snake1[i].y) {
            resetGame1()
        }
    }

}

function resetGame1() {
    new Audio('audio3.wav').play();
    stopGame1()
    updateHighScore()
    snake1 = [{ x: 5, y: 10 }];
    snake2 = [{ x: 15, y: 10 }];
    food1 = generateFood1();
    food2 = generateFood2();
    direction1 = "right";
    direction2 = "left";
    updateScore()
}

function stopGame1() {
    clearInterval(gameIntervalId1);
    isGameStarted = false;
    logo.style.display = "block";
}

function updateScore() {
    let currentScore = (snake1.length - 1) + (snake2.length - 1)
    score2.textContent = currentScore.toString().padStart(3, "0")

    if (currentScore === 5 && gameSpeed1 == 200) {
        gameSpeed1 -= 30;
    } else if (currentScore === 10 && gameSpeed1 == 150) {
        gameSpeed1 -= 30;
    } else if (currentScore === 15 && gameSpeed1 == 100) {
        gameSpeed1 -= 30;
    }

    if (currentScore >= 5) {
        drawDanger1();
    }
    if (currentScore >= 10) {
        drawHelp1();
    }
    if (currentScore >= 15) {
        finishGame1()
        new Audio('audio4.wav').play();
    }
}

function updateHighScore() {
    let currentScore = snake1.length - 1 && snake2.length - 1;
    if (currentScore > highscore) {
        highscore = currentScore
    }
    highScore2.textContent = highscore.toString().padStart(3, "0")
    highScore2.style.display = "block"
}



function drawSnake2() {
    snake2.forEach((segment) => {
        const snakeElement2 = createElement1("div", "snake2");
        setPosition1(snakeElement2, segment);
        board2.appendChild(snakeElement2);
    });
}

function move2() {
    let head1 = { ...snake2[0] };


    switch (direction2) {
        case "up":
            head1.y--;
            break;
        case "down":
            head1.y++;
            break;
        case "left":
            head1.x--;
            break;
        case "right":
            head1.x++;
            break;
    }
    snake2.unshift(head1);

    if (head1.x === help1.x && head1.y === help1.y) {
        help1 = generateHelp1();
        help3 = true
        clearInterval(gameIntervalId1);
        gameIntervalId1 = setInterval(() => {
            move1();
            move2();
            checkCollision1();
            draw1();
        }, gameSpeed1);

    }

    if (head1.x === food2.x && head1.y === food2.y) {
        new Audio('audio1.wav').play();
        food2 = generateFood2();
        clearInterval(gameIntervalId1);
        gameIntervalId1 = setInterval(() => {
            move1();
            move2();
            checkCollision1();
            draw1()
        }, gameSpeed1);

    }
    else {
        snake2.pop();
    }

    if (head1.x === danger1.x && head1.y === danger1.y && help3 == true) {
        help3 = false;
    }
    else if (head1.x === danger1.x && head1.y === danger1.y) {
        resetGame1();
    }
}


function handleKeyPress2(e) {
    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame1();
    } else {
        switch (e.code) {
            case "KeyW":
                direction2 = "up"
                break;
            case "KeyS":
                direction2 = "down";
                break;
            case "KeyA":
                direction2 = "left";
                break;
            case "KeyD":
                direction2 = "right";
                break;
        }
    }
}

function finishGame1() {
    stopGame1()
    snake1 = [{ x: 5, y: 10 }];
    snake2 = [{ x: 15, y: 11 }];
    food1 = generateFood1();
    food2 = generateFood2()
    direction1 = "right";
    direction2 = "left";
    gameSpeed1 = 200;
    help3 = false
    updateScore();
    instructionText2.style.display = "block";
}

function clickListener1(){
    startGame1()
}


document.addEventListener("keydown", handleKeyPress1)
document.addEventListener("keydown", handleKeyPress2) 