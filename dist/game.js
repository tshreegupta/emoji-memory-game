"use strict";
const emojis = ["🤡", "🍕", "🐱", "🚀", "🌈", "🎉", "🐶", "🍩"];
let cards = [];
let flippedCards = [];
function shuffleAndCreateCards() {
    const doubled = [...emojis, ...emojis]; // ... flat merges the list
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    flippedCards = [];
    cards = shuffled.map((emoji, index) => ({
        id: index,
        emoji: emoji,
        matched: false,
    }));
}
function renderBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    cards.forEach((card, index) => {
        const cardE1 = document.createElement("div");
        cardE1.className = "card";
        cardE1.dataset.index = index.toString();
        cardE1.textContent = ""; //hidden initially
        board.appendChild(cardE1);
    });
}
function flipCard(e) {
    const target = e.currentTarget;
    const index = parseInt(target.dataset.index);
    const card = cards[index];
    if (card.matched || flippedCards.includes(target) || flippedCards.length === 2)
        return;
    target.textContent = card.emoji;
    flippedCards.push(target);
    if (flippedCards.length === 2) {
        const [first, second] = flippedCards;
        const firstCard = cards[parseInt(first.dataset.index)];
        const secondCard = cards[parseInt(second.dataset.index)];
        setTimeout(() => {
            if (firstCard.emoji === secondCard.emoji) {
                firstCard.matched = true;
                secondCard.matched = true;
            }
            else {
                first.textContent = "";
                second.textContent = "";
            }
            flippedCards = [];
        }, 600);
    }
}
function setupGame() {
    shuffleAndCreateCards();
    renderBoard();
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", flipCard);
    });
    const restartBtn = document.getElementById("restartBtn");
    if (restartBtn && !restartBtn.hasAttribute("data-bound")) {
        restartBtn.addEventListener("click", setupGame);
        restartBtn.setAttribute("data-bound", "true");
    }
}
document.addEventListener("DOMContentLoaded", setupGame);
