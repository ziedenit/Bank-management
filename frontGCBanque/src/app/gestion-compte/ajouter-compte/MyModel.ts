<app-justificatifs
  [hideFieldForm]="hideFieldForm"
  [dateDepot]="dateDepot"
  [numeroDpeAdeme]="numeroDpeAdeme"
  [normeThermique]="normeThermique"
  [isDpeChecked]="isDpeChecked"
  [isDateDepotChecked]="isDateDepotChecked"
  [isNormeThermiqueChecked]="isNormeThermiqueChecked"
  [selectedOptionJustif]="selectedOptionJustif"
  (isDpeCheckedChange)="handleDpeCheckedChange($event)"
  (isDateDepotCheckedChange)="handleDateDepotCheckedChange($event)"
  (isNormeThermiqueCheckedChange)="handleNormeThermiqueCheckedChange($event)"
  (selectedOptionJustifChange)="handleSelectedOptionJustifChange($event)">
</app-justificatifs>
   // Méthode pour gérer le changement de DPE
  handleDpeCheckedChange(isChecked: boolean): void {
    this.isDpeChecked = isChecked;
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);
  }

  // Méthode pour gérer le changement de la date de dépôt
  handleDateDepotCheckedChange(isChecked: boolean): void {
    this.isDateDepotChecked = isChecked;
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);
  }

  // Méthode pour gérer le changement de la norme thermique
  handleNormeThermiqueCheckedChange(isChecked: boolean): void {
    this.isNormeThermiqueChecked = isChecked;
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);
  }

  // Méthode pour gérer le changement de l'option justificative
  handleSelectedOptionJustifChange(selectedOption: string): void {
    this.selectedOptionJustif = selectedOption;
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);
  }
