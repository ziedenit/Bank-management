<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb-custom">
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index">
        <a [routerLink]=""
          queryParamsHandling="preserve"
          (click)="onBreadcrumbClick(i)">
          <span>Objet de financement</span> {{ i + 1 }}
        </a>
        <button class="close-btn" *ngIf="manuallyAddedIndices.includes(i)" (click)="removeBreadcrumbItem(i)">x</button>
      </li>
    </ol>
    <div class="button-container">
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()" [disabled]="ajoutFinancementDisabled">
        Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
</div>

<!-- Contenu pour chaque objet de financement -->
<div class="container-fluid" *ngFor="let objet of objetsFinancements; let i = index">
  <div class="row">
    <div class="col-12">
      <div class="card border-0">
        <div class="card-body" style="border: 1px solid #b1bfeb; box-shadow: 0 2px 10px  #b1bfeb;">
          <div class="blockSize">
            <h3 class="d-inline-block font-weight-bold" style="font-size: 17px;">Objet de financement {{ i + 1 }}</h3>
            <span class="float-right">
              <img *ngIf="hiddenObjetfinancement==false" src="../../../assets/icons/arrow-up.svg" alt="Fleche haut" (click)="hideDataObjetFinancement()">
              <img *ngIf="hiddenObjetfinancement==true" src="../../../assets/icons/arrow-down.svg" alt="Fleche bas" (click)="showDataObjetFinancement()">
            </span>
            <!-- Le formulaire de données pour chaque objet de financement -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
