<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" *ngFor="let objet of objetsFinancement; let i = index">
        Objet de financement {{ i + 1 }}
      </li>
    </ol>
  </nav>

  <div class="row">
    <div class="col-auto">
      <div class="ajoutFinancement">
        <button mat-stroked-button (click)="ajouterObjetFinancement()">
          <img src="../../../assets/icons/plus.svg" />
          &nbsp; ajouter un objet de financement
        </button>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12 d-flex flex-wrap">
      <div class="card border-0 m-2" *ngFor="let objet of objetsFinancement; let i = index" style="width: 18rem;">
        <div class="card-body">
          <div class="blockSize">
            <h3 class="d-inline-block font-weight-bold">Objet de financement {{ i + 1 }}</h3>
            <span class="float-right">
              <img *ngIf="!objet.hiddenObjetfinancement" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="objet.hiddenObjetfinancement = !objet.hiddenObjetfinancement">
              <img *ngIf="objet.hiddenObjetfinancement" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="objet.hiddenObjetfinancement = !objet.hiddenObjetfinancement">
            </span>
            <div *ngIf="!objet.hiddenObjetfinancement">
              <div class="row">
                <!-- champs famille non envoyé dans le context -->
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm && !objet.presenceFamilleObjet && !objet.presenceObjet">
                  <div class="form-group">
                    <label for="familleObjet{{i}}">Famille objet de financement </label>&nbsp;<span class="required">*</span>
                    <select class="form-control form-control-sm" id="familleObjet{{i}}" [(ngModel)]="objet.selectedFamilleObjet">
                      <option value='option0' selected> </option>
                      <option value='option1'>Immobilier </option>
                      <option value='option2'>Installation, maintenance et réparation d'équipement/technologie liés aux bâtiments</option>
                      <option value='option3'>Énergies renouvelables </option>
                      <option value='option4'>Transport </option>
                      <option value='option5'>Autres </option>
                    </select>
                  </div>
                </div>
                <!-- autres champs... -->
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm && objet.presenceFamilleObjet && !objet.presenceObjet">
                  <label for="familleContext{{i}}">Famille objet de financement</label>&nbsp;<span class="required">*</span>
                  <input type="text" class="form-control form-control-sm" [(ngModel)]="objet.familleObjetText" id="familleObjetText{{i}}" name="ObjectFinance"/> 
                </div>

                <div class="col-lg-12" *ngIf="!objet.hideFieldForm && !objet.presenceObjet">
                  <div class="form-group">
                    <label for="objetFinancementType{{i}}" style="margin-top: 10px;">Objet de financement </label>&nbsp;<span class="required">*</span>
                    <select [(ngModel)]="objet.selectedObjetFinancement" class="form-control form-control-sm" id="objetFinancementType{{i}}" name="selectedObjetFinancement">
                      <option value='option0' selected> </option>
                      <option value='option1' *ngIf="objet.selectedFamilleObjet=='option1'">Construction de bâtiment </option>
                      <option value='option2' *ngIf="objet.selectedFamilleObjet=='option1'">Acquisition de bâtiment </option>
                      <option value='option3' *ngIf="objet.selectedFamilleObjet=='option1'">Rénovation de bâtiment</option>
                      <option value='option4' *ngIf="objet.selectedFamilleObjet=='option1'">Acquisition de bâtiment + Rénovation de bâtiment</option>
                      <option value='option5' *ngIf="objet.selectedFamilleObjet=='option1' || objet.selectedFamilleObjet=='option2'">Equipements favorisant l'efficacité énergétique et performance énergétique du bâtiment</option>
                      <option value='option6' *ngIf="objet.selectedFamilleObjet=='option1' || objet.selectedFamilleObjet=='option2'">Stations de recharge pour véhicules électriques</option>
                      <option value='option7' *ngIf="objet.selectedFamilleObjet=='option3' || objet.selectedFamilleObjet=='option2'">Technologies liées aux énergies renouvelables</option>
                    </select>
                  </div>
                </div>
                <!-- autres champs... -->
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm && objet.presenceObjet">
                  <div class="form-group">
                    <label for="input1{{i}}">Object financé</label>
                    <input type="text" class="form-control form-control-sm" id="input1{{i}}" placeholder="Renovation ou aquisition" [(ngModel)]="objet.objetFinance">
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group" *ngIf="!objet.hideFieldForm">
                    <label for="prixAquisitionBien{{i}}">Prix du bien <em>(en euro)</em></label>
                    <span class="required"> *</span>
                    <input type="text" [(ngModel)]="objet.prixAquisitionBien" class="form-control form-control-sm" id="prixAquisitionBien{{i}}" name="description" [disabled]="objet.isFieldsDisabled"/>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group" *ngIf="!objet.hideFieldForm">
                    <label for="dateDepot{{i}}">Date de dépôt de PC <span class="required" *ngIf="objet.selectedNatBatiment=='option2'"> *</span></label>
                    <input type="date" class="form-control form-control-sm" id="dateDepot{{i}}" [(ngModel)]="objet.dateDepot" placeholder="yyyy/MM/dd" [disabled]="objet.isFieldsDisabled"/>
                  </div>
                </div>
                <!-- Autres champs... -->
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group">
                    <label for="select2{{i}}">Eligibilité au DPE</label>
                    <select class="form-control form-control-sm" id="select2{{i}}" [(ngModel)]="objet.selectedType">
                      <option *ngFor="let option of options" [value]="option.value" [title]="option.description">{{ option.label }}</option>
                    </select>
                  </div>
                  <div class="alertArea" *ngIf="objet.showFirstEligiblite">
                    <img src="../../../assets/icons/alerte.png" class="imageErreur" alt="image flèche haut">{{messageAlert}}
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group" *ngIf="!objet.hideFieldForm">
                    <label for="montantFinance{{i}}">Montant financé <em>(en euro)</em></label>
                    <span class="required"> *</span>
                    <input type="text" [(ngModel)]="objet.montantLclFinance" class="form-control form-control-sm" id="montantFinance{{i}}" name="description" [disabled]="objet.isFieldsDisabled"/>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group" *ngIf="!objet.hideFieldForm">
                    <label for="normeThermique{{i}}">Norme thermique du bien</label>
                    <select [(ngModel)]="objet.normeThermique" class="form-control form-control-sm" id="normeThermique{{i}}" name="normeThermique">
                      <option value="option0"></option>
                      <option value="option1">RT 2012</option>
                      <option value="option2">RT 2020</option>
                      <option value="option3">RT existante</option>
                      <option value="option4">Autre</option>
                    </select>
                  </div>
                </div>
                <!-- autres champs... -->
              </div>
              <div class="row">
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm">
                  <label for="selectedNatBatiment{{i}}">Nature bâtiment</label>
                  <span class="required"> *</span>
                  <select [(ngModel)]="objet.selectedNatBatiment" class="form-control form-control-sm" id="selectedNatBatiment{{i}}" name="selectedNatBatiment" [disabled]="objet.isFieldsDisabled">
                    <option value='option0' selected> </option>
                    <option value='option1'>Neuf </option>
                    <option value='option2'>Ancien </option>
                  </select>
                </div>
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm">
                  <label for="sirenDPE{{i}}">SIREN de l'évaluateur DPE </label>
                  <span class="required"> *</span>
                  <input type="text" class="form-control form-control-sm" id="sirenDPE{{i}}" [(ngModel)]="objet.SirenDPE" name="sirenDPE" placeholder="SIREN de l'évaluateur DPE" [disabled]="objet.isFieldsDisabled">
                </div>
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm">
                  <label for="addresseBien{{i}}">Adresse du bien</label>
                  <span class="required"> *</span>
                  <input type="text" class="form-control form-control-sm" id="addresseBien{{i}}" [(ngModel)]="objet.addresseBien" name="addresseBien" placeholder="Adresse du bien" [disabled]="objet.isFieldsDisabled">
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm">
                  <label for="codePostalBien{{i}}">Code postal du bien</label>
                  <span class="required"> *</span>
                  <input type="text" class="form-control form-control-sm" id="codePostalBien{{i}}" [(ngModel)]="objet.addresseBienCodePostal" name="addresseBienCodePostal" placeholder="Code postal du bien" [disabled]="objet.isFieldsDisabled">
                </div>
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm">
                  <label for="villeBien{{i}}">Ville du bien</label>
                  <span class="required"> *</span>
                  <input type="text" class="form-control form-control-sm" id="villeBien{{i}}" [(ngModel)]="objet.addresseBienVille" name="addresseBienVille" placeholder="Ville du bien" [disabled]="objet.isFieldsDisabled">
                </div>
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm">
                  <label for="codeBatimentSelected{{i}}">Code bâtiment</label>
                  <input type="text" class="form-control form-control-sm" id="codeBatimentSelected{{i}}" [(ngModel)]="objet.codeBatimentSelected" name="codeBatimentSelected" placeholder="Code bâtiment" [disabled]="objet.isFieldsDisabled">
                </div>
                <div class="col-lg-12" *ngIf="!objet.hideFieldForm">
                  <label for="numeroDpeAdeme{{i}}">Numéro DPE ADEME</label>
                  <input type="text" class="form-control form-control-sm" id="numeroDpeAdeme{{i}}" [(ngModel)]="objet.numeroDpeAdeme" name="numeroDpeAdeme" placeholder="Numéro DPE ADEME" [disabled]="objet.isFieldsDisabled">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
//
       .card {
  margin: 1rem;
}

.blockSize {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.alertArea {
  margin-top: 1rem;
}

.breadcrumb-item {
  display: inline-block;
  margin-right: 0.5rem;
}
             
