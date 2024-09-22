onBreadcrumbClick(index: number): void {
  // Sauvegarder l'état actuel de l'objet avant de changer
  this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

  // Charger les données de l'objet cliqué
  this.selectedObjetIndex = index;
  this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);
  
  // Assurez-vous que les résultats d'alignement sont affichés pour cet objet
  const alignement = this.extractedInitialFinancement.objetFinancement[index].alignement;
  
  if (alignement) {
    this.alignementResultText = this.alignementMapping[alignement.topAlignement];
  } else {
    this.alignementResultText = 'Aucun alignement disponible';
  }
  
  // Mettre à jour l'état du formulaire
  this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
  
  // Appliquer les règles métiers
  this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);
  this.checkFormFieldsFormGroup();
}
