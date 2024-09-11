showAlignement(index: number): void {
    // Sauvegarde des données de l'objet actuel avant de calculer l'alignement
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    // Vérifier si tous les champs obligatoires sont remplis
    this.checkFormFieldsFormGroup();

    // Si un champ obligatoire est manquant, arrêter le calcul
    if (this.champObligatoire) {
        console.warn("Certains champs obligatoires sont manquants. Impossible de calculer l'alignement.");
        return;
    }

    // Préparer le contexte pour le calcul de l'alignement
    this.prepareLigneContext();

    // Vérifier la validité du SIREN
    this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);

    // Si le SIREN est invalide, afficher un message et arrêter le calcul
    if (!this.isValid) {
        console.error("Le numéro SIREN est invalide. Impossible de calculer l'alignement.");
        return;
    }

    // Appeler les services d'alignement et gérer les résultats
    forkJoin([
        this.engineService.alignement(this.ligneContext),
        this.engineService.alignementXtra(this.ligneContextXtra)
    ]).subscribe(([aligne, aligneXtra]) => {
        // Mise à jour des résultats d'alignement
        this.alignementResultText = this.alignementMapping[aligne];
        this.alignementResult = aligne;
        this.alignementXtraResult = aligneXtra;

        // Calcul des résultats d'alignement avec Xtra
        this.alignementContext = this.xtraRepriseService.calculXtra(aligne, aligneXtra);
        console.log("Résultats d'alignement :", this.alignementContext);

        // Sauvegarder les résultats d'alignement dans l'objet actuel
        this.extractedInitialFinancement.objetFinancement[index].alignement = this.alignementContext;
        
        // Réactiver l'ajout d'objet de financement si tous les objets sont évalués
        this.evaluatedIndex.push(index);
        const allManuallyAddedAreEvaluated = this.manuallyAddedIndices.every(manualIndex => this.evaluatedIndex.includes(manualIndex));
        const isManuallyAddedEmpty = this.manuallyAddedIndices.length === 0;

        if ((index == this.newIndex) || (index == 0 && (allManuallyAddedAreEvaluated || isManuallyAddedEmpty))) {
            this.ajoutFinancementDisabled = false;
        }
    }, error => {
        console.error("Erreur lors du calcul de l'alignement :", error);
    });

    // Mettre à jour les messages d'erreur si des pièces justificatives sont manquantes
    this.errorDpeMessage = this.checkFileDpeInserted();
    this.errorNormeThermiqueMessage = this.checkNormeThermique();
    this.errorDateDepotMessage = this.checkFileDateDepotInserted();
}
