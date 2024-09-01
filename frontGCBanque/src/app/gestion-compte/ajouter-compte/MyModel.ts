j'ai ajouter une fonction sur le click button calculAlignementObjet
  <div class="container-fluid" >
        <div class=footer>
        <div class="ButtonsFooter" style="display: flex; justify-content: flex-end" >
        <button (click)="calculAlignementObjet()"   mat-raised-button color="primary" [disabled]="selectedType!='option1'">Calculer</button>
         &nbsp; 
       <button  mat-raised-button color="primary"  (click)="postContinuer()" >Continuer</button>
      </div>
      </div>           
</div>


	  calculAlignementObjet()
	  {
			   // fonction a developper pour calcul alignement et preparation contexte patch
			   this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
			  console.log("objet a traiter et alignement a calculer")
			  console.log(this.selectedObjetIndex)
			  console.log(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
			  this.ajoutFinancementDisabled=false;
			
  
	  }
j'ai un ensemble d'objet en fil 
  ajouterObjetFinancement() {
	  
    this.showDeleteIcon =true;
    this.showFileAriane = true;
    const nouvelObjet: ObjetFinancement = {
      idObjetFinancement: null,
      codeObjetFinancement: "02",
      quotePartObjet: null,
      gainCEP: null,
      dateFinTravaux: null,
      bien: new Bien(),
      dpeAvantTravaux: new Dpe(),
      dpeApresTravaux: new Dpe(),
      alignement: Alignement.createDefault(),
      eligibilite: new Eligibilite(),
      piecesJustificatives: [],
      codeFamilleObjet: "01",
      garantie: [],
     firstDisconnectionOfd: true,
     
    };
	
    this.idGeneratorService.generateIdObjetFinancement().subscribe(
      id => {
      nouvelObjet.idObjetFinancement = id;
      this.objetsFinancements.push(nouvelObjet);
	  console.log("nouveau objet initilisé et cree lors de click sur le button")
	  console.log(nouvelObjet)
	 this.ajoutFinancementDisabled=true;
      this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
      this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
	  this.newIndex=this.objetsFinancements.length - 1;
      console.log("le financement apres recupération et ajout des objets")
      console.log(this.extractedInitialFinancement)
	
      },
      error => {
      console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
	  this.ajoutFinancementDisabled=false;
      }
	  
    );
	console.log("Financement apres ajout des objets")
	console.log(this.extractedInitialFinancement)
    
    }
a chaque fois ou je click sur le button ajouter a coté de la fil ariane je dois retablir le button griser (ajoutFinancementDisabled)s'il s'agit uniquement de onBreadcrumbClick sur le dernier element ajouter (  ayant l'indice newIndex )
<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" class="breadcrumb-nav" >
    <ol class="breadcrumb-custom">
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index" >
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
         <span>Objet de financement</span>  {{ i + 1 }}
        </a>
        <button class="close-btn" *ngIf="showDeleteIcon && manuallyAddedIndices.includes(i)"(click)="removeBreadcrumbItem(i)">x</button>
      </li>
    </ol>
    <div class="button-container" >
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()"  [disabled]="ajoutFinancementDisabled" title="Merci de calculer l'alignement pour chaque objet ajouté à la liste" >Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
</div>
  
	onBreadcrumbClick(index: number ) {
		// sauvgarde des données  propres à un selectionné objet du fil Ariane 
       this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
	
	   console.log("selectedObjetIndex")
	   console.log(this.selectedObjetIndex)
	   this.selectedObjetIndex=index;
	   // Appliquer les regles metier sur l'element selectionné du fil Ariane a revoir l'adaptation
		this.setFinancementData(this.extractedInitialFinancement);
        this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);
        this.checkRequiredFields(this.extractedInitialFinancement,index);
		this.checkPiecesJustificatives(this.extractedInitialFinancement,index);
        this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
		
		   this.depExist=true; 
			console.log("Contenance du financement actuel")
			console.log(this.extractedInitialFinancement)
			
		  }
		  removeBreadcrumbItem(index: number) {
			this.objetsFinancements.splice(index, 1);
			if(this.objetsFinancements.length===1)
				{
					this.ajoutFinancementDisabled=false;
				}
			this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
		  }

      private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
        if (!currentObject || !currentObject.bien) return;
        const bien = currentObject.bien;
    // verification existance dpeActuel si non initilisation 
    if (!bien.dpeActuel) {
        bien.dpeActuel = new Dpe();
    }
		const dpeActuel =currentObject.bien.dpeActuel;
        bien.partLCL = this.partLcl;
        bien.montantFinanceLCL = this.montantLclFinance;
        bien.prixBien = this.prixAquisitionBien;
        bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
      bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique); 
        bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
        bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;
		bien.etatBien=this.getCodeEtatBien(this.selectedNatBatiment)
	    bien.codeBatiment=this.getCodeEtatBatiment(this.codeBatimentSelected) 
	
      }
