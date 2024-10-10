private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
        console.log("currentObject",currentObject)
		if (!currentObject || !currentObject.bien) return;
		const bien = currentObject.bien;
        

		if (!bien.dpeActuel) {
			bien.dpeActuel = new Dpe();
		}
		//
		currentObject.codeObjetFinancement = this.typeObjetFinancement ?? (this.selectedObjetFinancement === 'option2' ? '02' : null);
		currentObject.codeFamilleObjet = this.familleObjet ?? (this.selectedFamilleObjet === 'option1' ? '01' : null)

		const dpeActuel = currentObject.bien.dpeActuel;
		bien.partLCL = this.partLcl;
		bien.eligibleDpe = this.typeOptions[this.selectedType] || null,
		bien.montantFinanceLCL = this.montantLclFinance;
		bien.prixBien = this.prixAquisitionBien;
		bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
		bien.codeNormeThermique = this.codeNormeThermiqueMappingInverse[this.normeThermique];
		bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
		bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;
		bien.etatBien = this.getCodeEtatBien(this.selectedNatBatiment)

		bien.codeBatiment = this.getCodeEtatBatiment(this.codeBatimentSelected)

		bien.surfaceBien = this.formGroup.get('surfaceBien').value;
		bien.dpeActuel.estimationCep = this.formGroup.get('valeurCep').value;
		bien.dpeActuel.estimationGes = this.formGroup.get('valeurGes').value;
		bien.dpeActuel.dateFinValiditeDpe = this.formGroup.get('dateFinValidite').value;
		bien.numeroNomRue = this.formGroup.get('numeroNomRue').value;
		bien.codePostal = this.formGroup.get('codePostal').value;
		bien.nomCommune = this.formGroup.get('ville').value;
		bien.dpeActuel.dateEtablissementDpe = this.formGroup.get('dateDiangnostique').value;
		bien.anneeConstruction = this.formGroup.get('anneeConstruction').value;
		bien.typeBatiment = this.formGroup.get('typeBatiment').value;
		//

		bien.dpeActuel.classeCep = (this.hideField || this.hideFieldCEP) ? this.lettreCepMapping[this.formGroup.get('lettreCEP').value] || null : this.formGroup.get('lettreCEP').value,

			bien.dpeActuel.classeGes = (this.hideField || this.hideFieldGES) ? this.lettreCepMapping[this.formGroup.get('lettreGES').value] || null : this.formGroup.get('lettreGES').value,
			bien.typeEnergie = this.formGroup.get('energieType').value;
		///

		if (!currentObject.piecesJustificatives) {
			currentObject.piecesJustificatives = [];
		}

		// Ajout d'une pièce de type DPE ou Compromis de vente
		if (this.isDpeChecked) {
			currentObject.isDpeChecked = true;
			// Vérifier si une pièce de type DPE ou Compromis de vente existe déjà
			const existingDpe = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'DPE' || piece.typePiece === 'Compromis de vente');

			if (!existingDpe) {
				currentObject.piecesJustificatives.push({
					typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
					dpeActuel: this.selectedOptionJustif === "DPE",
					numeroDpe: this.numeroDpeAdeme,
					id: null,
					origineCreation: null,
					dateCreation: null,
					origineModification: null,
					dateModification: null,
					idPiece: null,
					referenceGed: null,
					sousTypePiece: null
				});
			}



		}
		else {
			currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== "DPE")
			currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== "Compromis de vente")

		}

		// Ajout d'une pièce de type Norme thermique
		if (this.isNormeThermiqueChecked) {
			currentObject.isNormeThermiqueChecked = true;
			// Vérifier si une pièce de type "Norme thermique" existe déjà
			const existingNormeThermique = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');

			if (!existingNormeThermique) {
				currentObject.piecesJustificatives.push({
					typePiece: "Norme thermique",
					id: null,
					origineCreation: null,
					dateCreation: null,
					origineModification: null,
					dateModification: null,
					idPiece: null,
					referenceGed: null,
					sousTypePiece: null,
					numeroDpe: null,
					dpeActuel: false
				});
			}
		}
		else {
			currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== "Norme thermique")
		}
		// Ajout d'une pièce de type Permis de construire
		if (this.isDateDepotChecked) {
			currentObject.isDateDepotChecked = true
			// Vérifier si une pièce de type "Permis de construire" existe déjà
			const existingPermisDeConstruire = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');

			if (!existingPermisDeConstruire) {
				currentObject.piecesJustificatives.push({
					typePiece: "Permis de construire",
					id: null,
					origineCreation: null,
					dateCreation: null,
					origineModification: null,
					dateModification: null,
					idPiece: null,
					referenceGed: null,
					sousTypePiece: null,
					numeroDpe: null,
					dpeActuel: false
				});

			}



		}
		else {
			currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== "Permis de construire")
		}
		}


ajouterObjetFinancement() {
		const sirenObj1= this.extractedInitialFinancement.objetFinancement[0].bien.dpeActuel.sirenDiagnostiqueur;
		this.piecesJustificativesObjet0 = this.extractedInitialFinancement.objetFinancement[0].piecesJustificatives
		this.alignementResultText = '';
        
		const fieldsToClear = ['prixAquisitionBien', 'montantLclFinance', 'partLcl', 'numeroDpeAdeme', 'SirenDPE', 'natureBien', 'categorieBatiment'];
		fieldsToClear.forEach(field => {
			const element = document.getElementById(field);
			if (element) {
				element.style.removeProperty('border');
			}
		});
		// Réinitialisation des variables et de l'état
		this.isValid = null;
		this.SirenDPE = '';
		this.isDateDepotChecked = false;
		this.isNormeThermiqueChecked = false;
		this.isDpeChecked = false;
		this.showBlocResult = false;
		this.showDeleteIcon = true;
		this.showFileAriane = true;
		this.depExist = false;


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
			piecesJustificatives: [],
			isDateDepotChecked: false,
			isDpeChecked: false,
			isNormeThermiqueChecked: false,


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
						

						if (this.newIndex == 1) {
							this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[0]);
							this.extractedInitialFinancement.objetFinancement[0].piecesJustificatives = this.piecesJustificativesObjet0;
							this.extractedInitialFinancement.objetFinancement[0].alignement = this.alignementContext;
						    this.extractedInitialFinancement.objetFinancement[0].bien.dpeActuel.sirenDiagnostiqueur=sirenObj1;
						}
						this.selectedObjetIndex = this.objetsFinancements.length - 1;
						this.ajoutFinancementDisabled = true;
						this.setObjetFinancementData(nouvelObjet);


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
showAlignement(index: number): void {
		this.resetAlertDisplay();
		this.postDisabled = false;
		this.checkFormFieldsFormGroup();
		this.showBlocResult = true;
		this.extractedInitialFinancement.objetFinancement[index].firstDisconnectionOfd = false;
		console.log("this.extractedInitialFinancement.objetFinancement[index]",index,this.extractedInitialFinancement.objetFinancement[index])
		this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);




		if (this.clickCalulAlignObject.has(index)) {
			const currentCountcalcul = this.clickCalulAlignObject.get(index) ?? 0;
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
			this.alignementContext = this.xtraRepriseService.calculXtra(aligne, aligneXtra);
			this.extractedInitialFinancement.objetFinancement[index].alignement = this.alignementContext;
			//this.extractedInitialFinancement.objetFinancement[index].alignementXtraResult=this.alignementResultText ;
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



		if ((this.extractedInitialFinancement.objetFinancement.length) > 4) {
			this.ajoutFinancementDisabled = true;
			alert("Vous avez atteind le nombre maximum d'objet autorisés");

		}
	}

j'ai ce code permettant d'ajouter un objet financement via l'appel a la méthode ajouter j'ai un bug si j'ajouter un premier objet ayant la partie bien dpe vide il copie le denrnier de celui qui n'est pas vide j'ai l'impression que les methode qui ecoute sur les données form groupe ne fonctionne pas bien lorsque qu'il s'agit d'un objet vide 
