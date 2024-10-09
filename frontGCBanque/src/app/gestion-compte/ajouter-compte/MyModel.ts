ajouterObjetFinancement() {
		this.piecesJustificativesObjet0 = this.extractedInitialFinancement.objetFinancement[0].piecesJustificatives
		//this.ResultTextAlignObjet0=this.extractedInitialFinancement.objetFinancement[0].alignementXtraResult
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

		console.log("this.extractedInitialFinancement.objetFinancement[0]",this.extractedInitialFinancement.objetFinancement[0])
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
						console.log("this.extractedInitialFinancement.objetFinancement[0]",this.extractedInitialFinancement.objetFinancement[0])
		
						nouvelObjet.bien.idBien = idBien;
						this.objetsFinancements.push(nouvelObjet);
						this.extractedInitialFinancement.objetFinancement = [...this.objetsFinancements];
						this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
						this.newIndex = this.objetsFinancements.length - 1;
						

						if (this.newIndex == 1) {
							
						//this.extractedInitialFinancement.objetFinancement[0].bien.dpeActuel.sirenDiagnostiqueur=sirenobjetzero;
							this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[0]);
							this.extractedInitialFinancement.objetFinancement[0].piecesJustificatives = this.piecesJustificativesObjet0;
							this.extractedInitialFinancement.objetFinancement[0].alignement = this.alignementContext;
						
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

		

	}//
onBreadcrumbClick(index: number) {
		this.resetAlertDisplay();
		this.errorDpeMessage = null;
		this.errorNormeThermiqueMessage = null;
		this.errorDateDepotMessage = null;


		this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);  // Sauvegarder les données de l'objet actuel


		this.selectedObjetIndex = index;


		if (this.extractedInitialFinancement.objetFinancement[index] && this.extractedInitialFinancement.objetFinancement[index].alignement
			&& this.extractedInitialFinancement.objetFinancement[index].alignement.topAlignement != null && this.extractedInitialFinancement.objetFinancement[index].alignement.xtra275TopAlignement
			!= null) {
			this.showBlocResult = true;
			this.alignementResultText = this.alignementMappingReprise[this.extractedInitialFinancement.objetFinancement[index].alignement.topAlignement][this.extractedInitialFinancement.objetFinancement[index].alignement.xtra275TopAlignement]

		}
		if (this.extractedInitialFinancement.objetFinancement[index].alignement.topAlignement == null && this.extractedInitialFinancement.objetFinancement[index].alignement.xtra275TopAlignement == null) {
			this.showBlocResult = false;
		}




		this.depExist = false;








		this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);  // Charger les données du nouvel objet sélectionné
		this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);  // Initialiser le formulaire avec les données du nouvel objet




		this.checkPiecesJustificatif(this.extractedInitialFinancement, this.selectedObjetIndex);

		this.checkFormFieldsFormGroup();




		this.formGroup.get('lettreCEP').valueChanges.subscribe(() => {
			this.recalculerAlignment();
		});
		this.formGroup.get('valeurCep').valueChanges.subscribe(() => {
			this.recalculerAlignment();
		});
		this.formGroup.get('anneeConstruction').valueChanges.subscribe(() => {
			this.recalculerAlignment();
		});


	}//
private setObjetFinancementData(objetFinancement: ObjetFinancement): void {
		this.idObjetFinancement = objetFinancement.idObjetFinancement;
		this.familleObjet = objetFinancement.codeFamilleObjet;
		this.typeObjetFinancement = objetFinancement.codeObjetFinancement;
		this.isfirstDebranchement = objetFinancement.firstDisconnectionOfd;
		if (this.isfirstDebranchement && !this.clickCalulAlignObject.has(0)) {
			this.ajoutFinancementDisabled = true;
		}
		this.selectedFamilleObjet = this.familleObjet === "01" ? "option1" : this.familleObjet === "05" ? "option4" : "option0";

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
			this.hideFieldForm = this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm;
		}
		if (bien.etatBien) { this.selectedNatBatiment = this.etatBienMapping[bien.etatBien]; }
		if (bien.codeBatiment) { this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment]; }
		this.partLcl = bien?.partLCL;
		this.montantLclFinance = bien?.montantFinanceLCL;
		this.prixAquisitionBien = bien?.prixBien;
		this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
		if (bien.codeNormeThermique) { this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique]; }
		if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) { this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur; }
		this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
		if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
			this.DpeResults = true;
			this.alignementResultText = this.alignementMappingReprise[objetFinancement.alignement.topAlignement][objetFinancement.alignement.xtra275TopAlignement];
		}
		const dpeActuel = bien?.dpeActuel;
		if (dpeActuel && dpeActuel.numeroDpe != null) {
			this.dateReceptionDpe = dpeActuel.dateReceptionDpe;
			this.dateFinValiditeDpe = dpeActuel.dateFinValiditeDpe;
			this.depExist = true;
			if (dpeActuel.classeCep == null || dpeActuel.classeCep == "") { this.hideFieldCEP = true }
			if (dpeActuel.classeGes == null || dpeActuel.classeGes == "") { this.hideFieldGES = true }
		}

		this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];
		this.updateFieldValue(this.selectedNatBatimentSubject, this.selectedNatBatiment);


		this.typeBatiment = bien.typeBatiment;
		this.updateFieldValue(this.selectedNatTypeBatimentSubject, this.typeBatiment);


		this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];
		this.updateFieldValue(this.codeBatimentSelectedSubject, this.codeBatimentSelected);





		this.partLcl = bien?.partLCL;
		this.updateFieldValue(this.partLclSubject, this.partLcl);



		this.montantLclFinance = bien?.montantFinanceLCL;
		this.updateFieldValue(this.montantLclFinanceSubject, this.montantLclFinance);



		this.prixAquisitionBien = bien?.prixBien;
		this.updateFieldValue(this.prixAquisitionBienSubject, this.prixAquisitionBien);


		this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
		this.updateFieldValue(this.dateDepotSubject, this.dateDepot);




		this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];
		this.updateFieldValue(this.normeThermiqueSubject, this.normeThermique);


		if (bien.dpeActuel != null && bien.dpeActuel.sirenDiagnostiqueur != null) {
			this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;
			this.updateFieldValue(this.SirenDPESubject, this.SirenDPE);
		}
		else {
			this.updateFieldValue(this.SirenDPESubject, " ");
		}



		this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
		this.updateFieldValue(this.numeroDpeAdemeSubject, this.numeroDpeAdeme);





	}
