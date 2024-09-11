private resetFormWithCurrentObject(currentObject: ObjetFinancement): void {
    const bien = currentObject.bien;

    // Réinitialisation du formulaire avec les données de l'objet de financement actuel
    this.formGroup.reset({
        numeroNomRue: bien.numeroNomRue || '',
        codePostal: bien.codePostal || '',
        ville: bien.nomCommune || '',
        dateDiangnostique: bien.dpeActuel?.dateEtablissementDpe || null,
        anneeConstruction: bien.anneeConstruction || '',
        typeBatiment: bien.typeBatiment || '',
        lettreCEP: bien.dpeActuel?.classeCep || '',
        lettreGES: bien.dpeActuel?.classeGes || '',
        surfaceBien: bien.surfaceBien || '',
        valeurCep: bien.dpeActuel?.estimationCep || '',
        valeurGes: bien.dpeActuel?.estimationGes || '',
        energieType: bien.typeEnergie || '',
    });

    // Réinitialiser les champs de sélection spécifiques
    this.selectedNatBatiment = this.getEtatBienFromCode(bien.etatBien) || 'option0';
    this.codeBatimentSelected = this.getEtatBatimentFromCode(bien.codeBatiment) || 'option0';
    this.normeThermique = this.getNormeThermiqueFromCode(bien.codeNormeThermique) || 'option0';
    this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe || '';
    this.SirenDPE = bien.dpeActuel?.sirenDiagnostiqueur || '';
}
