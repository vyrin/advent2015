advent.day17 = advent.Day.extend({
	part : 1,
	countByContainers : null,

	solve : function () {
		var data = [];
		data = this.loadData(data);
		console.log(data);

		this.countByContainers = {};

		this.part = 1;
		this.solveWithData(data);

		console.log(this.countByContainers);
		console.log("count for min containers: " + this.countByContainers[4]);
		this.answer(2, this.countByContainers[4]);

		// console.log("PART 2");
		// this.part = 2;
		// this.solveWithData(data);

	},

	solveWithData : function (data) {
		var count = 0;
		_.times(Math.pow(2, 20), function (i) {
			if (this.calculateSum(i, data) == 150) {
				count++;
			}
		}, this);
		this.answer(1, count);
	},

	calculateSum : function (permutation, data) {
		var sum = 0;
		var i = 0;
		var containers = 0;
		while (permutation != 0) {
			if (permutation & 1 && i < data.length) {
				sum += data[i];
				containers++;
			}
			i++;
			permutation = permutation >> 1;
		}
		if (sum == 150) {
			if (!this.countByContainers[containers]) {
				this.countByContainers[containers] = 0;
			}
			this.countByContainers[containers]++;
		}
		return sum;
	},

	loadData : function (data) {
		var lines = this.input.split("\n");
		_.forEach(lines, function (line) {
			data.push(parseInt(line));
		}, this);
		data.sort(function(a, b) {
			return b - a;
		});
		return data;
	}


});

function range(til) {
    var x = 0, xs = [];
    while (x < til) xs.push(x++);
    return xs;
}

function generate(n) {
    return range(Math.pow(2, n));
}