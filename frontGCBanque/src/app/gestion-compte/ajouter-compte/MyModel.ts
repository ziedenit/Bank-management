checkFormFieldsFormGroup() {
			const formData=this.formGroup.value;
			console.log("la valeur de formGroupe est la suivante:", this.formGroup.value)
			this.champObligatoire = false;
			this.donneeObligatoire = '';			
			const validateField = (fieldName: string, condition: boolean) => {
			  if (condition) {
				this.champObligatoire = true;
				this.donneeObligatoire = 'Donnée obligatoire';
				document.getElementById(fieldName)?.style.setProperty('border', '1px solid red');
			  } else {
				document.getElementById(fieldName)?.style.removeProperty('border');
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
			if (this.objetFinance == '' || this.objetFinance == null) {
			validateField('selectedObjetFinancement', this.selectedObjetFinancement == '' || this.selectedObjetFinancement == undefined || this.selectedObjetFinancement == 'option0');
			}
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
			validateField('ValeurGES', (formData.valeurGes == "" || formData.valeurGes==null) && this.selectedNatBatiment == "option1");
			validateField('ValeurCEP', (formData.valeurCep == "" || formData.valeurCep==null) && this.selectedNatBatiment == "option1");
			console.log("helooooooo surface", formData.surfaceBien)
			validateField('SurfaceDuBien', (this.selectedNatBatiment == 'option1' || this.selectedNatBatiment == 'option2') && (!formData.surfaceBien ));
			validateField('categorieBatiment', !this.codeBatimentSelected || this.codeBatimentSelected == 'option0');
			validateField('natureBien', !this.selectedNatBatiment || this.selectedNatBatiment == 'option0');
			validateField('dateDepot', this.selectedNatBatiment == 'option2' && (!this.dateDepot));
}
c'est au niveau de cette méthode que se sont encerclé en rouge le controle se fait au debut sur le premier objet en lancent le calcul apres en cliquant sur un nouveau objet le rouge reste pourtant je creer le nouveau objet dans la méthode ajouterObjetFinancement() {
	this.formGroup.reset();
    // Réinitialisation des variables et de l'état
    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
    this.showDeleteIcon = true;
    this.showFileAriane = true;

    // Création de l'objet de financement vierge avec toutes les propriétés du bien et du dpe initialisées
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
                    nouvelObjet.bien.idBien = idBien;  // Assigner l'ID du bien

                    // Ajouter le nouvel objet de financement à la liste
                    this.objetsFinancements.push(nouvelObjet);
                    this.extractedInitialFinancement.objetFinancement = [...this.objetsFinancements];  // Mise à jour des objets

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
private createNewBien(): Bien {
    return {
        idBien: null, // ID sera généré
        codeBatiment: null,
        codeNormeThermique: null,
        typeBatiment: null,
        codePostal: null,
        nomCommune: null,
        adresseComplete: null,
        anneeConstruction: null,
        dateDepotPc: null,
        surfaceBien: null,
        bienFinanceLCL: false, // Par défaut à `false`
        dpeActuel: this.createNewDpe(), // Initialisation d'un objet Dpe vierge
        etatBien: null,
        numeroVoie: null,
        nomRue: null,
        prixBien: null,
        montantFinanceLCL: null,
        partLCL: null,
        typeUsage: null,
        numeroNomRue: null,
        typeEnergie: null,
        batiment: null,
        escalier: null,
        etage: null,
        porte: null,
        typeVoie: null,
        codeDepartement: null,
        codeInseeCommune: null,
        numeroLot: null,
        periodeConstruction: null,
        coordonneeCartographiqueX: null,
        coordonneeCartographiqueY: null,
        dateDebutConstruction: null,
        eligibleDpe: null
    };
}
private createNewDpe(): Dpe {
    return {
        id: null,
        origineCreation: '',
        dateCreation: new Date(), // Initialise avec la date actuelle
        origineModification: '',
        dateModification: new Date(), // Initialise avec la date actuelle
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
