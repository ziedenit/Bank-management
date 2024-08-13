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
//
private setupFormGroup(bien: any): void {
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
}
//
private mapFinancementDataMultiOfd(responseFinancement: any,index:number): void {
	this.idObjetFinancement = responseFinancement.objetFinancement[index].idObjetFinancement;
	this.idRepers=responseFinancement.intervenant.idReper;
	this.codeApplicatifOrigine=responseFinancement.codeApplicatifOrigine;
	this.familleObjet=responseFinancement.objetFinancement[index].codeFamilleObjet;
	this.typeObjetFinancement=responseFinancement.objetFinancement[index].codeObjetFinancement;
	this.agenceCompte=responseFinancement.agenceCompte;		
	this.isfirstDebranchement = responseFinancement.objetFinancement[index].firstDisconnectionOfd;
	this.selectedFamilleObjet = this.familleObjet === "01" ? "option1" : this.familleObjet === "05" ? "option4" : "option0" ;
}

// j'ai une fonction permettant de restituer en cliquant sur chaque objet je veux faire le controle sue les champs appelé daans les trois fonction ci dessous 
je veux que chaque changement soit detecté une fois je chanque un objet fu fil ariane 
 onBreadcrumbClick(index: number ) {
			this.selectedObjetIndex=index;
			 // Appliquer les regles metier sur l'element selectionné du fil Ariane a revoir l'adaptation?
       this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
       this.mapFinancementDataMultiOfd(this.extractedInitialFinancement,index)
			this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien); 
      this.setFinancementDataOnScreenMultiOfd(this.extractedInitialFinancement,index)
			this.depExist=true; 
		  } 
ca c'est comment je recupere les objet financement et je les stocke dans une liste
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];

    if (this.Url_Retour_Base64) {this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);}
	
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
      this.extractedInitialFinancement = responseFinancement;
		console.log("le financement récupéré de la BDD est:",responseFinancement )
		
        this.mapFinancementData(responseFinancement);
        this.setObjetFinancementProperties(responseFinancement.objetFinancement[0]);
        this.checkRequiredFields(responseFinancement);
		this.traiterPiecesJustificatives(responseFinancement);
        this.setFinancementDataOnScreen(responseFinancement);
        this.setupFormGroup(responseFinancement.objetFinancement[0].bien);

		this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
			{	this.searchAddress();});
		this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
			{	this.searchAddress();});
		this.formGroup.get('ville').valueChanges.subscribe(ville=>
			{	this.searchAddress();});
    });

    // Récupérer la liste des objets de financement
    this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
      this.objetsFinancements = objets;
      this.showDeleteIcon = false;

      // Si plusieurs objets, afficher le fil d'Ariane
      if (this.objetsFinancements.length > 1) {
          this.showFileAriane = true;
      }
      console.log("les objets recupérés")
      console.log(this.objetsFinancements)
  });
}
merci de l'aider a adapter le code pour detecter les changement qui seront par la suite mis a jour dans this.extractedInitialFinancement.objetFinancement ( dans le tableau objetFinancement de l'objet extractedInitialFinancement)
