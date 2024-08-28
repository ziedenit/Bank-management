const allObjects = this.objetsFinancements.length;
const missingIndexes = [];

for (let i = 0; i < allObjects; i++) {
    if (!this.calculedAlignementIndexObjects.includes(i)) {
        missingIndexes.push(i);
    }
}

if (missingIndexes.length > 0) {
    console.log("Les indices non inclus dans calculedAlignementIndexObjects sont : ", missingIndexes);
} else {
    console.log("Tous les indices sont inclus dans calculedAlignementIndexObjects.");
}
