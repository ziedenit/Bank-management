 ajouterObjetFinancement() {
	
	

	

	// Réinitialisation des bordures d'erreur (en cas de persistance après reset)
	const fieldsToClear = ['prixAquisitionBien', 'montantLclFinance', 'partLcl', 'numeroDpeAdeme', 'SirenDPE','natureBien','categorieBatiment'];
	fieldsToClear.forEach(field => {
		const element = document.getElementById(field);
		if (element) {
			element.style.removeProperty('border');
		}
	});
    // Réinitialisation des variables et de l'état
	this.isValid=null;
	this.SirenDPE='';
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
					console.log("this.newIndex ", this.newIndex )
					this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[0]);
                    this.selectedObjetIndex = this.objetsFinancements.length - 1;
                    this.ajoutFinancementDisabled = true;

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
//

	onBreadcrumbClick(index: number ) {
	
		this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);  // Sauvegarder les données de l'objet actuel
		this.selectedObjetIndex = index;  // Mettre à jour l'index de l'objet sélectionné
		// Restituer le texte d'alignement sauvegardé
		console.log("this.extractedInitialFinancement.objetFinancement[index].alignementResultText",this.extractedInitialFinancement.objetFinancement[index].alignementResultText)
		if (this.extractedInitialFinancement.objetFinancement[index].alignementResultText) {
			this.alignementResultText = this.extractedInitialFinancement.objetFinancement[index].alignementResultText;
		} else {
			this.alignementResultText = 'Aucun alignement disponible';
		}
		this.depExist=false;
		if(this.clickCalulAlignObject.has(index))
		{
		this.showBlocResult=true;
	    }

		

	this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);  // Charger les données du nouvel objet sélectionné
	this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);  // Initialiser le formulaire avec les données du nouvel objet

	

	// Appliquer les règles métiers sur l'élément sélectionné
	this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);
	console.log("Vérification des champs montant finance LCL et part LCL : ", this.montantLclFinance, this.partLcl);
	this.checkFormFieldsFormGroup();
}
//
showAlignement(index:number): void {
	this.checkFormFieldsFormGroup();
	this.showBlocResult=true;
	this.extractedInitialFinancement.objetFinancement[index].firstDisconnectionOfd=false;
	this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);
	

	
	
	if (this.clickCalulAlignObject.has(index)) {
		const currentCountcalcul = this.clickCalulAlignObject.get(index)??0;
		this.clickCalulAlignObject.set(index, currentCountcalcul + 1);
	} else {
		
		this.clickCalulAlignObject.set(index, 1);
	}


	this.prepareLigneContext();

			
			this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);
			this.DpeResults = true;
			this.elementResults = true;		
			
			
			forkJoin([
				this.engineService.alignement(this.ligneContext),
				this.engineService.alignementXtra(this.ligneContextXtra)            
			]).subscribe(([aligne, aligneXtra]) => {    
				this.alignementResultText = this.alignementMapping[aligne];
				console.log("this.alignementResultText",this.alignementResultText)
				this.alignementResult = aligne;
				this.alignementXtraResult = aligneXtra;
				this.alignementContext= this.xtraRepriseService.calculXtra(aligne,aligneXtra);
				
				this.extractedInitialFinancement.objetFinancement[index].alignementXtraResult=this.alignementResultText ;
				console.log("this.extractedInitialFinancement.objetFinancement[index].alignementXtraResult lors du calcul",this.extractedInitialFinancement.objetFinancement[index].alignementXtraResult)
				this.extractedInitialFinancement.objetFinancement[index].alignement=this.alignementContext;
				this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);
			});
		

		
			this.errorDpeMessage = this.checkFileDpeInserted();
			this.errorNormeThermiqueMessage = this.checkNormeThermique();
			this.errorDateDepotMessage = this.checkFileDateDepotInserted();
			this.evaluatedIndex.push(index);
			const allManuallyAddedAreEvaluated = this.manuallyAddedIndices.every(manualIndex => this.evaluatedIndex.includes(manualIndex));
			const isManuallyAddedEmpty = this.manuallyAddedIndices.length === 0;
			if ((index == this.newIndex) || (index == 0 && (allManuallyAddedAreEvaluated || isManuallyAddedEmpty))) {
				this.ajoutFinancementDisabled = false;
			}	
			
			console.log("financement a patcher avec resultat alignement: ",this.extractedInitialFinancement);
}
j'ai logué et j'ai eu ca pour le calcul 
 this.extractedInitialFinancement.objetFinancement[index].alignementXtraResult lors du calcul L'actif financé a un impact positif sur l'un des 6 objectifs environnementaux de l'UE

mais pour la restitution en cliquant sur onclick pour la premier fois en retournant sur l'objet 1 j'ai eu ca this.extractedInitialFinancement.objetFinancement[index].alignementResultText undefined
