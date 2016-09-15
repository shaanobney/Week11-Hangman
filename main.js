var Word = require('./Word');
var list = require('./game');
var promptly = require('promptly');
// var inquirer = require('inquirer');

game = {
	wordBank : list.game.wordChoices,
	currentWord : null,
	alreadyPicked: [],
	chancesRemaining : 8,

	validator: function (value) {
		if (/^[a-zA-Z]+$/.test(value) === false) { //ENSURES INPUT IS ONLY LETTERS
			throw new Error("Try choosing a letter, Clownshoe!");
		}
		if (value.length != 1) { //ENSURES ONLY ONE LETTER AT A TIME
			throw new Error("Your choice must be ONE letter");
		}
		if (game.alreadyPicked.indexOf(value) != -1) { //NO DUPLICATE PICKS
			throw new Error("You already chose that");
		}
		return value;
	},
	startGame: function (aWord) { //SETS INITIAL CONDITIONS
		this.resetChances();
		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
		// console.log(this.currentWrd);
		// debugger;
		this.currentWrd.getLets();
		this.keepPromptingUser();
	},
	resetChances: function() { //REMAINING CHOICES
		this.chancesRemaining = 8;
	},
	keepPromptingUser: function() { //CORRECT, INCORRECT, WIN
		var self = this;
		promptly.prompt('CHOOSE A LETTER: ', {validator: self.validator}, function(err, result) {
			result = result.toLowerCase();
		    self.alreadyPicked.push(result);
			console.log('You Chose: ' + result.toUpperCase());
		    var currentStatus = self.currentWrd.checkIfLetterFound(result);
		    if (currentStatus == 0) {
		    	console.log('WRONG!');
		    	self.chancesRemaining--;
		    } else {
		    	console.log('Holy Smoke, You Were Right!');
		    if (self.currentWrd.didWeFindTheWord()) {
		    	console.log("\n-------------\n");
		    	console.log('Well, you finally did it. The answer was', self.currentWrd.word.toUpperCase());
		    	return;
		    }
		}
		console.log('CHANCES REMAINING: ', self.chancesRemaining);
		console.log("\n");
		console.log(self.currentWrd.wordRender().toUpperCase());
		console.log("\n");
		console.log('Letters Already Picked: ' + self.alreadyPicked.join(", ").toUpperCase());
		console.log("\n-------------");

		if ((self.chancesRemaining > 0) && (self.currentWrd.found == false)) {
			self.keepPromptingUser();
		}
		else if (self.chancesRemaining == 0) {
			console.log('Seriously? You used a third of the alphabet and still LOST! YOU LOSE!\nThe word was:', self.currentWrd.word.toUpperCase());
		} else {
			console.log(self.currentWrd.wordRender());
		}
	});
	}
};

game.startGame();