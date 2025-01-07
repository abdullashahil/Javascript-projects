document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");

    if (playButton) {
        playButton.addEventListener("click", () => {
            window.location.href = "game.html";
        });
    }

    const cardArray = [
        { name: 'fries', img: './assets/fries.png' },
        { name: 'cheeseburger', img: './assets/cheeseburger.png' },
        { name: 'hotdog', img: './assets/hotdog.png' },
        { name: 'ice-cream', img: './assets/ice-cream.png' },
        { name: 'milkshake', img: './assets/milkshake.png' },
        { name: 'pizza', img: './assets/pizza.png' },
        { name: 'fries', img: './assets/fries.png' },
        { name: 'cheeseburger', img: './assets/cheeseburger.png' },
        { name: 'hotdog', img: './assets/hotdog.png' },
        { name: 'ice-cream', img: './assets/ice-cream.png' },
        { name: 'milkshake', img: './assets/milkshake.png' },
        { name: 'pizza', img: './assets/pizza.png' },
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const gridDisplay = document.getElementById('grid');
    const resultDisplay = document.querySelector('.score-title');
    const scoreDisplay = document.getElementById('score');

    let cardsChosen = [];
    let cardsChosenIds = [];
    const cardsWon = [];
    let score = 0;
    
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', './assets/blank.png');
            card.setAttribute('data-id', i);
            card.classList.add('card');
            card.addEventListener('click', flipCard);
            gridDisplay.appendChild(card);
        }
    }

    function checkMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];

        if (optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', './assets/blank.png');
            cards[optionTwoId].setAttribute('src', './assets/blank.png');
            alert('You have clicked the same image!');
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match!');
            cards[optionOneId].setAttribute('src', './assets/white.png');
            cards[optionTwoId].setAttribute('src', './assets/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
            score++
            scoreDisplay.textContent = score;

        } else {
            cards[optionOneId].setAttribute('src', './assets/blank.png');
            cards[optionTwoId].setAttribute('src', './assets/blank.png');
            alert('Sorry, try again!');
        }

        cardsChosen = [];
        cardsChosenIds = [];

        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = "Congrats, You won!";
        }
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenIds.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    createBoard();
});
