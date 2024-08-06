<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb-custom"   *ngIf="showFileAriane==true">
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index">
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
         <span>Objet de financement</span>  {{ i + 1 }}
        </a>
        <button class="close-btn" (click)="removeBreadcrumbItem(i)">x</button>
      </li>
    </ol>
    <div class="button-container" >
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
</div>
	  ajouterObjetFinancement() {
	this.showDeleteIcon =true;
	this.showFileAriane = true;
	const nouvelObjet: ObjetFinancement = {
	  idObjetFinancement: "",
	  codeObjetFinancement: "",
	  quotePartObjet: null,
	  gainCEP: null,
	  dateFinTravaux: null,
	  bien: new Bien(),
	  dpeAvantTravaux: new Dpe(),
	  dpeApresTravaux: new Dpe(),
	  alignement: new Alignement(),
	  eligibilite: new Eligibilite(),
	  piecesJustificatives: [],
	  codeFamilleObjet: "",
	  garantie: [],
	  firstDisconnectionOfd: false,
	};
   
	this.idGeneratorService.generateIdObjetFinancement().subscribe(
	  id => {
		nouvelObjet.idObjetFinancement = id;
		this.objetsFinancements.push(nouvelObjet);
		this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
	  },
	  error => {
		console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
	  }
	);
	
  }
	
	ngOnInit(): void {
	this.showFileAriane=false;
    this.id = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];
  
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
    this.extractedInitialFinancement=responseFinancement;
        this.mapFinancementData(responseFinancement);
		this.mapObjetFinancementData(responseFinancement.objetFinancement[0]);
        this.setObjetFinancementProperties(responseFinancement.objetFinancement[0]);
     this.checkRequiredFields(responseFinancement.objetFinancement[0]);
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

	
    if (this.Url_Retour_Base64) {this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);}
    this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
      this.objetsFinancements = objets;
	  this.showDeleteIcon=false;
	  this.sizeStoredObject=this.objetsFinancements.length;
	  console.log( "this.sizeStoredObject")
	  console.log(this.sizeStoredObject)
	  if(this.objetsFinancements.length>1)
	  {
		this.showFileAriane=true;
	  }
    });
}
j'ai ce bouton  <button class="close-btn" *ngIf="showDeleteIcon==true&& i>sizeStoredObject"(click)="removeBreadcrumbItem(i)">x</button>
    que je dois l'afficher uniquement si l'objet qui est dans la file est ajouter via le click sur a ajouter c'est a dire non restitué dans cette partie   if (this.Url_Retour_Base64) {this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);}
    this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
      this.objetsFinancements = objets;
	  this.showDeleteIcon=false;
	  this.sizeStoredObject=this.objetsFinancements.length;
	  console.log( "this.sizeStoredObject")
	  console.log(this.sizeStoredObject)
	  if(this.objetsFinancements.length>1)
	  {
		this.showFileAriane=true;
	  }
    });
