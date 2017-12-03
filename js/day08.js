advent.day08 = advent.Day.extend({

	solve : function () {
		this.solvePart1();
		this.solvePart2();
	},

	solvePart1 : function () {
		var lines = this.input.split("\n");
		var totalChars = 0;
		var totalBytes = 0;
		_.forEach(lines, function (line) {
			totalChars += line.length;
			line = line.slice(1, -1);
			for (var i = 0; i < line.length; i++) {
				totalBytes++;
				var c = line.charAt(i);
				if (c == "\\") {
					var n = line.charAt(i + 1);
					if (n == "x") {
						i += 3;
					} else {
						i += 1;
					}
				}
			}
		}, this);

		console.log("totalChars = " + totalChars);
		console.log("totalBytes = " + totalBytes);
		this.answer(1, (totalChars - totalBytes));

	},

	solvePart2 : function () {
		var lines = this.input.split("\n");
		var totalChars = 0;
		var totalExpanded = 0;
		_.forEach(lines, function (line) {
			totalChars += line.length;
			totalExpanded += 2;
			for (var i = 0; i < line.length; i++) {
				totalExpanded++;
				var c = line.charAt(i);
				if (c == "\\" || c == "\"") {
					totalExpanded++;
				}
			}
		}, this);

		console.log("totalChars = " + totalChars);
		console.log("totalExpanded = " + totalExpanded);
		this.answer(2, (totalExpanded - totalChars));

	},

});
