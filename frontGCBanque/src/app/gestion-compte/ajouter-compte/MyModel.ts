ajouterObjetFinancement() {
	this.formGroup.reset();
    // Réinitialisation des variables et de l'état
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
        bien: this.createNewBien(),  
        dpeAvantTravaux: this.createNewDpe(), 
        dpeApresTravaux: this.createNewDpe(), 
        alignement: Alignement.createDefault(), 
        eligibilite: new Eligibilite(), 
        codeFamilleObjet: "01", 
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
                    nouvelObjet.bien.idBien = idBien;  
                    this.objetsFinancements.push(nouvelObjet);
                    this.extractedInitialFinancement.objetFinancement = [...this.objetsFinancements];  
                    
                    this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
                    this.newIndex = this.objetsFinancements.length - 1;

                    // **Ajoutez cette ligne pour changer l'objet actif directement sur le nouvel objet.**
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
}
checkAndHighlightRequiredField(condition, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        if (condition && !this.isfirstDebranchement && this.selectedObjetIndex === this.newIndex) {  // Seules les erreurs sont affichées pour l'objet en cours d'édition
            this.champObligatoire = true;
            this.donneeObligatoire = 'Donnée obligatoire';
            element.classList.add('field-error');
        } else {
			element.classList.remove('field-error');
        }
    } 
}
onBreadcrumbClick(index: number) {
	this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);  // Sauvegarder les données de l'objet actuel
	this.selectedObjetIndex = index;  // Mettre à jour l'index de l'objet sélectionné
	this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);  // Charger les données du nouvel objet sélectionné
	this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);  // Initialiser le formulaire avec les données du nouvel objet

	// Appliquer les règles métiers sur l'élément sélectionné
	this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);
}
