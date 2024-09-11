onBreadcrumbClick(index: number) {
    // Sauvegarde des données de l'objet actuel
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    // Mise à jour de l'index de l'objet sélectionné
    this.selectedObjetIndex = index;

    // Charger les données de l'objet sélectionné
    this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);
    this.checkRequiredFields(this.extractedInitialFinancement, index);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);
    this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index]);
}
ajouterObjetFinancement() {
    // Sauvegarde des données de l'objet actuel avant d'ajouter un nouveau
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

    this.idGeneratorService.generateIdObjetFinancement().subscribe(id => {
        nouvelObjet.idObjetFinancement = id;
        this.objetsFinancements.push(nouvelObjet);
        this.extractedInitialFinancement.objetFinancement = this.objetsFinancements;
        this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
        this.newIndex = this.objetsFinancements.length - 1;
        this.ajoutFinancementDisabled = true;
    });
}
private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
    if (!currentObject || !currentObject.bien) return;

    const bien = currentObject.bien;
    if (!bien.dpeActuel) {
        bien.dpeActuel = new Dpe();
    }

    // Sauvegarde des informations sur le bien
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
    this.managePiecesJustificatives(currentObject);
}

private managePiecesJustificatives(currentObject: ObjetFinancement) {
    if (!currentObject.piecesJustificatives) {
        currentObject.piecesJustificatives = [];
    }

    // Ajouter la pièce justificative pour le DPE ou le compromis de vente
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
        currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== "DPE" && piece.typePiece !== "Compromis de vente");
    }

    // Ajouter la pièce justificative pour la norme thermique
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
        currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== "Norme thermique");
    }

    // Ajouter la pièce justificative pour le permis de construire
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
        currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== "Permis de construire");
    }
}
showAlignement(index: number): void {
    // Sauvegarde des données de l'objet avant de calculer l'alignement
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    // Préparez le contexte pour le calcul de l'alignement
    this.prepareLigneContext();

    this.checkFormFieldsFormGroup();
    this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);
    this.DpeResults = true;
    this.elementResults = true;

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

    this.evaluatedIndex.push(index);
    this.ajoutFinancementDisabled = false;
}
