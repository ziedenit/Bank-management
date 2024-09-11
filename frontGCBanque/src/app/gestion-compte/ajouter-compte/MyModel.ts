showAlignement(index: number): void {
    // Sauvegarder les modifications avant de calculer l'alignement
    this.prepareLigneContext();
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);

    // Calculer l'alignement
    forkJoin([
        this.engineService.alignement(this.ligneContext),
        this.engineService.alignementXtra(this.ligneContextXtra)
    ]).subscribe(([aligne, aligneXtra]) => {
        this.alignementResultText = this.alignementMapping[aligne];
        this.alignementResult = aligne;
        this.alignementXtraResult = aligneXtra;
        this.alignementContext = this.xtraRepriseService.calculXtra(aligne, aligneXtra);

        // Sauvegarder l'alignement dans l'objet courant
        this.extractedInitialFinancement.objetFinancement[index].alignement = this.alignementContext;

        // Mettre à jour l'état UI pour afficher les résultats
        this.DpeResults = true;
        this.elementResults = true;
        this.showBlocResult = true;

        // Sauvegarder l'état du bloc de résultats pour cet objet
        this.saveAlignementResultInObject(index);
    });

    this.errorDpeMessage = this.checkFileDpeInserted();
    this.errorNormeThermiqueMessage = this.checkNormeThermique();
    this.errorDateDepotMessage = this.checkFileDateDepotInserted();

    this.evaluatedIndex.push(index);

    const allManuallyAddedAreEvaluated = this.manuallyAddedIndices.every(manualIndex => this.evaluatedIndex.includes(manualIndex));
    const isManuallyAddedEmpty = this.manuallyAddedIndices.length === 0;

    if ((index == this.newIndex) || (index == 0 && (allManuallyAddedAreEvaluated || isManuallyAddedEmpty))) {
        this.ajoutFinancementDisabled = false;
    }
}
