advent.day04 = advent.Day.extend({
	solve : function () {
		console.log("start");
		var found5 = 0;
		var found6 = 0;
		for (var i = 0; i < 10000000; i++) {
			var hash = md5(this.input + i);
			if (hash.charAt(0) == "0") {
				if (hash.charAt(1) == "0") {
					if (hash.charAt(2) == "0") {
						if (hash.charAt(3) == "0") {
							if (hash.charAt(4) == "0") {
								if (!found5) {
									found5 = i;
								}
								if (hash.charAt(5) == "0") {
									found6 = i;
									break;
								}
							}
						}
					}
				}
			}
		}
		this.answer(1, found5);
		this.answer(2, found6);
		console.log("end");
	},
});
