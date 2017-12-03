advent.day21 = advent.Day.extend({
	part : 1,
	enemyStats : null,
	weapons : null,
	armor : null,
	rings : null,
	minCost : 1000000000,
	minKit : null,
	maxCost : 0,
	maxKit : null,

	solve : function () {
		this.loadData();

		var kits = this.createAllKits();
		_.forEach(kits, function (kit) {
			this.battle(kit);
		}, this);

		this.answer(1, this.minCost);
		console.log("Best Kit: " + JSON.stringify(this.minKit));

		this.answer(2, this.maxCost);
		console.log("Best Kit: " + JSON.stringify(this.maxKit));
	},

	createAllKits : function () {
		var kits = [];
		for (var i = 0; i < this.weapons.length; i++) {
			for (var j = 0; j < this.armor.length; j++) {
				for (var r1 = 0; r1 < this.rings.length - 1; r1++) {
					for (var r2 = r1 + 1; r2 < this.rings.length; r2++) {
						kits.push([
							this.weapons[i],
							this.armor[j],
							this.rings[r1],
							this.rings[r2],
						]);
					}
				}
			}
		}
		return kits;
	},

	battle : function (kit) {
		var player = {
			hp : 100,
			damage : 0,
			armor : 0,
			cost : 0,
		};
		_.forEach(kit, function (item) {
			player.damage += item.damage;
			player.armor += item.armor;
			player.cost += item.cost;
		}, this);
		var enemy = _.clone(this.enemyStats);

		var victory = false;
		for (var i = 0; i < 101; i++) {
			var damage = player.damage - enemy.armor;
			if (damage <= 0) {
				damage = 1;
			}
			enemy.hp -= damage;
			if (enemy.hp <= 0) {
				victory = true;
				break;
			}

			var damage = enemy.damage - player.armor;
			if (damage <= 0) {
				damage = 1;
			}
			player.hp -= damage;
			if (player.hp <= 0) {
				victory = false;
				break;
			}
		}

		if (victory) {
			// Enemy defeated
			if (player.cost < this.minCost) {
				this.minCost = player.cost;
				this.minKit = _.cloneDeep(kit);
			}
		} else {
			if (player.cost > this.maxCost) {
				this.maxCost = player.cost;
				this.maxKit = _.cloneDeep(kit);
			}
		}
	},

	loadData : function () {
		this.enemyStats = {
			hp : 104,
			damage : 8,
			armor : 1,
		};

		this.weapons = [
			{ name : "Dagger    ", cost :   8, damage : 4, armor : 0},
			{ name : "Shortsword", cost :  10, damage : 5, armor : 0},
			{ name : "Warhammer ", cost :  25, damage : 6, armor : 0},
			{ name : "Longsword ", cost :  40, damage : 7, armor : 0},
			{ name : "Greataxe  ", cost :  74, damage : 8, armor : 0},
		];
		this.armor = [
			{ name : "no armor  ", cost :  0, damage : 0, armor : 0},
			{ name : "Leather   ", cost :  13, damage : 0, armor : 1},
			{ name : "Chainmail ", cost :  31, damage : 0, armor : 2},
			{ name : "Splintmail", cost :  53, damage : 0, armor : 3},
			{ name : "Bandedmail", cost :  75, damage : 0, armor : 4},
			{ name : "Platemail ", cost : 102, damage : 0, armor : 5},
		];
		this.rings = [
			{ name : "no ring1  ", cost :  0, damage : 0, armor : 0},
			{ name : "no ring2  ", cost :  0, damage : 0, armor : 0},
			{ name : "Damage +1 ", cost :  25, damage : 1, armor : 0},
			{ name : "Damage +2 ", cost :  50, damage : 2, armor : 0},
			{ name : "Damage +3 ", cost : 100, damage : 3, armor : 0},
			{ name : "Defense +1", cost :  20, damage : 0, armor : 1},
			{ name : "Defense +2", cost :  40, damage : 0, armor : 2},
			{ name : "Defense +3", cost :  80, damage : 0, armor : 3},
		];
	},


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