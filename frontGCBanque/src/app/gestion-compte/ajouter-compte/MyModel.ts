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
              
              
            </div>


            <div class="row">       
              <div class="col-lg-4 " *ngIf="hideFieldForm==false&&presenceObjet==false">
                <div  class="form-group"   >
                <label for="objetFinancementType" style="margin-top: 10px;" >Objet de financement </label>     &nbsp;<span class="required">*</span>
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


              <div class="col-lg-4 " *ngIf="hideFieldForm==false&&presenceObjet==true">
                <div class="form-group "  >
                <label for="input1">Object financé</label>
                <input type="text" class="form-control form-control-sm" id="input1" placeholder="Renovation ou aquisition" [(ngModel)]="objetFinance">
              </div>
              </div>
            
              <div class="col-lg-4">
                <div  class="form-group" *ngIf="hideFieldForm==false  ">
                  <label for="prixAquisitionBien" >Prix du bien <em> (en euro)</em> </label>  
                  <span class="required"> *</span>
                  <input type="text" [(ngModel)]="prixAquisitionBien"   class="form-control form-control-sm"  id=prixAquisitionBien  name="description" [disabled]="isFieldsDisabled" />               
                </div>
              </div>
             
              
   
              <div class="col-lg-4">
                <div class="form-group" *ngIf="hideFieldForm==false " >
                  <label for="dateDepot"> Date de dépôt de PC  <span class="required" *ngIf="selectedNatBatiment=='option2'"> *</span></label>
                  <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="dateDepot"  placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" />
                </div>
              </div>

            </div>
                   
             <div class="row">

              <div class="col-lg-4">
                <div class="form-group" >
                  <label for="select2">Eligibilité au DPE </label>
                  <select class="form-control form-control-sm"  (mouseenter)="showDescription($event)" id="select2" [(ngModel)]="selectedType">
                    <option *ngFor="let option of options" [value]="option.value" [title]="option.description"> {{ option.label }}</option>
                  </select>
                </div>
                <div class="alertArea" *ngIf="showFirstEligiblite==true">  <img src="../../../assets/icons/alerte.png" class="imageErreur"  alt="image flèche haut" > {{messageAlert}}
                </div>
              </div> 

              <div class="col-lg-4">
                <div  class="form-group"  *ngIf="hideFieldForm==false ">
                  <label for="montantFinance" >Montant financé  <em>(en euro)</em></label>
                  <span class="required"> *</span>        
                  <input type="text" [(ngModel)]="montantLclFinance"   class="form-control form-control-sm"  id=montantLclFinance  name="description" [disabled]="isFieldsDisabled" />
                  
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
              

              <div class="col-lg-4">
                <div class="form-group" *ngIf="hideFieldForm==false">
                  <label for="categorieBatiment">Etat du bien</label>&nbsp;<span class="required" >*</span>
                
                  <select class="form-control form-control-sm" id="natureBien" name="natureBien" [(ngModel)]="selectedNatBatiment" (change)="onChangeEtatBien()" >
               
                    <option value='option0' selected> </option>
                    <option value='option1'> Ancien</option>
                    <option value='option2'>Neuf</option>
            
                  </select>
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
                  <label class="labelFormulaire" for="dpe">Siren du diagnostiqueur</label>
      
                  <span class="required" *ngIf="selectedNatBatiment=='option1' || numeroDpeAdeme!=null" > *</span> 
                   
                  <input type="text" class="form-control form-control-sm" placeholder="Ex: 123456789"  id ="SirenDPE" [(ngModel)]="SirenDPE"   [disabled]="isFieldsDisabled" /> 
              </div>
              <div class="erreurDpe" *ngIf="hideFieldForm==false"   fxLayoutAlign="left center"  style="margin-top: -2px;">
            {{messageSiren}}
          </div>
      
          </div>
              
            

        
            </div >
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
        <!-- <div class="col-lg-4">         
        </div> -->

        <div class="col-lg-4 ">
                
          <div class="form-group " *ngIf="hideFieldForm==false">
            <label for="categorieBatiment"> Nature du bien</label>&nbsp;<span class="required">*</span>
            <select class="form-control form-control-sm"  [(ngModel)]="codeBatimentSelected" id="categorieBatiment" >
              <option value='option0' selected > </option>
              <option value='option1' > Résidentiel</option>
              <option value='option2'  >Bureaux</option>
              <option value='option3'>Bureaux IGH (hauteur >28 m)</option>
              <option value='option4'>Hôtels</option>
              <option value='option5'>Santé (centres hospitaliers, EHPAD, Etabl. Médicaux sociaux…)</option> 
              <option value='option6'>Centres commerciaux</option>
            </select>
          </div>
        </div> 

       
        <div class="col-lg-4"   > </div>

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
