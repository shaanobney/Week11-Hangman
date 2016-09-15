var Letter = function(letter) {
	this.charac = letter;
	this.appear = false;
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