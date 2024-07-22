
<app-client [codeApplicatifOrigine]="codeApplicatifOrigine" [idRepers]="idRepers"></app-client>

<app-type-objet-financement 
 [typeObjetFinancement]="typeObjetFinancement"
 [hideFieldForm]="hideFieldForm" 
 (selectedFamilleObjet)="onFamilleSelected($event)" 
 (selectedObjetFinancement)="onObjetFinancementSelected($event)" >
</app-type-objet-financement> 
<div class="container-fluid">  
  <div class="row" >
    <div class="col-12">
      <div class="card border-0">
        <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px  #b1bfeb;">
          <div class="blockSize">
          <h3 class="d-inline-block font-weight-bold"  style="font-size: 17px;">Objet de financement</h3>
        <span class="float-right" >
            <img *ngIf="hiddenObjetfinancement==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataObjetFinancement()">
            <img *ngIf="hiddenObjetfinancement==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataObjetFinancement()">
          </span> 
         <div *ngIf="elementObjetfinancement == true"> 
          <div class="row">
            <div class="col-lg-4" *ngIf="hideFieldForm==false && typeObjetFinancement !=null">
                <div class="form-group">
                    <div class="custom-label">
                        <label for="input1">Objet financé</label>
                        <input type="text" disabled class="form-control form-control-sm disable-cursor" id="input1" [(ngModel)]="objetFinance">
                    </div>
                </div>
            </div>
            <div class="col-lg-4" *ngIf="typeObjetFinancement==null">
            </div>
            <div class="col-lg-4">
                <div class="form-group" *ngIf="!hideFieldForm">
                    <div class="custom-label">
                        <label for="prixAquisitionBien">Prix du bien <em>(en euro)</em></label>
                        <span class="required"> *</span>
                        <input type="text"
                               [ngModel]="prixAquisitionBien | number:'1.0-2':'fr'"
                               (ngModelChange)="onPriceChange($event)"
                               class="form-control form-control-sm"
                               id="prixAquisitionBien"
                               name="description"
                               [disabled]="isFieldsDisabled" />
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group" *ngIf="hideFieldForm==false">
                    <div class="custom-label">
                        <label for="dateDepot">Date de dépôt de permis de construire <span class="required" *ngIf="selectedNatBatiment=='option2'"> *</span></label>
                        <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="dateDepot" placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" />
                    </div>
                </div>
            </div>
        </div>
                                
            <div class="row">
              <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">
                <div class="form-group" >
                  <div class="custom-label">
                  <label for="select2" >Eligibilité au DPE </label>                 
                  <select class="form-control form-control-sm"  (mouseenter)="showDescription($event)" id="select2" [(ngModel)]="selectedType">
                    <option *ngFor="let option of options" [value]="option.value" [title]="option.description"> {{ option.label }}</option>
                  </select>
              </div>
              </div>
                <div class="alertArea" *ngIf="showFirstEligiblite==true"> 
                <p style="color: rgb(45, 61, 133); font-size: 14px; font-weight: bold;">Description:</p>  {{messageAlert}}
                </div>
              </div> 
              <div class="col-lg-4">
                <div  class="form-group"  *ngIf="hideFieldForm==false ">
                  <div class="custom-label">
                  <label for="montantFinance" >Montant financé toute banque <em>(en euro)</em></label>
                  <span class="required"> *</span>       
                  <input type="text"
                   [ngModel]="montantLclFinance | number:'1.0-2':'fr'" 
                   (ngModelChange)="onMontantChange($event)"
                    class="form-control form-control-sm" 
                     id=montantLclFinance 
                      name="description" 
                      [disabled]="isFieldsDisabled" />                  
              </div>
              </div> 
              </div> 
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
            </div>
            </div>
            </div>
            <div class="row">
              <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">
                <div class="form-group" *ngIf="hideFieldForm==false">
                  <div class="custom-label">
                  <label for="categorieBatiment" >État du bien</label>&nbsp;<span class="required" >*</span>                
                  <select class="form-control form-control-sm" id="natureBien" name="natureBien" [(ngModel)]="selectedNatBatiment" (change)="onChangeEtatBien()" >              
                    <option value='option0' selected>--Sélectionner une valeur--</option>
                    <option value='option1'> Ancien</option>
                    <option value='option2'>Neuf</option>           
                  </select>
                </div>
              </div>
              </div>
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div  class="form-group">
                  <div class="custom-label">
                  <label for="partLcl"  >Part LCL <em> (en euro)</em></label>
                  <span class="required"> *</span>             
                  <input type="text" [ngModel]="partLcl | number:'1.0-2':'fr'" 
                  (ngModelChange)="onPartChange($event)"
                   class="form-control form-control-sm" 
                    id=partLcl  name="description" 
                    [disabled]="isFieldsDisabled" />    
                </div>
              </div> 
            </div>
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
                  <div class="custom-label">
                  <label class="labelFormulaire" for="dpe">Siren du diagnostiqueur</label>     
                  <span class="required" *ngIf="selectedNatBatiment=='option1' || numeroDpeAdeme!=null" > *</span>                    
                  <input type="text" class="form-control form-control-sm" placeholder="Ex: 123456789"  id ="SirenDPE" [(ngModel)]="SirenDPE"   [disabled]="isFieldsDisabled" /> 
              </div>
            </div>
              <div class="erreurDpe" *ngIf="hideFieldForm==false"   fxLayoutAlign="left center"  style="margin-top: -2px;">
               {{messageSiren}}
              </div>
              <div *ngIf="isValid !== null">
                <p class="erreurDpe" *ngIf="!isValid && hideFieldForm==false">Le numéro SIREN {{ siren }} est invalide.</p>
              </div>      
          </div>

            </div >
            <div class="row">
              <div class="col-lg-4" *ngIf=" presenceadresse &&hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }">                  
                      <label for="addressBien"  ></label>
                      <input type="text" class="form-control form-control-sm" (ngModelChange)="onFieldChange()" placeholder="Adresse du bien" id="addressBien" [(ngModel)]="addresseBien" name="description" [disabled]="isFieldsDisabled" />
                      <div class="form-group">
                        <div  class="listeAdress">
                          <ul>
                            <li *ngFor="let result of addressResult">
                              <button (click)="selectAddres(result)">
                                {{ result.properties.label }}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>                     
              </div>
              <div class="col-lg-2"   *ngIf="presenceadresse&& hideFieldForm==false"   [ngClass]="{ 'disabled': isFieldsDisabled }">              
                  <label for="addressBien" ></label> <span class="required">*</span>
                  <input type="text" id="codePostal"  class="form-control form-control-sm"   [(ngModel)]="addresseBienCodePostal" (ngModelChange)="onFieldChange()" placeholder="Code postal"  name="codePostal"   [ngClass]="{ 'disabled': isFieldsDisabled }">                             
              </div>
              <div class="col-lg-2"  *ngIf="presenceadresse&&hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }">               
                  <label for="addressBien" ></label> <span class="required">*</span>
                  <input   type="text" id="ville"  class="form-control form-control-sm"   [(ngModel)]="addresseBienVille" (ngModelChange)="onFieldChange()" placeholder="Ville"   name="Ville"  [ngClass]="{ 'disabled': isFieldsDisabled }">                                
              </div>             
       </div> 
       <div class="row">
        <div class="col-lg-4" [ngStyle]="typeObjetFinancement==null && {'margin-top': '-73px'}">   
          <div class="form-group " *ngIf="hideFieldForm==false">
            <div class="custom-label">
            <label for="categorieBatiment" > Nature du bien</label>&nbsp;<span class="required">*</span>
            <select class="form-control form-control-sm"  [(ngModel)]="codeBatimentSelected" id="categorieBatiment" >
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
        <div class="col-lg-4"> </div>
        <div class="col-lg-2"  *ngIf="hideFieldForm==false " >
          <div [ngClass]="{ 'disabled': isFieldsDisabled }">
            <div class="custom-label">
            <label class="labelDPE" for="dpe" >N° du DPE <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label>
            <input type="text" class="form-control form-control-sm" id="numeroDpeAdeme" placeholder="Ex: 2100E0981916Z" [(ngModel)]="numeroDpeAdeme"   [disabled]="isFieldsDisabled" />
            <div class="erreurDpe"  fxLayoutAlign="left center" >
              {{message}}
            </div>
            </div>
          </div>                     
        </div>
        <div class="col-lg-2" *ngIf="hideFieldForm==false ">    
        <img src="../../../assets/images/search.png" alt="image recherche"  (click)="showAdemeResult(numeroDpeAdeme)" style=" width:20px; height: 20px;">   
        </div>
       </div>     
       </div>
        </div>
      </div>
    </div>
  </div>
</div> 
</div>
j'ai ce bloc qui prends en charge un seul objet de financement recuperer de cette facon dans un composant angular et je veux creer un autre composant mais on afficher une liste des objet de financement recuprer a travers un service commme celui qui est a modifierthis.financementService.getFinancementbyId(this.id).subscribe(
(responseFinancement) => {
	console.log("le financement récupéré par l'id de contexte est :", responseFinancement);
	
		this.idRepers=responseFinancement.intervenant.idReper;
		this.codeApplicatifOrigine=responseFinancement.codeApplicatifOrigine;
		this.familleObjet=responseFinancement.objetFinancement.codeFamilleObjet;
		this.typeObjetFinancement=responseFinancement.objetFinancement.codeObjetFinancement;
		this.agenceCompte=responseFinancement.agenceCompte;
		
		if(this.familleObjet=="01"){this.selectedFamilleObjet ="option1";}
		if(this.familleObjet=="05"){this.selectedFamilleObjet="option4"}


		switch (this.typeObjetFinancement) {
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

		this.isfirstDebranchement=responseFinancement.firstDisconnectionOfd;
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.etatBien == null,
			"natureBien"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.codeBatiment == null,
			"categorieBatiment"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.partLCL == null,
			"partLcl"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.prixBien == null,
			"prixAquisitionBien"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.montantFinanceLCL == null,
			"montantLclFinance"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.etatBien == "Ancien" &&
			responseFinancement.objetFinancement.bien.dpeActuel != null &&
			(responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe == null ||
				responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe == ""),
			"numeroDpeAdeme"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.etatBien == "Ancien" &&
			responseFinancement.objetFinancement.bien.dpeActuel != null &&
			(responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur == null ||
				(responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe != null &&
					responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur == null)),
			"SirenDPE"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.etatBien == "Neuf" &&
			responseFinancement.objetFinancement.bien.dateDepotPc == null,
			"dateDepot"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.etatBien == "Ancien" &&
			responseFinancement.objetFinancement.bien.anneeConstruction == null,
			"anneeConstruction"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			(responseFinancement.objetFinancement.bien.etatBien == "Neuf" ||
				responseFinancement.objetFinancement.bien.etatBien == "Ancien") &&
			(responseFinancement.objetFinancement.bien.numeroNomRue == null ||
				responseFinancement.objetFinancement.bien.numeroNomRue == ""),
			"numeroNomRue"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			(responseFinancement.objetFinancement.bien.etatBien == "Neuf" ||
				responseFinancement.objetFinancement.bien.etatBien == "Ancien") &&
			(responseFinancement.objetFinancement.bien.codePostal == null ||
				responseFinancement.objetFinancement.bien.codePostal == ""),
			"codePostal"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			(responseFinancement.objetFinancement.bien.etatBien == "Neuf" ||
				responseFinancement.objetFinancement.bien.etatBien == "Ancien") &&
			(responseFinancement.objetFinancement.bien.nomCommune == null ||
				responseFinancement.objetFinancement.bien.nomCommune == ""),
			"ville"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.etatBien == "Ancien" &&
			responseFinancement.objetFinancement.bien.dpeActuel != null &&
			(responseFinancement.objetFinancement.bien.dpeActuel.classeCep == null ||
				responseFinancement.objetFinancement.bien.dpeActuel.classeCep == ""),
			"LettreCEP"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.etatBien == "Ancien" &&
			responseFinancement.objetFinancement.bien.dpeActuel != null &&
			(responseFinancement.objetFinancement.bien.dpeActuel.classeGes == null ||
				responseFinancement.objetFinancement.bien.dpeActuel.classeGes == ""),
			"LettreGES"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.etatBien == "Ancien" &&
			responseFinancement.objetFinancement.bien.dpeActuel != null &&
			responseFinancement.objetFinancement.bien.dpeActuel.estimationCep == null,
			"ValeurCEP"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			responseFinancement.objetFinancement.bien.etatBien == "Ancien" &&
			responseFinancement.objetFinancement.bien.dpeActuel != null &&
			responseFinancement.objetFinancement.bien.dpeActuel.estimationGes == null,
			"ValeurGES"
		);
		
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement != null &&
			responseFinancement.objetFinancement.bien != null &&
			(responseFinancement.objetFinancement.bien.etatBien == "Neuf" ||
				responseFinancement.objetFinancement.bien.etatBien == "Ancien") &&
			responseFinancement.objetFinancement.bien.surfaceBien == null,
			"SurfaceDuBien"
		);

	
		this.checkAndHighlightRequiredField(
			responseFinancement.objetFinancement.codeObjetFinancement==null,
			"selectedObjetFinancement"
		);
			
 // Restitution des données sur l'écran depuis la BDD 
		const codeBatimentMapping = {
			"00001": "option1",
			"00002": "option2",
			"00003": "option3",
			"00004": "option4",
			"00005": "option5",
			"00006": "option6",
			"99999": "option7"
		};	
	    const eligibleDpeMapping = {
			"99": { type: "option1", hideFieldForm: false },
			"01": { type: "option2", hideFieldForm: true },
			"02": { type: "option3", hideFieldForm: true },
			"03": { type: "option4", hideFieldForm: true },
			"04": { type: "option5", hideFieldForm: true },
			"05": { type: "option6", hideFieldForm: true },
			"06": { type: "option7", hideFieldForm: true },
			"07": { type: "option8", hideFieldForm: true },
			"08": { type: "option9", hideFieldForm: true },
			"09": { type: "option10", hideFieldForm: true }
		};	
		const alignementMapping = {
			"01": "éligible et aligné à la Taxonomie",
			"06": "éligible et non aligné à la Taxonomie",
			"07": "éligible et alignement à la Taxonomie non évalué"
		};	
		const etatBienMapping = {
			"Ancien": "option1",
			"Neuf": "option2"
		};
		const codeNormeThermiqueMapping = {
			"01": "option1",
			"02": "option2",
			"99": "option3"
		};
   if(responseFinancement.objetFinancement!=null &&responseFinancement.objetFinancement.bien!=null
				&& responseFinancement.objetFinancement.bien.codeBatiment!=null){
					const codeBatiment = responseFinancement.objetFinancement.bien.codeBatiment;
					this.codeBatimentSelected = codeBatimentMapping[codeBatiment];
				}

  if(responseFinancement.objetFinancement!=null &&responseFinancement.objetFinancement.bien!=null
				&& responseFinancement.objetFinancement.bien.eligibleDpe!=null){
				const eligibleDpe = responseFinancement.objetFinancement.bien.eligibleDpe;	
				this.selectedType = eligibleDpeMapping[eligibleDpe].type;
				this.hideFieldForm = eligibleDpeMapping[eligibleDpe].hideFieldForm;
				}

    if(responseFinancement.objetFinancement!=null &&responseFinancement.objetFinancement.alignement!=null
		&& responseFinancement.objetFinancement.alignement.topAlignement!=null){
			this.DpeResults=true;
			const topAlignement = responseFinancement.objetFinancement.alignement.topAlignement;
			this.alignementResultText = alignementMapping[topAlignement];
			}
				
    // Vérifier les pièces justificatives ==>restitution			
	if (responseFinancement.objetFinancement != null && responseFinancement.objetFinancement.piecesJustificatives != null) {
		this.presenceJustifDPE = responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'DPE')
		|| responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
		this.presenceJustifDateDepotPC=responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
		this.presenceJustifNormeThermique=responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
		}

		if(this.presenceJustifDPE && responseFinancement.objetFinancement.bien.dpeActuel!=null){
		this.isDpe= responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'DPE');
		this.isCompromis=responseFinancement.objetFinancement.piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
		if(this.isDpe){this.selectedOptionJustif='DPE'}
		if(this.isCompromis){this.selectedOptionJustif='Compromis de vente'}
		this.isDpeChecked=true
		
		}
	
		if(!this.presenceJustifDPE && responseFinancement.objetFinancement.bien.dpeActuel!=null && responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe!=null )
		{this.errorDpeMessage='Justificatif DPE manquant'}
		if(this.presenceJustifDateDepotPC)
		{this.isDateDepotChecked=true;  this.isNormeThermiqueChecked=true; 
		}
				
		if(!this.presenceJustifDateDepotPC &&responseFinancement.objetFinancement.bien.dateDepotPc!=null)
		{this.errorDateDepotMessage='Justificatif attestant de la date de dépôt du permis de construire manquant';}	
		if(this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC){this.isNormeThermiqueChecked=true }
		if(!this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC && !this.errorDateDepotMessage
		&&responseFinancement.objetFinancement.bien.codeNormeThermique!=null){this.errorNormeThermiqueMessage='Justificatif Norme thermique manquant'}


// Restitution des données de bloc Objet de financement
			  if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.dateDepotPc!=null){
			  this.dateDepot=formatDate(responseFinancement.objetFinancement.bien['dateDepotPc'],'yyyy-MM-dd',"en-US")}
			  if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.dpeActuel!=null&& responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe!=null){
			  this.numeroDpeAdeme=responseFinancement.objetFinancement.bien.dpeActuel.numeroDpe
			  }
			  if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.partLCL!==null ){
				this.partLcl=responseFinancement.objetFinancement.bien.partLCL;
			  }
			  if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.prixBien!==null ){
				this.prixAquisitionBien=responseFinancement.objetFinancement.bien.prixBien;
			  }
			  if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.montantFinanceLCL!==null ){
				this.montantLclFinance=responseFinancement.objetFinancement.bien.montantFinanceLCL;
		        }
              if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.etatBien!==null ){
				const etatBien = responseFinancement.objetFinancement.bien.etatBien;
				this.selectedNatBatiment = etatBienMapping[etatBien];
			}			
			if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.dpeActuel!=null&& responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur!=null){
				this.SirenDPE=responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur;
				}
			if( responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.codeNormeThermique!==null ){
				const codeNormeThermique = responseFinancement.objetFinancement.bien.codeNormeThermique;
				this.normeThermique = codeNormeThermiqueMapping[codeNormeThermique];	
				}
			if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null && responseFinancement.objetFinancement.bien.dpeActuel!=null&& responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur!=null){
					this.SirenDPE=responseFinancement.objetFinancement.bien.dpeActuel.sirenDiagnostiqueur;
					}

//Si un numéro dpe est existant alors un dpe est enregistré dans la base de données // Restitution des données de bloc Objet de financement
if(responseFinancement.objetFinancement!=null && responseFinancement.objetFinancement.bien!=null &&
				   responseFinancement.objetFinancement.bien.dpeActuel!=null){

	this.dateReceptionDpe=responseFinancement.objetFinancement.bien.dpeActuel.dateReceptionDpe;
	this.dateFinValiditeDpe=responseFinancement.objetFinancement.bien.dpeActuel.dateFinValiditeDpe;
	this.depExist=true

    this.formGroup = this.fb.group({
	numeroNomRue: responseFinancement.objetFinancement &&
	responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.numeroNomRue? responseFinancement.objetFinancement.bien['numeroNomRue']: null,
    codePostal: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['codePostal'] : null,
    ville: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['nomCommune'] : null,
    dateDiangnostique: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel && responseFinancement.objetFinancement.bien.dpeActuel['dateEtablissementDpe'] ?responseFinancement.objetFinancement.bien.dpeActuel['dateEtablissementDpe'].toString().substring(0, 10) : null,
    anneeConstruction: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['anneeConstruction'] : null,
    typeBatiment: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['typeBatiment'] : null,
    lettreCEP: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel ? responseFinancement.objetFinancement.bien.dpeActuel['classeCep'] : null,
    lettreGES: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel ? responseFinancement.objetFinancement.bien.dpeActuel['classeGes'] : null,
    surfaceBien: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['surfaceBien'] : null,
    valeurCEP: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel ? responseFinancement.objetFinancement.bien.dpeActuel['estimationCep'] : null,
    valeurGES: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien && responseFinancement.objetFinancement.bien.dpeActuel ? responseFinancement.objetFinancement.bien.dpeActuel['estimationGes'] : null,
    EnergieType: responseFinancement.objetFinancement && responseFinancement.objetFinancement.bien ? responseFinancement.objetFinancement.bien['typeEnergie'] : null,
});

this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
	{	this.searchAddress();});
this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
	{	this.searchAddress();});
this.formGroup.get('ville').valueChanges.subscribe(ville=>
	{	this.searchAddress();});
}

// traiter le cas de la présence ou non de l'adresse de bien
		if(
		(this.addresseBien==null||this.addresseBien=="" || this.addresseBien== "null null")  &&
		(this.addresseBienCodePostal==null || this.addresseBienCodePostal=="")&&
		(this.addresseBienVille ==null || this.addresseBienVille =="")
		)
		{
		this.presenceadresse=false}  else  {this.presenceadresse=true;}
 }); afin quand puisse recuprer la liste des objet et afficher les objets sous forme de file ariane 
