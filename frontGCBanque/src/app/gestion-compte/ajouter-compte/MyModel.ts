<div class="container-fluid">
  <div class="row mt-3">
    <div class="col-12 breadcrumb-container">
      <div class="breadcrumb-item" *ngFor="let objet of objetsDeFinancement; let i = index" (click)="selectObjetFinancement(objet)">
        <div class="breadcrumb-content">
          <h3 class="d-inline-block font-weight-bold">Objet {{i + 1}}</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-3" *ngFor="let selectedObjetFinancement of objetsDeFinancement; let i = index">
    <div class="col-12">
      <div class="card border-0">
        <div class="card-body">
          <div class="blockSize">
            <h3 class="d-inline-block font-weight-bold">Objet de financement {{i + 1}}</h3>
            <span class="float-right">
              <img *ngIf="selectedObjetFinancement.hiddenObjetfinancement == false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataObjetFinancement(selectedObjetFinancement)">
              <img *ngIf="selectedObjetFinancement.hiddenObjetfinancement == true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataObjetFinancement(selectedObjetFinancement)">
            </span>
            <div *ngIf="selectedObjetFinancement.elementObjetfinancement == true">
              <div class="row">
                <div class="col-lg-4" *ngIf="!selectedObjetFinancement.selectedFamilleObjet">
                  <div class="form-group">
                    <label for="familleObjet">Famille objet de financement</label>
                    <span class="required">*</span>
                    <select class="form-control form-control-sm" id="familleObjet" [(ngModel)]="selectedObjetFinancement.selectedFamilleObjet">
                      <option value="option0" selected></option>
                      <option value="option1">Immobilier</option>
                      <option value="option2">Installation, maintenance et réparation d'équipement/technologie liés aux bâtiments</option>
                      <option value="option3">Énergies renouvelables</option>
                      <option value="option4">Transport</option>
                      <option value="option5">Autres</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-4" *ngIf="selectedObjetFinancement.selectedFamilleObjet && !selectedObjetFinancement.selectedObjetFinancement">
                  <label for="familleContext">Famille objet de financement</label>
                  <span class="required">*</span>
                  <input type="text" class="form-control form-control-sm" [(ngModel)]="selectedObjetFinancement.familleObjetText" id="familleContext">
                </div>
                <div class="col-lg-4" *ngIf="!selectedObjetFinancement.selectedObjetFinancement">
                  <div class="form-group">
                    <label for="objetFinancementType">Objet de financement</label>
                    <span class="required">*</span>
                    <select [(ngModel)]="selectedObjetFinancement.selectedObjetFinancement" class="form-control form-control-sm" id="objetFinancementType">
                      <option value="option0" selected></option>
                      <option value="option1" *ngIf="selectedObjetFinancement.selectedFamilleObjet === 'option1'">Construction de bâtiment</option>
                      <option value="option2" *ngIf="selectedObjetFinancement.selectedFamilleObjet === 'option1'">Acquisition de bâtiment</option>
                      <option value="option3" *ngIf="selectedObjetFinancement.selectedFamilleObjet === 'option1'">Rénovation de bâtiment</option>
                      <option value="option4" *ngIf="selectedObjetFinancement.selectedFamilleObjet === 'option1'">Acquisition de bâtiment + Rénovation de bâtiment</option>
                      <option value="option5" *ngIf="selectedObjetFinancement.selectedFamilleObjet === 'option1' || selectedObjetFinancement.selectedFamilleObjet === 'option2'">Equipements favorisant l'efficacité énergétique et performance énergétique du bâtiment</option>
                      <option value="option6" *ngIf="selectedObjetFinancement.selectedFamilleObjet === 'option1' || selectedObjetFinancement.selectedFamilleObjet === 'option2' || selectedObjetFinancement.selectedFamilleObjet === 'option4'">Stations de recharge pour véhicules électriques</option>
                      <option value="option7" *ngIf="selectedObjetFinancement.selectedFamilleObjet === 'option3' || selectedObjetFinancement.selectedFamilleObjet === 'option2'">Technologies liées aux énergies renouvelables</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4" *ngIf="selectedObjetFinancement.selectedObjetFinancement">
                  <div class="form-group">
                    <label for="input1">Objet financé</label>
                    <input type="text" class="form-control form-control-sm" id="input1" placeholder="Renovation ou acquisition" [(ngModel)]="selectedObjetFinancement.objetFinance">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="categorieBatiment">Nature du bien</label>
                    <span class="required">*</span>
                    <select class="form-control form-control-sm" [(ngModel)]="selectedObjetFinancement.codeBatimentSelected" id="categorieBatiment">
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
                    <label for="select2">Eligibilité au DPE</label>
                    <select class="form-control form-control-sm" (mouseenter)="showDescription($event)" id="select2" [(ngModel)]="selectedObjetFinancement.selectedType">
                      <option *ngFor="let option of options" [value]="option.value" [title]="option.description">{{ option.label }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="natureBien">Etat du bien</label>
                    <span class="required">*</span>
                    <select class="form-control form-control-sm" [(ngModel)]="selectedObjetFinancement.selectedNatBatiment" id="natureBien">
                      <option value="option0" selected></option>
                      <option value="option1">Ancien</option>
                      <option value="option2">Neuf</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="dateDepot">Date de dépôt de PC</label>
                    <span class="required" *ngIf="selectedObjetFinancement.selectedNatBatiment === 'option2'">*</span>
                    <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="selectedObjetFinancement.dateDepot" placeholder="yyyy/MM/dd">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="prixAquisitionBien">Prix du bien (en euro)</label>
                    <span class="required">*</span>
                    <input type="number" class="form-control form-control-sm" id="prixAquisitionBien" [(ngModel)]="selectedObjetFinancement.prixAquisitionBien">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="montantLclFinance">Montant financé par LCL</label>
                    <span class="required">*</span>
                    <input type="number" class="form-control form-control-sm" id="montantLclFinance" [(ngModel)]="selectedObjetFinancement.montantLclFinance">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="partLcl">Part de LCL dans l'acquisition</label>
                    <span class="required">*</span>
                    <input type="number" class="form-control form-control-sm" id="partLcl" [(ngModel)]="selectedObjetFinancement.partLcl">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="dureeFinancement">Durée de financement (en année)</label>
                    <span class="required">*</span>
                    <input type="number" class="form-control form-control-sm" id="dureeFinancement" [(ngModel)]="selectedObjetFinancement.dureeFinancement">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="dateLivraison">Date de livraison du bien</label>
                    <input type="date" class="form-control form-control-sm" id="dateLivraison" [(ngModel)]="selectedObjetFinancement.dateLivraison" placeholder="yyyy/MM/dd">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="estimationSurface">Surface estimée</label>
                    <input type="number" class="form-control form-control-sm" id="estimationSurface" [(ngModel)]="selectedObjetFinancement.estimationSurface">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="puissanceEnKwc">Puissance en kwc</label>
                    <input type="number" class="form-control form-control-sm" id="puissanceEnKwc" [(ngModel)]="selectedObjetFinancement.puissanceEnKwc">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="dateMiseEnService">Date de mise en service</label>
                    <input type="date" class="form-control form-control-sm" id="dateMiseEnService" [(ngModel)]="selectedObjetFinancement.dateMiseEnService" placeholder="yyyy/MM/dd">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="montantInstallationHt">Montant installation HT</label>
                    <input type="number" class="form-control form-control-sm" id="montantInstallationHt" [(ngModel)]="selectedObjetFinancement.montantInstallationHt">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="tauxAutoConsommation">Taux d'autoconsommation</label>
                    <input type="number" class="form-control form-control-sm" id="tauxAutoConsommation" [(ngModel)]="selectedObjetFinancement.tauxAutoConsommation">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="dateSignatureAchat">Date de signature d'achat</label>
                    <input type="date" class="form-control form-control-sm" id="dateSignatureAchat" [(ngModel)]="selectedObjetFinancement.dateSignatureAchat" placeholder="yyyy/MM/dd">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="dateRemboursement">Date de remboursement</label>
                    <input type="date" class="form-control form-control-sm" id="dateRemboursement" [(ngModel)]="selectedObjetFinancement.dateRemboursement" placeholder="yyyy/MM/dd">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="montantTva">Montant TVA</label>
                    <input type="number" class="form-control form-control-sm" id="montantTva" [(ngModel)]="selectedObjetFinancement.montantTva">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="montantHtTravaux">Montant HT travaux</label>
                    <input type="number" class="form-control form-control-sm" id="montantHtTravaux" [(ngModel)]="selectedObjetFinancement.montantHtTravaux">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="montantHtEnergieRenouvelable">Montant HT énergie renouvelable</label>
                    <input type="number" class="form-control form-control-sm" id="montantHtEnergieRenouvelable" [(ngModel)]="selectedObjetFinancement.montantHtEnergieRenouvelable">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group">
                    <label for="montantHtTransport">Montant HT transport</label>
                    <input type="number" class="form-control form-control-sm" id="montantHtTransport" [(ngModel)]="selectedObjetFinancement.montantHtTransport">
                  </div>
                </div>
              </div>

              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" [(ngModel)]="selectedObjetFinancement.worksNature" id="inlineRadio1" value="option1">
                <label class="form-check-label" for="inlineRadio1">Travaux publics</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" [(ngModel)]="selectedObjetFinancement.worksNature" id="inlineRadio2" value="option2">
                <label class="form-check-label" for="inlineRadio2">Travaux privés</label>
              </div>

              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions2" [(ngModel)]="selectedObjetFinancement.landsType" id="inlineRadio3" value="option3">
                <label class="form-check-label" for="inlineRadio3">Terrains publics</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions2" [(ngModel)]="selectedObjetFinancement.landsType" id="inlineRadio4" value="option4">
                <label class="form-check-label" for="inlineRadio4">Terrains privés</label>
              </div>
            </div>
          </div>
          <button class="btn btn-primary mt-3" (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement</button>
        </div>
      </div>
    </div>
  </div>
</div>
