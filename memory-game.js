"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
  "yellow", "cyan", "salmon", "magenta", "chartreuse",
  "yellow", "cyan", "salmon", "magenta", "chartreuse",
];

const colors = shuffle(COLORS);

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

  for (let color of colors) {
    let card = document.createElement("div");
    card.classList.add(color);
    /*card.addEventListener("click", function(){
      card.style.backgroundColor = color;
    });*/
    card.addEventListener("click", flipCard);
    gameBoard.append(card);
  }
}

/** Flip a card face-up. */
let firstFlip; //hold the first flipped card
let secondFlip; //holds the second flipped card 
let flipped = false; //tells me if the card is flipped or not. 
let onlyTwoClicks = false; //limits trigger happy players :) 

function flipCard(card) {
  if (onlyTwoClicks){
    return;
  }else{
    card.target.style.backgroundColor = card.target.getAttribute("class");
  }
  if (!flipped){
    flipped = true;
    console.log("first flip");
    firstFlip = this; //sets the card clicked to first flipped card
    firstFlip.removeEventListener("click", flipCard) // removes the ability to click the first flip card again.
  }else{
    secondFlip = this; //sets the second card clicked to the second card flipped. 
    flipped = false;
    console.log("second flip");
    handleCardClick(); //compares the two cards flipped. 
  }
}

/** Flip a card face-down. */

function unFlipCard() {
    onlyTwoClicks = true;
    setTimeout(()=>{
      firstFlip.style.backgroundColor = ""; //sets the background color to empty
      secondFlip.style.backgroundColor = ""; //sets the background color to empty
      firstFlip.addEventListener("click", flipCard);
      onlyTwoClicks = false;
    }, 250);
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick() {
  if (firstFlip.style.backgroundColor === secondFlip.style.backgroundColor){ //compares the background colors
    console.log("A MATCH");
    firstFlip.removeEventListener("click", flipCard); //removes the ability to click on cards
    secondFlip.removeEventListener("click", flipCard);
  }else{
    unFlipCard(); //unflips cards after they are deemed unmatched
  }
  /*console.log(evt.target.style.backgroundColor)
  flipCard(evt);
  console.log(evt.target.style.backgroundColor)*/
}

let newGame = document.createElement("button");
newGame.innerText = "New Game!"; 
newGame.addEventListener("click", function(){
  window.location.reload();
})
document.body.append(newGame);




