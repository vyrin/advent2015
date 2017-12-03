advent.day14 = advent.Day.extend({
	part : 1,

	solve : function () {
		var data = {};
		this.loadData(data);
		console.log(data);

		this.solveWithData(data, 2503);

		// console.log("PART 2");
		// this.solveWithData(data);

	},

	solveWithData : function (data, distance) {
		for (var i = 0; i < distance; i++) {
			_.forEach(data, function (reindeer) {
				if (reindeer.flying) {
					reindeer.distance += reindeer.speed;
				}
				reindeer.count--;
				if (reindeer.count == 0) {
					if (reindeer.flying) {
						reindeer.flying = false;
						reindeer.count = reindeer.rest;
					} else {
						reindeer.flying = true;
						reindeer.count = reindeer.fly;
					}
				}
			}, this);

			var farthest = 0;
			var winner = null;
			_.forEach(data, function (reindeer, name) {
				if (reindeer.distance > farthest) {
					farthest = reindeer.distance;
					winner = name;
				}
			}, this);
			data[winner].points++;
		}

		var farthest = 0;
		var winner = null;
		_.forEach(data, function (reindeer, name) {
			if (reindeer.distance > farthest) {
				farthest = reindeer.distance;
				winner = name;
			}
		}, this);
		console.log("PART 1");
		console.log("winner is " + winner);
		this.answer(1, farthest);

		var maxPoints = 0;
		var winner = null;
		_.forEach(data, function (reindeer, name) {
			if (reindeer.points > maxPoints) {
				maxPoints = reindeer.points;
				winner = name;
			}
		}, this);
		console.log("PART 2");
		console.log("winner is " + winner);
		this.answer(2, maxPoints);

	},

	loadData : function (data) {
		var lines = this.input.split("\n");
		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			data[parts[0]] = {
				rest : parseInt(parts[13]),
				fly : parseInt(parts[6]),
				speed : parseInt(parts[3]),
				distance : 0,
				flying : true,
				count : parseInt(parts[6]),
				points : 0,
			}
		}, this);
	}


});