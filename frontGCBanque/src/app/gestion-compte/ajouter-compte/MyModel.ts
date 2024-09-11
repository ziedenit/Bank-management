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

    // Création d'un nouvel objet de financement vierge avec des champs spécifiques bien réinitialisés
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
private setupFormGroup(bien: Bien): void {
    // Réinitialiser le formulaire avec des valeurs vides ou nulles
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
onBreadcrumbClick(index: number) {
    // Sauvegarde des données de l'objet actuel avant de basculer vers un autre objet
    this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);

    // Mise à jour de l'index de l'objet sélectionné
    this.selectedObjetIndex = index;

    // Charger les données de l'objet sélectionné et les réinitialiser si nécessaire
    const objetFinancement = this.extractedInitialFinancement.objetFinancement[index];

    // Réinitialiser les champs critiques pour s'assurer qu'ils sont vides
    objetFinancement.bien.etatBien = null;
    objetFinancement.bien.codeBatiment = null;
    objetFinancement.bien.codeNormeThermique = null;
    objetFinancement.bien.dpeActuel.sirenDiagnostiqueur = null;

    // Appliquer les nouvelles données au formulaire
    this.setupFormGroup(objetFinancement.bien);

    // Réinitialiser les variables liées aux champs spécifiques
    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
}
