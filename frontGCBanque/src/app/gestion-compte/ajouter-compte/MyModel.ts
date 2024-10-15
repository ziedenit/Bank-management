<div class="col-lg-3 col-md-6"   [hidden]="hideField==true" [hidden]="hideFieldCEP==true">
<label for="LettreCEP" class="champs dpeLabel">Lettre CEP <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
<input type="text" id="LettreCEP" formControlName="lettreCEP" name="LettreCEP"  class="form-control">             
</div>
	  <div class="col-lg-3 col-md-6"  [hidden]="hideField==false" [hidden]="hideFieldCEP==false" >
                        <label class="champs dpeLabel" >Lettre CEP
                        <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
                        <select id="LettreCEPlist" name="LettreCEPlist"  formControlName="lettreCEP" class="form-control"  >
                          <option value='option0' > </option>
                          <option value='option1' >A</option>
                          <option value='option2' >B </option>
                          <option value='option3' >C </option>
                          <option value='option4' >D</option>
                          <option value='option5' >E</option>
                          <option value='option6' >F </option>
                          <option value='option7' >G</option> 
                        </select> 
                      </div>
////::::::::
ngOnInit(): void {


		this.id = this.route.snapshot.queryParams["idFinancement"];
		this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];
		if (this.Url_Retour_Base64) {
			this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
		}
		else {
			console.warn("Url_Retour_Base64 est falsy. Impossible de le convertir en Utf8.");
		}
		if (!this.id) {

			this.router.navigate(['/page-erreur'], { queryParams: { urlRetour: this.Url_Retour_Utf8 } });
			return;
		}

		this.financementService.getFinancementbyId(this.id).pipe(
			catchError(err => {
				console.error('Erreur lors de la récupération du financement:', err);
				this.router.navigate(['/page-erreur'], { queryParams: { urlRetour: this.Url_Retour_Utf8 } });
				return of(null);
			})
		).subscribe(responseFinancement => {
			this.extractedInitialFinancement = responseFinancement;

			this.setFinancementData(responseFinancement);
			this.setObjetFinancementData(responseFinancement.objetFinancement[0]);
			this.checkRequiredFields(responseFinancement, 0);
			this.checkPiecesJustificatif(responseFinancement, 0);
			this.setupFormGroup(responseFinancement.objetFinancement[0].bien);
			if (responseFinancement.objetFinancement[0].firstDisconnectionOfd == false) {
				this.checkFormFieldsFormGroup();
			}

			this.formGroup.get('lettreCEP').valueChanges.subscribe(() => {
				this.recalculerAlignment();
			});
			this.formGroup.get('valeurCep').valueChanges.subscribe(() => {
				this.recalculerAlignment();
			});
			this.formGroup.get('anneeConstruction').valueChanges.subscribe(() => {
				this.recalculerAlignment();
			});

		});


		// Récupérer la liste des objets de financement
		this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
			this.objetsFinancements = objets;
			this.showDeleteIcon = false;

			// Si plusieurs objets, afficher le fil d'Ariane
			if (this.objetsFinancements.length > 1) {
				this.ajoutFinancementDisabled = false;
				this.showFileAriane = true;
				
			}
			

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
//////////////////
onBreadcrumbClick(index: number) {
		this.hideField=false;
		
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




		this.depExist = true;








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


	}
//
private saveCurrentObjectValues(currentObject: ObjetFinancement): void {

		
		console.log("currentObject",currentObject)
		if (!currentObject || !currentObject.bien) return;
		const bien = currentObject.bien;
        
		

		if (!bien.dpeActuel) {
			bien.dpeActuel = this.createNewDpe();
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

		bien.etatBien = this.selectedNatBatiment === 'option2' ? "Neuf" :
                this.selectedNatBatiment === 'option1' ? "Ancien" : null,
		bien.codeBatiment = this.codeBatimentOptionMapping[this.codeBatimentSelected];

        if(bien.dpeActuel)
		{
		console.log("mise a jour des valeurs du formgroup")
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

		bien.dpeActuel.classeCep = (this.hideField || this.hideFieldCEP) ? this.lettreCepMapping[this.formGroup.get('lettreCEP').value] || null : this.formGroup.get('lettreCEP').value,
		bien.dpeActuel.classeGes = (this.hideField || this.hideFieldGES) ? this.lettreCepMapping[this.formGroup.get('lettreGES').value] || null  : this.formGroup.get('lettreGES').value;
		console.log("bien.dpeActuel.classeCep",bien.dpeActuel.classeCep)

		bien.typeEnergie = this.formGroup.get('energieType').value;
		
		}
	
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
//
private setObjetFinancementData(objetFinancement: ObjetFinancement): void {
		this.idObjetFinancement = objetFinancement.idObjetFinancement;
		this.familleObjet = objetFinancement.codeFamilleObjet;
		this.typeObjetFinancement = objetFinancement.codeObjetFinancement;
		this.isfirstDebranchement = objetFinancement.firstDisconnectionOfd;
		if (this.isfirstDebranchement ) {
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
			this.updateFieldValue(this.SirenDPESubject, null);
		}



		this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
		this.updateFieldValue(this.numeroDpeAdemeSubject, this.numeroDpeAdeme);





	}
//
showAdemeResult(numeroDpeAdeme: string) {
		this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);
		this.depExist = true;
		this.anneeConstObligatoire = false;
		if (String(numeroDpeAdeme).length !== 13) {
			this.message = 'Le champ N° du DPE doit contenir exactement 13 caractères';
			this.hideField = true;
			this.formGroup = this.fb.group({
				numeroNomRue: [''],
				codePostal: [''],
				ville: [''],
				dateDiangnostique: [null],
				dateFinValidite: [null],
				anneeConstruction: [null],
				typeBatiment: [null],
				lettreCEP: ['option0'],
				lettreGES: ['option0'],
				surfaceBien: [null],
				valeurCep: [null],
				valeurGes: [null],
				energieType: [null],
			});
		}
		else {
			this.financementService.getDpeAdeme(this.numeroDpeAdeme).subscribe(
				(data) => {
					this.message = '';
					this.dpeAdeme = data;


					if (this.dpeAdeme['Etiquette_DPE'] == null && this.dpeAdeme['classe_consommation_energie'] == null) { this.hideFieldCEP = true } else { this.hideFieldCEP = false }

					if (this.dpeAdeme['Etiquette_GES'] == null && this.dpeAdeme['classe_estimation_ges'] == null) { this.hideFieldGES = true } else { this.hideFieldGES = false }

					if (this.dpeAdeme['N°_DPE_remplacé'] && this.dpeAdeme['N°_DPE_remplacé'] == this.numeroDpeAdeme) { this.dpeRemplace = true; }

					this.dpeExisteAdeme = true;
					this.dateReceptionDpe = this.dpeAdeme['Date_réception_DPE'] ? this.dpeAdeme['Date_réception_DPE'] :
						this.dpeAdeme['date_reception_dpe'] ? this.dpeAdeme['date_reception_dpe'] : null;

					this.codeDepartement = this.dpeAdeme['N°_département_(BAN)'] ? this.dpeAdeme['N°_département_(BAN)'] : '';
					this.codeInseeCommune = this.dpeAdeme['Code_INSEE_(BAN)'] ? this.dpeAdeme['Code_INSEE_(BAN)'] :
						this.dpeAdeme['code_insee_commune'] ? this.dpeAdeme['code_insee_commune'] : '';
					this.periodeConstruction = this.dpeAdeme['Période_construction'] ? this.dpeAdeme['Période_construction'] : '';
					this.coordonneeCartographiqueX = this.dpeAdeme['Coordonnée_cartographique_X_(BAN)'] ? this.dpeAdeme['Coordonnée_cartographique_X_(BAN)'] : '';
					this.coordonneeCartographiqueY = this.dpeAdeme['Coordonnée_cartographique_Y_(BAN)'] ? this.dpeAdeme['Coordonnée_cartographique_Y_(BAN)'] : '';

					this.anneeConstObligatoire = false;
					this.lettreCpeObligatoire = false;
					this.lettreGesObligatoire = false;
					this.valGesObligatoire = false;
					this.valCepObligatoire = false;
					this.surfaceObligatoire = false;
					this.hideField = false;
					this.contextAdress = true;
					this.anneeConst = this.dpeAdeme['Année_construction'] ? this.dpeAdeme['Année_construction'] : this.dpeAdeme['annee_construction'] ? this.dpeAdeme['annee_construction'] : null;
					if (this.anneeConst && this.anneeConst < 1700) { this.anneeConst = null }

					this.formGroup = this.fb.group({
						numeroNomRue: (this.dpeAdeme['N°_voie_(BAN)'] ? this.dpeAdeme['N°_voie_(BAN)'] :
							this.dpeAdeme['numero_rue'] ? this.dpeAdeme['numero_rue'] : '')
							+ ' ' + (this.dpeAdeme['Nom__rue_(BAN)'] ? this.dpeAdeme['Nom__rue_(BAN)'] :
								this.dpeAdeme['nom_rue'] ? this.dpeAdeme['nom_rue'] : ''),

						codePostal: this.dpeAdeme['Code_postal_(BAN)'] ? this.dpeAdeme['Code_postal_(BAN)'] : this.dpeAdeme['code_postal'] ? this.dpeAdeme['code_postal'] : '',
						ville: this.dpeAdeme['Nom__commune_(BAN)'] ? this.dpeAdeme['Nom__commune_(BAN)'] : this.dpeAdeme['commune'] ? this.dpeAdeme['commune'] : '',
						dateDiangnostique: this.dpeAdeme['Date_établissement_DPE'] ? this.dpeAdeme['Date_établissement_DPE'].toString().substring(0, 10) :
							this.dpeAdeme['date_etablissement_dpe'] ? this.dpeAdeme['date_etablissement_dpe'].toString().substring(0, 10) : '',

						dateFinValidite: this.dpeAdeme['Date_fin_validité_DPE'] ? this.dpeAdeme['Date_fin_validité_DPE'].toString().substring(0, 10) :
							this.dpeAdeme['Date_fin_validité_DPE'] ? this.dpeAdeme['Date_fin_validité_DPE'].toString().substring(0, 10) : '',


						anneeConstruction: this.anneeConst,

						typeBatiment: this.dpeAdeme['Type_bâtiment'] ? this.dpeAdeme['Type_bâtiment'] : null,

						lettreCEP: this.dpeAdeme['Etiquette_DPE'] ? this.dpeAdeme['Etiquette_DPE'] :
							this.dpeAdeme['classe_consommation_energie'] ? this.dpeAdeme['classe_consommation_energie'] : null,

						lettreGES: this.dpeAdeme['Etiquette_GES'] ? this.dpeAdeme['Etiquette_GES'] :
							this.dpeAdeme['classe_estimation_ges'] ? this.dpeAdeme['classe_estimation_ges'] : null,

						surfaceBien: this.dpeAdeme['Surface_habitable_logement'] ? this.dpeAdeme['Surface_habitable_logement']
							: this.dpeAdeme['Surface_utile'] ? this.dpeAdeme['Surface_utile']
								: this.dpeAdeme['surface_habitable'] ? this.dpeAdeme['surface_habitable'] : '',

						valeurCep: this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] ? this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] :
							this.dpeAdeme['Conso_kWhep/m²/an'] ? this.dpeAdeme['Conso_kWhep/m²/an'] :
								this.dpeAdeme['consommation_energie'] ? this.dpeAdeme['consommation_energie'] : '',

						valeurGes: this.dpeAdeme['Emission_GES_5_usages_par_m²'] ? this.dpeAdeme['Emission_GES_5_usages_par_m²'] :
							this.dpeAdeme['Emission_GES_kgCO2/m²/an'] ? this.dpeAdeme['Emission_GES_kgCO2/m²/an'] :
								this.dpeAdeme['estimation_ges'] ? this.dpeAdeme['estimation_ges'] : '',

						energieType: this.dpeAdeme['Type_énergie_n°1'] ? this.dpeAdeme['Type_énergie_n°1'] : null
					});


					// mise a jour des données dpe lors de l'appel a l'ademe pour un objet selectionée du fil ariane

					this.updateDpeObjectAdemeValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex],

						this.dpeAdeme['Surface_habitable_logement'] ? this.dpeAdeme['Surface_habitable_logement']
							: this.dpeAdeme['Surface_utile'] ? this.dpeAdeme['Surface_utile']
								: this.dpeAdeme['surface_habitable'] ? this.dpeAdeme['surface_habitable'] : '',

						this.dpeAdeme['Année_construction'] ? this.dpeAdeme['Année_construction'] : this.dpeAdeme['annee_construction'] ? this.dpeAdeme['annee_construction'] : null,


						this.dpeAdeme['Etiquette_DPE'] ? this.dpeAdeme['Etiquette_DPE'] :
							this.dpeAdeme['classe_consommation_energie'] ? this.dpeAdeme['classe_consommation_energie'] : null,


						this.dpeAdeme['Etiquette_GES'] ? this.dpeAdeme['Etiquette_GES'] :
							this.dpeAdeme['classe_estimation_ges'] ? this.dpeAdeme['classe_estimation_ges'] : null,


						this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] ? this.dpeAdeme['Conso_5_usages_par_m²_é_primaire'] :
							this.dpeAdeme['Conso_kWhep/m²/an'] ? this.dpeAdeme['Conso_kWhep/m²/an'] :
								this.dpeAdeme['consommation_energie'] ? this.dpeAdeme['consommation_energie'] : '',



						this.dpeAdeme['Emission_GES_5_usages_par_m²'] ? this.dpeAdeme['Emission_GES_5_usages_par_m²'] :
							this.dpeAdeme['Emission_GES_kgCO2/m²/an'] ? this.dpeAdeme['Emission_GES_kgCO2/m²/an'] :
								this.dpeAdeme['estimation_ges'] ? this.dpeAdeme['estimation_ges'] : '',


						this.dpeAdeme['Type_énergie_n°1'] ? this.dpeAdeme['Type_énergie_n°1'] : null,

						this.dpeAdeme['Date_établissement_DPE'] ? this.dpeAdeme['Date_établissement_DPE'].toString().substring(0, 10) :
							this.dpeAdeme['date_etablissement_dpe'] ? this.dpeAdeme['date_etablissement_dpe'].toString().substring(0, 10) : '',

						this.dpeAdeme['Code_postal_(BAN)'] ? this.dpeAdeme['Code_postal_(BAN)'] : this.dpeAdeme['code_postal'] ? this.dpeAdeme['code_postal'] : '',

						this.dpeAdeme['N°_voie_(BAN)'] ? this.dpeAdeme['N°_voie_(BAN)'] :
							this.dpeAdeme['numero_rue'] ? this.dpeAdeme['numero_rue'] : ''
								+ ' ' + this.dpeAdeme['Nom__rue_(BAN)'] ? this.dpeAdeme['Nom__rue_(BAN)'] :
								this.dpeAdeme['nom_rue'] ? this.dpeAdeme['nom_rue'] : '',

						this.dpeAdeme['Nom__commune_(BAN)'] ? this.dpeAdeme['Nom__commune_(BAN)'] : this.dpeAdeme['commune'] ? this.dpeAdeme['commune'] : '',

						this.dpeAdeme['Type_bâtiment'] ? this.dpeAdeme['Type_bâtiment'] : null,

						this.dpeAdeme['Date_fin_validité_DPE'] ? this.dpeAdeme['Date_fin_validité_DPE'].toString().substring(0, 10) :
							this.dpeAdeme['Date_fin_validité_DPE'] ? this.dpeAdeme['Date_fin_validité_DPE'].toString().substring(0, 10) : '');

					if (this.dpeRemplace) {
						this.openDialog()
					}
					this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue => { this.searchAddress(); });
					this.formGroup.get('codePostal').valueChanges.subscribe(codePostal => { this.searchAddress(); });
					this.formGroup.get('ville').valueChanges.subscribe(ville => { this.searchAddress(); });
				},
				(errorP) => {
					this.hideField = true;
					this.contextAdress = true;
					this.message = 'DPE introuvable dans l\'ADEME';
					this.formGroup = this.fb.group({
						numeroNomRue: [''],
						codePostal: [''],
						ville: [''],
						dateDiangnostique: [null],
						dateFinValidite: [null],
						anneeConstruction: [null],
						lettreCEP: ['option0'],
						lettreGES: ['option0'],
						surfaceBien: [null],
						valeurCep: [null],
						valeurGes: [null],
						energieType: [null],

					});
					this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue => { this.searchAddress(); });
					this.formGroup.get('codePostal').valueChanges.subscribe(codePostal => { this.searchAddress(); });
					this.formGroup.get('ville').valueChanges.subscribe(ville => { this.searchAddress(); });
				});
		}

		this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue => { this.searchAddress(); });
		this.formGroup.get('codePostal').valueChanges.subscribe(codePostal => { this.searchAddress(); });
		this.formGroup.get('ville').valueChanges.subscribe(ville => { this.searchAddress(); });
	}
//
showAlignement(index: number): void {
		this.resetAlertDisplay();
		this.postDisabled = false;
		this.checkFormFieldsFormGroup();
		this.showBlocResult = true;
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

		this.extractedInitialFinancement.objetFinancement[index].firstDisconnectionOfd = false;
	}
j'ai mon composnant anular je saisie  les lettre CEP et GES et j'appel la méthode showAlignement pour calculer un fois le calul est fait j'ajoute un deuixme objet de la fil
	je peux sois appeler ademe par la methode showAdeme soit non je revient sur le premier en cliquant sur onBread..
	je perd le mapping de ma liste CEP  et GES problement a cause du champs hidefield pouvez vous m'aider svp je veux que chaque valeur de la liste que j'introduit apres calcul en appelant showAlinement et en ajoutant un autre objet et je revient sur le precedent je veuw que  je trouve l'anciene valeur dans la liste 

