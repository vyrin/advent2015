advent.day16 = advent.Day.extend({
	part : 1,

	solve : function () {
		var data = [];
		this.loadData(data);
		console.log(data);

		this.part = 1;
		this.solveWithData(data);

		this.part = 2;
		this.solveWithData(data);

	},

	solveWithData : function (data) {
		var master = {
			children: 3,
			cats: 7,
			samoyeds: 2,
			pomeranians: 3,
			akitas: 0,
			vizslas: 0,
			goldfish: 5,
			trees: 3,
			cars: 2,
			perfumes: 1,
		};

		_.forEach(data, function (sue, i) {
			var found = true;
			_.forEach(sue, function (value, key) {
				if (this.part == 2 && (key == "cats" || key == "trees")) {
					if (master[key] >= value) {
						found = false;
					}
				} else if (this.part == 2 && (key == "pomeranians" || key == "goldfish")) {
					if (master[key] <= value) {
						found = false;
					}
				} else {
					if (master[key] != value) {
						found = false;
					}
				}
			}, this);
			if (found) {
				this.answer(this.part, (i + 1));
			}
		}, this);

	},

	loadData : function (data) {
		var lines = this.input.split("\n");
		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			var sue = {};
			sue[parts[2].slice(0, -1)] = parseInt(parts[3].slice(0, -1));
			sue[parts[4].slice(0, -1)] = parseInt(parts[5].slice(0, -1));
			sue[parts[6].slice(0, -1)] = parseInt(parts[7]);
			data.push(sue);
		}, this);
	}


});