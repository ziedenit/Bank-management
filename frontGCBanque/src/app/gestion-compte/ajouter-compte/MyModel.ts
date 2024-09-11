onBreadcrumbClick(index: number): void {
    // Sauvegarder les données de l'objet courant avant de passer à l'objet sélectionné
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    // Mettre à jour l'index de l'objet sélectionné
    this.selectedObjetIndex = index;

    // Appliquer les règles métiers sur l'élément sélectionné du fil d'Ariane
    this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);
    this.checkRequiredFields(this.extractedInitialFinancement, index);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, index);
    this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);

    // Restaurer les résultats d'alignement pour l'objet sélectionné
    this.restoreAlignementResultFromObject(index);

    this.depExist = true;
}
