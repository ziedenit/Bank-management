merci cette méthoe a bien fonctionné pour moi    // Écoute des changements pour chaque champ du formulaire
    this.formGroup.get('numeroNomRue').valueChanges.subscribe(value => {
      this.extractedInitialFinancement.objetFinancement[index].bien.numeroNomRue = value;
  });

  this.formGroup.get('codePostal').valueChanges.subscribe(value => {
      this.extractedInitialFinancement.objetFinancement[index].bien.codePostal = value;
  });

  this.formGroup.get('ville').valueChanges.subscribe(value => {
      this.extractedInitialFinancement.objetFinancement[index].bien.nomCommune = value;
  });

  this.formGroup.get('dateDiangnostique').valueChanges.subscribe(value => {
      if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
          this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.dateEtablissementDpe = value;
      }
  });

  this.formGroup.get('anneeConstruction').valueChanges.subscribe(value => {
      this.extractedInitialFinancement.objetFinancement[index].bien.anneeConstruction = value;
  });

  this.formGroup.get('typeBatiment').valueChanges.subscribe(value => {
      this.extractedInitialFinancement.objetFinancement[index].bien.typeBatiment = value;
  });

  this.formGroup.get('lettreCEP').valueChanges.subscribe(value => {
      if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
          this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.classeCep = value;
      }
  });

  this.formGroup.get('lettreGES').valueChanges.subscribe(value => {
      if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
          this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.classeGes = value;
      }
  });

  this.formGroup.get('surfaceBien').valueChanges.subscribe(value => {
      this.extractedInitialFinancement.objetFinancement[index].bien.surfaceBien = value;
  });

  this.formGroup.get('valeurCep').valueChanges.subscribe(value => {
      if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
          this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.estimationCep = value;
      }
  });

  this.formGroup.get('valeurGes').valueChanges.subscribe(value => {
      if (this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel) {
          this.extractedInitialFinancement.objetFinancement[index].bien.dpeActuel.estimationGes = value;
      }
  });

  this.formGroup.get('energieType').valueChanges.subscribe(value => {
      this.extractedInitialFinancement.objetFinancement[index].bien.typeEnergie = value;
  });

//
maintenant je veux mettre // Écoute des changements pour chaque champs ci bas (this.objetFinance,this.selectedType,   this.hideFieldForm,this.selectedNatBatiment,this.codeBatimentSelected, this.partLcl, this.montantLclFinance,this.prixAquisitionBien, this.SirenDPE,  this.numeroDpeAdeme,this.normeThermique)
private setObjetFinancementProperties(objetFinancement: any): void {
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
        this.alignementResultText = this.alignementMapping[objetFinancement.alignement.topAlignement];}
}
