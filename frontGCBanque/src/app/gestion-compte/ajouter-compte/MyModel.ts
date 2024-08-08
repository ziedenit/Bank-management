ngOnInit(): void {
    // ... Autres initialisations
    this.formGroup.valueChanges.subscribe(changes => {
        this.saveChangesToObjetFinancement(this.selectedObjetIndex, changes);
    });
}

ngOnDestroy(): void {
    // Avant de détruire le composant, assurez-vous que les changements sont sauvegardés.
    if (this.selectedObjetIndex !== null) {
        this.saveChangesToObjetFinancement(this.selectedObjetIndex, this.formGroup.value);
    }
}

private saveChangesToObjetFinancement(index: number, changes: any): void {
    const objetFinancement = this.extractedInitialFinancement.objetFinancement[index];
    if (!objetFinancement) return;

    // Mettre à jour les propriétés de l'objet de financement avec les changements du formulaire
    Object.assign(objetFinancement.bien, changes);
}

//////
onBreadcrumbClick(index: number): void {
    // Sauvegarde les modifications de l'objet en cours
    this.saveChangesToObjetFinancement(this.selectedObjetIndex, this.formGroup.value);
    
    // Met à jour l'index sélectionné
    this.selectedObjetIndex = index;

    // Applique les règles métier à l'objet sélectionné
    this.mapFinancementData(this.extractedInitialFinancement, index);
    this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
    this.checkRequiredFields(this.extractedInitialFinancement.objetFinancement[index]);
    this.traiterPiecesJustificatives(this.extractedInitialFinancement, index);
    this.setFinancementDataOnScreen(this.extractedInitialFinancement, index);
    this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
}
//
ajouterObjetFinancement(): void {
    this.showDeleteIcon = true;
    this.showFileAriane = true;

    const nouvelObjet: ObjetFinancement = {
        idObjetFinancement: "",
        codeObjetFinancement: "",
        quotePartObjet: null,
        gainCEP: null,
        dateFinTravaux: null,
        bien: new Bien(),
        dpeAvantTravaux: new Dpe(),
        dpeApresTravaux: new Dpe(),
        alignement: new Alignement(),
        eligibilite: new Eligibilite(),
        piecesJustificatives: [],
        codeFamilleObjet: "",
        garantie: [],
        firstDisconnectionOfd: false,
    };

    this.idGeneratorService.generateIdObjetFinancement().subscribe(
        id => {
            nouvelObjet.idObjetFinancement = id;
            this.objetsFinancements.push(nouvelObjet);
            this.extractedInitialFinancement.objetFinancement = this.objetsFinancements;
            this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);

            // Met à jour l'index sélectionné
            this.selectedObjetIndex = this.objetsFinancements.length - 1;
            
            // Passe à l'édition du nouvel objet
            this.setupFormGroup(nouvelObjet.bien);
        },
        error => {
            console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
        }
    );
}
