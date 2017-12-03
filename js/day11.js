String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

advent.day11 = advent.Day.extend({

	solve : function () {
		console.log("start");

		if (this.isValid("ghjaabcc")) {
			console.log("sanity check");
		}

		var string = this.input;
		for (var i = 0; i < 300000; i++) {
			// console.log("string = " + string);
			if (this.isValid(string)) {
				this.answer(1, string);
				break;
			}
			string = this.increment(string);
		}

		string = this.increment(string);
		for (var i = 0; i < 3000000; i++) {
			// console.log("string = " + string);
			if (this.isValid(string)) {
				this.answer(2, string);
				break;
			}
			string = this.increment(string);
		}

		console.log("end");
	},

	increment : function (string) {
		for (var i = 7; i >= 0; i--) {
			var c = string.charCodeAt(i) + 1;
			if (c == 123) {
				string = string.replaceAt(i, "a");
			} else {
				string = string.replaceAt(i, String.fromCharCode(c));
				break;
			}
		}
		return string;
	},

	isValid : function (string) {
		var foundStraight = false;
		var foundDuple = false;
		var firstDuple = -1;
		var prev = undefined;
		for (var i = 0; i < string.length; i++) {
			var current = string.charAt(i);
			if (current == "i" || current == "l" || current == "o") {
				return false;
			}
			var next = string.charAt(i + 1);
			if (prev) {
				if (prev == current) {
					if (firstDuple != -1) {
						if (i - firstDuple >= 2) {
							foundDuple = true;
						}
					} else {
						firstDuple = i;
					}
				}
				if (next) {
					if (prev.charCodeAt(0) == current.charCodeAt(0) - 1 && current.charCodeAt(0) == next.charCodeAt(0) - 1) {
						foundStraight = true;
					}
				}
			}
			prev = current;
		}
		if (foundStraight && foundDuple) {
			return true;
		} else {
			return false;
		}
	},

});
