
<!---------------------------------------bloc clients Particuliers---------------------------------------------------------->
<h2 class="Titre-01">Acquisition des données et des justificatifs</h2>

<div *ngIf="clientParticulier">
  <div class="container-fluid mb-4">
    <div class="row align-items-center">
      <div class="col">
        <div class="nav">
          <img *ngIf="!hiddenClient" src="../../../assets/icons/arrow-up.svg" (click)="hideDataClient()" />
          <img *ngIf="hiddenClient" src="../../../assets/icons/arrow-down.svg" (click)="showDataClient()" />
          &nbsp; Client ({{idRepers.length}})
        </div>
      </div>
      <div class="col-auto">
        <div class="ajoutFinancement">
          <button mat-stroked-button>
            <img src="../../../assets/icons/plus.svg" />
            &nbsp;
            ajouter un objet de financement
          </button>
        </div>
      </div>
    </div>

    <div class="row" *ngIf="elementClient">
      <div class="col-12">
        <ul class="list-group">
          <li class="list-group-item" *ngFor="let client of clientDataList">
            <div class="row">
              <div class="col">
                Nom &nbsp;&nbsp; <b>{{client.civility}}.&nbsp; {{client.nomUsageClient}} {{client.prenomClient}}</b>
              </div>
              <div class="col">
                né (e) le : &nbsp;&nbsp; <b>{{client.dateNaissanceClient}}</b>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div *ngIf="errorrs.length > 0">
          <div class="error-message">
            <ul class="list-group">
              <li class="list-group-item" *ngFor="let error of errorrs">
                <div class="row">
                  <div class="col">
                    {{error.messageErrorP}}
                  </div>
                  <div class="col">
                    idReper du Client: {{error.idReperErrorP}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div *ngIf="!clientParticulier">
  <div class="container-fluid mb-4">
    <div class="row align-items-center">
      <div class="col">
        <div class="nav">
          <img *ngIf="!hiddenClient" src="../../../assets/icons/arrow-up.svg" (click)="hideDataClient()" />
          <img *ngIf="hiddenClient" src="../../../assets/icons/arrow-down.svg" (click)="showDataClient()" />
          &nbsp; Client ({{idRepers.length}})
        </div>
      </div>
      <div class="col-auto">
        <div class="ajoutFinancement">
          <button mat-stroked-button>
            <img src="../../../assets/icons/plus.svg" />
            &nbsp;
            ajouter un objet de financement
          </button>
        </div>
      </div>
    </div>

    <div class="row" *ngIf="elementClient">
      <div class="col-12">
        <ul class="list-group">
          <li class="list-group-item" *ngFor="let client of entrepriseData">
            <div class="row">
              <div class="col" *ngIf="!nonraison">
                Raison Sociale &nbsp; &nbsp; &nbsp; <b>{{client.legalName}}</b>
              </div>
            </div>
            <div class="row">
              <div class="col">
                Nom &nbsp; &nbsp; &nbsp; <b>{{client.civilite}}. &nbsp;{{client.usuaLastName}} {{client.firstName}}</b>
              </div>
              <div class="col">
                Siren &nbsp; &nbsp; &nbsp; <b>{{client.siren}}</b>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div *ngIf="errors.length > 0">
          <div class="error-message">
            <ul class="list-group">
              <li class="list-group-item" *ngFor="let error of errors">
                <div class="row">
                  <div class="col">
                    {{error.messageErrorE}}
                  </div>
                  <div class="col">
                    idReper: {{error.idReperErrorE}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  
<div class="container-fluid  ">
  <div class="row">
    <div class="col-12">
      <div class="card border-0">
        <div class="card-body">
          <div class="blockSize">
          <h3 class="d-inline-block font-weight-bold">Objet de financement</h3>
        <span class="float-right" >
            <img *ngIf="hiddenObjetfinancement==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataObjetFinancement()">
            <img *ngIf="hiddenObjetfinancement==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataObjetFinancement()">
          </span> 
         <div *ngIf="elementObjetfinancement == true"> 
    
          <div class="row">
            
                 <!-------------------- champs famille non envoyé dans le context ----------------------->
                 <div class="col-lg-4 "*ngIf="hideFieldForm==false && presenceFamilleObjet==false && presenceObjet==false "  >
                  <div class="form-group"    >
                    <label for="familleObjet">Famille objet de financement </label>&nbsp;<span class="required">*</span>
                    <select class="form-control form-control-sm"  id="selectedFamilleObjet" [(ngModel)]="selectedFamilleObjet">
                      <option value='option0' selected> </option>
                      <option value='option1'>Immobilier </option>
                      <option value='option2'>Installation, maintenance et réparation d'équipement/technologie liés aux bâtiments</option>
                      <option value='option3'>Énergies renouvelables </option>
                      <option value='option4'>Transport </option>
                      <option value='option5'>Autres </option>
                    </select>
                   
                  </div>
                 </div>
                    <!-------------------- champs famille envoyé et pas l'objet de financement----------------------->
              <div class="col-lg-4 " *ngIf="hideFieldForm==false&&presenceFamilleObjet==true && presenceObjet==false">
                <label  for="familleContext" >Famille objet de financement</label>&nbsp;<span class="required">*</span>
                <input type="text" class="form-control form-control-sm" [(ngModel)]="familleObjetText" id="familleObjetText" name="ObjectFinance"/> 
              </div>
           
            
              <!-------------------- champs objet financé non envoyé dans le context ----------------------->
              <div class="col-lg-4 " *ngIf="hideFieldForm==false&&presenceObjet==false">
                <div  class="form-group"   >
                <label for="objetFinancementType">Objet de financement </label>     &nbsp;<span class="required">*</span>
                  <select [(ngModel)]="selectedObjetFinancement" class="form-control form-control-sm" id="selectedObjetFinancement" name="selectedObjetFinancement">
                    <option value='option0' selected> </option>
                    <option value='option1' *ngIf="selectedFamilleObjet=='option1' || familleObjet=='01' ">Construction de bâtiment </option>
                    <option value='option2' *ngIf="selectedFamilleObjet=='option1' || familleObjet=='01'">Acquisition de bâtiment </option>
                    <option value='option3' *ngIf="selectedFamilleObjet=='option1' ||familleObjet=='01'">Rénovation de bâtiment</option>
                    <option value='option4'*ngIf="selectedFamilleObjet=='option1' ||familleObjet=='01'">Acquisition de bâtiment + Rénovation de bâtiment</option>
                    <option value='option5'*ngIf="selectedFamilleObjet=='option1' || familleObjet=='01' || selectedFamilleObjet=='option2' ">Equipements favorisant l'efficacité énergétique et performance énergétique du bâtiment</option>
                    <option value='option6'*ngIf="selectedFamilleObjet=='option1' || selectedFamilleObjet=='option2' || selectedFamilleObjet=='option4' || familleObjet=='immobilier'">Stations de recharge pour véhicules électriques</option>
                    <option value='option7'*ngIf="selectedFamilleObjet=='option3' || selectedFamilleObjet=='option2'">Technologies liées aux énergies renouvelables</option>  
                  </select>
                 
                </div>
              </div>
            </div>
            <div class="row">
              
              <div class="col-lg-4 " *ngIf="hideFieldForm==false&&presenceObjet==true">
                <div class="form-group "  >
                <label for="input1">Object financé</label>
                <input type="text" class="form-control form-control-sm" id="input1" placeholder="Renovation ou aquisition" [(ngModel)]="objetFinance">
              </div>
              </div>
            
             <div class="col-lg-4 ">
                
                <div class="form-group " *ngIf="hideFieldForm==false">
                  <label for="categorieBatiment"> Nature du bien</label>&nbsp;<span class="required">*</span>
                  <select class="form-control form-control-sm"  [(ngModel)]="codeBatimentSelected" id="categorieBatiment" >
                    <option value='option0' selected > </option>
                    <option value='option1' selected > Résidentiel</option>
                    <option value='option2'  >Bureaux</option>
                    <option value='option3'>Bureaux IGH (hauteur >28 m)</option>
                    <option value='option4'>Hôtels</option>
                    <option value='option5'>Santé (centres hospitaliers, EHPAD, Etabl. Médicaux sociaux…)</option> 
                    <option value='option6'>Centres commerciaux</option>
                  </select>
                </div>
              </div> 
             
              <div class="col-lg-4">
                <div class="form-group" >
                  <label for="select2">Eligibilité au DPE </label>
                  <select class="form-control form-control-sm"  (mouseenter)="showDescription($event)" id="select2" [(ngModel)]="selectedType">
                    <option *ngFor="let option of options" [value]="option.value" [title]="option.description"> {{ option.label }}</option>
                  </select>
                </div>
                <div class="alertArea" *ngIf="showFirstEligiblite==true">  <img src="../../../assets/icons/alert.svg" class="imageErreur"  alt="image flèche haut" > {{messageAlert}}
                </div>
              </div>             
            </div>
          
                   
             <div class="row">
              <div class="col-lg-4">
                   <!-------------- champs nature du bien -------------------------------->
                <div class="form-group" *ngIf="hideFieldForm==false">
                  <label for="categorieBatiment">Etat du bien</label>&nbsp;<span class="required">*</span>
                
                  <select class="form-control form-control-sm" id="natureBien" name="natureBien" [(ngModel)]="selectedNatBatiment" >
               
                    <option value='option0' selected> </option>
                    <option value='option1'> Ancien</option>
                    <option value='option2'>Neuf</option>
            
                  </select>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group" *ngIf="hideFieldForm==false " >
                  <label for="dateDepot"> Date de dépôt de PC  <span class="required" *ngIf="selectedNatBatiment=='option2'"> *</span></label>
                  <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="dateDepot"  placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" />
                </div>
              </div>
              <div class="col-lg-4">
              <div  class="form-group" *ngIf="hideFieldForm==false  ">
                <label for="prixAquisitionBien" >Prix du bien <em> (en euro)</em> </label>  
                <span class="required"> *</span>
                <input type="text" [(ngModel)]="prixAquisitionBien"   class="form-control form-control-sm"  id=prixAquisitionBien  name="description" [disabled]="isFieldsDisabled" />
                
              </div>
            </div>
            </div>
            <div class="row">
              <div class="col-lg-4">
                <div  class="form-group"  *ngIf="hideFieldForm==false ">
                  <label for="montantFinance" >Montant financé  <em>(en euro)</em></label>
                  <span class="required"> *</span>        
                  <input type="text" [(ngModel)]="montantLclFinance"   class="form-control form-control-sm"  id=montantLclFinance  name="description" [disabled]="isFieldsDisabled" />
                  
                </div>
              </div>  
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div  class="form-group">
                  <label for="partLcl" >Part LCL <em> (en euro)</em></label>
                  <span class="required"> *</span>             
                  <input type="text" [(ngModel)]="partLcl"  class="form-control form-control-sm"  id=partLcl  name="description" [disabled]="isFieldsDisabled" />    
                </div>
              </div> 
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
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
            <div class="row">
              <div class="col-lg-4" *ngIf=" presenceadresse &&hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }">
                  
                      <label for="addressBien" ></label>
                      <input type="text" class="form-control form-control-sm" (ngModelChange)="onFieldChange()" placeholder="Adresse du bien" id="addressBien" [(ngModel)]="addresseBien" name="description" [disabled]="isFieldsDisabled" />
                      <div class="form-group">
                        <div  class="listeAdress">
                          <ul >
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
        <div class="col-lg-4">
          
        </div>

        <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
          <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
            <label class="labelFormulaire" for="dpe">Siren du diagnostiqueur</label>

            <span class="required" *ngIf="selectedNatBatiment=='option1' || numeroDpeAdeme!=null" > *</span> 
             
            <input type="text" class="form-control form-control-sm" placeholder="Ex: 123456789"  id ="SirenDPE" [(ngModel)]="SirenDPE"   [disabled]="isFieldsDisabled" /> 
        </div>
        <div class="erreurDpe" *ngIf="hideFieldForm==false"   fxLayoutAlign="left center"  style="margin-top: -2px;">
      {{messageSiren}}
    </div>

        </div>
        
        

        <div class="col-lg-2"  *ngIf="hideFieldForm==false " >
          <div [ngClass]="{ 'disabled': isFieldsDisabled }">
            <label class="labelDPE" for="dpe">N° du DPE <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label>
            <input type="text" class="form-control form-control-sm" id="numeroDpeAdeme" placeholder="Ex: 2100E0981916Z" [(ngModel)]="numeroDpeAdeme"   [disabled]="isFieldsDisabled" />
            <div class="erreurDpe"  fxLayoutAlign="left center" >
              {{message}}
            </div>
            </div>
               
          
        </div>
        <div class="col-lg-2" *ngIf="hideFieldForm==false ">    
       <br><br>
          <img   src="../../../assets/images/search.png"  (click)="showAdemeResult(numeroDpeAdeme)" style=" width:20px; height: 20px;">  
        
        </div>

       </div>
      
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 
</div>
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-12">
      <div class="card border-0">
        <div class="card-body">
          <div class="blockSize bg-light-gray">
            <div [class.DpeAdem]="elemenDPE == false">
              <div [hidden]="!depExist" *ngIf="hideFieldForm==false">
                <div class="DPE-Bloc" [ngStyle]="{'border-bottom': !elemenDPE ? '1px solid #d1d3fc' : ''}">
                  <span class="float-right">
                    <img *ngIf="hiddenDPE==false" src="../../../assets/icons/arrow-up.svg" alt="image flèche haut" (click)="hideDataDPE()" />
                    <img *ngIf="hiddenDPE==true" src="../../../assets/icons/arrow-down.svg" alt="image flèche haut" (click)="showDataDPE()" />
                  </span> 
                  <h3 class="d-inline-block font-weight-bold">Données du DPE</h3>
                </div>
                <div *ngIf="elemenDPE == true">
                  <form class="DpeFormulaire" [formGroup]="formGroup">
                    <div class="row">
                      <div class="col-lg-3 col-md-6">
                        <label for="numeroNomRue" class="d-block">Adresse du bien</label>
                        <input type="text" id="numeroNomRue" placeholder="Adresse" formControlName="numeroNomRue" name="numeroNomRue" class="form-control">
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
                        <label for="codePostal" class="d-block">Code postal <span class="required"> *</span></label>
                        <input type="text" id="codePostal" placeholder="Code postal" formControlName="codePostal" name="codePostal" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <label for="ville" class="d-block">Ville <span class="required"> *</span> </label>
                        <input type="text" id="ville" placeholder="Ville" formControlName="ville" name="ville" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6" [hidden]="hideField==true">
                        <label for="dateDiangnostique" class="d-block">Date du diagnostic</label>
                        <input type="text" id="dateDiangnostique" placeholder="Date du diagnostic" formControlName="dateDiangnostique" name="dateDiangnostique" class="form-control">
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <label for="anneeConstruction" class="d-block">Année de construction  <span class="required">*</span></label>
                       
                        <input type="text" id="anneeConstruction" placeholder="Année de construction" formControlName="anneeConstruction" name="anneeConstruction" class="form-control">
                      </div>

                      <div class="col-lg-3 col-md-6" [hidden]="hideField==true"  >
                        <label for="typeBatiment" class="d-block">Type de bien</label>
                        <input type="text" id="typeBatiment" placeholder="Type de bien" formControlName="typeBatiment" id="typeBatiment" name="typeBatiment" class="form-control">
                      </div>

                      <div class="col-lg-3 col-md-6">
                        <label for="surfaceBien"  class="champs">Surface du bien <em>(en m²) </em><span class="required">*</span></label>
                        <input type="text" id="surfaceBien" placeholder="Surface du bien" formControlName="surfaceBien" name="surfaceBien" id="SurfaceDuBien" class="form-control">
                
                      </div>

                      <div class="col-lg-3 col-md-6">
                        <label for="EnergieType"  class="champs">Type d'énergie <span class="required"> *</span></label>
                        <input type="text" id="EnergieType" placeholder="Type Energie" formControlName="EnergieType" name="EnergieType" id="EnergieType" class="form-control">
                        <img  *ngIf="valGesObligatoire==true" src="../../../assets/icons/obligatoire.svg" style="width:15px; height: 15px;" alt="image flèche haut" >
                      </div>
                     
                      <div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==false " >
                        <label class="champs" >Lettre CEP
                        <span class="required">*</span></label>
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


                      <div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==true">
                        <label for="LettreCEP" class="champs">Lettre CEP <span class="required">*</span></label>
                            <input type="text" id="LettreCEP" formControlName="lettreCEP" name="LettreCEP"  class="form-control">             
                      </div>

             <div class="col-lg-3 col-md-6"  style="margin-top: 10px;">
              <label for="ValeurCEP" class="champs">Valeur CEP <em>(en kWhep/m².an)</em>     <span class="required"> *</span></label>
               <input type="text" id="ValeurCEP"  placeholder="ValeurCEP" formControlName="valeurCEP" id="ValeurCEP" class="form-control">             
              </div>

                      <div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==false">
                        <label class="champs" >Lettre GES
                        <span class="required">*</span></label>
                        <select id="lettreGeslist" name="lettreGeslist"  formControlName="lettreGES" class="form-control" >
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
                     
<div class="col-lg-3 col-md-6"  style="margin-top: 10px;" [hidden]="hideField==true">
  <label for="LettreGES" class="champs">Lettre GES <span class="required">*</span></label>
      <input type="text" id="LettreGES" formControlName="lettreGES" name="LettreGES"  class="form-control">          
</div>


    <div class="col-lg-3 col-md-6"  style="margin-top: 10px;">
      <label for="valeurGES" class="champs"> Valeur GES <em>(en kWhep/m².an)</em>     <span class="required"> *</span></label>
<input type="text" id="valeurGES"  placeholder="valeurGES" formControlName="valeurGES" id="ValeurGES" class="form-control">

                 
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
   
  <div class="justificatifs" *ngIf="hideFieldForm==false" >
  
    <div class="blocJust">
    <img  *ngIf="hiddenJustificatif==false" src="../../../assets/icons/arrow-up.svg"  (click)="hideDataJustificatif()" class="haut"  /> 
     &nbsp; <img *ngIf="hiddenJustificatif==true" src="../../../assets/icons/arrow-down.svg" class="bas"  (click)="showDataJustificatif() "/> &nbsp;
    <h3 class="TitleJustificatif"> Justificatifs</h3>
    </div >

  
    <div *ngIf="elementJustificatif == true" class="content">
      <div class="checkbox-group">
        
        <!-- Document attestant la date de dépôt de permis de construire -->
        <div *ngIf="dateDepot" class="checkbox-item">
          <label>
            <input type="checkbox" [(ngModel)]="isDateDepotChecked" [disabled]="isFieldsDisabled" (change)="logCheckboxStates()">
            Document attestant de la date de dépôt du permis de construire
          </label>
        </div>
  
         <!-- DPE ou Compromis de vente si le numéro DPE est saisi -->
      <div *ngIf="numeroDpeAdeme" class="checkbox-item">
        <label>
          <input type="checkbox" [(ngModel)]="isDpeChecked" [disabled]="isFieldsDisabled" (change)="logCheckboxStates()">
          <select [(ngModel)]="selectedOptionJustif" class="dropdown-list">
            <option value="DPE">DPE</option>
            <option value="Compromis de vente">Compromis de vente</option>
          </select>
        </label>       
      </div>

  
        <!-- Document attestant de la Norme thermique si renseignée -->
        <div *ngIf="normeThermique && normeThermique !== 'option0' && !dateDepot" class="checkbox-item">
          <label>
            <input type="checkbox" [(ngModel)]="isNormeThermiqueChecked" [disabled]="isFieldsDisabled" (change)="logCheckboxStates()">
            Document attestant de la Norme thermique
          </label>
        </div>
  
      </div>
    </div>
  </div>
  
  


  <div class="resultats"  >  
    <div  class="blocResults">
      <img  *ngIf="hiddenResults==false" src="../../../assets/icons/arrow-up.svg"  (click)="hideDataResults()"   /> 
       &nbsp; <img *ngIf="hiddenResults==true" src="../../../assets/icons/arrow-down.svg" (click)="showDataResults()"/>  &nbsp;
      <h3 class="TitleJustificatif"> Résultats</h3>
    </div >
    
  <div  *ngIf="elementResults==true" >
     <div *ngIf="selectedType !== 'option1'" class="erreurMessageResultat">
     <p>Financement non éligible à la Taxonomie</p>
    </div>
    

    <div *ngIf="DpeResults && hideFieldForm==false" >   
      <div  class='textblock' >
        <div class="ResultatVert">
        &nbsp;     
      <img  src="../../../assets/icons/coche.png" style="width:15px; height: 15px;" >  
       {{eligibiliteDpeMessage}} {{alignementResultText}}</div>
      </div>
      
      <div [hidden]="!champObligatoire" class='error-message'>
        <div class="Resultatrougee">
        &nbsp; <img  *ngIf="donneeObligatoire" src="../../../assets/icons/alert.svg" class="imageErreur">
        &nbsp;  {{donneeObligatoire}}</div>
       </div>
  
      
      <div class='textblock'>
        <div *ngIf="errorDpeMessage" class="error-message">
          <div class="Resultatrouge">
        &nbsp; <img  *ngIf="dpeIsPresent==false" src="../../../assets/icons/alert.svg" class="imageErreur"  >
        {{ errorDpeMessage }}</div>
      </div> 
  
  
      <div *ngIf="errorNormeThermiqueMessage" class="error-message">
        <div class="Resultatrouge">
        &nbsp; <img  *ngIf="dpeIsPresent==false" src="../../../assets/icons/alert.svg" class="imageErreur"  >
        {{ errorNormeThermiqueMessage }} </div>
      </div>
  
  
      <div *ngIf="errorDateDepotMessage" class="error-message">
        <div class="Resultatrouge">
        &nbsp; <img  *ngIf="dpeIsPresent==false" src="../../../assets/icons/alert.svg" class="imageErreur"  >
        {{errorDateDepotMessage}}</div>
      </div>
      </div>
  
      </div>
      </div>  
  
      </div>
    </div>
      <div class="container-fluid" >
  
        <div class=footer>
        <div class="ButtonsFooter" style="display: flex; justify-content: flex-end">
        <!-- <button  class="precedent" routerLink="/generale" >Précédent</button>
         &nbsp;    -->
       <button (click)="showAlignement()"   mat-raised-button color="primary" [disabled]="selectedType!='option1'">Calculer</button>
         &nbsp; 
       <button  mat-raised-button color="primary"  (click)="postContinuer()" >Continuer</button>
      </div>
      </div>
      
      
      </div>
 //
j'ai le composant angular ci dessus je veux a chaque clikc sur le button   ajouter un objet de financement faire afficher ce bloc ci bas afin sous forme de file ariane je vous envoi la forme que je veux en photo 
  autrement dit a chaque click sur le button je duplique l'objet et afficher les objets en file ariane 
  
  <div class="container-fluid  ">
  <div class="row">
    <div class="col-12">
      <div class="card border-0">
        <div class="card-body">
          <div class="blockSize">
          <h3 class="d-inline-block font-weight-bold">Objet de financement</h3>
        <span class="float-right" >
            <img *ngIf="hiddenObjetfinancement==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataObjetFinancement()">
            <img *ngIf="hiddenObjetfinancement==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataObjetFinancement()">
          </span> 
         <div *ngIf="elementObjetfinancement == true"> 
    
          <div class="row">
            
                 <!-------------------- champs famille non envoyé dans le context ----------------------->
                 <div class="col-lg-4 "*ngIf="hideFieldForm==false && presenceFamilleObjet==false && presenceObjet==false "  >
                  <div class="form-group"    >
                    <label for="familleObjet">Famille objet de financement </label>&nbsp;<span class="required">*</span>
                    <select class="form-control form-control-sm"  id="selectedFamilleObjet" [(ngModel)]="selectedFamilleObjet">
                      <option value='option0' selected> </option>
                      <option value='option1'>Immobilier </option>
                      <option value='option2'>Installation, maintenance et réparation d'équipement/technologie liés aux bâtiments</option>
                      <option value='option3'>Énergies renouvelables </option>
                      <option value='option4'>Transport </option>
                      <option value='option5'>Autres </option>
                    </select>
                   
                  </div>
                 </div>
                    <!-------------------- champs famille envoyé et pas l'objet de financement----------------------->
              <div class="col-lg-4 " *ngIf="hideFieldForm==false&&presenceFamilleObjet==true && presenceObjet==false">
                <label  for="familleContext" >Famille objet de financement</label>&nbsp;<span class="required">*</span>
                <input type="text" class="form-control form-control-sm" [(ngModel)]="familleObjetText" id="familleObjetText" name="ObjectFinance"/> 
              </div>
           
            
              <!-------------------- champs objet financé non envoyé dans le context ----------------------->
              <div class="col-lg-4 " *ngIf="hideFieldForm==false&&presenceObjet==false">
                <div  class="form-group"   >
                <label for="objetFinancementType">Objet de financement </label>     &nbsp;<span class="required">*</span>
                  <select [(ngModel)]="selectedObjetFinancement" class="form-control form-control-sm" id="selectedObjetFinancement" name="selectedObjetFinancement">
                    <option value='option0' selected> </option>
                    <option value='option1' *ngIf="selectedFamilleObjet=='option1' || familleObjet=='01' ">Construction de bâtiment </option>
                    <option value='option2' *ngIf="selectedFamilleObjet=='option1' || familleObjet=='01'">Acquisition de bâtiment </option>
                    <option value='option3' *ngIf="selectedFamilleObjet=='option1' ||familleObjet=='01'">Rénovation de bâtiment</option>
                    <option value='option4'*ngIf="selectedFamilleObjet=='option1' ||familleObjet=='01'">Acquisition de bâtiment + Rénovation de bâtiment</option>
                    <option value='option5'*ngIf="selectedFamilleObjet=='option1' || familleObjet=='01' || selectedFamilleObjet=='option2' ">Equipements favorisant l'efficacité énergétique et performance énergétique du bâtiment</option>
                    <option value='option6'*ngIf="selectedFamilleObjet=='option1' || selectedFamilleObjet=='option2' || selectedFamilleObjet=='option4' || familleObjet=='immobilier'">Stations de recharge pour véhicules électriques</option>
                    <option value='option7'*ngIf="selectedFamilleObjet=='option3' || selectedFamilleObjet=='option2'">Technologies liées aux énergies renouvelables</option>  
                  </select>
                 
                </div>
              </div>
            </div>
            <div class="row">
              
              <div class="col-lg-4 " *ngIf="hideFieldForm==false&&presenceObjet==true">
                <div class="form-group "  >
                <label for="input1">Object financé</label>
                <input type="text" class="form-control form-control-sm" id="input1" placeholder="Renovation ou aquisition" [(ngModel)]="objetFinance">
              </div>
              </div>
            
             <div class="col-lg-4 ">
                
                <div class="form-group " *ngIf="hideFieldForm==false">
                  <label for="categorieBatiment"> Nature du bien</label>&nbsp;<span class="required">*</span>
                  <select class="form-control form-control-sm"  [(ngModel)]="codeBatimentSelected" id="categorieBatiment" >
                    <option value='option0' selected > </option>
                    <option value='option1' selected > Résidentiel</option>
                    <option value='option2'  >Bureaux</option>
                    <option value='option3'>Bureaux IGH (hauteur >28 m)</option>
                    <option value='option4'>Hôtels</option>
                    <option value='option5'>Santé (centres hospitaliers, EHPAD, Etabl. Médicaux sociaux…)</option> 
                    <option value='option6'>Centres commerciaux</option>
                  </select>
                </div>
              </div> 
             
              <div class="col-lg-4">
                <div class="form-group" >
                  <label for="select2">Eligibilité au DPE </label>
                  <select class="form-control form-control-sm"  (mouseenter)="showDescription($event)" id="select2" [(ngModel)]="selectedType">
                    <option *ngFor="let option of options" [value]="option.value" [title]="option.description"> {{ option.label }}</option>
                  </select>
                </div>
                <div class="alertArea" *ngIf="showFirstEligiblite==true">  <img src="../../../assets/icons/alert.svg" class="imageErreur"  alt="image flèche haut" > {{messageAlert}}
                </div>
              </div>             
            </div>
          
                   
             <div class="row">
              <div class="col-lg-4">
                   <!-------------- champs nature du bien -------------------------------->
                <div class="form-group" *ngIf="hideFieldForm==false">
                  <label for="categorieBatiment">Etat du bien</label>&nbsp;<span class="required">*</span>
                
                  <select class="form-control form-control-sm" id="natureBien" name="natureBien" [(ngModel)]="selectedNatBatiment" >
               
                    <option value='option0' selected> </option>
                    <option value='option1'> Ancien</option>
                    <option value='option2'>Neuf</option>
            
                  </select>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group" *ngIf="hideFieldForm==false " >
                  <label for="dateDepot"> Date de dépôt de PC  <span class="required" *ngIf="selectedNatBatiment=='option2'"> *</span></label>
                  <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="dateDepot"  placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" />
                </div>
              </div>
              <div class="col-lg-4">
              <div  class="form-group" *ngIf="hideFieldForm==false  ">
                <label for="prixAquisitionBien" >Prix du bien <em> (en euro)</em> </label>  
                <span class="required"> *</span>
                <input type="text" [(ngModel)]="prixAquisitionBien"   class="form-control form-control-sm"  id=prixAquisitionBien  name="description" [disabled]="isFieldsDisabled" />
                
              </div>
            </div>
            </div>
            <div class="row">
              <div class="col-lg-4">
                <div  class="form-group"  *ngIf="hideFieldForm==false ">
                  <label for="montantFinance" >Montant financé  <em>(en euro)</em></label>
                  <span class="required"> *</span>        
                  <input type="text" [(ngModel)]="montantLclFinance"   class="form-control form-control-sm"  id=montantLclFinance  name="description" [disabled]="isFieldsDisabled" />
                  
                </div>
              </div>  
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div  class="form-group">
                  <label for="partLcl" >Part LCL <em> (en euro)</em></label>
                  <span class="required"> *</span>             
                  <input type="text" [(ngModel)]="partLcl"  class="form-control form-control-sm"  id=partLcl  name="description" [disabled]="isFieldsDisabled" />    
                </div>
              </div> 
              <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
                <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
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
            <div class="row">
              <div class="col-lg-4" *ngIf=" presenceadresse &&hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }">
                  
                      <label for="addressBien" ></label>
                      <input type="text" class="form-control form-control-sm" (ngModelChange)="onFieldChange()" placeholder="Adresse du bien" id="addressBien" [(ngModel)]="addresseBien" name="description" [disabled]="isFieldsDisabled" />
                      <div class="form-group">
                        <div  class="listeAdress">
                          <ul >
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
        <div class="col-lg-4">
          
        </div>

        <div class="col-lg-4"  *ngIf="hideFieldForm==false ">
          <div class="form-group" *ngIf="hideFieldForm==false"  [ngClass]="{ 'disabled': isFieldsDisabled }" >
            <label class="labelFormulaire" for="dpe">Siren du diagnostiqueur</label>

            <span class="required" *ngIf="selectedNatBatiment=='option1' || numeroDpeAdeme!=null" > *</span> 
             
            <input type="text" class="form-control form-control-sm" placeholder="Ex: 123456789"  id ="SirenDPE" [(ngModel)]="SirenDPE"   [disabled]="isFieldsDisabled" /> 
        </div>
        <div class="erreurDpe" *ngIf="hideFieldForm==false"   fxLayoutAlign="left center"  style="margin-top: -2px;">
      {{messageSiren}}
    </div>

        </div>
        
        

        <div class="col-lg-2"  *ngIf="hideFieldForm==false " >
          <div [ngClass]="{ 'disabled': isFieldsDisabled }">
            <label class="labelDPE" for="dpe">N° du DPE <span class="required" *ngIf="selectedNatBatiment=='option1'"> *</span></label>
            <input type="text" class="form-control form-control-sm" id="numeroDpeAdeme" placeholder="Ex: 2100E0981916Z" [(ngModel)]="numeroDpeAdeme"   [disabled]="isFieldsDisabled" />
            <div class="erreurDpe"  fxLayoutAlign="left center" >
              {{message}}
            </div>
            </div>
               
          
        </div>
        <div class="col-lg-2" *ngIf="hideFieldForm==false ">    
       <br><br>
          <img   src="../../../assets/images/search.png"  (click)="showAdemeResult(numeroDpeAdeme)" style=" width:20px; height: 20px;">  
        
        </div>

       </div>
      
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 
</div>
