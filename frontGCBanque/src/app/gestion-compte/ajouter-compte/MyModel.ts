<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" *ngIf="showFileAriane == true" class="breadcrumb-nav">
    <ol class="breadcrumb-custom">
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index">
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
          {{ i + 1 }} <span>Objet de financement</span>
        </a>
      </li>
    </ol>
  </nav>
  <div class="col-auto text-end button-container">
    <button class="btn btn-primary btn-sm" (click)="ajouterObjetFinancement()">Ajouter un nouvel objet de financement
      <img src="../../../assets/icons/plus.svg" />
    </button>
  </div>
</div>
.container-fluid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.breadcrumb-nav {
  flex: 1;
  padding-right: 10px; /* Adjust the padding to give some space to the button */
}

.breadcrumb-custom {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  background-color: #007bff; /* Fond bleu clair */
  border-radius: 4px;
  overflow: hidden;
}

.breadcrumb-item-custom {
  position: relative;
  padding: 5px 15px; /* Reduced padding for thinner height */
  background: #007bff; /* Fond bleu clair */
  color: #000; /* Écriture noire */
  text-align: center;
  border-right: 1px solid #0056b3;
  font-size: 12px; /* Taille de police plus petite */
  flex: 1; /* S'assurer que les items prennent toute la largeur */
}

.breadcrumb-item-custom a {
  color: #000; /* Écriture noire */
  text-decoration: none;
}

.breadcrumb-item-custom span {
  display: block;
}

.breadcrumb-item-custom:first-child {
  border-radius: 4px 0 0 4px;
}

.breadcrumb-item-custom:last-child {
  border-radius: 0 4px 4px 0;
  border-right: none;
}

.breadcrumb-item-custom:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 0;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 15px solid transparent; /* Adjust height for thinner breadcrumb */
  border-bottom: 15px solid transparent; /* Adjust height for thinner breadcrumb */
  border-left: 10px solid #007bff; /* Fond bleu clair */
  z-index: 1;
}

.breadcrumb-item-custom:not(:first-child)::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  width: 0;
  height: 0;
  border-top: 15px solid transparent; /* Adjust height for thinner breadcrumb */
  border-bottom: 15px solid transparent; /* Adjust height for thinner breadcrumb */
  border-left: 10px solid white;
  z-index: 2;
}

.breadcrumb-item-custom a:hover {
  background-color: #0056b3; /* Couleur de survol */
  color: white;
}

.breadcrumb-item-custom a:hover::after {
  border-left-color: #0056b3; /* Couleur de survol */
}

.breadcrumb-item-custom a:hover::before {
  border-left-color: white;
}

.breadcrumb-item-custom a.active {
  background-color: #0056b3; /* Couleur active */
  color: white;
}

.text-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.button-container {
  padding-left: 10px; /* Add padding to separate button from breadcrumb */
}
