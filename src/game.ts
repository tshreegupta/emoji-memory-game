import {celebrateWin} from './celebration.js';

interface Card{
    id: number;
    emoji: string;
    matched: boolean;
}

const emojis = ["🤡", "🍕", "🐱", "🚀", "🌈", "🎉", "🐶", "🍩"]
let cards: Card[] = [];
let flippedCards: HTMLElement[] = [];
let unFlippedCount: number = 0;
let numMoves: number = 0;
let timeInterval:any;
let timeElapsed = 0;

function incrementMoves(){
    numMoves++;
    document.getElementById("moves")!.textContent = numMoves.toString();
}

function startTimer(){
    if(timeInterval) return // avoid multiple timer
    timeInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer")!.textContent = timeElapsed.toString();
    }, 1000);

}
function stopTimer(){
    clearInterval(timeInterval);
    timeInterval = null;
}
function resetGameStats(){
    flippedCards = [];
    unFlippedCount = 2*emojis.length;
    numMoves = 0;
    timeElapsed = 0;
    document.getElementById("moves")!.textContent = "0";
    document.getElementById("timer")!.textContent = "0";
    timeInterval = null;
}
function shuffleAndCreateCards(){
    const doubled = [...emojis, ...emojis]; // ... flat merges the list
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    resetGameStats();

    cards = shuffled.map((emoji, index) => ({
        id: index,
        emoji: emoji,
        matched: false,
    }));
}

function renderBoard() {
    console.log('Rendering board') 

    const board = document.getElementById("board")!;
    board.innerHTML = "";

    cards.forEach((card, index) => {
        const cardE1 = document.createElement("div");
        cardE1.className = "card";
        cardE1.dataset.index = index.toString();
        cardE1.textContent = ""; //hidden initially
        board.appendChild(cardE1);
    });
}

function flipCard(e: Event){
    const target = e.currentTarget as HTMLElement;
    const index = parseInt(target.dataset.index!);
    console.log(`Clicked on card : ${index}`)
    const card = cards[index];

    if(card.matched || flippedCards.includes(target) || flippedCards.length === 2) return;

    target.textContent = card.emoji;
    flippedCards.push(target);

    if(flippedCards.length === 2) {
        const [first, second] = flippedCards;
        const firstCard = cards[parseInt(first.dataset.index!)];
        const secondCard = cards[parseInt(second.dataset.index!)];
        incrementMoves();


        setTimeout(() => {
            if(firstCard.emoji === secondCard.emoji){
                firstCard.matched = true;
                secondCard.matched = true;
                unFlippedCount -= 2;
                if(unFlippedCount === 0){
                    stopTimer();
                    celebrateWin();
                }
            } else {
                first.textContent = "";
                second.textContent = "";
            }
            flippedCards = [];
        }, 600);
    }

}
function setupGame(){
    shuffleAndCreateCards();
    renderBoard();
    startTimer();

    document.querySelectorAll(".card").forEach(card =>{
        card.addEventListener("click", flipCard);
    });
    const restartBtn = document.getElementById("restartBtn");
    if(restartBtn && !restartBtn.hasAttribute("data-bound")){
        restartBtn.addEventListener("click", setupGame);
        restartBtn.setAttribute("data-bound", "true");
    }
}

document.addEventListener("DOMContentLoaded", setupGame);
