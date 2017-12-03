advent.day12 = advent.Day.extend({
	part : 1,

	solve : function () {
		var json = JSON.parse(this.input);
		console.log(json);

		this.part = 1;
		var count = this.traverse(json);
		this.answer(1, count);

		this.part = 2;
		var count = this.traverse(json);
		this.answer(2, count);

	},

	traverse : function (tree) {
		if (_.isNumber(tree)) {
			return tree;
		} else if (_.isArray(tree)) {
			var sum = 0;
			_.forEach(tree, function (leaf) {
				sum += this.traverse(leaf);
			}, this);
			return sum;
		} else if (_.isObject(tree)) {
			var sum = 0;
			var red = false;
			_.forEach(tree, function (leaf) {
				if (_.isString(leaf) && leaf == "red") {
					red = true;
				}
				sum += this.traverse(leaf);
			}, this);
			if (this.part == 2 && red) {
				return 0;
			}
			return sum;
		} else {
			return 0;
		}
	},

});
