<div class="container-fluid">
  <!-- File d'Ariane pour les objets de financement -->
  <nav aria-label="breadcrumb" *ngIf="showFileAriane == true">
    <ol class="breadcrumb-custom">
      <li class="breadcrumb-item-custom" *ngFor="let objet of objetsFinancements; let i = index">
        <a [routerLink]=""
          queryParamsHandling="preserve" (click)="onBreadcrumbClick(i, objet)">
          {{ i + 1 }} <span>Objet de financement</span>
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
.breadcrumb-custom {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
}

.breadcrumb-item-custom {
  position: relative;
  padding: 10px 20px;
  background: #e9ecef;
  color: #495057;
  text-align: center;
  border-right: 1px solid #dee2e6;
  font-size: 14px; /* Taille de police plus petite */
  flex: 1; /* S'assurer que les items prennent toute la largeur */
}

.breadcrumb-item-custom a {
  color: #007bff; /* Couleur bleu clair */
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
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 10px solid #e9ecef;
  z-index: 1;
}

.breadcrumb-item-custom:not(:first-child)::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 10px solid white;
  z-index: 2;
}

.breadcrumb-item-custom a:hover {
  background-color: #00aaff; /* Bleu clair */
  color: white;
}

.breadcrumb-item-custom a:hover::after {
  border-left-color: #00aaff; /* Bleu clair */
}

.breadcrumb-item-custom a:hover::before {
  border-left-color: white;
}

.breadcrumb-item-custom a.active {
  background-color: #00aaff; /* Bleu clair */
  color: white;
}

.text-end {
  text-align: end;
}

.button-container {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
