<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" *ngFor="let objet of objetsFinancement; let i = index">
        <a [routerLink]=""
        queryParamsHandling="preserve" (click)="onBreadcrumbClick(i,objet)">Objet de financement {{ i + 1 }}</a>
      </li>
    </ol>
  </nav>

 

  <div class="row">
    <div class="col-12 d-flex flex-wrap">
      <div *ngFor="let objet of objetsFinancement; let i = index" style="width: 100%;">
        <div class="card border-0 m-2" style="width: 100%;" *ngIf="selectedObjetIndex === i">
          <div class="card-body">
            <!-- Le contenu de l'objet sélectionné -->
