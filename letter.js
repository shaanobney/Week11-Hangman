var Letter = function(letter) {
	this.appear = false;
	this.charac = letter;
	this.letterRender = function() {
		if (this.appear) {
			return this.charac;
		} else {
			var underScore = " _ ";
			return underScore;
		}
	}
};

module.exports = Letter;