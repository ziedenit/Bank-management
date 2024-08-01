<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" *ngIf="showFileAriane == true">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" *ngFor="let objet of objetsFinancements; let i = index">
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
          Objet de financement {{ i + 1 }}
        </a>
      </li>
    </ol>
  </nav>
  <div class="col-auto text-end">
    <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement
      <img src="../../../assets/icons/plus.svg" />
    </button>
  </div>
</div>
