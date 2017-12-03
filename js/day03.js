advent.day03 = advent.Day.extend({
	solve : function () {
		this.solveForSantaCount(1);
		this.solveForSantaCount(2);
	},

	solveForSantaCount : function (santaCount) {
		var map = [];
		var x = [0, 0];
		var y = [0, 0];
		var houses = 0;

		this.mark(map, 0, 0);
		houses = 1;

		for (var i = 0; i < this.input.length; i++) {
			var c = this.input.charAt(i);
			var j = i % santaCount;
			if (c == "^") {
				y[j]--;
			} else if (c == "v") {
				y[j]++;
			} else if (c == ">") {
				x[j]++;
			} else if (c == "<") {
				x[j]--;
			}
			if (this.mark(map, x[j], y[j])) {
				houses++;
			}
		}

		this.answer(santaCount, houses);
	},

	mark : function (map, x, y) {
		if (map[x] === undefined) {
			map[x] = [];
		}
		if (map[x][y] !== undefined) {
			return false;
		} else {
			map[x][y] = 1;
			return true;
		}
	},
});
