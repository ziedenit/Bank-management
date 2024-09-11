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

    // Création d'un nouvel objet de financement vierge
    const nouvelObjet: ObjetFinancement = {
        idObjetFinancement: null,
        codeObjetFinancement: "02",
        quotePartObjet: null,
        gainCEP: null,
        dateFinTravaux: null,
        bien: {
            idBien: null,
            surfaceBien: null,
            prixBien: null,
            montantFinanceLCL: null,
            partLCL: null,
            dateDepotPc: null,
            anneeConstruction: null,
            typeBatiment: null, // Vide
            etatBien: null, // Vide
            codeBatiment: null, // Vide (Nature du bien)
            codeNormeThermique: null, // Vide (Norme Thermique)
            dpeActuel: {
                numeroDpe: null, // Vide
                sirenDiagnostiqueur: null, // Vide (SIREN diagnostiqueur)
                estimationCep: null,
                estimationGes: null,
                classeCep: null,
                classeGes: null,
                dateEtablissementDpe: null,
            },
            numeroNomRue: null,
            codePostal: null,
            nomCommune: null,
            typeEnergie: null
        },
        dpeAvantTravaux: new Dpe(),
        dpeApresTravaux: new Dpe(),
        alignement: Alignement.createDefault(),
        eligibilite: new Eligibilite(),
        codeFamilleObjet: "01", // Famille par défaut
        garantie: [],
        firstDisconnectionOfd: true,
        piecesJustificatives: [], // Vide par défaut
    };

    // Générer un nouvel ID pour l'objet de financement
    this.idGeneratorService.generateIdObjetFinancement().subscribe(id => {
        nouvelObjet.idObjetFinancement = id;

        // Ajouter le nouvel objet à la liste
        this.objetsFinancements.push(nouvelObjet);
        this.extractedInitialFinancement.objetFinancement = this.objetsFinancements;

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
onBreadcrumbClick(index: number) {
    // Sauvegarde des données de l'objet actuel avant de basculer vers un autre objet
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    // Mise à jour de l'index de l'objet sélectionné
    this.selectedObjetIndex = index;

    // Charger les données de l'objet sélectionné
    this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);

    // Vérification des champs obligatoires pour l'objet sélectionné
    this.checkRequiredFields(this.extractedInitialFinancement, index);
    this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);

    // Mise à jour du formulaire pour refléter l'état de l'objet sélectionné
    this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);

    // Réinitialiser les flags pour indiquer que cet objet est en cours d'édition
    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
}
