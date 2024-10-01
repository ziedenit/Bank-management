recalculerAlignment(): void {
			if (!this.alertDisplayed) { // Vérifier si l'alerte n'a pas encore été affichée
			  alert("Merci de recalculer l'alignement suite à ce changement.");
			  // Ou utilisez un pop-up personnalisé ici si vous le souhaitez
			  this.alertDisplayed = true; // Mettre à jour le drapeau pour éviter les futurs affichages
			}
		  }
//
<div class="row">
        <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">   
          <div class="form-group " *ngIf="hideFieldForm==false">
            <div class="custom-label">
            <label for="categorieBatiment" > Nature du bien</label>&nbsp;<span class="required">*</span>
            <select class="form-control form-control-sm"  [(ngModel)]="codeBatimentSelected" id="categorieBatiment" (ngModelChange)="recalculerAlignment()" >
              <option value='option0' selected >--Sélectionner une valeur--</option>
              <option value='option1' > Résidentiel</option>
              <option value='option2'  >Bureaux</option>
              <option value='option3'>Bureaux IGH (hauteur >28 m)</option>
              <option value='option4'>Hôtels</option>
              <option value='option5'>Santé (centres hospitaliers, EHPAD, Etabl. Médicaux sociaux…)</option> 
              <option value='option6'>Centres commerciaux</option>
              <option value='option7'>Autre</option>
            </select>
          </div>
        </div> 
      </div>      
      <div class="col-lg-4"   > </div>

      <div class="col-lg-2"  *ngIf="hideFieldForm==false " >
        <div [ngClass]="{ 'disabled': isFieldsDisabled }">
          <div class="custom-label">
          <label class="labelDPE" for="dpe" >N° du DPE <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label>
          <input type="text" class="form-control form-control-sm" id="numeroDpeAdeme" placeholder="Ex: 2100E0981916Z" [(ngModel)]="numeroDpeAdeme"   [disabled]="isFieldsDisabled" (ngModelChange)="recalculerAlignment()"/>
          <div class="erreurDpe"  fxLayoutAlign="left center" >
            {{message}}
          </div>
          <ng-template #dialogTemplate>
            <h2 mat-dialog-title>Information:</h2>
            <div mat-dialog-content>
            <p>Un DPE plus récent a été déposé auprès de l'ADEME. Pour la bonne conformité du dossier, merci de le réclamer au client.</p>
            </div>
            <div mat-dialog-actions>
            <button mat-button (click)="closeDialog()">Fermer</button>
            </div>
           </ng-template>  
          </div></div>
             
        
      </div>
      <div class="col-lg-2" *ngIf="hideFieldForm==false ">    
     <br><br>
        <img   src="../../../assets/images/search.png"  (click)="showAdemeResult(numeroDpeAdeme)" style=" width:20px; height: 20px;">  
      
      </div>

     </div>
//
	onBreadcrumbClick(index: number ) {
		this.errorDpeMessage=null;
		this.errorNormeThermiqueMessage=null;
		this.errorDateDepotMessage=null;
					
		console.log("this.extractedInitialFinancement.objetFinancement[index] on click sur l'objet index", index,this.extractedInitialFinancement.objetFinancement[index])
		this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);  // Sauvegarder les données de l'objet actuel
		
		this.selectedObjetIndex = index;  // Mettre à jour l'index de l'objet sélectionné
		
			// Restituer le texte d'alignement sauvegardé en base
			if (this.extractedInitialFinancement.objetFinancement[index] && this.extractedInitialFinancement.objetFinancement[index].alignement 
				&& this.extractedInitialFinancement.objetFinancement[index].alignement.topAlignement!=null&&this.extractedInitialFinancement.objetFinancement[index].alignement.xtra275TopAlignement
				!=null) {
					this.showBlocResult=true;
				this.alignementResultText = this.alignementMappingReprise[this.extractedInitialFinancement.objetFinancement[index].alignement.topAlignement][this.extractedInitialFinancement.objetFinancement[index].alignement.xtra275TopAlignement]
				
			}
            if (this.extractedInitialFinancement.objetFinancement[index].alignement.topAlignement==null && this.extractedInitialFinancement.objetFinancement[index].alignement.xtra275TopAlignement==null) {
				this.showBlocResult=false;		
			}

			
				
			
		this.depExist=false;
		



   

		

	this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);  // Charger les données du nouvel objet sélectionné
	this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);  // Initialiser le formulaire avec les données du nouvel objet

	

	// Appliquer les règles métiers sur l'élément sélectionné
	this.checkPiecesJustificatif(this.extractedInitialFinancement, this.selectedObjetIndex);
	console.log("Vérification des champs montant finance LCL et part LCL : ", this.montantLclFinance, this.partLcl);
	this.checkFormFieldsFormGroup();

	
 // Réinitialiser le bouton Continuer à désactivé
 //this.postDisabled = true;
 


}
//
<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" class="breadcrumb-nav" >
    <ol class="breadcrumb-custom" >
      <li class="breadcrumb-item-custom"
      *ngFor="let objet of objetsFinancements; let i = index"
      [class.selected]="selectedObjetIndex === i">
    <a [routerLink]=""
       queryParamsHandling="preserve"
       (click)="onBreadcrumbClick(i)">
      <span>Objet de financement</span>  {{ i + 1 }}
    </a>
    <button class="close-btn"
            *ngIf="showDeleteIcon && manuallyAddedIndices.includes(i)"
            (click)="removeBreadcrumbItem(i)">x</button>
  </li>
    </ol>
    <div class="button-container" >
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()"  [disabled]="ajoutFinancementDisabled " title="Merci de calculer l'alignement pour chaque objet ajouté à la liste" >Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
</div>
