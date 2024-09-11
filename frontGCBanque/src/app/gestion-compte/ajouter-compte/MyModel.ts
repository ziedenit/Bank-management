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

    // Création d'un nouvel objet de financement vierge sans copier l'objet précédent
    const nouvelObjet: ObjetFinancement = {
        idObjetFinancement: null,
        codeObjetFinancement: "02",
        quotePartObjet: null,
        gainCEP: null,
        dateFinTravaux: null,
        bien: {
            idBien: null,
            surfaceBien: null, // Réinitialisé
            prixBien: null, // Réinitialisé
            montantFinanceLCL: null, // Réinitialisé
            partLCL: null, // Réinitialisé
            dateDepotPc: null, // Réinitialisé
            anneeConstruction: null, // Réinitialisé
            typeBatiment: null, // Vide (réinitialisé)
            etatBien: null, // Vide (réinitialisé)
            codeBatiment: null, // Vide (Nature du bien réinitialisé)
            codeNormeThermique: null, // Vide (Norme Thermique réinitialisé)
            dpeActuel: {
                numeroDpe: null, // Vide (réinitialisé)
                sirenDiagnostiqueur: null, // Vide (SIREN diagnostiqueur réinitialisé)
                estimationCep: null,
                estimationGes: null,
                classeCep: null,
                classeGes: null,
                dateEtablissementDpe: null, // Vide
            },
            numeroNomRue: null, // Réinitialisé
            codePostal: null, // Réinitialisé
            nomCommune: null, // Réinitialisé
            typeEnergie: null // Réinitialisé
        },
        dpeAvantTravaux: new Dpe(),
        dpeApresTravaux: new Dpe(),
        alignement: Alignement.createDefault(),
        eligibilite: new Eligibilite(),
        codeFamilleObjet: "01", // Famille par défaut
        garantie: [],
        firstDisconnectionOfd: true,
        piecesJustificatives: [] // Vide par défaut
    };

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
private setupFormGroup(bien: Bien): void {
    this.formGroup = this.fb.group({
        numeroNomRue: [bien.numeroNomRue || null],
        codePostal: [bien.codePostal || null],
        ville: [bien.nomCommune || null],
        dateDiangnostique: [bien.dpeActuel?.dateEtablissementDpe?.toString().substring(0, 10) || null],
        anneeConstruction: [bien.anneeConstruction || null],
        typeBatiment: [bien.typeBatiment || null], // Réinitialisé à vide
        etatBien: [bien.etatBien || null], // Réinitialisé à vide
        codeBatiment: [bien.codeBatiment || null], // Nature du bien réinitialisée à vide
        lettreCEP: [bien.dpeActuel?.classeCep || null],
        lettreGES: [bien.dpeActuel?.classeGes || null],
        surfaceBien: [bien.surfaceBien || null],
        valeurCep: [bien.dpeActuel?.estimationCep || null],
        valeurGes: [bien.dpeActuel?.estimationGes || null],
        sirenDiagnostiqueur: [bien.dpeActuel?.sirenDiagnostiqueur || null], // SIREN réinitialisé à vide
        energieType: [bien.typeEnergie || null]
    });
}
