ajouterObjetFinancement() {
    this.formGroup.reset();
    this.isNewObject = true;  // Nouveau mode pour empêcher la validation immédiate

    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
    this.showDeleteIcon = true;
    this.showFileAriane = true;

    const nouvelObjet: ObjetFinancement = {
        idObjetFinancement: null,
        codeObjetFinancement: "02",
        quotePartObjet: null,
        gainCEP: null,
        dateFinTravaux: null,
        bien: this.createNewBien(),  // Initialise l'objet bien avec tous les champs
        dpeAvantTravaux: this.createNewDpe(), // Initialise DPE avant travaux
        dpeApresTravaux: this.createNewDpe(), // Initialise DPE après travaux
        alignement: Alignement.createDefault(), // Alignement par défaut
        eligibilite: new Eligibilite(), // Eligibilité par défaut
        codeFamilleObjet: "01", // Famille par défaut
        garantie: [],
        firstDisconnectionOfd: true,
        piecesJustificatives: []
    };

    this.showBlocResult = false;

    this.idGeneratorService.generateIdObjetFinancement().subscribe(
        idFinancement => {
            nouvelObjet.idObjetFinancement = idFinancement;
            this.idGeneratorService.generateIdBien().subscribe(
                idBien => {
                    nouvelObjet.bien.idBien = idBien;  // Assigner l'ID du bien
                    this.objetsFinancements.push(nouvelObjet);
                    this.extractedInitialFinancement.objetFinancement = [...this.objetsFinancements];  // Mise à jour des objets
                    this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
                    this.newIndex = this.objetsFinancements.length - 1;

                    // Se positionner sur le nouvel objet
                    this.selectedObjetIndex = this.objetsFinancements.length - 1;
                    this.ajoutFinancementDisabled = true;

                    // Mettez à jour l'objet sélectionné pour l'afficher immédiatement
                    this.setObjetFinancementData(nouvelObjet);

                    console.log("Nouvel objet ajouté", nouvelObjet);
                },
                error => {
                    console.error("Erreur lors de la génération de l'ID du bien : ", error);
                }
            );
        },
        error => {
            console.error("Erreur lors de la génération de l'ID de l'objet de financement : ", error);
        }
    );
}checkAndHighlightRequiredField(condition, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // Désactiver la validation si c'est un nouvel objet
        if (condition && !this.isfirstDebranchement && !this.isNewObject) {
            this.champObligatoire = true;
            this.donneeObligatoire = 'Donnée obligatoire';
            element.classList.add('field-error');
        } else {
            element.classList.remove('field-error');
        }
    } 
}
// Dans votre ngOnInit(), ou une fonction similaire, abonnez-vous aux changements de formulaire
this.formGroup.valueChanges.subscribe(() => {
    if (this.isNewObject) {
        this.isNewObject = false;  // Désactiver le mode création une fois qu'un champ est modifié
    }
});
checkFormFieldsFormGroup() {
    const formData = this.formGroup.value;
    console.log("la valeur de formGroupe est la suivante:", this.formGroup.value);
    this.champObligatoire = false;
    this.donneeObligatoire = '';

    const validateField = (fieldName: string, condition: boolean) => {
        const element = document.getElementById(fieldName);
        if (element) {
            // Ne validez que l'objet actif
            if (condition && this.selectedObjetIndex === this.newIndex) {
                this.champObligatoire = true;
                this.donneeObligatoire = 'Donnée obligatoire';
                element.classList.add('field-error');
            } else {
                element.classList.remove('field-error');
            }
        }
    };

    validateField('prixAquisitionBien', this.prixAquisitionBien == null || this.prixAquisitionBien == 0);
    validateField('montantLclFinance', this.montantLclFinance == null || this.montantLclFinance == 0);
    validateField('partLcl', this.partLcl == null || this.partLcl == 0);
    validateField('numeroDpeAdeme', this.selectedNatBatiment == 'option1' && (!this.numeroDpeAdeme));
    validateField('SirenDPE', 
        (this.selectedNatBatiment == 'option1' && (!this.SirenDPE)) || 
        (this.numeroDpeAdeme && (!this.SirenDPE))
    );
    validateField('anneeConstruction', (formData.anneeConstruction == "" || formData.anneeConstruction == null) && this.selectedNatBatiment == "option1");
    validateField('numeroNomRue', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.numeroNomRue));
    validateField('codePostal', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.codePostal));
    validateField('ville', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.ville));
    validateField('LettreCEP', (formData.lettreCEP == "" || !formData.lettreCEP) && this.selectedNatBatiment == "option1");
    if (this.hideField) {
        validateField('LettreCEPlist', (formData.lettreCEP == "" || !formData.lettreCEP || formData.lettreCEP == 'option0') && this.selectedNatBatiment == "option1");
    }
    validateField('LettreGES', (formData.lettreGES == "" || !formData.lettreGES) && this.selectedNatBatiment == "option1");
    if (this.hideField) {
        validateField('lettreGeslist', (formData.lettreGES == "" || !formData.lettreGES || formData.lettreGES == 'option0') && this.selectedNatBatiment == "option1");
    }
    validateField('ValeurGES', (formData.valeurGes == "" || formData.valeurGes == null) && this.selectedNatBatiment == "option1");
    validateField('ValeurCEP', (formData.valeurCep == "" || formData.valeurCep == null) && this.selectedNatBatiment == "option1");
    validateField('SurfaceDuBien', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.surfaceBien ));
    validateField('categorieBatiment', !this.codeBatimentSelected || this.codeBatimentSelected == 'option0');
    validateField('natureBien', !this.selectedNatBatiment || this.selectedNatBatiment == 'option0');
    validateField('dateDepot', this.selectedNatBatiment == 'option2' && (!this.dateDepot));
}


