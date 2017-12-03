advent.day23 = advent.Day.extend({
	part : 1,
	instructions : null,
	pc : 0,
	a : 0,
	b : 0,

	solve : function () {
		console.log("start");

		this.loadData();

		this.pc = 0;
		this.a = 0;
		this.b = 0;
		this.part = 1;
		this.solveForPart();

		this.pc = 0;
		this.a = 1;
		this.b = 0;
		this.part = 2;
		this.solveForPart();

		console.log("end");
	},

	solveForPart : function () {
		var finished = false;
		for (var i = 0; i < 100000; i++) {
			if (!this.execute()) {
				finished = true;
				break;
			}
		}
		if (finished) {
			this.answer(this.part, this.b);
		}
	},

	execute : function () {
		var instruction = this.instructions[this.pc]
		if (!instruction) {
			return false;
		}
		// console.log("cmd (" + this.pc + "): (a = " + this.a + ") (b = " + this.b + ") -- " + instruction.line)
		this.pc++;
		if (instruction.cmd == "jmp" || instruction.cmd == "jio" || instruction.cmd == "jie") {
			if (instruction.cmd == "jmp") {
				var shouldJump = true;
			} else if (instruction.cmd == "jie" && (this[instruction.reg] % 2 == 0)) {
				shouldJump = true;
			} else if (instruction.cmd == "jio" && (this[instruction.reg] == 1)) {
				shouldJump = true;
			}
			if (shouldJump) {
				this.pc--;
				this.pc += instruction.offset;
			}
		} else if (instruction.cmd == "inc") {
			this[instruction.reg] += 1;
		} else if (instruction.cmd == "tpl") {
			this[instruction.reg] *= 3;
		} else if (instruction.cmd == "hlf") {
			this[instruction.reg] = parseInt(this[instruction.reg] / 2);
		}
		return true;
	},

	loadData : function () {
		var lines = this.input.split("\n");
		this.instructions = [];
		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			var instruction = {};
			instruction.line = line;
			var cmd = parts[0];
			instruction.cmd = cmd;
			if (cmd == "jio" || cmd == "jie") {
				instruction.reg = parts[1].slice(0, -1);
				instruction.offset = parseInt(parts[2]);
			} else if (cmd == "jmp") {
				instruction.offset = parseInt(parts[1]);
			} else {
				instruction.reg = parts[1];
			}
			this.instructions.push(instruction);
		}, this);
	},


});
