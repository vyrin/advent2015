advent.day05 = advent.Day.extend({
	solve : function () {
		this.solvePart1();
		this.solvePart2();
	},

	solvePart1 : function() {
		var lines = this.input.split("\n");
		var nice = 0;
		_.forEach(lines, function (line) {
			var vowelCount = 0;
			var foundDouble = false;
			var prev = undefined;
			for (var i = 0; i < line.length; i++) {
				var current = line.charAt(i);
				var duple = prev + current;
				if (duple == "xy" || duple == "ab" || duple == "cd" || duple == "pq") {
					return;
				}
				if (current == prev) {
					foundDouble = true;
				}
				if (current == "a" || current == "e" || current == "i" || current == "o" || current == "u") {
					vowelCount++;
				}
				prev = current;
			}
			if (vowelCount >= 3 && foundDouble) {
				nice++;
			}
		}, this);

		this.answer(1, nice);
	},

	solvePart2 : function() {
		var lines = this.input.split("\n");
		var nice = 0;
		var invalid = 0;
		_.forEach(lines, function (line) {
			var foundDouble = false;
			var foundDuple = false;
			var duples = [];
			var prev = undefined;
			for (var i = 0; i < line.length; i++) {
				var current = line.charAt(i);
				var next = line.charAt(i + 1);
				if (prev) {
					var duple = prev + current;
					if (duples[duple]) {
						if (i - duples[duple] >= 2) {
							foundDuple = true;
						}
					} else {
						duples[duple] = i;
					}
					if (prev && prev == next) {
						foundDouble = true;
					}
				}
				prev = current;
			}
			if (foundDouble && foundDuple) {
				nice++;
			}
		}, this);

		this.answer(2, nice);

	}
});
