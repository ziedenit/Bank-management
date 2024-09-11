onBreadcrumbClick(index: number): void {
    this.showBlocResult = true;

    // Sauvegarder les données de l'objet courant avant de passer à l'objet sélectionné
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    // Mettre à jour l'index de l'objet sélectionné
    this.selectedObjetIndex = index;

    // Appliquer les règles métiers sur l'élément sélectionné du fil d'Ariane
    this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);
    this.checkRequiredFields(this.extractedInitialFinancement, index);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, index);
    this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);

    this.depExist = true; 
}
ajouterObjetFinancement() {
    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
    this.showDeleteIcon = true;
    this.showFileAriane = true;

    // Sauvegarder les données de l'objet courant avant d'ajouter un nouvel objet
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    const nouvelObjet: ObjetFinancement = {
        idObjetFinancement: null,
        codeObjetFinancement: "02",
        quotePartObjet: null,
        gainCEP: null,
        dateFinTravaux: null,
        bien: new Bien(),
        dpeAvantTravaux: new Dpe(),
        dpeApresTravaux: new Dpe(),
        alignement: Alignement.createDefault(),
        eligibilite: new Eligibilite(),
        codeFamilleObjet: "01",
        garantie: [],
        firstDisconnectionOfd: true,
        piecesJustificatives: [],
    };

    this.idGeneratorService.generateIdObjetFinancement().subscribe(
        id => {
            nouvelObjet.idObjetFinancement = id;
            this.objetsFinancements.push(nouvelObjet);

            this.ajoutFinancementDisabled = true;
            this.extractedInitialFinancement.objetFinancement = this.objetsFinancements;
            this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
            this.newIndex = this.objetsFinancements.length - 1;
        },
        error => {
            console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
            this.ajoutFinancementDisabled = false;
        }
    );
}
private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
    if (!currentObject || !currentObject.bien) return;

    const bien = currentObject.bien;

    // Initialisation du DPE si nécessaire
    if (!bien.dpeActuel) {
        bien.dpeActuel = new Dpe();
    }

    // Mettre à jour les champs du bien
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
    bien.dpeActuel.classeCep = this.formGroup.get('lettreCEP').value;
    bien.dpeActuel.classeGes = this.formGroup.get('lettreGES').value;
    bien.typeEnergie = this.formGroup.get('energieType').value;

    // Gestion des pièces justificatives
    if (!currentObject.piecesJustificatives) {
        currentObject.piecesJustificatives = [];
    }

    // Ajout des pièces justificatives (DPE, Norme Thermique, Permis de Construire)
    this.addOrUpdatePieceJustificative(currentObject, 'DPE', this.isDpeChecked);
    this.addOrUpdatePieceJustificative(currentObject, 'Norme thermique', this.isNormeThermiqueChecked);
    this.addOrUpdatePieceJustificative(currentObject, 'Permis de construire', this.isDateDepotChecked);
}

private addOrUpdatePieceJustificative(currentObject: ObjetFinancement, typePiece: string, isChecked: boolean) {
    const existingPiece = currentObject.piecesJustificatives.some(piece => piece.typePiece === typePiece);

    if (isChecked && !existingPiece) {
        currentObject.piecesJustificatives.push({
            typePiece: typePiece,
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: '',
            numeroDpe: typePiece === 'DPE' ? this.numeroDpeAdeme : '',
            dpeActuel: typePiece === 'DPE'
        });
    } else if (!isChecked && existingPiece) {
        currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== typePiece);
    }
}
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
        
        this.extractedInitialFinancement.objetFinancement[index].alignement = this.alignementContext;
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
