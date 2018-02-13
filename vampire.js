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
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length; //or is this supposed to include children of children?
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let distance = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      distance++;
      currentVampire = currentVampire.creator;
    }
    return distance;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (vampire.numberOfVampiresFromOriginal > this.numberOfVampiresFromOriginal) return true
    return false
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let vampire = this;
    
    if(this.name = name) {
      return this;
    }

    for(let child of vampire.offspring) {
       let found = child.vampireWithName(name);
       if(found) return found;
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendents = 0;
    
    for(let child of this.offspring) {
      descendents++;
      descendents += child.totalDescendents;
    }
    return descendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenial = [];
    
    if(this.yearConverted > 1980) {
      millenial.push(this);
    }
    
    for(let child of this.offspring) {
      millenial = millenial.concat(child.allMillennialVampires);
    }
    return millenial;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let parentA = this;
    let parentB = vampire;
  
    var ancestor = null;
    let found = false;

    while(parentA != null) {
      while(parentB != null) {
        if(parentA.name === parentB.name) {
          ancestor = parentB;
          found = true;
          break;
        }
        parentB = parentB.creator;
      }
      if(found) break;
      parentA = parentA.creator;
      parentB = vampire;
    }

    return ancestor;
  }
}

module.exports = Vampire;