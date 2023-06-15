class Vampire {
	constructor(name, yearConverted) {
		this.name = name;
		this.yearConverted = yearConverted;
		this.offspring = [];
		this.creator = null;
	}

	/** Simple tree methods **/

	// Adds the vampire as an offspring of this vampire
	addOffspring(vampire) {
		this.offspring.push(vampire); //vampire is the child
		vampire.creator = this; //
	}

	// Returns the total number of vampires created by that vampire
	get numberOfOffspring() {
		return this.offspring.length;
	}

	// Returns the number of vampires away from the original vampire this vampire is
	get numberOfVampiresFromOriginal() {
		let number = 0;
		let current = this;
		while (current.creator) {
			number += 1;
			current = current.creator;
		}
		return number;
	}

	// Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
	isMoreSeniorThan(vampire) {
		return (
			this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
		);
	}

	/** Tree traversal methods **/

	// Returns the vampire object with that name, or null if no vampire exists with that name
	vampireWithName(name) {
		let result = null;
		console.log("name arg:", name);
		console.log("this.name:", this.name);
		if (name === this.name) {
			result = this; //van3
		}

		for (const vampire of this.offspring) {
			console.log("vampire:", vampire);
			result = result || vampire.vampireWithName(name);
			//vampire3.vampireWithName(vampire3)
			//vampire2.vmpireWithName(vampire3)
			//vampire1, vanpireWithName(vampire3)
		}

		// console.log("this:", this);
		return result;
	}

	// Returns the total number of vampires that exist

	//root.totalDescendents
	get totalDescendents() {
		let vampire = 0;

		for (const child of this.offspring) {
			vampire += child.totalDescendents + 1; //1 is the child itself

			console.log(
				"child.totalDescendents:",
				child.totalDescendents,
				child.name
			);
		}

		return vampire;
	}

	// check test and write down the tree first. Easier to see the whole picture visually.

	// Returns an array of all the vampires that were converted after 1980
	get allMillennialVampires() {
		let vampire = [];
		if (this.yearConverted > 1980) {
			vampire.push(this);
		}
		for (const childVampire of this.offspring) {
			vampire = vampire.concat(childVampire.allMillennialVampires);
		}
		return vampire;
	}

	/** Stretch **/

	// Returns the closest common ancestor of two vampires.
	// The closest common anscestor should be the more senior vampire if a direct ancestor is used.
	// For example:
	// * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
	// * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
	closestCommonAncestor(vampire) {}
}

module.exports = Vampire;
