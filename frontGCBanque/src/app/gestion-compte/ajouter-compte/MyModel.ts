<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" *ngIf="showFileAriane == true" class="breadcrumb-nav">
    <ol class="breadcrumb-custom">
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index">
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
         <span>Objet de financement</span>  {{ i + 1 }}
        </a>
      </li>
    </ol>
    <div class="button-container">
      <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement
        <img src="../../../assets/icons/plus.svg" />
      </button>
    </div>
  </nav>
</div>
