this.evaluatedIndex.push(index);
// Vérifie si tous les éléments de evaluatedIndex sont présents dans manuallyAddedIndices
const allEvaluatedAreAdded = this.evaluatedIndex.every(evalIndex => this.manuallyAddedIndices.includes(evalIndex));

if ((index == this.newIndex || index == 0) && allEvaluatedAreAdded) {
    this.ajoutFinancementDisabled = false;
}
