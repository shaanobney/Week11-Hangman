
var Letter = require('./Letter');

var Word = function(aWord) {
	this.word = aWord;
	this.found = false;
	this.lets = [];

	this.getLets = function() {
		for (i = 0; i < this.word.length; i++) {
			var newLet = new Letter(this.word.charAt(i));
			this.lets.push(newLet);
		}
	};

	this.didWeFindTheWord = function() {
		this.found = true;
		for (i = 0; i < this.lets.length; i++) {
			if (this.lets[i].appear === false) {
				this.found = false;
			}
		}
		return this.found;
	};

	this.checkIfLetterFound = function(chosenLetter) {
		var increment = 0;
		for (i = 0; i < this.lets.length; i++) {
			if (this.lets[i].charac === chosenLetter) {
				this.lets[i].appear = true;
				increment++;
			}
		}
		return increment;
	};

	this.wordRender = function() {
		var str = "";
		for (i = 0; i < this.lets.length; i++) {
			str = str + this.lets[i].letterRender();
		}
		return str;
	};
}

module.exports = Word;