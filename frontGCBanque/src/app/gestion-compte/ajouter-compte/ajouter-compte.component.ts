import { Component, OnInit } from '@angular/core';
import { ObjetFinancement } from '../model/objetFinancement';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private multiObjetService: MultiObjetService) {}

  ngOnInit(): void {
    this.idFinancement = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];

    if (this.Url_Retour_Base64) {
      this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);
    }

    this.multiObjetService.getListeObjetsFinancement(this.idFinancement).subscribe(objets => {
      this.objetsFinancements = objets;
      console.log(objets);
    });
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
}
<div class="container-fluid">
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
        (selectedObjetFinancement)="onObjetFinancementSelected($event)">
      </app-type-objet-financement>
  
      <div class="row">
        <div class="col-12">
          <div class="card border-0">
            <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px #b1bfeb;">
              <div class="blockSize">
                <h3 class="d-inline-block font-weight-bold" style="font-size: 17px;">Objet de financement</h3>
                <span class="float-right">
                  <img *ngIf="!hiddenObjetfinancement" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataObjetFinancement()">
                  <img *ngIf="hiddenObjetfinancement" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataObjetFinancement()">
                </span>
                <div *ngIf="elementObjetfinancement">
                  <div class="row">
                    <div class="col-lg-4" *ngIf="!hideFieldForm && typeObjetFinancement">
                      <div class="form-group">
                        <div class="custom-label">
                          <label for="input1">Objet financé</label>
                          <input type="text" disabled class="form-control form-control-sm disable-cursor" id="input1" [(ngModel)]="selectedObjet.objetFinance">
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
                                 (ngModelChange)="onPriceChange($event)"
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
                          <input type="date" class="form-control form-control-sm" id="dateDepot" [(ngModel)]="selectedObjet.dateDepot" placeholder="yyyy/MM/dd" [disabled]="isFieldsDisabled" />
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
   Error: ../fil-ariane/fil-ariane.component.html:13:17 - error TS2339: Property 'selectedObjet' does not exist on type 'FilArianeComponent'.

13     <div *ngIf="selectedObjet">
                   ~~~~~~~~~~~~~

  ../fil-ariane/fil-ariane.component.ts:8:16
    8   templateUrl: './fil-ariane.component.html',
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component FilArianeComponent.
                                
