advent.day07 = advent.Day.extend({
	wires : null,
	part : 1,

	solve : function () {
		this.part = 1;
		this.solvePart();
		this.part = 2;
		this.solvePart();
	},

	solvePart : function () {
		this.wires = this.loadWires();

		if (this.part == 2) {
			this.wires["b"] = 16076;
		}

		var success = false;

		for (var i = 0; i < 200; i++) {
			var modified = 0;
			var evalled = 0;
			_.some(this.wires, function (params, wire) {
				if (_.isNumber(params)) {
					evalled++;
					if (wire == "a") {
						success = true;
						return true;
					}
				} else {
					if (this.updateWire(wire, params)) {
						modified++;
					}
				}
			}, this);
			if (success) {
				break;
			}
		}

		if (success) {
			this.answer(this.part, this.wires["a"]);
		}
	},

	updateWire : function (wire, params) {
		var params = _.clone(params);
		if (params.length == 1) {
			if (false === (params[0] = this.getValue(params[0]))) {
				return false;
			}
			this.wires[wire] = params[0];
		} else if (params.length == 2) {
			if (false === (params[1] = this.getValue(params[1]))) {
				return false;
			}
			if (params[0] == "NOT") {
				this.wires[wire] = ~ params[1];
			}
		} else if (params.length == 3) {
			if (false === (params[0] = this.getValue(params[0]))) {
				return false;
			}
			if (false === (params[2] = this.getValue(params[2]))) {
				return false;
			}
			if (params[1] == "LSHIFT") {
				this.wires[wire] = params[0] << params[2];
			} else if (params[1] == "RSHIFT") {
				this.wires[wire] = params[0] >> params[2];
			} else if (params[1] == "AND") {
				this.wires[wire] = params[0] & params[2];
			} else if (params[1] == "OR") {
				this.wires[wire] = params[0] | params[2];
			}
		}
		return true;
	},

	getValue : function (key) {
		if (_.isNumber(key)) {
			return key;
		} else if (!isNaN(key)) {
			return parseInt(key);
		} else {
			var value = this.wires[key];
			if (_.isNumber(value)) {
				return value;
			}
		}
		return false;
	},

	loadWires : function () {
		var newWires = {};
		var lines = this.input.split("\n");
		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			var wire = parts[parts.length - 1];
			newWires[wire] = parts.slice(0, -2);
		}, this);
		return newWires;
	},

});
