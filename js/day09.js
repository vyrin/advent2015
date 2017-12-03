advent.day09 = advent.Day.extend({
	part : 1,
	cities : null,
	bestDistance : 10000000000000,
	bestPath : null,
	worstDistance : 0,
	worstPath : null,
	cityCount : 0,

	solve : function () {
		this.cities = {};
		this.loadCities();
		this.cityCount = _.size(this.cities);

		_.forEach(this.cities, function (city) {
			this.traverse(city, [city.name], 0);
		}, this);

		console.log("bestPath = " + this.bestPath);
		console.log("bestDistance = " + this.bestDistance);
		console.log("worstPath = " + this.worstPath);
		console.log("worstDistance = " + this.worstDistance);
		this.answer(1, this.bestDistance);
		this.answer(2, this.worstDistance);

	},

	traverse : function (city, path, distance) {
		if (path.length == this.cityCount) {
			if (distance < this.bestDistance) {
				this.bestDistance = distance;
				this.bestPath = _.clone(path);
			}
			if (distance > this.worstDistance) {
				this.worstDistance = distance;
				this.worstPath = _.clone(path);
			}
			return;
		}
		city.visited = true;
		_.forEach(city.neighbors, function (delta, cityName) {
			var neighbor = this.getCity(cityName);
			if (!neighbor.visited) {
				path.push(cityName);
				distance += delta;
				this.traverse(neighbor, path, distance);
				distance -= delta;
				path.pop();
			}
		}, this);
		city.visited = false;
	},

	loadCities : function () {
		var lines = this.input.split("\n");
		_.forEach(lines, function (line) {
			var parts = line.split(" ");
			var c1 = this.getCity(parts[0]);
			var c2 = this.getCity(parts[2]);
			c1.neighbors[c2.name] = parseInt(parts[4]);
			c2.neighbors[c1.name] = parseInt(parts[4]);
		}, this);
		console.log(this.cities);
	},

	getCity : function (name) {
		var city = this.cities[name];
		if (!city) {
			city = {};
			city.neighbors = {};
			city.name = name;
			city.visited = false;
			this.cities[name] = city;
		}
		return city;
	},

});
