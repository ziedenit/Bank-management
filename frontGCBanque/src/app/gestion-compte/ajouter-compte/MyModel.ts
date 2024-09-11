<div *ngIf="showConfirmDialog" class="confirm-dialog">
  <div class="confirm-dialog-content">
    <p>Êtes-vous sûr de vouloir supprimer cet objet de financement ?</p>
    <button (click)="confirmDelete(true)">Oui</button>
    <button (click)="confirmDelete(false)">Non</button>
  </div>
</div>
.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
export class AppComponent {
  showConfirmDialog = false;
  deleteIndex: number | null = null;

  removeBreadcrumbItem(index: number): void {
    // Affiche le pop-up de confirmation
    this.showConfirmDialog = true;
    this.deleteIndex = index;
  }

  confirmDelete(confirm: boolean): void {
    if (confirm && this.deleteIndex !== null) {
      // Supprimer l'élément si l'utilisateur a confirmé
      this.objetsFinancements.splice(this.deleteIndex, 1);
      if (this.objetsFinancements.length >= 1) {
        this.ajoutFinancementDisabled = false;
      }
      this.extractedInitialFinancement.objetFinancement = this.objetsFinancements;
    }
    // Réinitialise les variables
    this.showConfirmDialog = false;
    this.deleteIndex = null;
  }
}
<button class="close-btn" *ngIf="showDeleteIcon && manuallyAddedIndices.includes(i)" (click)="removeBreadcrumbItem(i)">x</button>
