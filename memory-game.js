"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
var flippedCardCount = 0;
const FLIPPED_CARDS = [];
createCards(colors);

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  
  colors.forEach((color,idx)=>{
    // for each color
      // create a div
      // creat a listener
      // give them a class of the color looped over
      let newCard = document.createElement("div");
      newCard.id = idx;
      newCard.classList.add(color, "center");
      newCard.addEventListener("click",handleCardClick);
      document.getElementById("game").appendChild(newCard);
  })
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  let cardColor = card.classList[0]
  card.style.backgroundColor = cardColor;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = "white";

}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {

  let card = evt.target
  if(flippedCardCount < 2){
    flippedCardCount++
    FLIPPED_CARDS.push(card);
  }if(flippedCardCount == 2 && FLIPPED_CARDS[0].id === FLIPPED_CARDS[1].id){
    flippedCardCount--;
    unFlipCard(FLIPPED_CARDS[1]);
    FLIPPED_CARDS.pop();
  }

}

setInterval(main,100);

function main(){
  FLIPPED_CARDS.forEach(flipCard)
  if(flippedCardCount == 2){
    if(FLIPPED_CARDS[0].classList[0] == FLIPPED_CARDS[1].classList[0]){
      resetFlippedCards();
      flippedCardCount = 0;
    }else{
      setTimeout(()=>{   
        FLIPPED_CARDS.forEach(unFlipCard);
        resetFlippedCards();
        flippedCardCount = 0;
      },1000)
    }
  }
}

function resetFlippedCards(){
  while(FLIPPED_CARDS.length > 0){
    FLIPPED_CARDS.pop();
  }
}