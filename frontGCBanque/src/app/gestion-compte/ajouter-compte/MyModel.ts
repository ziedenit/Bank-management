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
showAlignement(index:number): void {
	this.showBlocResult=true;
	this.extractedInitialFinancement.objetFinancement[index].firstDisconnectionOfd=false;
	this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);
	this.checkFormFieldsFormGroup();
	
	
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
				this.alignementResult = aligne;
				this.alignementXtraResult = aligneXtra;
				this.alignementContext= this.xtraRepriseService.calculXtra(aligne,aligneXtra);
				this.extractedInitialFinancement.objetFinancement[index].alignement=this.alignementContext;
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
}
private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
		
        if (!currentObject || !currentObject.bien) return;
        const bien = currentObject.bien;
    // verification existance dpeActuel si non initilisation 
    if (!bien.dpeActuel) {
        bien.dpeActuel = new Dpe();
    } 
	//

		const dpeActuel =currentObject.bien.dpeActuel;
        bien.partLCL = this.partLcl;
        bien.montantFinanceLCL = this.montantLclFinance;
        bien.prixBien = this.prixAquisitionBien;
        bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
        bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique); 
        bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
        bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;
		bien.etatBien=this.getCodeEtatBien(this.selectedNatBatiment)
		console.log("this.selectedNatBatiment",this.selectedNatBatiment)
		console.log("this.getCodeEtatBien(this.selectedNatBatiment)",this.getCodeEtatBien(this.selectedNatBatiment))
	    bien.codeBatiment=this.getCodeEtatBatiment(this.codeBatimentSelected)
		console.log("this.codeBatimentSelected",this.codeBatimentSelected)
		console.log("this.getCodeEtatBatiment(this.codeBatimentSelected)",this.getCodeEtatBatiment(this.codeBatimentSelected))
		bien.surfaceBien = this.formGroup.get('surfaceBien').value;
		bien.dpeActuel.estimationCep = this.formGroup.get('valeurCep').value;
		bien.dpeActuel.estimationGes = this.formGroup.get('valeurGes').value;
		bien.numeroNomRue = this.formGroup.get('numeroNomRue').value;
		bien.codePostal = this.formGroup.get('codePostal').value;
		bien.nomCommune = this.formGroup.get('ville').value;
		bien.dpeActuel.dateEtablissementDpe = this.formGroup.get('dateDiangnostique').value;
		bien.anneeConstruction = this.formGroup.get('anneeConstruction').value;
		bien.typeBatiment = this.formGroup.get('typeBatiment').value;
		bien.dpeActuel.classeCep = this.formGroup.get('lettreCEP').value;
		bien.dpeActuel.classeGes = this.formGroup.get('lettreGES').value;
		bien.typeEnergie = this.formGroup.get('energieType').value;
		
		if (!currentObject.piecesJustificatives) {
			currentObject.piecesJustificatives = [];
		}
        // Ajout d'une pièce de type DPE ou Compromis de vente
if (this.isDpeChecked) {
	console.log("this.isDpeCheckedTrue")
	console.log(this.isDpeChecked)
    // Vérifier si une pièce de type DPE ou Compromis de vente existe déjà
    const existingDpe = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'DPE' || piece.typePiece === 'Compromis de vente');
    
    if (!existingDpe) {
        currentObject.piecesJustificatives.push({
            typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
            dpeActuel: this.selectedOptionJustif === "DPE",
            numeroDpe: this.numeroDpeAdeme,
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: ''
        });
    }

	

}
else

	{
		console.log("this.isDpeCheckedfalse")
	    console.log(this.isDpeChecked)
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Document DPE")
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="DPE")
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Compromis de vente")

	}

// Ajout d'une pièce de type Norme thermique
if (this.isNormeThermiqueChecked) {
    // Vérifier si une pièce de type "Norme thermique" existe déjà
    const existingNormeThermique = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
    
    if (!existingNormeThermique) {
        currentObject.piecesJustificatives.push({
            typePiece: "Norme thermique",
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: '',
            numeroDpe: '',
            dpeActuel: false
        });
    }	
}
else
	{
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Norme thermique")
	}
// Ajout d'une pièce de type Permis de construire
if (this.isDateDepotChecked) {
    // Vérifier si une pièce de type "Permis de construire" existe déjà
    const existingPermisDeConstruire = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
    
    if (!existingPermisDeConstruire) {
        currentObject.piecesJustificatives.push({
            typePiece: "Permis de construire",
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: '',
            numeroDpe: '',
            dpeActuel: false
        });
    }

	

}
else
	{
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Permis de construire")
	}

	
console.log("currentObject.piecesJustificatives")
console.log(currentObject.piecesJustificatives)
	
      }
private setObjetFinancementData(objetFinancement: ObjetFinancement): void {
	this.idObjetFinancement = objetFinancement.idObjetFinancement;
	this.familleObjet=objetFinancement.codeFamilleObjet;
	this.typeObjetFinancement=objetFinancement.codeObjetFinancement;
	this.isfirstDebranchement = objetFinancement.firstDisconnectionOfd;
	if(this.isfirstDebranchement && !this.clickCalulAlignObject.has(0))
	{
		this.ajoutFinancementDisabled=true;
	}
	this.selectedFamilleObjet = this.familleObjet === "01" ? "option1" : this.familleObjet === "05" ? "option4" : "option0" ;

	switch (objetFinancement.codeObjetFinancement) {
		case "02":
			this.objetFinance = "Acquisition de bâtiment";
			break;
		case "03":
			this.objetFinance = "Rénovation de bâtiment";
			this.depExist = true;
			break;
		default:
			break;
	}
    if (!objetFinancement || !objetFinancement.bien) return;
    const bien = objetFinancement.bien;
	if (bien.eligibleDpe) {
        this.selectedType = this.eligibleDpeMapping[bien.eligibleDpe].type;
        this.hideFieldForm = this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm;}
	if (bien.etatBien) {this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];}
    if (bien.codeBatiment) {this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];}
    this.partLcl = bien?.partLCL;
    this.montantLclFinance = bien?.montantFinanceLCL;
	this.prixAquisitionBien = bien?.prixBien;
	this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
    if (bien.codeNormeThermique) {this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];}
    if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) { this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;}
    this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
	if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
        this.DpeResults = true;
        this.alignementResultText = this.alignementMappingReprise[objetFinancement.alignement.topAlignement][objetFinancement.alignement.xtra275TopAlignement] ;}	
	const dpeActuel = bien?.dpeActuel;
    if (dpeActuel && dpeActuel.numeroDpe!=null) {
    this.dateReceptionDpe = dpeActuel.dateReceptionDpe;
    this.dateFinValiditeDpe = dpeActuel.dateFinValiditeDpe;
    this.depExist = true;
    if(dpeActuel.classeCep==null || dpeActuel.classeCep==""){this.hideFieldCEP=true}
	if(dpeActuel.classeGes==null || dpeActuel.classeGes=="" ){this.hideFieldGES=true}	
}

    this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];
    this.updateFieldValue(this.selectedNatBatimentSubject, this.selectedNatBatiment);
	console.log("etatBien");
  

    this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];
    this.updateFieldValue(this.codeBatimentSelectedSubject, this.codeBatimentSelected);
	console.log("codeBatiment");
 

  this.partLcl = bien?.partLCL;
  this.updateFieldValue(this.partLclSubject, this.partLcl);
  console.log("partLCL");
  
  this.montantLclFinance = bien?.montantFinanceLCL;
  this.updateFieldValue(this.montantLclFinanceSubject, this.montantLclFinance);
  console.log("montantFinanceLCL");
  
  this.prixAquisitionBien = bien?.prixBien;
  this.updateFieldValue(this.prixAquisitionBienSubject, this.prixAquisitionBien);
  console.log("prixBien");
  
  this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
  this.updateFieldValue(this.dateDepotSubject, this.dateDepot);
  console.log("datedepotpc");
  
  
    this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];
    this.updateFieldValue(this.normeThermiqueSubject, this.normeThermique);
	console.log("codeNormeThermique");
  
	if(bien.dpeActuel!=null&&bien.dpeActuel.sirenDiagnostiqueur!=null)
	{this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;
		this.updateFieldValue(this.SirenDPESubject, this.SirenDPE);
		console.log("sirenDiagnostiqueur");}
		else
		{
			this.updateFieldValue(this.SirenDPESubject, " ");
		}
		
		
 
  this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
  this.updateFieldValue(this.numeroDpeAdemeSubject, this.numeroDpeAdeme);
  console.log("numeroDpeAdeme");

}
