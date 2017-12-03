advent.day18 = advent.Day.extend({
	part : 1,

	solve : function () {
		var data = [];
		data = this.loadData(data);

		this.part = 1;
		this.solveWithData(data);

		var data = [];
		data = this.loadData(data);
		data[0][0] = 1;
		data[0][99] = 1;
		data[99][99] = 1;
		data[99][0] = 1;

		this.part = 2;
		this.solveWithData(data);

	},

	solveWithData : function (data) {
		_.times(100, function (i) {
			var newData = [];
			_.forEach(data, function (row, y) {
				var newRow = [];
				for (var x = 0; x < 100; x++) {
					newRow.push(this.permuteCell(data, x, y));
				}
				newData.push(newRow);
			}, this);
			data = newData;
		}, this);

		// console.log(JSON.stringify(data));
		var count = 0;
		_.forEach(data, function (row) {
			for (var x = 0; x < 100; x++) {
				count += row[x];
			}
		}, this);
		this.answer(this.part, count);
	},

	permuteCell : function (data, x, y) {
		var neighbors = 0;
		var result = 0;
		for (var i = -1; i <= 1; i++) {
			for (var j = -1; j <= 1; j++) {
				if ((i || j) && data[x + i] && data[x + i][y + j]) {
					neighbors++;
				}
			}
		}
		if (data[x][y] && (neighbors == 2 || neighbors == 3)) {
			result = 1;
		} else if (!data[x][y] && neighbors == 3) {
			result = 1;
		}
		if (this.part == 2) {
			if ((x == 0 && y == 0) || (x == 99 && y == 0) || (x == 99 && y == 99) || (x == 0 && y == 99)) {
				result = 1;
			}
		}
		return result;
	},

	loadData : function (data) {
		var lines = this.input.split("\n");
		_.forEach(lines, function (line) {
			var row = [];
			for (var i = 0; i < line.length; i++) {
				if (line.charAt(i) == "#") {
					row.push(1);
				} else {
					row.push(0);
				}
			}
			data.push(row);
		}, this);
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