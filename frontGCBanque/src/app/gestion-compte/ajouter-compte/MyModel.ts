ajouterObjetFinancement() {
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
}//
ngOnInit(): void {

    this.id = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];
    if (this.Url_Retour_Base64) {
		this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
	}
	else {
		console.warn("Url_Retour_Base64 est falsy. Impossible de le convertir en Utf8.");
	}
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
		this.extractedInitialFinancement = responseFinancement;
		console.log("le financement récupéré de la BDD est le suivant:",responseFinancement )	
        this.setFinancementData(responseFinancement);
        this.setObjetFinancementData(responseFinancement.objetFinancement[0]);
        this.checkRequiredFields(responseFinancement,0);
		this.checkPiecesJustificatives(responseFinancement,0);
        this.setupFormGroup(responseFinancement.objetFinancement[0].bien);
		  
    });

	 // Récupérer la liste des objets de financement
	 this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
		this.objetsFinancements = objets;
		this.showDeleteIcon = false;
  
		// Si plusieurs objets, afficher le fil d'Ariane
		if (this.objetsFinancements.length > 1) {
			this.showFileAriane = true;
		}
  
	});
  
}
//
onBreadcrumbClick(index: number ) {
		this.depExist=false;
// sauvgarde des données  propre à un objet selectionné  du fil Ariane 
this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
this.selectedObjetIndex=index;


		this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);
		console.log("this.extractedInitialFinancement.objetFinancement[index]",this.extractedInitialFinancement.objetFinancement[index])
		 	if(this.clickCalulAlignObject.get(index)>0||this.extractedInitialFinancement.objetFinancement[index].firstDisconnectionOfd==false)
		   {
			// Si ce n'est pas la premiere consultation d'un objet et le calcul aligne est déja lance au moin une seule fois 
		   this.checkRequiredFields(this.extractedInitialFinancement,index);
		   }  
		this.showBlocResult=true;
		
		
	  
	   // Appliquer les regles metier sur l'element selectionné du fil Ariane 
	   this.checkPiecesJustificatives(this.extractedInitialFinancement,this.selectedObjetIndex);
        this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
		
		  
			console.log("Contenance du financement actuel")
			console.log(this.extractedInitialFinancement)
			
		  }
//
private checkRequiredFields(responseFinancement: Financement, index:number): void {
    const bien = responseFinancement.objetFinancement[index]?.bien;
    const dpeActuel = bien?.dpeActuel;
    this.checkAndHighlightRequiredField(bien && bien.etatBien == null, "natureBien");
    this.checkAndHighlightRequiredField(bien && bien.codeBatiment == null, "categorieBatiment");
    this.checkAndHighlightRequiredField(bien && bien.partLCL == null, "partLcl");
    this.checkAndHighlightRequiredField(bien && bien.prixBien == null, "prixAquisitionBien");
    this.checkAndHighlightRequiredField(bien && bien.montantFinanceLCL == null, "montantLclFinance");	
    if (bien?.etatBien == "Ancien" && dpeActuel) {
        this.checkAndHighlightRequiredField(dpeActuel.numeroDpe == null || dpeActuel.numeroDpe == "", "numeroDpeAdeme");
        this.checkAndHighlightRequiredField(dpeActuel.sirenDiagnostiqueur == null || (dpeActuel.numeroDpe != null && dpeActuel.sirenDiagnostiqueur == null), "SirenDPE");
        this.checkAndHighlightRequiredField(dpeActuel.classeCep == null || dpeActuel.classeCep == "", "LettreCEP");
        this.checkAndHighlightRequiredField(dpeActuel.classeGes == null || dpeActuel.classeGes == "", "LettreGES");
		this.checkAndHighlightRequiredField((dpeActuel.classeCep == null || dpeActuel.classeCep == "" ) && (this.hideFieldCEP), "LettreCEPlist");
        this.checkAndHighlightRequiredField((dpeActuel.classeGes == null || dpeActuel.classeGes == "") && this.hideFieldGES, "lettreGeslist");
        this.checkAndHighlightRequiredField(dpeActuel.estimationCep == null, "ValeurCEP");
        this.checkAndHighlightRequiredField(dpeActuel.estimationGes == null, "ValeurGES");
        this.checkAndHighlightRequiredField(bien.anneeConstruction == null, "anneeConstruction");
    }
    if (bien?.etatBien == "Neuf") {
        this.checkAndHighlightRequiredField(bien.dateDepotPc == null, "dateDepot");
				this.checkAndHighlightRequiredField(bien.dpeActuel.numeroDpe != null&& bien.dpeActuel.sirenDiagnostiqueur == null, "SirenDPE");
    }
    this.checkAndHighlightRequiredField(bien && (bien.numeroNomRue == null || bien.numeroNomRue == ""), "numeroNomRue");
    this.checkAndHighlightRequiredField(bien && (bien.codePostal == null || bien.codePostal == ""), "codePostal");
    this.checkAndHighlightRequiredField(bien && (bien.nomCommune == null || bien.nomCommune == ""), "ville");
	this.checkAndHighlightRequiredField(
		responseFinancement.objetFinancement[index] != null &&responseFinancement.objetFinancement[index].bien != null &&
		(responseFinancement.objetFinancement[index].bien.etatBien == "Neuf" ||responseFinancement.objetFinancement[index].bien.etatBien == "Ancien") &&
		responseFinancement.objetFinancement[index].bien.surfaceBien == null,
		"SurfaceDuBien"
	);
}
checkAndHighlightRequiredField(condition, elementId) {
    console.log("condition");
    console.log(condition);
    console.log("this.isfirstDebranchement");
    console.log(this.isfirstDebranchement);
    console.log("elementId");
    console.log(elementId);

    const element = document.getElementById(elementId);
    if (element) {
        if (condition && !this.isfirstDebranchement) {
            this.champObligatoire = true;
            this.donneeObligatoire = 'Donnée obligatoire';
            element.style.border = "1px solid red";
        } else {
            element.style.removeProperty('border');
        }
    } else {
        console.error(`Element not found: ${elementId}`);
    }
}
j'ai ce code lorsque j'ajouter un objet en cliquant en appelant ajouterObjetFinancement au lieu d'avoir un objet vide je recoi les allerte rouge sur le nouveau formulaire comme ci le passage par index et objet ne passe pas sachant que sur le premier objet avant la creation j'ai appeler la méthode calculer ( showAlignement qui ajoute des validattion sur les champs de l'objet le rouge sur les champs du nouveau objet ce qui n'est pas normal car le checkRequiredFields est applelé selon les conditions this.clickCalulAlignObject.get(index)>0||this.extractedInitialFinancement.objetFinancement[index].firstDisconnectionOfd==false ) et checkFormFieldsFormGroup est appélé uniquement lorsque j'appel la méthode showAlignement(index:number): void {
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
 
