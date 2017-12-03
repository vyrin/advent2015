advent.day06 = advent.Day.extend({
	part : 1,

	solve : function () {
		this.part = 1;
		this.solvePart1();
		this.part = 2;
		this.solvePart1();
	},

	solvePart1 : function() {
		var lines = this.input.split("\n");
		var lights = [];
		_.times(1000, function (i) {
			lights[i] = [];
			_.times(1000, function (j) {
				lights[i][j] = 0;
			});
		});
		var re = /(toggle|turn on|turn off) (.*) through (.*)/;
		_.some(lines, function (line) {
			var matches = re.exec(line);
			if (!matches || matches.length != 4) {
				return;
			}
			var action = matches[1];
			var c1 = matches[2].split(",");
			var c2 = matches[3].split(",");
			c1 = _.map(c1, function (foo) { return parseInt(foo); });
			c2 = _.map(c2, function (foo) { return parseInt(foo); });
			this.modify(lights, action, c1, c2);
		}, this);

		var count = 0;
		for (var x = 0; x < 1000; x++) {
			for (var y = 0; y < 1000; y++) {
				count += lights[x][y];
			}
		}

		this.answer(this.part, count);
	},

	modify : function (lights, action, c1, c2) {
		var toggle = (action == "toggle");
		var turnOn = (action == "turn on");
		var turnOff = (action == "turn off");
		var minX = _.min([c1[0], c2[0]]);
		var maxX = _.max([c1[0], c2[0]]);
		var minY = _.min([c1[1], c2[1]]);
		var maxY = _.max([c1[1], c2[1]]);
		for (var x = minX; x <= maxX; x++) {
			for (var y = minY; y <= maxY; y++) {
				if (this.part == 1) {
					if (turnOn || (toggle && !lights[x][y])) {
						lights[x][y] = 1;
					} else if (turnOff || (toggle && lights[x][y])) {
						lights[x][y] = 0;
					}
				} else if (this.part == 2) {
					if (turnOn) {
						lights[x][y]++;
					} else if (turnOff && lights[x][y]) {
						lights[x][y]--;
					} else if (toggle) {
						lights[x][y] += 2;
					}
				}
			}
		}
	},


});
