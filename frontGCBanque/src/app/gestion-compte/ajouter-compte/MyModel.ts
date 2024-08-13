 this.saveCurrentObjectValues();
 this.saveCurrentObjectValues();
private saveCurrentObjectValues(): void {
  // Sauvegarde des valeurs dans l'objet de financement actuel
  if (this.extractedInitialFinancement && this.extractedInitialFinancement.objetFinancement) {
    const currentObj = this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex];
    if (currentObj && currentObj.bien) {
      const bien = currentObj.bien;
      bien.partLCL = this.partLcl;
      bien.montantFinanceLCL = this.montantLclFinance;
      bien.prixBien = this.prixAquisitionBien;
      bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
      bien.codeNormeThermique = this.getCodeNormeThermique(this.normeThermique);
      bien.sirenDiagnostiqueur = this.SirenDPE;
      bien.numeroDpe = this.numeroDpeAdeme;
    }
  }
}
