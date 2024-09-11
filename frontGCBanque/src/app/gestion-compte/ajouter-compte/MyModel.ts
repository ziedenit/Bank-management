onBreadcrumbClick(index: number): void {
    // Sauvegarder les modifications de l'objet actuel avant de passer à un autre
    if (this.selectedObjetIndex !== null) {
        this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
    }

    // Mettre à jour l'index sélectionné
    this.selectedObjetIndex = index;

    // Appliquer les données de l'objet sélectionné
    this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);

    // Vérifier les champs obligatoires
    this.checkRequiredFields(this.extractedInitialFinancement, index);

    // Vérifier les pièces justificatives
    this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);

    // Configurer le formulaire avec les données de l'objet sélectionné
    this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index]);

    // Marquer que les données existent (par exemple, pour l'affichage)
    this.depExist = true;

    // Afficher les informations actuelles pour le débogage
    console.log("Contenu du financement actuel", this.extractedInitialFinancement);
}
private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
    if (!currentObject || !currentObject.bien) return;

    const bien = currentObject.bien;

    // Vérification et initialisation du DPE
    if (!bien.dpeActuel) {
        bien.dpeActuel = new Dpe();
    }

    // Sauvegarder les valeurs des champs du bien
    bien.partLCL = this.partLcl;
    bien.montantFinanceLCL = this.montantLclFinance;
    bien.prixBien = this.prixAquisitionBien;
    bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
    bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique);
    bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
    bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;
    bien.etatBien = this.getCodeEtatBien(this.selectedNatBatiment);
    bien.codeBatiment = this.getCodeEtatBatiment(this.codeBatimentSelected);
    bien.surfaceBien = this.formGroup.get('surfaceBien').value;
    bien.dpeActuel.estimationCep = this.formGroup.get('valeurCep').value;
    bien.dpeActuel.estimationGes = this.formGroup.get('valeurGes').value;
    bien.numeroNomRue = this.formGroup.get('numeroNomRue').value;
    bien.codePostal = this.formGroup.get('codePostal').value;
    bien.nomCommune = this.formGroup.get('ville').value;
    bien.dpeActuel.dateEtablissementDpe = this.formGroup.get('dateDiangnostique').value;
    bien.anneeConstruction = this.formGroup.get('anneeConstruction').value;
    bien.typeBatiment = this.formGroup.get('typeBatiment').value;

    // Mise à jour des pièces justificatives
    if (!currentObject.piecesJustificatives) {
        currentObject.piecesJustificatives = [];
    }

    // Gérer l'ajout ou la suppression des pièces justificatives
    this.updateJustificatives(currentObject);
}
showAlignement(index: number): void {
    // Sauvegarder les modifications de l'objet actuel avant le calcul d'alignement
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);

    // Préparer les données pour le calcul d'alignement
    this.prepareLigneContext();
    this.checkFormFieldsFormGroup();
    this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);
    this.DpeResults = true;
    this.elementResults = true;

    // Effectuer le calcul d'alignement
    forkJoin([
        this.engineService.alignement(this.ligneContext),
        this.engineService.alignementXtra(this.ligneContextXtra)
    ]).subscribe(([aligne, aligneXtra]) => {
        // Enregistrer les résultats de l'alignement
        this.alignementResultText = this.alignementMapping[aligne];
        this.alignementResult = aligne;
        this.alignementXtraResult = aligneXtra;
        this.alignementContext = this.xtraRepriseService.calculXtra(aligne, aligneXtra);

        // Mettre à jour l'objet avec les résultats d'alignement
        this.extractedInitialFinancement.objetFinancement[index].alignement = this.alignementContext;

        console.log("Résultat alignement", this.alignementContext);
    });

    // Vérifier la présence des fichiers justificatifs
    this.errorDpeMessage = this.checkFileDpeInserted();
    this.errorNormeThermiqueMessage = this.checkNormeThermique();
    this.errorDateDepotMessage = this.checkFileDateDepotInserted();

    // Marquer l'index comme évalué
    this.evaluatedIndex.push(index);
    const allManuallyAddedAreEvaluated = this.manuallyAddedIndices.every(manualIndex => this.evaluatedIndex.includes(manualIndex));
    const isManuallyAddedEmpty = this.manuallyAddedIndices.length === 0;
    if ((index === this.newIndex) || (index === 0 && (allManuallyAddedAreEvaluated || isManuallyAddedEmpty))) {
        this.ajoutFinancementDisabled = false;
    }

    console.log("Financement après calcul", this.extractedInitialFinancement.objetFinancement);
}
private updateJustificatives(currentObject: ObjetFinancement): void {
    // Ajout d'une pièce de type DPE ou Compromis de vente
    if (this.isDpeChecked) {
        const existingDpe = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'DPE' || piece.typePiece === 'Compromis de vente');
        if (!existingDpe) {
            currentObject.piecesJustificatives.push({
                typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
                dpeActuel: this.selectedOptionJustif === "DPE",
                numeroDpe: this.numeroDpeAdeme,
                id: null,
                origineCreation: '',
                dateCreation: new Date(),
                origineModification: '',
                dateModification: new Date(),
                idPiece: '',
                referenceGed: '',
                sousTypePiece: ''
            });
        }
    } else {
        currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== 'DPE' && piece.typePiece !== 'Compromis de vente');
    }

    // Ajout d'une pièce de type Norme thermique
    if (this.isNormeThermiqueChecked) {
        const existingNormeThermique = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
        if (!existingNormeThermique) {
            currentObject.piecesJustificatives.push({
                typePiece: "Norme thermique",
                id: null,
                origineCreation: '',
                dateCreation: new Date(),
                origineModification: '',
                dateModification: new Date(),
                idPiece: '',
                referenceGed: '',
                sousTypePiece: '',
                numeroDpe: '',
                dpeActuel: false
            });
        }
    } else {
        currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== 'Norme thermique');
    }

    // Ajout d'une pièce de type Permis de construire
    if (this.isDateDepotChecked) {
        const existingPermisDeConstruire = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
        if (!existingPermisDeConstruire) {
            currentObject.piecesJustificatives.push({
                typePiece: "Permis de construire",
                id: null,
                origineCreation: '',
                dateCreation: new Date(),
                origineModification: '',
                dateModification: new Date(),
                idPiece: '',
                referenceGed: '',
                sousTypePiece: '',
                numeroDpe: '',
                dpeActuel: false
            });
        }
    } else {
        currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== 'Permis de construire');
    }
}
