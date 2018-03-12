const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const modal = document.querySelector(".modal");
const stars = document.querySelector(".stars");
const moves = document.querySelector(".moves");
const movesNumber = document.querySelector(".moves-number");
const time = document.querySelector(".time");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let timer;
//In checkCardsArray we check if 2 cards match or not 
let checkCardsArray = [];
//Win condition: when winGame = 8
let winGame = 0;
let resettimer = 0;
const iconsList = [
		"diamond", "diamond",
		"paper-plane-o", "paper-plane-o",
		"anchor", "anchor",
		"bolt", "bolt",
		"cube", "cube",
		"leaf", "leaf",
		"bicycle", "bicycle",
		"bomb", "bomb"
		];

restart.addEventListener("click", newGame);
deck.addEventListener("click", flipCard);

function newGame() {
	shuffle(iconsList);
	deck.innerHTML = "";
	createDeck();
	checkCardsArray = [];
	winGame = 0;
	moves.innerText = 0;
	resettimer = 0;
	seconds.innerText = 0;
	minutes.innerText = 0;
	stopTimer();
	resetStars();
	clearWinGameModal();
}

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

function flipCard(event) {
	//Start timer on first click on a card
	if (resettimer === 0) {
		startTimer();
		resettimer = 1;
	}
	//Disable fliping on more than 2 cards at a time
	if (checkCardsArray.length > 1) {
		return;
	}
	if (event.target.tagName === "LI") {
		showCard(event);
		checkCardsArray.push(event.target);
		if (checkCardsArray.length === 2) {
			checkMatchingCards();
			updateMoves();
		}
	}
}

function showCard(event) {
	event.target.classList.add("open");
}

function checkMatchingCards() {
	//Check to see if both items in checkCardsArray have the same classes
	if (checkCardsArray[0].classList.value === checkCardsArray[1].classList.value) {
		setTimeout(function() {
			matchCards();
			checkCardsArray = [];
		}, (500));
	//If the 2 cards don't match, make them red and flip them back
	} else {
		notMatchCards();
	}
}

function updateMoves() {
	moves.innerText++;
	//Stars removal
	if (moves.innerText > 15) {
		document.querySelector(".stars li:nth-child(1)").classList.add("star-fade");
	}
	if (moves.innerText > 25) {
		document.querySelector(".stars li:nth-child(2)").classList.add("star-fade");
	}
}

function matchCards() {
	checkCardsArray[0].classList.add("match");
	checkCardsArray[1].classList.add("match");
	winGame++;
	//Win condition
	if (winGame === 8) {
		clearInterval(timer);
		winGameModal();
	}
}

function notMatchCards() {
	checkCardsArray[0].classList.add("not-match");
	checkCardsArray[1].classList.add("not-match");
	setTimeout(function() {
		checkCardsArray[0].classList.remove("open", "not-match");
		checkCardsArray[1].classList.remove("open", "not-match");
		checkCardsArray = [];
	}, (1000));
}

function createDeck() {
	for (let i=0; i<iconsList.length; i++) {
		const newCard = document.createElement("li");
		//Add the first part of the classes + a random one from the iconsList array
		newCard.setAttribute("class", "card fa fa-" + iconsList[i]);
		deck.appendChild(newCard);
	}
}

function resetStars() {
	document.querySelector(".stars li:nth-child(1)").classList.remove("star-fade");
	document.querySelector(".stars li:nth-child(2)").classList.remove("star-fade");
}

function startTimer() {
	timer = setInterval(function() {
				seconds.innerText++;
				if(seconds.innerText == 60) {
					minutes.innerText++;
					seconds.innerText = 0;
				}
			},(1000));
	return timer;
}

function stopTimer(){
	clearInterval(timer);
}

function winGameModal() {
	const modalContent = document.querySelector(".modal-content");
	modal.style.display = "block";
	modalContent.appendChild(restart);
	modalContent.appendChild(time);
	modalContent.appendChild(stars);
	modalContent.appendChild(movesNumber);
}

function clearWinGameModal () {	
	const scorePanel = document.querySelector(".score-panel");
	modal.style.display = "none";
	restart.appendChild(time);
	scorePanel.prepend(stars);
	scorePanel.appendChild(movesNumber);
	scorePanel.appendChild(time);
	scorePanel.appendChild(restart);
}