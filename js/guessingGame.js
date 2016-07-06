/* **** Global Variables **** */

//Guessing Game constructor function with default of 5 guesses
function guessingGame(num = 5) {
  this.totalGuesses = num;
  this.guessArray = [];
  this.winningNumber = generateWinningNumber();
}
/* **** Guessing Game Functions **** */

// Generate the Winning Number

generateWinningNumber = function(){
	return Math.floor(Math.random() * 100);
}

function playGame(game) {
  game.playersGuessSubmission();
  game.checkGuess();
}

function endGame(status) {
  var src = status === "lose" ? "images/game-over.jpg" : "images/WINNER-YOU.png";
  $('body').prepend('<img id="endgame" src=' + src + ' >');
  $('#endgame').fadeIn('slow');
  $('#player-feedback').text('Click restart if you wish to play again.');
  $('#guess-button').prop('disabled', true);
}

//sets number of guesses left to display to user
guessingGame.prototype.guessesRemaining = function() {
  return this.totalGuesses - this.guessArray.length;
}

guessingGame.prototype.changeGuess = function() {
  $('#guess-num').text(this.guessesRemaining());
}

// Fetch the Players Guess

guessingGame.prototype.playersGuessSubmission = function() {
  var guess = $('#guess-box');
  this.playerGuess = +guess.val();
  guess.val('');
}

// Determine if the next guess should be a lower or higher number

guessingGame.prototype.lowerOrHigher = function() {
  var difference = this.winningNumber - this.playerGuess;
  var lowerHigher = difference > 0 ? "lower" : "higher";
  var distance = Math.ceil(Math.abs(difference)/ 5) * 5;
  $('#player-feedback').text('Your guess is ' + lowerHigher + ' than the secret number, and within ' + distance + ' digits.');
}

// Check if the Player's Guess is the winning number

guessingGame.prototype.checkGuess = function() {
	function alertPlayer(text) {
		$('#player-alert').remove();
		$('#guess-alert').after("<h3 id='player-alert' class='alert'>" + text + "</h3>");
	}

	if (this.playerGuess === this.winningNumber) {
		alertPlayer(this.playerGuess + ' is the secret number!');
    endGame();
  } else if (this.guessArray.indexOf(this.playerGuess) !== -1) {
    alertPlayer('You already guessed that number...');
  } else {
      this.guessArray.push(this.playerGuess);
      if (this.guessArray.length === this.totalGuesses) {
        alertPlayer('You have run out of guesses. Game over!');
        endGame("lose");
      } else {
        alertPlayer(this.playerGuess +' is not the secret number. Try again...');
      }

      this.changeGuess();
      this.lowerOrHigher();
  }
}

// Create a provide hint button that provides additional clues to the "Player"

guessingGame.prototype.provideHint = function() {
	var guessesRemaining = this.guessesRemaining();
  var hintArray = [this.winningNumber];

  while(hintArray.length <= guessesRemaining * 2) {
    hintArray.push(generateWinningNumber());
  }

  $('#player-feedback').text('The secret number is in this list: [' + hintArray.sort() + ']');
}

// Allow the "Player" to Play Again

guessingGame.prototype.playAgain = function() {
  this.changeGuess();
  $('#player-alert').remove();
  $('#player-feedback').text('You have started a new game.');
  $('#guess-button').prop('disabled', false);
}

/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {

  var game = new guessingGame();
  game.changeGuess();

  // Assigns guess to playerGuess when player submits guess
  $('#guess-button').on('click', function() {
    playGame(game);
  });

  $('#hint-button').on('click', function() {
    game.provideHint();
  });

  $('#restart').on('click', function() {
    game = new guessingGame();
    game.playAgain();
  });
	$('body').on('click', '#endgame', function() {
		$(this).remove();
	});

  $('#guess-box').on('keypress', function () {
    if (event.which == 13 || event.keyCode == 13) {
      playGame(game);
    }
  });

});