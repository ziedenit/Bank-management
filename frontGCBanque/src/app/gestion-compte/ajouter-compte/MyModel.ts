 onBreadcrumbClick(index: number , currentObjet : any) {
			this.updateCurrentObjetData();
			this.selectedObjetIndex = index;
			this.depExist=true;
        this.mapFinancementData(this.extractedInitialFinancement);
        this.setObjetFinancementProperties(currentObjet);
		this.traiterPiecesJustificatives(this.extractedInitialFinancement);
        this.setFinancementDataOnScreen(this.extractedInitialFinancement);
        this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
		this.checkRequiredFields(this.extractedInitialFinancement);
			console.log("l'objet selectionnée est ")
			console.log(this.objetsFinancements[index])
			console.log("la liste des objets actuel est de taille", this.objetsFinancements.length)
			console.log(this.objetsFinancements);
			this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
			console.log("financement a patcher avec les valeurs actuels mis a jour", this.extractedInitialFinancement)

		  }
ajouterObjetFinancement() {
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
		this.extractedInitialFinancement.objetFinancement.push(nouvelObjet);
	  },
	  error => {
		console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
	  }
	);
  }
j'ai un probleme sur le button ajouter <div class="button-container" >
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  en cliquant la premiere fois sur le button ca ajouter un seul element de la fil ariane mais en clicnt un fois sur le premier objet et en recliquant ca ajoute deux objets au lieu d'un seul<div class="container-fluid">
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
