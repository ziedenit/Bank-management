
    
<div class="container-fluid" >
        <div class=footer>
        <div class="ButtonsFooter" style="display: flex; justify-content: flex-end" >
        <button (click)="showAlignement(selectedObjetIndex)"   mat-raised-button color="primary" [disabled]="selectedType!='option1'">Calculer</button>
         &nbsp; 
       <button  mat-raised-button color="primary"  (click)="postContinuer()" [disabled]="postDisabled ">Continuer</button>
      </div>
      </div>           
</div>
showAlignement(index:number): void {
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
    // verification changement des champs ( parametre calcul alignement)
	



}


<div  class="container-fluid">
  <div class="row">
    <div class="col-lg-12">
      <div class="card border-0">
        <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px  #b1bfeb;">
          <div class="blockSize bg-light-gray">
            <div [class.DpeAdem]="elemenDPE == false">
              <div [hidden]="!depExist" *ngIf="hideFieldForm==false">
                <div class="DPE-Bloc" >
                  <span class="float-right">
                    <img *ngIf="hiddenDPE==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataDPE()" />
                    <img *ngIf="hiddenDPE==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataDPE()" />
                  </span> 
                  <h3 class="d-inline-block font-weight-bold">Données du DPE</h3>
                </div>
                <div  *ngIf="elemenDPE == true">
                  <form class="DpeFormulaire" [formGroup]="formGroup">
                    <div class="row">
                      <div class="col-lg-3 col-md-6" style="margin-bottom: 0px;">
                        <label for="numeroNomRue " class="d-block dpeLabel">Adresse du bien </label>
                        <input type="text" id="numeroNomRue"  formControlName="numeroNomRue" name="numeroNomRue" class="form-control">
                        <div class="listeAdress" *ngIf="showAdressResults==true">
                          <ul>
                            <li *ngFor="let result of addressResults">
                              <button (click)="selectAddress(result)">
                                {{ result.properties.label }}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6" >
                        <label for="codePostal" class="d-block dpeLabel">Code postal <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'"> *</span></label>
                        <input type="text" id="codePostal"  formControlName="codePostal" name="codePostal" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <label for="ville" class="d-block dpeLabel">Ville <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'"> *</span> </label>
                        <input type="text" id="ville"  formControlName="ville" name="ville" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6"  >
                        <label for="dateDiangnostique" class="d-block dpeLabel" >Date d'établissement du DPE <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label>
                        <input type="text" id="dateDiangnostique"  formControlName="dateDiangnostique" placeholder="YYYY-MM-dd" name="dateDiangnostique" class="form-control">
                      </div>


                      <div class="col-lg-3 col-md-6" >
                        <label for="dateFinValidite" class="d-block dpeLabel" >Date de fin de validité du DPE <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span> </label>
                        <input type="text" id="dateFinValidite"  formControlName="dateFinValidite" name="dateFinValidite"  placeholder="YYYY-MM-DD" class="form-control">
                      </div>
                      
                      <div class="col-lg-3 col-md-6">
                        <label for="anneeConstruction" class="d-block dpeLabel">Année de construction  <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label>
                       
                        <input type="text" id="anneeConstruction"  formControlName="anneeConstruction" name="anneeConstruction" class="form-control"  (input)="checkAnneeConstruction">
                        <div class="erreurAc" *ngIf="showAlertAc"> 
                          {{messageAlertAc}}
                         </div>

                      </div>

                      <div class="col-lg-3 col-md-6" [hidden]="hideField==true "  >
                        <label for="typeBatiment" class="d-block dpeLabel">Type de bien</label>
                        <input type="text" id="typeBatiment"  formControlName="typeBatiment" id="typeBatiment" name="typeBatiment" class="form-control">
                      </div>

                      <div class="col-lg-3 col-md-6" >
                        <label for="surfaceBien"  class="champs dpeLabel" >Surface habitable  <em>(en m²) </em>
                          <span class="required" *ngIf="selectedNatBatiment=='option1' || selectedNatBatiment=='option2'">*</span></label><br>
                        <input type="text"  formControlName="surfaceBien" name="surfaceBien" id="SurfaceDuBien" class="form-control">                
                      </div>

                      <div class="col-lg-3 col-md-6" >
                        <label for="EnergieType"  class="champs dpeLabel">Type d’énergie utilisée 
                        <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
                        <input type="text" id="EnergieType"  formControlName="energieType" name="EnergieType"  class="form-control">
                        <img  *ngIf="valGesObligatoire==true" src="../../../assets/icons/obligatoire.svg" style="width:15px; height: 15px;" alt="image flèche haut" >
                      </div>
                      <div class="col-lg-3 col-md-6"  [hidden]="hideField==false" [hidden]="hideFieldCEP==false" >
                        <label class="champs dpeLabel" >Lettre CEP
                        <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
                        <select id="LettreCEPlist" name="LettreCEPlist"  formControlName="lettreCEP" class="form-control"  >
                          <option value='option0' > </option>
                          <option value='option1' >A</option>
                          <option value='option2' >B </option>
                          <option value='option3' >C </option>
                          <option value='option4' >D</option>
                          <option value='option5' >E</option>
                          <option value='option6' >F </option>
                          <option value='option7' >G</option> 
                        </select> 
                      </div>











<div class="col-lg-3 col-md-6"   [hidden]="hideField==true" [hidden]="hideFieldCEP==true">
<label for="LettreCEP" class="champs dpeLabel">Lettre CEP <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
<input type="text" id="LettreCEP" formControlName="lettreCEP" name="LettreCEP"  class="form-control">             
</div>

<div class="col-lg-3 col-md-6"  >
<label for="ValeurCEP" class="champs dpeLabel">Valeur CEP <em>(en kWhep/m².an)</em>    
   <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label><br>
<input type="text" id="ValeurCEP"   formControlName="valeurCep"  class="form-control">             
</div>

<div class="col-lg-3 col-md-6"   [hidden]="hideField==false" [hidden]="hideFieldGES==false">
  <label class="champs dpeLabel" >Lettre GES
  <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
  <select id="lettreGeslist" name="lettreGeslist"  formControlName="lettreGES"  class="form-control">
      <option value='option0' > </option>
      <option value='option1' >A</option>
      <option value='option2' >B </option>
      <option value='option3' >C </option>
      <option value='option4' >D</option>
      <option value='option5' >E</option>
      <option value='option6' >F </option>
       <option value='option7' >G</option> 
  </select> 
</div>                    
<div class="col-lg-3 col-md-6"   [hidden]="hideField==true" [hidden]="hideFieldGES==true">
  <label for="LettreGES" class="champs dpeLabel">Lettre GES <span class="required" *ngIf="selectedNatBatiment=='option1'">*</span></label><br>
  <input type="text" id="LettreGES" formControlName="lettreGES" name="LettreGES"  class="form-control">          
</div>

<div class="col-lg-3 col-md-6"  >
<label for="valeurGES" class="champs dpeLabel"> Valeur GES <em>(en kWhep/m².an)</em>    
   <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label><br>
<input type="text"  id="ValeurGES" formControlName="valeurGes"  class="form-control">                
</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid" >
        <div class=footer>
        <div class="ButtonsFooter" style="display: flex; justify-content: flex-end" >
        <button (click)="showAlignement(selectedObjetIndex)"   mat-raised-button color="primary" [disabled]="selectedType!='option1'">Calculer</button>
         &nbsp; 
       <button  mat-raised-button color="primary"  (click)="postContinuer()" [disabled]="postDisabled ">Continuer</button>
      </div>
      </div>           
</div>
//
      <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
                  <div class="custom-label">
                <label for="NormeThermique" class="labelFormulaire" >Norme Thermique </label>
                <select class="form-control form-control-sm" id="NormeThermique" required [(ngModel)]="normeThermique"    name="NormeThermique" [disabled]="isFieldsDisabled">
                  <option value='option0' selected> </option>
                  <option value='option1'> RT2012  </option>
                  <option value='option2'> RE2020 </option>
                  <option value='option3' >Autre</option>
                </select>     
              </div>
//

 <div class="col-lg-4">
              <div class="form-group" *ngIf="hideFieldForm==false">
                  <div class="custom-label">
                      <label for="dateDepot">Date de dépôt de permis de construire <span class="required" *ngIf="selectedNatBatiment=='option2'"> *</span></label>
                      <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="dateDepot" placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" (change)="checkDate()" />
                  </div>
              </div>
          </div>
//
je veux griser le button continuer a chaque fois ou une valeur des données du formgroup change oun une valeur du  ng model pour les données mentionné et ajouté un pop up seuelement une fois sur le meme objet et debloquer le button continuer une fois on on calcul pour l'objet en cours 
