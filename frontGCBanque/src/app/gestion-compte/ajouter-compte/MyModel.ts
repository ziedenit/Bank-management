private getEtatBienFromCode(code: string): string {
    return this.etatBienMapping[code] || 'option0';
}
private getEtatBatimentFromCode(code: string): string {
    return this.codeBatimentMapping[code] || 'option0';
}
private getNormeThermiqueFromCode(code: string): string {
    return this.codeNormeThermiqueMapping[code] || 'option0';
}
private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
    if (!currentObject || !currentObject.bien) return;

    const bien = currentObject.bien;

    // Mise à jour des données du bien avec les valeurs du formulaire
    bien.numeroNomRue = this.formGroup.get('numeroNomRue').value || '';
    bien.codePostal = this.formGroup.get('codePostal').value || '';
    bien.nomCommune = this.formGroup.get('ville').value || '';
    bien.anneeConstruction = this.formGroup.get('anneeConstruction').value || '';
    bien.typeBatiment = this.formGroup.get('typeBatiment').value || '';
    bien.surfaceBien = this.formGroup.get('surfaceBien').value || '';
    bien.dpeActuel.estimationCep = this.formGroup.get('valeurCep').value || '';
    bien.dpeActuel.estimationGes = this.formGroup.get('valeurGes').value || '';
    bien.dpeActuel.dateEtablissementDpe = this.formGroup.get('dateDiangnostique').value || null;

    // Sauvegarder les valeurs spécifiques des champs sélectionnés
    bien.etatBien = this.getCodeEtatBien(this.selectedNatBatiment);
    bien.codeBatiment = this.getCodeEtatBatiment(this.codeBatimentSelected);
    bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique);
    bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;
    bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
}
