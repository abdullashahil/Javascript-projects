// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Home.html: Play Button
    const playButton = document.getElementById("playButton");

    if (playButton) {
        playButton.addEventListener("click", () => {
            window.location.href = "game.html";
        });
    }

    // Game.html: Elements
    const playerChoiceElement = document.getElementById("player-choice");
    const computerChoiceElement = document.getElementById("computer-choice");
    const resultElement = document.getElementById("result");
    const resetButton = document.getElementById("reset-btn");
    const choiceButtons = document.querySelectorAll(".choice-btn");
    const scoreElement = document.getElementById("score");

    // Choices and Scores
    const choices = ["Rock", "Paper", "Scissors"];
    let playerScore = 0;
    let computerScore = 0;

    // Add event listeners to choice buttons
    if (choiceButtons) {
        choiceButtons.forEach(button => {
            button.addEventListener("click", () => {
                const playerChoice = button.dataset.choice;
                const computerChoice = getComputerChoice();
                const result = determineWinner(playerChoice, computerChoice);

                playerChoiceElement.textContent = playerChoice;
                computerChoiceElement.textContent = computerChoice;
                displayResult(result);

                updateScores(result);
            });
        });
    }

    // Function to get computer's choice
    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Function to determine the winner
    function determineWinner(playerChoice, computerChoice) {
        // Clear previous highlights
        playerChoiceElement.classList.remove("highlight");
        computerChoiceElement.classList.remove("highlight");

        if (playerChoice === computerChoice) {
            return "It's a Tie!";
        }

        if (
            (playerChoice === "Rock" && computerChoice === "Scissors") ||
            (playerChoice === "Paper" && computerChoice === "Rock") ||
            (playerChoice === "Scissors" && computerChoice === "Paper")
        ) {
            playerChoiceElement.classList.add("highlight");
            return "You Win!";
        } else {
            computerChoiceElement.classList.add("highlight");
            return "You Lose!";
        }
    }

    // Update scores
    function updateScores(result) {
        if (result === "You Win!") {
            playerScore++;
        } else if (result === "You Lose!") {
            computerScore++;
        }
        scoreElement.textContent = `Player: ${playerScore} - Computer: ${computerScore}`;
    }

    // Display result with animation
    function displayResult(result) {
        resultElement.textContent = result;
        resultElement.classList.add("fade-in");

        setTimeout(() => {
            resultElement.classList.remove("fade-in");
        }, 1000);
    }

    // Event listener for reset button
    if (resetButton) {
        resetButton.addEventListener("click", resetGame);
    }

    // Function to reset the game
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        scoreElement.textContent = `Player: 0 - Computer: 0`;
        playerChoiceElement.textContent = "None";
        computerChoiceElement.textContent = "None";
        resultElement.textContent = "Start playing";

        // Remove highlights
        playerChoiceElement.classList.remove("highlight");
        computerChoiceElement.classList.remove("highlight");
    }
});
