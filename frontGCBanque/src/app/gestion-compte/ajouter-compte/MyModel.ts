private createNewObjetFinancement(): ObjetFinancement {
    return {
        idObjetFinancement: null,
        codeObjetFinancement: "02",
        quotePartObjet: null,
        gainCEP: null,
        dateFinTravaux: null,
        bien: this.createNewBien(),
        dpeAvantTravaux: this.createNewDpe(),
        dpeApresTravaux: this.createNewDpe(),
        alignement: Alignement.createDefault(),
        eligibilite: new Eligibilite(),
        piecesJustificatives: [],
        codeFamilleObjet: "01", // Famille par défaut
        garantie: [],
        firstDisconnectionOfd: true
    };
}
private createNewBien(): Bien {
    return {
        idBien: null,
        surfaceBien: null, // Réinitialisé à vide
        prixBien: null, // Réinitialisé à vide
        montantFinanceLCL: null, // Réinitialisé à vide
        partLCL: null, // Réinitialisé à vide
        dateDepotPc: null, // Réinitialisé à vide
        anneeConstruction: null, // Réinitialisé à vide
        typeBatiment: null, // Réinitialisé à vide
        etatBien: null, // Réinitialisé à vide
        codeBatiment: null, // Réinitialisé à vide
        codeNormeThermique: null, // Réinitialisé à vide
        dpeActuel: this.createNewDpe(),
        numeroNomRue: null, // Réinitialisé à vide
        codePostal: null, // Réinitialisé à vide
        nomCommune: null, // Réinitialisé à vide
        typeEnergie: null // Réinitialisé à vide
    };
}
private createNewDpe(): Dpe {
    return {
        id: null,
        origineCreation: '',
        dateCreation: new Date(),
        origineModification: '',
        dateModification: new Date(),
        idDpe: null,
        numeroDpe: null,
        estimationCep: null,
        classeCep: null,
        estimationGes: null,
        classeGes: null,
        dateEtablissementDpe: null,
        dateReceptionDpe: null,
        dateFinValiditeDpe: null,
        sirenDiagnostiqueur: null,
        etatBien: null,
        modelDpe: null,
        numeroDpeRemplace: null,
        versionDpe: null,
        methodeDpeApplique: null
    };
}
ajouterObjetFinancement() {
    // Sauvegarde des données de l'objet actuel avant d'ajouter un nouveau
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    // Réinitialisation des variables pour un nouvel objet vide
    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
    this.showDeleteIcon = true;
    this.showFileAriane = true;

    // Crée un nouvel objet de financement vierge
    const nouvelObjet = this.createNewObjetFinancement();

    // Générer un nouvel ID pour l'objet de financement
    this.idGeneratorService.generateIdObjetFinancement().subscribe(id => {
        nouvelObjet.idObjetFinancement = id;

        // Ajouter le nouvel objet à la liste
        this.objetsFinancements.push(nouvelObjet);

        // Mettre à jour l'objet dans extractedInitialFinancement avec des champs initialisés
        this.extractedInitialFinancement.objetFinancement = [...this.objetsFinancements];

        // Mettre à jour les indices des objets créés manuellement
        this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
        this.newIndex = this.objetsFinancements.length - 1;
        this.ajoutFinancementDisabled = true;

        // Réinitialiser le formulaire pour le nouvel objet vide
        this.setupFormGroup(nouvelObjet.bien);
    }, error => {
        console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
        this.ajoutFinancementDisabled = false;
    });
}
