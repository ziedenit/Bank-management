	onBreadcrumbClick(index: number ) {
		this.resetAlertDisplay();
		this.errorDpeMessage=null;
		this.errorNormeThermiqueMessage=null;
		this.errorDateDepotMessage=null;
					
		console.log("this.extractedInitialFinancement.objetFinancement[index] on click sur l'objet index", index,this.extractedInitialFinancement.objetFinancement[index])
		this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);  // Sauvegarder les données de l'objet actuel
		
		this.selectedObjetIndex = index;  // Mettre à jour l'index de l'objet sélectionné
		
			// Restituer le texte d'alignement sauvegardé en base
			if (this.extractedInitialFinancement.objetFinancement[index] && this.extractedInitialFinancement.objetFinancement[index].alignement 
				&& this.extractedInitialFinancement.objetFinancement[index].alignement.topAlignement!=null&&this.extractedInitialFinancement.objetFinancement[index].alignement.xtra275TopAlignement
				!=null) {
					this.showBlocResult=true;
				this.alignementResultText = this.alignementMappingReprise[this.extractedInitialFinancement.objetFinancement[index].alignement.topAlignement][this.extractedInitialFinancement.objetFinancement[index].alignement.xtra275TopAlignement]
				
			}
            if (this.extractedInitialFinancement.objetFinancement[index].alignement.topAlignement==null && this.extractedInitialFinancement.objetFinancement[index].alignement.xtra275TopAlignement==null) {
				this.showBlocResult=false;		
			}

			
				
			
		this.depExist=false;
		



   

		

	this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);  // Charger les données du nouvel objet sélectionné
	this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);  // Initialiser le formulaire avec les données du nouvel objet

	

	// Appliquer les règles métiers sur l'élément sélectionné
	this.checkPiecesJustificatif(this.extractedInitialFinancement, this.selectedObjetIndex);
	console.log("Vérification des champs montant finance LCL et part LCL : ", this.montantLclFinance, this.partLcl);
	this.checkFormFieldsFormGroup();

	
 // Forcer le recalcul d'alignement en cas de changement d'un 

 this.formGroup.get('lettreCEP').valueChanges.subscribe(() => {
	this.recalculerAlignment();
  });
  this.formGroup.get('valeurCep').valueChanges.subscribe(() => {
	this.recalculerAlignment();
  });
  this.formGroup.get('anneeConstruction').valueChanges.subscribe(() => {
	this.recalculerAlignment();
  });


}
