advent.day01 = advent.Day.extend({
	solve : function () {
		var input = this.input;

		var solution = 0;
		var basement = 0;
		for (var i = 0; i < input.length; i++) {
			if (input.charAt(i) == "(") {
				solution++;
			} else if (input.charAt(i) == ")") {
				solution--;
			}
			if (solution < 0 && !basement) {
				basement = i + 1;
			}
		}

		this.answer(1, solution);
		this.answer(2, basement);

	},
});
