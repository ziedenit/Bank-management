this.evaluatedIndex.push(index);

// Vérifie si tous les éléments de manuallyAddedIndices sont présents dans evaluatedIndex
const allManuallyAddedAreEvaluated = this.manuallyAddedIndices.every(manualIndex => this.evaluatedIndex.includes(manualIndex));

// Vérifie si manuallyAddedIndices est vide
const isManuallyAddedEmpty = this.manuallyAddedIndices.length === 0;

if ((index == this.newIndex) || (index == 0 && (allManuallyAddedAreEvaluated || isManuallyAddedEmpty))) {
    this.ajoutFinancementDisabled = false;
}
