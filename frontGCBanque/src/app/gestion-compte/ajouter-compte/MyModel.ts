.field-error {
  border: 1px solid red !important;
}
checkFormFieldsFormGroup() {
    const formData = this.formGroup.value;
    console.log("La valeur de formGroup est la suivante:", this.formGroup.value);
    this.champObligatoire = false;
    this.donneeObligatoire = '';

    const validateField = (fieldName: string, condition: boolean) => {
        const element = document.getElementById(fieldName);
        if (element) {
            if (condition) {
                this.champObligatoire = true;
                this.donneeObligatoire = 'Donnée obligatoire';
                element.classList.add('field-error');
            } else {
                element.classList.remove('field-error');
            }
        }
    };

    // Ajoutez toutes vos validations ici
    validateField('prixAquisitionBien', this.prixAquisitionBien == null || this.prixAquisitionBien == 0);
    validateField('montantLclFinance', this.montantLclFinance == null || this.montantLclFinance == 0);
    validateField('partLcl', this.partLcl == null || this.partLcl == 0);
    validateField('numeroDpeAdeme', this.selectedNatBatiment == 'option1' && (!this.numeroDpeAdeme));
    validateField('SirenDPE', (this.selectedNatBatiment == 'option1' && (!this.SirenDPE)) || (this.numeroDpeAdeme && (!this.SirenDPE)));
    // Et ainsi de suite pour les autres champs...
}
//
ajouterObjetFinancement() {
    this.formGroup.reset(); // Réinitialiser le formulaire

    // Réinitialisation des variables de champ pour le nouvel objet
    this.prixAquisitionBien = null;
    this.montantLclFinance = null;
    this.partLcl = null;
    this.SirenDPE = null;
    this.numeroDpeAdeme = null;
    this.selectedNatBatiment = null;
    this.codeBatimentSelected = null;

    // Réinitialisation des bordures d'erreur (en cas de persistance après reset)
    const fieldsToClear = ['prixAquisitionBien', 'montantLclFinance', 'partLcl', 'numeroDpeAdeme', 'SirenDPE'];
    fieldsToClear.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.classList.remove('field-error');
        }
    });

    // Création du nouvel objet de financement vierge
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

    // Générer un nouvel ID pour l'objet de financement
    this.idGeneratorService.generateIdObjetFinancement().subscribe(
        idFinancement => {
            nouvelObjet.idObjetFinancement = idFinancement;

            // Générer l'ID pour le bien de l'objet avant de l'ajouter
            this.idGeneratorService.generateIdBien().subscribe(
                idBien => {
                    nouvelObjet.bien.idBien = idBien;

                    // Ajouter le nouvel objet de financement à la liste
                    this.objetsFinancements.push(nouvelObjet);
                    this.extractedInitialFinancement.objetFinancement = [...this.objetsFinancements];

                    // Marquer l'objet comme ajouté manuellement
                    this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
                    this.newIndex = this.objetsFinancements.length - 1;
                    this.ajoutFinancementDisabled = true;

                    console.log("Nouvel objet ajouté avec ID bien et financement générés", nouvelObjet);
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
}
//

<input type="text"
       id="prixAquisitionBien"
       [(ngModel)]="prixAquisitionBien"
       class="form-control form-control-sm"
       [ngClass]="{'field-error': prixAquisitionBien == null || prixAquisitionBien == 0}" />
