advent.day02 = advent.Day.extend({
	solve : function () {
		var lines = this.input.split("\n");
		var paper = 0;
		var ribbon = 0;
		_.some(lines, function (line) {
			var parts = line.split("x");
			parts = _.map(parts, function (part) {
				return parseInt(part);
			});
			parts.sort(function(a, b) {
				return a - b;
			});
			var sum = 3 * parts[0] * parts[1] + 2 * parts[0] * parts[2] + 2 * parts[1] * parts[2];
			paper += sum;
			ribbon += (2 * parts[0] + 2 * parts[1] + parts[0] * parts[1] * parts[2]);
		}, this);

		this.answer(1, paper);
		this.answer(2, ribbon);
	},
});
