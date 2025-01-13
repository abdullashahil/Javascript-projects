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
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', i);

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.setAttribute('style', 'background-image: url(./assets/blank.png);');
            cardFront.setAttribute('style', 'background-image: url(./assets/blank.png);');

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.setAttribute('style', `background-image: url(${cardArray[i].img}); background-size: 100%;`);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            card.addEventListener('click', flipCard);
            gridDisplay.appendChild(card);
        }
    }

    function checkMatch() {
        const cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];

        if (optionOneId === optionTwoId) {
            cards[optionOneId].querySelector('.card-inner').classList.remove('flipped');
            cards[optionTwoId].querySelector('.card-inner').classList.remove('flipped');
            alert('You have clicked the same image!');
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match!');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
            score++
            scoreDisplay.textContent = score;
        } else {
            setTimeout(() => {
                cards[optionOneId].querySelector('.card-inner').classList.remove('flipped');
                cards[optionTwoId].querySelector('.card-inner').classList.remove('flipped');
            }, 1000);
            alert('Sorry, try again!');
        }

        cardsChosen = [];
        cardsChosenIds = [];

        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = "Congrats, You won!";
        }
    }

    function flipCard() {
        const card = this;
        const cardId = card.getAttribute('data-id');
        const cardInner = card.querySelector('.card-inner');

        cardsChosen.push(cardArray[cardId].name);
        cardsChosenIds.push(cardId);
        
        cardInner.classList.add('flipped');

        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    createBoard();
});
