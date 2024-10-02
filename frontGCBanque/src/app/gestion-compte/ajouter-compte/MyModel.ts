import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-justificatifs',
  templateUrl: './justificatifs.component.html',
  styleUrls: ['./justificatifs.component.scss']
})
export class JustificatifsComponent {

  @Input() hideFieldForm: boolean;
  @Input() dateDepot: boolean;
  @Input() numeroDpeAdeme: boolean;
  @Input() normeThermique: string;
  @Input() selectedOptionJustif: string;

  @Input() isDpeChecked:boolean
  @Input() isDateDepotChecked: boolean 
  @Input() isNormeThermiqueChecked: boolean
  

  @Output() isDateDepotCheckedChange = new EventEmitter<boolean>();
  @Output() isDpeCheckedChange = new EventEmitter<boolean>();
  @Output() isNormeThermiqueCheckedChange = new EventEmitter<boolean>();
  @Output() hiddenJustificatifChange = new EventEmitter<boolean>();
  @Output() selectedOptionJustifChange = new EventEmitter<string>(); 
  @Output() postDisabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() alertDisplayedChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  hiddenJustificatif=false;
  elementJustificatif=true;
 
  postDisabled: boolean = false;
  alertDisplayed: boolean = false;

  onSelectedOptionJustifChange(event: any) 
  {
    console.log("coucouuuu justif",this.selectedOptionJustif)
    this.selectedOptionJustif = event.target.value;
    this.selectedOptionJustifChange.emit(this.selectedOptionJustif); 
    
    }

  onDateDepotCheckedChange(event: any) {
    this.isDateDepotChecked = event.target.checked;
    this.isDateDepotCheckedChange.emit(this.isDateDepotChecked);
   
  }

  onDpeCheckedChange(event: any) {
    this.isDpeChecked = event.target.checked;
    this.isDpeCheckedChange.emit(this.isDpeChecked);
    
  }

  onNormeThermiqueCheckedChange(event: any) {
    this.isNormeThermiqueChecked = event.target.checked;
    this.isNormeThermiqueCheckedChange.emit(this.isNormeThermiqueChecked);
   
  }

  hideDataJustificatif() {
    this.hiddenJustificatif=true;
    return (this.elementJustificatif = false);
   }
  showDataJustificatif() {
    this.hiddenJustificatif=false;
    return (this.elementJustificatif = true);
    }
    recalculerAlignment() {
      this.postDisabled = true;
      this.postDisabledChange.emit(this.postDisabled); // Émettre la nouvelle valeur de postDisabled
  
      if (!this.alertDisplayed) {
        alert("Merci de calculer l'alignement suite à ce changement.");
        this.alertDisplayed = true;
        this.alertDisplayedChange.emit(this.alertDisplayed); // Émettre la nouvelle valeur de alertDisplayed
      }
    }

}
//
<div class="container-fluid">
    <div class="justificatifs" *ngIf="hideFieldForm == false">
      <div class="blocJust">
        <img *ngIf="hiddenJustificatif == false" src="../../../assets/icons/arrow-up.svg" (click)="hideDataJustificatif()"  alt="image fleche haut" />
        &nbsp;
        <img *ngIf="hiddenJustificatif == true" alt="image fleche bas" src="../../../assets/icons/arrow-down.svg"  (click)="showDataJustificatif()" />
        &nbsp;
        <h3 style="margin-top: 14px; font-size: 17px; font-weight:bold; ">Documents envoyés au CEC {{pjLocal}} </h3>
      </div>
  

      <div *ngIf="elementJustificatif == true " class="content">
        <div class="checkbox-group">
          <div *ngIf="dateDepot" class="checkbox-item">
            <label>
              <input type="checkbox" [(ngModel)]="isDateDepotChecked"  (change)="onDateDepotCheckedChange($event)" (ngModelChange)="recalculerAlignment()" style="margin-top: -10px;">
              <p style="margin-left: 10px;">Contrat de vente / de réservation /de construction précisant la date de dépôt du PC (Permis de construire)
              </p>
            </label>
          </div>
  
          <div *ngIf="numeroDpeAdeme" class="checkbox-item" style="height: 50px; margin-top: -30px;">
            <label>           
              <br>
              <input type="checkbox" [(ngModel)]="isDpeChecked"  (change)="onDpeCheckedChange($event)" (ngModelChange)="recalculerAlignment()">
              <p style="margin-left: 10px; margin-top: 12px;">Compromis / promesse de vente incluant le DPE ou DPE seul </p>
              <select [(ngModel)]="selectedOptionJustif" (change)="onSelectedOptionJustifChange($event)" class="dropdown-list"> 
                <option value="DPE" selected>Document DPE</option> 
                <option value="Compromis de vente">Compromis / promesse de vente incluant le DPE</option> 
            </select>
            </label>
          </div>
  
          <div *ngIf="normeThermique && normeThermique !== 'option0' && !dateDepot" class="checkbox-item">
            <label>
              <input type="checkbox" [(ngModel)]="isNormeThermiqueChecked" (change)="onNormeThermiqueCheckedChange($event)" (ngModelChange)="recalculerAlignment()" style="margin-top: -10px;">
              <p style="margin-left: 10px;">Document attestant de la Norme thermique </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  
  
  // j'ai ce omposant fils ci dessus
et j'ai dans mon composant parent ca

<app-type-objet-financement 
 [typeObjetFinancement]="typeObjetFinancement"
 [hideFieldForm]="hideFieldForm" 
 (selectedFamilleObjet)="onFamilleSelected($event)" 
 (selectedObjetFinancement)="onObjetFinancementSelected($event)" 
(postDisabledChange)="handlePostDisabledChange($event)" 
(alertDisplayedChange)="handleAlertDisplayedChange($event)">
</app-type-objet-financement> 
	
	onBreadcrumbClick(index: number ) {
		this.resetAlertDisplay();
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

	
 // Forcer le recalcul d'alignement en cas de changement d'un 

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
 handlePostDisabledChange(postDisabled: boolean) {
			this.postDisabled = postDisabled;
			console.log('postDisabled a changé:', postDisabled);
		  }
		
		  handleAlertDisplayedChange(alertDisplayed: boolean) {
			this.alertDisplayed = alertDisplayed;
			console.log('alertDisplayed a changé:', alertDisplayed);
		  } 

ngOnInit(): void {


    this.id = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];
    if (this.Url_Retour_Base64) {
		this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
	}
	else {
		console.warn("Url_Retour_Base64 est falsy. Impossible de le convertir en Utf8.");
	}
	if (!this.id ) {
		console.log("hello pas d'id ")
		this.router.navigate(['/page-erreur'], { queryParams: { urlRetour: this.Url_Retour_Utf8 } });
		return;
	  }

	  this.financementService.getFinancementbyId(this.id).pipe (
		catchError(err => {
			console.error('Erreur lors de la récupération du financement:', err);
			this.router.navigate(['/page-erreur'], { queryParams: { urlRetour: this.Url_Retour_Utf8 } });
			return of(null);  
		  })
	).subscribe(responseFinancement => {
		this.extractedInitialFinancement = responseFinancement;
		console.log("le financement récupéré de la BDD est le suivant:",responseFinancement )	
        this.setFinancementData(responseFinancement);
        this.setObjetFinancementData(responseFinancement.objetFinancement[0]);
         this.checkRequiredFields(responseFinancement,0);
		this.checkPiecesJustificatif(responseFinancement,0);
        this.setupFormGroup(responseFinancement.objetFinancement[0].bien);
		if(responseFinancement.firstDisconnectionOfd==false)
		{
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

	showAlignement(index:number): void {
	this.resetAlertDisplay();
	this.postDisabled=false;
	this.checkFormFieldsFormGroup();
	this.showBlocResult=true;
	this.extractedInitialFinancement.objetFinancement[index].firstDisconnectionOfd=false;
	this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);
	

	
	
	if (this.clickCalulAlignObject.has(index)) {
		const currentCountcalcul = this.clickCalulAlignObject.get(index)??0;
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
				this.alignementContext= this.xtraRepriseService.calculXtra(aligne,aligneXtra);
				this.extractedInitialFinancement.objetFinancement[index].alignement=this.alignementContext;
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
			
			console.log("objet financement apres calcul: ", index,this.extractedInitialFinancement.objetFinancement[index]);
			
			
}
<div class="container-fluid" >
        <div class=footer>
        <div class="ButtonsFooter" style="display: flex; justify-content: flex-end" >
        <button (click)="showAlignement(selectedObjetIndex)"   mat-raised-button color="primary" [disabled]="selectedType!='option1'">Calculer</button>
         &nbsp; 
       <button  mat-raised-button color="primary"  (click)="postContinuer()" [disabled]="postDisabled ">Continuer</button>
      </div>
      </div>           
</div>
	je dois passer les valeurs postDisabled  alertDisplayed quand je coche ou decoche une valeur des ngmodel dans le parent actuellement sur le premier objet j'ai le message alerte si je coche mais le button ne grise pas postContinuer comme ci postDisabled ne passe pas convenablement du composant fils vers le parent 
