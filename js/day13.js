advent.day13 = advent.Day.extend({
	part : 1,

	solve : function () {
		var data = {};
		this.loadData(data);
		console.log(data);

		this.part = 1;
		this.solveWithData(data);

		data["you"] = {};
		_.forEach(_.keys(data), function (p1) {
			data[p1]["you"] = 0;
			data["you"][p1] = 0;
		}, this);

		this.part = 2;
		this.solveWithData(data);

	},

	solveWithData : function (data) {
		var permutations = permutator(_.keys(data));
		var bestScore = -1000000;
		var bestOrder = null;
		_.forEach(permutations, function (order) {
			var score = this.calculateHappiness(order, data);
			if (score > bestScore) {
				bestScore = score;
				bestOrder = _.clone(order);
			}
		}, this);

		this.answer(this.part, bestScore);
		console.log("best order = " + bestOrder);
	},

	calculateHappiness : function (order, data) {
		var result = 0;
		for (var i = 0; i < order.length; i++) {
			var j = (i + 1) % order.length;
			result += data[order[i]][order[j]];
			result += data[order[j]][order[i]];
		}
		return result;
	},

	loadData : function (data) {
		var lines = this.input.split("\n");
		_.forEach(lines, function (line) {
			line = line.slice(0, -1);
			var parts = line.split(" ");
			var delta = parseInt(parts[3]);
			if (parts[2] == "lose") {
				delta *= -1;
			}
			var p1 = parts[0];
			var p2 = parts[10];
			if (!data[p1]) {
				data[p1] = {};
			}
			data[p1][p2] = delta;
		}, this);
	}


});

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}