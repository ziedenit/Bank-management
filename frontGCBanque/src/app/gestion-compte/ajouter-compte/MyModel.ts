 onBreadcrumbClick(index: number ) {
			this.selectedObjetIndex=index;
		
       this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
       this.mapFinancementDataMultiOfd(this.extractedInitialFinancement,index)
			this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien,index); 
      this.setFinancementDataOnScreenMultiOfd(this.extractedInitialFinancement,index)
			this.depExist=true; 
		  }

j'appel cette fonction en clickant sur un element de fil ariane pour triter un ensemble d'objet financement en se basant sur l'index j'applique la métthode dedant   this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
sur les champs traité à l'interieur de cette méthode je veux mettre de ecouteur pour sauvgarder les changement sur le valeur
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

// ecouteur sur les champs pour detecter et sauvgarder les changements sur l'objet lors de changement d'un element a un  autre du fil ariane

      }
par anologie comme ici mais sauf que ici je traite un formgroup
private setupFormGroup(bien: any , index:number): void {
    if (!bien) return;
    this.formGroup = this.fb.group({
        numeroNomRue: [bien.numeroNomRue || null],
        codePostal: [bien.codePostal || null],
        ville: [bien.nomCommune || null],
        dateDiangnostique: [bien.dpeActuel?.dateEtablissementDpe?.toString().substring(0, 10) || null],
        anneeConstruction: [bien.anneeConstruction || null],
        typeBatiment: [bien.typeBatiment || null],
        lettreCEP: [bien.dpeActuel?.classeCep || null],
        lettreGES: [bien.dpeActuel?.classeGes || null],
        surfaceBien: [bien.surfaceBien || null],
        valeurCep: [bien.dpeActuel?.estimationCep || null],
        valeurGes: [bien.dpeActuel?.estimationGes || null],
		energieType:[bien.typeEnergie || null]
    });

    // Écoute des changements pour chaque champ du formulaire
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
}
