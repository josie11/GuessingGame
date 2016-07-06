/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber(), guessArray = [];



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 100);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	var guess = $('#guess-box');
	playersGuess = +(guess.val());
	guess.val('');
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
}

// Check if the Player's Guess is the winning number

function checkGuess(){
  var guessText = $('#guess-alert');

  function gameOver(text) {
    $('#guess-button').remove();
    guessText.text(text);
  };

	if (playersGuess === winningNumber) {
    gameOver('Congratulations, you won!');
  } else if (guessArray.indexOf(playersGuess) !== -1) {
    guessText.text('You already guessed that number, try again!');
  } else {
    if (+$('#guess-num') === 0) {
      gameOver('You ran out of guesses, you lose!');
    } else {
      guessArray.push(playersGuess);
      $('#guess-num').text(+$('#guess-num').text() - guessArray.length);
    }
  }
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {

  // Assigns guess to playerguess when player submits guess
  $('#guess-button').on('click', function() {
    playersGuessSubmission();
    checkGuess()
  });

  //
});
