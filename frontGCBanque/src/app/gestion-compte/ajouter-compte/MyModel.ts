onBreadcrumbClick(index: number): void {
    // Sauvegarder les données de l'objet courant avant de changer
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    // Mettre à jour l'index de l'objet sélectionné
    this.selectedObjetIndex = index;

    // Appliquer les règles métiers sur l'objet sélectionné
    this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);

    // Réinitialiser les champs du formulaire pour l'objet sélectionné
    this.resetFormWithCurrentObject(this.extractedInitialFinancement.objetFinancement[index]);

    // Restaurer les résultats d'alignement et pièces justificatives pour l'objet
    this.restoreAlignementResultFromObject(index);
    this.checkRequiredFields(this.extractedInitialFinancement, index);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, index);

    this.depExist = true; 
}
