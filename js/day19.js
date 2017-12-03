advent.day19 = advent.Day.extend({
	part : 1,
	seed : null,
	transforms : null,
	shortestString : null,
	steps : 0,
	tried : null,
	bounces : 0,

	solve : function () {
		this.part = 1;
		this.loadData();
		console.log(this.transforms);

		var newTransforms = this.generateAllTransforms(this.seed);
		this.answer(1, newTransforms.length);

		this.part = 2;
		this.loadData();

		console.log("start");
		this.shortestString = this.seed;
		this.tried = {};
		this.traverse(this.seed, 0);
		console.log("shortestString = " + this.shortestString);
		console.log("end");
	},

	traverse : function (string, depth) {
		this.steps++;
		if (this.steps % 1000000 == 0) {
			// console.log(this.steps);
		}
		if (this.steps > 1000000) {
			return;
		}
		if (this.tried[string]) {
			this.bounces++;
			return;
		}
		this.tried[string] = true;
		if (string.length < this.shortestString.length) {
			this.shortestString = string;
			// console.log(string + " (" + depth + ")");
		}
		if (string == "e") {
			this.answer(2, depth);
			return;
		}
		var options = this.generateAllTransforms(string);
		// _.forEach(options, function (option) {
		// 	option.subOptions = this.generateAllTransforms(option).length;
		// }, this);
		// options.sort(function (a, b) {
		// 	return (b.subOptions - a.subOptions);
		// }, this);
		_.forEach(options, function (option) {
			this.traverse(option, depth + 1);
		}, this);
	},

	generateAllTransforms : function (string) {
		var results = {};
		var transforms = _.shuffle(this.transforms);
		_.forEach(transforms, function (transform) {
			var regex = new RegExp(transform.s, "g");
			while ( (result = regex.exec(string)) ) {
			    var newString = string.slice(0, result.index) + transform.d + string.slice(result.index + transform.s.length);
			    results[newString] = true;
			}
		}, this);
		return _.keys(results);
	},

	loadData : function () {
		this.transforms = [];
		var lines = this.input.split("\n");
		_.forEach(lines, function (line, i) {
			if (i == lines.length - 1) {
				this.seed = line;
			} else {
				var parts = line.split(" ");
				if (parts.length == 3) {
					this.transforms.push({
						s : parts[this.part == 1 ? 0 : 2],
						d : parts[this.part == 1 ? 2 : 0],
					});
				}
			}
		}, this);
		this.transforms.sort(function (a, b) {
			return (a.s.length - b.s.length);
			// return (b.s.length - a.s.length);
		});
	}


});
