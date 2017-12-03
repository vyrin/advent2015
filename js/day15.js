advent.day15 = advent.Day.extend({
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
		var bestPermutation = null;
		var bestScore = 0;

		var permutations = this.createPermutations(100);
		_.forEach(permutations, function (permutation) {
			var score = this.tryPermutation(permutation, data);
			if (score > bestScore) {
				bestScore = score;
				bestPermutation = _.clone(permutation);
			}
		}, this);

		console.log("best permutation: " + bestPermutation);
		this.answer(this.part, bestScore);
	},

	createPermutations : function (total) {
		var result = [];
		for (var a = 1; a < total; a++) {
			for (var b = 1; b < total - a; b++) {
				for (var c = 1; c < total - (a + b); c++) {
					var d = total - (a + b + c);
					result.push([a, b, c, d]);
				}
			}
		}
		return result;
	},

	tryPermutation : function (amounts, data) {
		var stats = [0, 0, 0, 0, 0];
		_.forEach(data, function (ingredient, i) {
			this.addIngredient(stats, ingredient, amounts[i]);
		}, this);
		return this.computeValue(stats);
	},

	addIngredient : function (stats, ingredient, qty) {
		_.times(5, function (i) {
			stats[i] += ingredient.stats[i] * qty;
		}, this);
		return stats;
	},

	computeValue : function (stats) {
		if (this.part == 2 && stats[4] != 500) {
			return 0;
		}
		var total = 1;
		for (var i = 0; i < 4; i++) {
			if (stats[i] < 0) {
				return 0;
			}
			total *= stats[i];
		}
		return total;
	},

	loadData : function (data) {
		var lines = this.input.split("\n");
		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			data.push({
				name : parts[0].slice(0, -1),
				stats : [
					parseInt(parts[2].slice(0, -1)),
					parseInt(parts[4].slice(0, -1)),
					parseInt(parts[6].slice(0, -1)),
					parseInt(parts[8].slice(0, -1)),
					parseInt(parts[10]),
				],
			});
		}, this);
	}


});