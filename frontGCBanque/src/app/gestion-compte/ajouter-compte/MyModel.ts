onBreadcrumbClick(index: number): void {
    // Sauvegarder les modifications pour l'objet actuellement sélectionné
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
    
    // Changer l'objet sélectionné
    this.selectedObjetIndex = index;

    // Appliquer les règles métier sur l'objet sélectionné
    this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);
    this.checkRequiredFields(this.extractedInitialFinancement, index);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, index);
    this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);

    console.log("Données sauvegardées et changement d'objet appliqué");
}
private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
    if (!currentObject || !currentObject.bien) return;

    const bien = currentObject.bien;

    // Mise à jour des informations du bien
    bien.partLCL = this.partLcl;
    bien.montantFinanceLCL = this.montantLclFinance;
    bien.prixBien = this.prixAquisitionBien;
    bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
    bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique);
    bien.dpeActuel = bien.dpeActuel || new Dpe();  // Créer un nouvel objet Dpe s'il n'existe pas
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
    this.updatePiecesJustificatives(currentObject);
}
private updatePiecesJustificatives(currentObject: ObjetFinancement): void {
    if (!currentObject.piecesJustificatives) {
        currentObject.piecesJustificatives = [];
    }

    // Gestion des pièces DPE
    if (this.isDpeChecked) {
        this.addOrUpdatePiece(currentObject, 'DPE', this.selectedOptionJustif === "DPE");
    } else {
        this.removePiece(currentObject, 'DPE');
        this.removePiece(currentObject, 'Compromis de vente');
    }

    // Gestion des pièces Norme Thermique
    if (this.isNormeThermiqueChecked) {
        this.addOrUpdatePiece(currentObject, 'Norme thermique');
    } else {
        this.removePiece(currentObject, 'Norme thermique');
    }

    // Gestion des pièces Permis de construire
    if (this.isDateDepotChecked) {
        this.addOrUpdatePiece(currentObject, 'Permis de construire');
    } else {
        this.removePiece(currentObject, 'Permis de construire');
    }
}

private addOrUpdatePiece(currentObject: ObjetFinancement, typePiece: string, isDpe = false): void {
    const existingPiece = currentObject.piecesJustificatives.find(piece => piece.typePiece === typePiece);
    if (!existingPiece) {
        currentObject.piecesJustificatives.push({
            typePiece,
            dpeActuel: isDpe,
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
}

private removePiece(currentObject: ObjetFinancement, typePiece: string): void {
    currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== typePiece);
}
ajouterObjetFinancement(): void {
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
        piecesJustificatives: []
    };

    this.idGeneratorService.generateIdObjetFinancement().subscribe(id => {
        nouvelObjet.idObjetFinancement = id;
        this.objetsFinancements.push(nouvelObjet);
        this.selectedObjetIndex = this.objetsFinancements.length - 1;
        this.showFileAriane = true;
        this.ajoutFinancementDisabled = true;
        this.extractedInitialFinancement.objetFinancement = this.objetsFinancements;
        this.setObjetFinancementData(nouvelObjet);
        this.setupFormGroup(nouvelObjet.bien);
    });
}
showAlignement(index: number): void {
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);

    this.prepareLigneContext();

    forkJoin([
        this.engineService.alignement(this.ligneContext),
        this.engineService.alignementXtra(this.ligneContextXtra)
    ]).subscribe(([aligne, aligneXtra]) => {
        this.alignementResultText = this.alignementMapping[aligne];
        this.alignementResult = aligne;
        this.alignementXtraResult = aligneXtra;
        this.extractedInitialFinancement.objetFinancement[index].alignement = this.alignementContext;
        this.ajoutFinancementDisabled = false;
        console.log("Alignement calculé et sauvegardé pour l'objet", index);
    });
}
