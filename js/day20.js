advent.day20 = advent.Day.extend({
	part : 1,
	target : null,

	solve : function () {
		this.loadData();

		console.log("start");
		this.part = 1;
		this.solveForPart();

		this.part = 2;
		this.solveForPart();

	},

	solveForPart : function () {
		for (var i = 1; i < 1000000; i++) {
			var presents = this.presentsAtHouse(i);
			// if (i % 10000 == 0) {
			// 	console.log("house (" + i + ") got " + presents + " vs " + this.target);
			// }
			if (presents >= this.target) {
				this.answer(this.part, i);
				break;
			}
		}

		console.log("end");

	},

	presentsAtHouse : function (house) {
		var elves = factors(house);
		var total = 0;
		_.forEach(elves, function (elf) {
			if (this.part == 1) {
				total += elf * 10;
			} else if (this.part == 2) {
				if (house / elf <= 50) {
					total += elf * 11;
				}
			}
		}, this);
		return total;
	},

	loadData : function () {
		this.target = parseInt(this.input);
	}


});

function factors(num) {
	var n_factors = [], i;
 
	for (i = 1; i <= Math.floor(Math.sqrt(num)); i += 1) {
		if (num % i === 0) {
			n_factors.push(i);
			if (num / i !== i) {
				n_factors.push(num / i);
			}
		}
	}
	n_factors.sort(function(a, b){return a - b;});  // numeric sort
	return n_factors;
}
