private saveCurrentObjectValues(targetObject: any): void {
  if (!targetObject || !targetObject.bien) return;
  const bien = targetObject.bien;
  
  // Sauvegarder les valeurs dans l'objet cible
  bien.partLCL = this.partLcl;
  bien.montantFinanceLCL = this.montantLclFinance;
  bien.prixBien = this.prixAquisitionBien;
  bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
  bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique); // Utiliser une méthode pour obtenir le code
  bien.sirenDiagnostiqueur = this.SirenDPE;
  bien.numeroDpe = this.numeroDpeAdeme;
}

private getCodeFromNormeThermique(normeThermique: string): string | undefined {
  // Exemple de logique pour obtenir le code de la norme thermique
  const code = Object.keys(this.codeNormeThermiqueMapping).find(key => this.codeNormeThermiqueMapping[key] === normeThermique);
  return code;
}
