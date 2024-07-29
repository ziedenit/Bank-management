<div class="col-auto">
  <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()">
    Ajouter un nouvel objet de financement <img src="../../../assets/icons/plus.svg" />
  </button>
</div>

	  import { Component, OnInit } from '@angular/core';
import { ObjetFinancement } from '../model/objetFinancement';
import { ActivatedRoute } from '@angular/router';
import { MultiObjetService } from '../services/multi-objet.service';

@Component({
  selector: 'app-fil-ariane',
  templateUrl: './fil-ariane.component.html',
  styleUrls: ['./fil-ariane.component.scss']
})
export class FilArianeComponent implements OnInit {
  idFinancement: string;
  Url_Retour_Base64: string;
  Url_Retour_Utf8: string;
  objetsFinancements: ObjetFinancement[] = [];
  selectedObjet: ObjetFinancement | null = null;
  codeApplicatifOrigine: string;
  idRepers: string;
  typeObjetFinancement: string;
  hideFieldForm: boolean = false;

  // Tableau pour stocker l'historique des changements
  historiqueChangements: ObjetFinancement[] = [];

  constructor(private route: ActivatedRoute, private multiObjetService: MultiObjetService) {}

  ngOnInit(): void {
    this.idFinancement = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];

    if (this.Url_Retour_Base64) {
      this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
    }

    this.multiObjetService.getListeObjetsFinancement(this.idFinancement).subscribe(objets => {
      this.objetsFinancements = objets;
      this.historiqueChangements = [...objets]; // Initialisez l'historique avec les objets existants
    });
  }

  ajouterObjetFinancement(): void {
    const nouvelObjet: ObjetFinancement = {
      selectedFamilleObjet: '',
      familleObjetText: '',
      selectedObjetFinancement: '',
      objetFinance: '',
      prixAquisitionBien: '',
      dateDepot: '',
      selectedType: '',
      montantLclFinance: '',
      normeThermique: '',
      selectedNatBatiment: '',
      partLcl: '',
      SirenDPE: '',
      addresseBien: '',
      addresseBienCodePostal: '',
      addresseBienVille: '',
      codeBatimentSelected: '',
      numeroDpeAdeme: '',
      hideFieldForm: false,
      presenceFamilleObjet: false,
      presenceObjet: false,
      hiddenObjetfinancement: false
    };

    this.objetsFinancements.push(nouvelObjet);
    this.historiqueChangements.push({ ...nouvelObjet }); // Ajouter l'objet à l'historique
  }

  onBreadcrumbClick(index: number, objet: ObjetFinancement): void {
    this.selectedObjet = objet;
    this.codeApplicatifOrigine = objet.codeApplicatifOrigine;
    this.idRepers = objet.idRepers;
    this.typeObjetFinancement = objet.typeObjetFinancement;
  }

  onFamilleSelected(event: any): void {
    // Logique pour gérer l'événement
  }

  onObjetFinancementSelected(event: any): void {
    // Logique pour gérer l'événement
  }

  // Méthode pour mettre à jour l'historique des changements
  updateHistorique(): void {
    if (this.selectedObjet) {
      const index = this.historiqueChangements.findIndex(objet => objet === this.selectedObjet);
      if (index > -1) {
        this.historiqueChangements[index] = { ...this.selectedObjet };
      }
    }
  }
}
//
<div class="container-fluid">
  <div class="col-auto">
    <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()">
      Ajouter un nouvel objet de financement <img src="../../../assets/icons/plus.svg" />
    </button>
  </div>

  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" *ngFor="let objet of objetsFinancements; let i = index">
        <a href="javascript:void(0)" (click)="onBreadcrumbClick(i, objet)">
          Objet de financement {{ i + 1 }}
        </a>
      </li>
    </ol>
  </nav>

  <div *ngIf="selectedObjet">
    <app-client [codeApplicatifOrigine]="codeApplicatifOrigine" [idRepers]="idRepers"></app-client>

    <app-type-objet-financement 
      [typeObjetFinancement]="typeObjetFinancement"
      [hideFieldForm]="hideFieldForm"
      (selectedFamilleObjet)="onFamilleSelected($event)"
      (selectedObjetFinancement)="onObjetFinancementSelected($event)"
      (ngModelChange)="updateHistorique()">
    </app-type-objet-financement>

    <div class="row">
      <div class="col-12">
        <div class="card border-0">
          <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px #b1bfeb;">
            <div class="blockSize">
              <h3 class="d-inline-block font-weight-bold" style="font-size: 17px;">Objet de financement</h3>
              <span class="float-right">
                <img *ngIf="!hideFieldForm" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideFieldForm = true">
                <img *ngIf="hideFieldForm" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="hideFieldForm = false">
              </span>
              <div *ngIf="selectedObjet">
                <div class="row">
                  <div class="col-lg-4" *ngIf="!hideFieldForm && typeObjetFinancement">
                    <div class="form-group">
                      <div class="custom-label">
                        <label for="input1">Objet financé</label>
                        <input type="text" class="form-control form-control-sm" id="input1" [(ngModel)]="selectedObjet.objetFinance" (ngModelChange)="updateHistorique()">
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4" *ngIf="!typeObjetFinancement"></div>
                  <div class="col-lg-4">
                    <div class="form-group" *ngIf="!hideFieldForm">
                      <div class="custom-label">
                        <label for="prixAquisitionBien">Prix du bien <em>(en euro)</em></label>
                        <span class="required"> *</span>
                        <input type="text"
                               [ngModel]="selectedObjet.prixAquisitionBien | number:'1.0-2':'fr'"
                               (ngModelChange)="updateHistorique()"
                               class="form-control form-control-sm"
                               id="prixAquisitionBien"
                               name="description"
                               [disabled]="isFieldsDisabled" />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group" *ngIf="!hideFieldForm">
                      <div class="custom-label">
                        <label for="dateDepot">Date de dépôt de permis de construire <span class="required" *ngIf="selectedNatBatiment=='option2'"> *</span></label>
                        <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="selectedObjet.dateDepot" placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" (ngModelChange)="updateHistorique()" />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Ajoutez les champs restants de la même manière en les liant aux propriétés selectedObjet -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
