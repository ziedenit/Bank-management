ngOnInit(): void {
	this.showFileAriane=false;
	this.id = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];

    if (this.Url_Retour_Base64) {this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);}
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
		console.log("le financement récupéré de la BDD est:",responseFinancement )
		this.extractedInitialFinancement=responseFinancement;
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

	
   
    this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
      this.objetsFinancements = objets;
	  this.showDeleteIcon=false;
	 // faire appel au méthode des regles meties et appliquer ca sur l'enselmble des objet du financement on passant l'index 
	 //    this.mapFinancementData(responseFinancement);
	 //this.setObjetFinancementProperties(responseFinancement.objetFinancement[index]);
	/*  this.checkRequiredFields(responseFinancement);
	 this.traiterPiecesJustificatives(responseFinancement);
	 this.setFinancementDataOnScreen(responseFinancement);
	 this.setupFormGroup(responseFinancement.objetFinancement[index]].bien); */
	 // 
	  if(this.objetsFinancements.length>1)
	  {
		this.showFileAriane=true;
	  }
    });
}
j'ai ce traitement dans le ngOnit lors du deuxieme subsribe je recupere la listobjetfinancement et je veux pour chaque objet de objet financement faire les appels suivant 
  //    this.mapFinancementData(responseFinancement);
	 //this.setObjetFinancementProperties(responseFinancement.objetFinancement[index]);
	/*  this.checkRequiredFields(responseFinancement);
	 this.traiterPiecesJustificatives(responseFinancement);
	 this.setFinancementDataOnScreen(responseFinancement);
	 this.setupFormGroup(responseFinancement.objetFinancement[index]].bien); */
mais a la place de responseFinancement c'est le this.extractedInitialFinancement a laquel je dois affecter la liste des objet recuprer     this.objetsFinancements et aussi looper sur la la liste et faire les appel suivant pour chaque objet de la liste example (index)
