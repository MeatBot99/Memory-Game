/*Using the font awesome class names as deck array element names made it easy to
set the proper classes to display the "font" when the cards are dynamically created.*/
let deck= ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle",
"fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"]
let openCards= [];
let cardMatches= 0;
let moves= 0;
let moveCounter= document.querySelector(".moves");
let stars= [];
let seconds= 0;
let secondsCounter= document.querySelector(".seconds");
let cover= document.querySelector(".cover");
let start= document.querySelector(".start");
let container= document.querySelector(".container");

/*Start game animation. This funs it up a little bit.*/
const startGame= function(){
  cover.classList.add("zoomOutUp");
  setTimeout(function(){
  cover.style.display="none";
  container.style.display="flex";
  }, 1000);
}

start.addEventListener("click", startGame);

/*Move counter incrementer. Updates the current number of moves on display.*/
const movePlus= function(){
  moveCounter.innerText= moves;
}

/*Puts the icons into an array for manipulation.*/
const starCounter= function (){
  let star= document.querySelectorAll(".fa-star");
  star.forEach(function(piece){
    stars.push(piece);
  })
}

/*This function tracks current moves and subtracts stars as moves increase.*/
const starPopper= function(){
  if(moves===12){
    stars[2].style.color="#000";
    stars.pop();
  }if(moves===23){
    stars[1].style.color="#000";
    stars.pop();
  }
}

/*The timer function. Just counts seconds but that is all that is needed for
this project.*/
const count= function(){
  seconds++;
  secondsCounter.innerText= seconds;
}

let timer= setInterval(count, 1000);

/* I based my implementation of the game on the given starter code.
That is why I have the "i" classes. It was easier to ensure I was making
progress if my version looked like the provided one.I added the event listeners
 to each element rather than delegating from the
the parent element ul because it made more sense to me and perfomance is
not an issue for this lightweight project.*/
const createDeck= function (){
  deck.forEach(function(card){
    let decks= document.querySelector(".deck");
    let cards= document.createElement("li");
    let iClass= document.createElement("i");
    cards.appendChild(iClass);
    cards.className= "card";
    iClass.className= "fa "+ card;
    cards.addEventListener("click", clickEvent);
    decks.appendChild(cards);
  });
}

/*The function for the addEventListener. Instead of providing an anonymous
function, it is declared here and referenced when click event triggers.*/
const clickEvent= function(event){
    let cardClicked= event.target;
    showCard(cardClicked);
    compare(cardClicked);
}

/*The basic functionality of turning a 'face-down' card face-up.*/
const showCard= function(cardClicked){
  cardClicked.classList.toggle("show");
  cardClicked.classList.toggle("open");
}

/*The main engine code lives here. If the cards match, they gain the "match"
class and the comparsion array is reset. If the cards do not match, they are
returned to their starting state and the comparison array is reset.*/
const compare= function(cardClicked){
  if(cardClicked.classList.contains("open") && openCards.length<2){

  openCards.push(cardClicked);

    if(openCards.length==2 && openCards[0].firstChild.className === openCards[1].firstChild.className){
      openCards[0].classList.add("match", "animated", "bounce");
      openCards[1].classList.add("match", "animated", "bounce");
      openCards= [];
      moves++;
      movePlus();
      starPopper();
      cardMatches++;
      if (cardMatches===8){
        win();
      }
    }else if(openCards.length==2 && openCards[0].firstChild.className !== openCards[1].firstChild.className){
      setTimeout(function(){
        openCards[0].classList.remove("open", "show");
        openCards[1].classList.remove("open", "show");
        openCards= [];
      }, 1050);
      /*Toggling the animation classes was not functioning properly so I improvised
      a method to have it work.*/
      openCards[0].classList.add("animated","shake");
      openCards[1].classList.add("animated","shake");
      setTimeout(function(){
        openCards[0].classList.remove("animated","shake");
        openCards[1].classList.remove("animated","shake");
      }, 1000);
      moves++;
      movePlus();
      starPopper();
    }
  }else{
    /*This pop method prevents a card from being clicked 3 times and becoming a "match"*/
    openCards.pop();
  }
}

/*Win condition state.*/
const win= function(){
  let winScreen= document.querySelector(".win");
  let starCount= document.querySelector(".starCount");
  let movesCount= document.querySelector(".movesCount");
  let timeCount= document.querySelector(".timeCount");

  clearInterval(timer);
  starCount.innerText= starCount.innerText + " " + stars.length + " stars";
  movesCount.innerText= movesCount.innerText + " " + moves;
  timeCount.innerText= timeCount.innerText + " " + seconds +" seconds";
  winScreen.style.display="flex";
  winScreen.classList.add("animated", "zoomInDown");
}

/*Restart/reload the window and everything resets to initial value.*/
const restart= function(){
  window.location.reload(true);
}

/*I did not modify the shuffle function or its display. Why mess with something
that works?*/
////////////////////////////////////////////////////////////////////////////////
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }
////////////////////////////////////////////////////////////////////////////////

/*These click events reset the window to default status.*/
document.querySelector(".reload").addEventListener("click", restart);

document.querySelector(".restart").addEventListener("click", restart);

shuffle(deck);
createDeck();
starCounter();
