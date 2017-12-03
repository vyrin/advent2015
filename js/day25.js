advent.day25 = advent.Day.extend({
	part : 1,
	targetX : null,
	targetY : null,
	startCode : null,

	solve : function () {
		console.log("start");

		this.loadData();

		this.part = 1;
		this.targetX = 3019;
		this.targetY = 3010;
		this.startCode = 20151125;
		this.solveForPart();

		this.answer(2, "50 Stars!");
		// this.part = 2;
		// this.solveForPart();

		console.log("end");
	},

	solveForPart : function () {
		var x = 1;
		var y = 1;
		var code = this.startCode;
		for (var i = 0; i < 100000000; i++) {
			code *= 252533;
			code %= 33554393;
			if (y == 1) {
				y = x + 1;
				x = 1;
			} else {
				x++;
				y--;
			}
			if (y == this.targetY && x == this.targetX) {
				this.answer(this.part, code);
				break;
			}
			// console.log("(" + x + ", " + y + ") -- " + code);
		}
	},

	loadData : function () {
	},


});
