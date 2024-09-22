/* Styles pour l'élément sélectionné */
.breadcrumb-item-custom.selected {
  background-color: #0056b3; /* Bleu foncé */
  color: white; /* Couleur du texte en blanc */
  border-radius: 5px; /* Bordures arrondies */
}
<li class="breadcrumb-item-custom"
    *ngFor="let objet of objetsFinancements; let i = index"
    [class.selected]="selectedObjetIndex === i">
  <a [routerLink]=""
     queryParamsHandling="preserve"
     (click)="onBreadcrumbClick(i)">
    <span>Objet de financement</span>  {{ i + 1 }}
  </a>
  <button class="close-btn"
          *ngIf="showDeleteIcon && manuallyAddedIndices.includes(i)"
          (click)="removeBreadcrumbItem(i)">x</button>
</li>
