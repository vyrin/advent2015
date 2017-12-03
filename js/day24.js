advent.day24 = advent.Day.extend({
	part : 1,
	packages : null,

	solve : function () {
		console.log("start");

		this.loadData();

		this.part = 1;
		this.solveForPart();

		this.part = 2;
		this.solveForPart();

		console.log("end");
	},

	solveForPart : function () {
		var targetWeight = 0;
		_.forEach(this.packages, function (weight) {
			targetWeight += weight;
		}, this);
		if (this.part == 1) {
			targetWeight /= 3;
		} else if (this.part == 2) {
			targetWeight /= 4;
		}
		console.log("targetWeight = " + targetWeight);

		var permutations = this.createPermutations(this.packages, 0, targetWeight);
		_.forEach(permutations, function (permutation) {
			permutation.qe = _.reduce(permutation, function (prev, value) { return prev * value; });
		}, this);
		permutations.sort(function (a, b) {
			if (a.length == b.length) {
				return a.qe - b.qe;
			} else {
				return a.length - b.length;
			}
		});

		_.some(permutations, function (permutation) {
			var remainder = _.difference(this.packages, permutation);
			var subPermutations = this.createPermutations(remainder, 0, targetWeight);
			if (subPermutations.length > 0) {
				console.log("Found: " + permutation);
				this.answer(1, permutation.qe);
				return true;
			}
		}, this);
	},

	createPermutations : function (packages, index, total) {
		var results = [];
		for (var i = index; i < packages.length; i++) {
			var weight = packages[i];
			var left = total - weight;
			if (left == 0) {
				results.push([weight]);
			} else if (left < 0) {
				break;
			} else {
				var subResults = this.createPermutations(packages, i + 1, left);
				_.forEach(subResults, function (subResult) {
					results.push([weight].concat(subResult));
				}, this);
			}
		}
		return results;
	},

	loadData : function () {
		var lines = this.input.split("\n");
		this.packages = [];
		_.forEach(lines, function (line) {
			this.packages.push(parseInt(line));
		}, this);
	},


});
