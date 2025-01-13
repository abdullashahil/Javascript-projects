// Audio for block destruction
const destroyAudio = new Audio('assets/rock-destroy.mp3');
const gameOverAudio = new Audio('assets/game-over.mp3');

const playButton = document.getElementById("playButton");

if (playButton) {
    playButton.addEventListener("click", () => {
        window.location.href = "game.html";
    });
}

const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const retryButton = document.getElementById('retry');
retryButton.style.display = 'none';

const boardWidth = grid.offsetWidth;
const boardHeight = grid.offsetHeight;

const userStart = [230, 10];
let currentPosition = userStart;

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;

let xDirection = 2;
let yDirection = 2;

let ballCurrentPosition = [270, 40];

let score = 0;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

addBlocks();

const user = document.createElement('div');
user.classList.add('user');
user.style.left = currentPosition[0] + 'px';
user.style.bottom = '10px';
grid.appendChild(user);

const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

const timerId = setInterval(moveBall, 30);

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < (boardWidth - blockWidth - 3)) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

function checkForCollisions() {
    // Block collision
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            (ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.textContent = `${score}`;
            destroyAudio.currentTime = 0.3;
            destroyAudio.play();
            if (blocks.length === 0) {
                scoreDisplay.textContent = 'You Win!';
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
                retryButton.style.display = 'block';
            }
        }
    }

    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0) {
        xDirection = -xDirection;
    }
    if (ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
        yDirection = -yDirection;
    }

    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection();
    }

    // Game Over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.textContent = 'You lose!';
        document.removeEventListener('keydown', moveUser);
        retryButton.style.display = 'block';
        gameOverAudio.play();
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}

retryButton.addEventListener('click', () => {
    window.location.reload(); 
});

document.addEventListener('keydown', moveUser);
