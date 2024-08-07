ngOnInit(): void {
    this.showFileAriane = false;
    this.id = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];

    if (this.Url_Retour_Base64) {
        this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
    }

    // Récupérer le financement par ID
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
        console.log("le financement récupéré de la BDD est:", responseFinancement);
        this.extractedInitialFinancement = responseFinancement;
        this.mapFinancementData(responseFinancement);
        this.setObjetFinancementProperties(responseFinancement.objetFinancement[0]);
        this.checkRequiredFields(responseFinancement);
        this.traiterPiecesJustificatives(responseFinancement);
        this.setFinancementDataOnScreen(responseFinancement);
        this.setupFormGroup(responseFinancement.objetFinancement[0].bien);

        this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue => {
            this.searchAddress();
        });
        this.formGroup.get('codePostal').valueChanges.subscribe(codePostal => {
            this.searchAddress();
        });
        this.formGroup.get('ville').valueChanges.subscribe(ville => {
            this.searchAddress();
        });
    });

    // Récupérer la liste des objets de financement
    this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
        this.objetsFinancements = objets;
        this.showDeleteIcon = false;

        // Si plusieurs objets, afficher le fil d'Ariane
        if (this.objetsFinancements.length > 1) {
            this.showFileAriane = true;
        }

        // Appliquer les méthodes métier à chaque objet de financement
        this.objetsFinancements.forEach((objet, index) => {
            this.applyBusinessRules(objet, index);
        });
    });
}

// Méthode pour appliquer les règles métier à chaque objet de financement
applyBusinessRules(objet: ObjetFinancement, index: number): void {
    this.extractedInitialFinancement.objetFinancement[index] = objet;
    this.mapFinancementData(this.extractedInitialFinancement);
    this.setObjetFinancementProperties(objet);
    this.checkRequiredFields(this.extractedInitialFinancement);
    this.traiterPiecesJustificatives(this.extractedInitialFinancement);
    this.setFinancementDataOnScreen(this.extractedInitialFinancement);
    this.setupFormGroup(objet.bien);
}
