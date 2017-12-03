advent.day22 = advent.Day.extend({
	part : 1,
	minMana : 1000000000,
	maxSpells : 10000000,

	solve : function () {
		console.log("start");

		this.loadData();

		this.part = 1;
		this.solveForPart();

		this.part = 2;
		this.solveForPart();

	},

	solveForPart : function () {
		this.minMana = 1000000000;
		this.maxSpells = 10000000;
		
		var player = {
			hp : 50,
			mana : 500,
			armor : 0,
			effects : [],
			manaSpent : 0,
		};
		var boss = {
			hp : 55,
			damage : 8,
		};

		this.playerTurn(player, boss);

		this.answer(this.part, this.minMana);

		console.log("end");
	},

	playerTurn : function (player, boss) {
		// console.log("player: " + player.hp + " (" + player.mana + ")   boss: " + boss.hp);

		if (this.part == 2) {
			player.hp -= 1;
		}

		this.applyEffects(player, boss);

		if (this.isGameOver(player, boss)) {
			return;
		}

		_.forEach(this.spells, function (mana, spellName) {
			var tmpPlayer = _.cloneDeep(player);
			var tmpBoss = _.cloneDeep(boss);
			if (this.castSpell(spellName, tmpPlayer, tmpBoss)) {
				if (this.isGameOver(tmpPlayer, tmpBoss)) {
					return;
				}

				this.bossTurn(tmpPlayer, tmpBoss);
			}
		}, this);
	},

	bossTurn : function (player, boss) {
		this.applyEffects(player, boss);

		if (this.isGameOver(player, boss)) {
			return;
		}

		var damage = boss.damage - player.armor;
		if (damage <= 0) {
			damage = 1;
		}
		player.hp -= damage;

		if (this.isGameOver(player, boss)) {
			return;
		}

		this.playerTurn(player, boss);
	},

	isGameOver : function (player, boss) {
		if (player.hp <= 0) {
			return true;
		} else if (boss.hp <= 0) {
			if (player.manaSpent < this.minMana) {
				this.minMana = player.manaSpent;
			}
			return true;
		}
		return false;
	},

	castSpell : function (spellName, player, boss) {
		if (this.maxSpells-- <= 0) {
			console.log("abort");
			return false;
		}
		if (this.spells[spellName] > player.mana) {
			return false;
		}
		player.mana -= this.spells[spellName];
		player.manaSpent += this.spells[spellName];
		if (player.manaSpent >= this.minMana) {
			return false;
		}
		if (spellName == "missile") {
			boss.hp -= 4;
		} else if (spellName == "drain") {
			boss.hp -= 2;
			player.hp += 2;
		} else {
			if (!this.addEffect(spellName, player)) {
				return false;
			}
		}
		return true;
	},

	addEffect : function (effectName, player) {
		var alreadyCast = false;
		_.forEach(player.effects, function (tmpEffect) {
			if (tmpEffect.name == effectName) {
				alreadyCast = true;
			}
		}, this);
		if (alreadyCast) {
			return false;
		}
		var effect = {
			name : effectName,
		}
		if (effectName == "shield") {
			effect.count = 6;
		} else if (effectName == "poison") {
			effect.count = 6;
		} else if (effectName == "recharge") {
			effect.count = 5;
		}
		player.effects.push(effect);
		return true;
	},

	applyEffects : function (player, boss) {
		var newEffects = [];
		_.forEach(player.effects, function (effect) {
			if (effect.name == "poison") {
				boss.hp -= 3;
			} else if (effect.name == "recharge") {
				player.mana += 101;
			} else if (effect.name == "shield") {
				player.armor = 7;
			}
			effect.count--;
			if (effect.count > 0) {
				newEffects.push(effect);
			} else if (effect.name == "shield") {
				player.armor = 0;
			}
		}, this);
		player.effects = newEffects;
	},

	loadData : function () {
		this.spells = {
			"missile" : 53,
			"drain" : 73,
			"shield" : 113,
			"poison" : 173,
			"recharge" : 229,
		};
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