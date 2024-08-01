<div class="container-fluid">  
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" *ngIf="showFileAriane==true">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" *ngFor="let objet of objetsFinancements; let i = index">
        <a [routerLink]=""
        queryParamsHandling="preserve" (click)="onBreadcrumbClick(i,objet)">Objet de financement {{ i + 1 }}</a>
      </li>
     
    </ol>
  </nav> 
  <div class="col-auto">
    <button class="btn btn-primary btn-sm " (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement  <img src="../../../assets/icons/plus.svg" /></button>

</div>
        maintenant j'ai ce code html je veux que le button soit a droit au niveau du div container fluid sachant que je peux clicker plusieurs foois pour ajouter un objet dans la file je veux que le container soit responsive et autre chose je veux que chaque elementObjet de financement {{ i + 1 }} de breadcrumb soit moderne sous  forme de design pentagone  
