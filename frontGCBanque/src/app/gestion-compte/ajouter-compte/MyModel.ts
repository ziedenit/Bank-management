import { Component } from '@angular/core';

@Component({
  selector: 'app-financement',
  templateUrl: './financement.component.html',
  styleUrls: ['./financement.component.css']
})
export class FinancementComponent {
  objetsDeFinancement: any[] = [];
  hiddenObjetfinancement = false;

  ajouterObjetFinancement() {
    this.objetsDeFinancement.push({
      selectedFamilleObjet: '',
      selectedObjetFinancement: '',
      familleObjetText: '',
      objetFinance: '',
      codeBatimentSelected: '',
      selectedType: '',
      selectedNatBatiment: '',
      dateDepot: '',
      prixAquisitionBien: '',
      montantLclFinance: '',
      partLcl: '',
      normeThermique: '',
      addresseBien: '',
      addresseBienCodePostal: '',
      addresseBienVille: '',
      SirenDPE: '',
      numeroDpeAdeme: ''
    });
  }

  toggleObjetFinancement() {
    this.hiddenObjetfinancement = !this.hiddenObjetfinancement;
  }

  showDescription(event: any) {
    // Handle mouseenter event for description tooltip
  }

  onFieldChange() {
    // Handle field change event
  }

  selectAddres(result: any) {
    // Handle address selection
  }

  showAdemeResult(numeroDpeAdeme: string) {
    // Handle search for Ademe result
  }
}
//
<div class="container-fluid">
  <div class="row">
    <div class="col-12">
      <div class="ajoutFinancement">
        <button mat-stroked-button (click)="ajouterObjetFinancement()">
          <img src="../../../assets/icons/plus.svg" />
          &nbsp; ajouter un objet de financement
        </button>
      </div>
    </div>
  </div>

  <div class="row" *ngFor="let objet of objetsDeFinancement; let i = index">
    <div class="col-12">
      <div class="card border-0">
        <div class="card-body">
          <div class="blockSize">
            <h3 class="d-inline-block font-weight-bold">Objet de financement {{i + 1}}</h3>
            <span class="float-right">
              <img *ngIf="hiddenObjetfinancement == false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="toggleObjetFinancement()">
              <img *ngIf="hiddenObjetfinancement == true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="toggleObjetFinancement()">
            </span>
            <div *ngIf="!hiddenObjetfinancement">
              <div class="row">
                <div class="col-lg-4" *ngIf="!objet.selectedFamilleObjet">
                  <div class="form-group">
                    <label for="familleObjet{{i}}">Famille objet de financement</label>
                    <span class="required">*</span>
                    <select class="form-control form-control-sm" id="familleObjet{{i}}" [(ngModel)]="objet.selectedFamilleObjet">
                      <option value="option0" selected></option>
                      <option value="option1">Immobilier</option>
                      <option value="option2">Installation, maintenance et réparation d'équipement/technologie liés aux bâtiments</option>
                      <option value="option3">Énergies renouvelables</option>
                      <option value="option4">Transport</option>
                      <option value="option5">Autres</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-4" *ngIf="objet.selectedFamilleObjet && !objet.selectedObjetFinancement">
                  <label for="familleContext{{i}}">Famille objet de financement</label>
                  <span class="required">*</span>
                  <input type="text" class="form-control form-control-sm" [(ngModel)]="objet.familleObjetText" id="familleContext{{i}}">
                </div>
                <div class="col-lg-4" *ngIf="!objet.selectedObjetFinancement">
                  <div class="form-group">
                    <label for="objetFinancementType{{i}}">Objet de financement</label>
                    <span class="required">*</span>
                    <select [(ngModel)]="objet.selectedObjetFinancement" class="form-control form-control-sm" id="objetFinancementType{{i}}">
                      <option value="option0" selected></option>
                      <option value="option1" *ngIf="objet.selectedFamilleObjet === 'option1'">Construction de bâtiment</option>
                      <option value="option2" *ngIf="objet.selectedFamilleObjet === 'option1'">Acquisition de bâtiment</option>
                      <option value="option3" *ngIf="objet.selectedFamilleObjet === 'option1'">Rénovation de bâtiment</option>
                      <option value="option4" *ngIf="objet.selectedFamilleObjet === 'option1'">Acquisition de bâtiment + Rénovation de bâtiment</option>
                      <option value="option5" *ngIf="objet.selectedFamilleObjet === 'option1' || objet.selectedFamilleObjet === 'option2'">Equipements favorisant l'efficacité énergétique et performance énergétique du bâtiment</option>
                      <option value="option6" *ngIf="objet.selectedFamilleObjet === 'option1' || objet.selectedFamilleObjet === 'option2' || objet.selectedFamilleObjet === 'option4'">Stations de recharge pour véhicules électriques</option>
                      <option value="option7" *ngIf="objet.selectedFamilleObjet === 'option3' || objet.selectedFamilleObjet === 'option2'">Technologies liées aux énergies renouvelables</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4" *ngIf="objet.selectedObjetFinancement">
                  <div class="form-group">
                    <label for="input1{{i}}">Object financé</label>
                    <input type="text" class="form-control form-control-sm" id="input1{{i}}" placeholder="Renovation ou aquisition" [(ngModel)]="objet.objetFinance">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="categorieBatiment{{i}}">Nature du bien</label>
                    <span class="required">*</span>
                    <select class="form-control form-control-sm" [(ngModel)]="objet.codeBatimentSelected" id="categorieBatiment{{i}}">
                      <option value="option0" selected></option>
                      <option value="option1">Résidentiel</option>
                      <option value="option2">Bureaux</option>
                      <option value="option3">Bureaux IGH (hauteur >28 m)</option>
                      <option value="option4">Hôtels</option>
                      <option value="option5">Santé (centres hospitaliers, EHPAD, Etabl. Médicaux sociaux…)</option>
                      <option value="option6">Centres commerciaux</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="select2{{i}}">Eligibilité au DPE</label>
                    <select class="form-control form-control-sm" (mouseenter)="showDescription($event)" id="select2{{i}}" [(ngModel)]="objet.selectedType">
                      <option *ngFor="let option of options" [value]="option.value" [title]="option.description">{{ option.label }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="natureBien{{i}}">Etat du bien</label>
                    <span class="required">*</span>
                    <select class="form-control form-control-sm" [(ngModel)]="objet.selectedNatBatiment" id="natureBien{{i}}">
                      <option value="option0" selected></option>
                      <option value="option1">Ancien</option>
                      <option value="option2">Neuf</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="dateDepot{{i}}">Date de dépôt de PC</label>
                    <span class="required" *ngIf="objet.selectedNatBatiment === 'option2'">*</span>
                    <input type="date" class="form-control form-control-sm" id="dateDepot{{i}}" [(ngModel)]="objet.dateDepot" placeholder="yyyy/MM/dd">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="prixAquisitionBien{{i}}">Prix du bien (en euro)</label>
                    <span class="required">*</span>
                    <input type="number" class="form-control form-control-sm" id="prixAquisitionBien{{i}}" [(ngModel)]="objet.prixAquisitionBien">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="montantLclFinance{{i}}">Montant financé par LCL</label>
                    <span class="required">*</span>
                    <input type="number" class="form-control form-control-sm" id="montantLclFinance{{i}}" [(ngModel)]="objet.montantLclFinance">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="partLcl{{i}}">Part de LCL dans l'acquisition</label>
                    <span class="required">*</span>
                    <input type="number" class="form-control form-control-sm" id="partLcl{{i}}" [(ngModel)]="objet.partLcl">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="normeThermique{{i}}">Norme thermique</label>
                    <select class="form-control form-control-sm" id="normeThermique{{i}}" [(ngModel)]="objet.normeThermique">
                      <option value="option0" selected></option>
                      <option value="option1">RT 2005</option>
                      <option value="option2">RT 2012</option>
                      <option value="option3">RT 2012 - 10%</option>
                      <option value="option4">RT 2012 - 20%</option>
                      <option value="option5">BBC rénovation</option>
                      <option value="option6">THPE</option>
                      <option value="option7">NF HABITAT HQE</option>
                      <option value="option8">NF HABITAT HQE - 10%</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="addresseBien{{i}}">Adresse du bien</label>
                    <input type="text" class="form-control form-control-sm" id="addresseBien{{i}}" placeholder="Address" [(ngModel)]="objet.addresseBien">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="addresseBienCodePostal{{i}}">Code postal du bien</label>
                    <input type="text" class="form-control form-control-sm" id="addresseBienCodePostal{{i}}" placeholder="Code Postal" [(ngModel)]="objet.addresseBienCodePostal">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="addresseBienVille{{i}}">Ville du bien</label>
                    <input type="text" class="form-control form-control-sm" id="addresseBienVille{{i}}" placeholder="Ville" [(ngModel)]="objet.addresseBienVille">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="SirenDPE{{i}}">N° Siren du diagnostiqueur DPE</label>
                    <input type="text" class="form-control form-control-sm" id="SirenDPE{{i}}" [(ngModel)]="objet.SirenDPE">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="numeroDpeAdeme{{i}}">N° DPE ADEME</label>
                    <input type="text" class="form-control form-control-sm" id="numeroDpeAdeme{{i}}" [(ngModel)]="objet.numeroDpeAdeme">
                    <button class="btn btn-primary" (click)="showAdemeResult(objet.numeroDpeAdeme)">Chercher</button>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-secondary" (click)="onFieldChange()">Mettre à jour</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
//
.ajoutFinancement button {
  margin-top: 20px;
}

.blockSize {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
}

.card {
  margin-bottom: 20px;
}

.required {
  color: red;
}

.float-right {
  float: right;
}

img {
  cursor: pointer;
}
