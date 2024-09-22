<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" class="breadcrumb-nav" >
    <ol class="breadcrumb-custom" >
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index" >
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
         <span>Objet de financement</span>  {{ i + 1 }}
        </a>
        <button class="close-btn" *ngIf="showDeleteIcon && manuallyAddedIndices.includes(i)"(click)="removeBreadcrumbItem(i)">x</button>
      </li>
    </ol>
    <div class="button-container" >
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()"  [disabled]="ajoutFinancementDisabled " title="Merci de calculer l'alignement pour chaque objet ajouté à la liste" >Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
</div>
//
	  	onBreadcrumbClick(index: number ) {

		this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);  // Sauvegarder les données de l'objet actuel
		this.selectedObjetIndex = index;  // Mettre à jour l'index de l'objet sélectionné
		
			// Restituer le texte d'alignement sauvegardé
			if (this.extractedInitialFinancement.objetFinancement[index].alignementXtraResult||this.extractedInitialFinancement.objetFinancement[index].alignementXtraResult!='') {
				this.alignementResultText = this.extractedInitialFinancement.objetFinancement[index].alignementXtraResult;
				console.log("resultat du alignement a afficher apres click sur objet index ",index,this.alignementResultText)
			}
		
		this.depExist=false;
		if(this.clickCalulAlignObject.has(index))
		{
		this.showBlocResult=true;
	    }

		

	this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);  // Charger les données du nouvel objet sélectionné
	this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);  // Initialiser le formulaire avec les données du nouvel objet

	

	// Appliquer les règles métiers sur l'élément sélectionné
	this.checkPiecesJustificatives(this.extractedInitialFinancement, this.selectedObjetIndex);
	console.log("Vérification des champs montant finance LCL et part LCL : ", this.montantLclFinance, this.partLcl);
	this.checkFormFieldsFormGroup();
}
//
  ajouterObjetFinancement() {
	
	

	

	// Réinitialisation des bordures d'erreur (en cas de persistance après reset)
	const fieldsToClear = ['prixAquisitionBien', 'montantLclFinance', 'partLcl', 'numeroDpeAdeme', 'SirenDPE','natureBien','categorieBatiment'];
	fieldsToClear.forEach(field => {
		const element = document.getElementById(field);
		if (element) {
			element.style.removeProperty('border');
		}
	});
    // Réinitialisation des variables et de l'état
	this.isValid=null;
	this.SirenDPE='';
    this.isDateDepotChecked = false;
    this.isNormeThermiqueChecked = false;
    this.isDpeChecked = false;
    this.showBlocResult = false;
    this.showDeleteIcon = true;
    this.showFileAriane = true;
 
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
		alignementXtraResult:''
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
					console.log("this.newIndex ", this.newIndex )
					if(this.newIndex==1)
					{
					this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[0]);
					}
                    this.selectedObjetIndex = this.objetsFinancements.length - 1;
                    this.ajoutFinancementDisabled = true;

                   this.setObjetFinancementData(nouvelObjet);
				 
                    console.log("Nouvel objet ajouté", nouvelObjet);
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
	

	



} je veux a chaque fois ou je mets sur un objet soit en cliquant sur ajouterObjetFinancement pour ajouter un nouveau objet du fil ou en cliquant sur onBreadcrumbClick pour se positionner sur un objet du fil je veux coloer en bleu foncé l'element du fil en html sur l'ecran comme quoi il est selectionné pour etre clair au l'utilisateur 
