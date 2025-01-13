document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");
    if (playButton) {
        playButton.addEventListener("click", () => {
            window.location.href = "game.html";
        });
    }

    const squares = document.querySelectorAll('.square');
    const timeLeft = document.querySelector('#timeleft');
    const scoreDisplay = document.querySelector('#score');

    const TOTAL_SQUARES = 9;
    const MOLE_MOVE_INTERVAL = 1000;
    const COUNTDOWN_INTERVAL = 1000;

    let result = 0;
    let hitPosition = null;
    let currentTime = 60;
    let moleMoveTimer = null;
    let countDownTimer = null;

    function randomSquare() {
        squares.forEach(square => square.classList.remove('mole'));
        const randomSelectedSquare = squares[Math.floor(Math.random() * TOTAL_SQUARES)];
        randomSelectedSquare.classList.add('mole');
        hitPosition = randomSelectedSquare.id;
    }

    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id === hitPosition) {
                result++;
                scoreDisplay.textContent = result;
                hitPosition = null;

                // play click sound
                const sound = new Audio('assets/mouse-single-button-click-swoop-1-00-00.mp3');
                sound.play();
            }
        });
    });

    function moveMole() {
        moleMoveTimer = setInterval(randomSquare, MOLE_MOVE_INTERVAL);
    }

    function countDown() {
        currentTime--;
        timeLeft.textContent = currentTime;
        if (currentTime === 0) {
            clearInterval(countDownTimer);
            clearInterval(moleMoveTimer);
            alert("Game Over! Your score is: " + result);
        }
    }

    moveMole();
    countDownTimer = setInterval(countDown, COUNTDOWN_INTERVAL);
});
