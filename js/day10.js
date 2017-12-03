advent.day10 = advent.Day.extend({

	solve : function () {
		var len40 = this.solveForSteps(40, this.input);
		this.answer(1, len40);
		var len50 = this.solveForSteps(50, this.input);
		this.answer(1, len50);
	},

	solveForSteps : function (steps, string) {
		_.times(steps, function (i) {
			string = this.iterate(string);
		}, this);
		return string.length;
	},

	iterate : function (string) {
		var result = "";
		var current = null;
		var count = 0;
		for (var i = 0; i < string.length; i++) {
			var c = string.charAt(i);
			if (current) {
				if (c != current) {
					result += count + current;
					count = 0;
				}
			}
			current = c;
			count++;
		}
		result += count + current;

		return result;
	},

});
