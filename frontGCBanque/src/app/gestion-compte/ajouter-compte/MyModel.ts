<div *ngIf="showConfirmDialog" class="confirm-dialog">
  <div class="confirm-dialog-content">
    <p>Êtes-vous sûr de vouloir supprimer cet objet ?</p>
    <button mat-raised-button color="primary" class="confirm-btn" (click)="confirmDelete(true)">Oui</button>
    <button mat-raised-button color="warn" class="confirm-btn" (click)="confirmDelete(false)">Non</button>
  </div>
</div>
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
////////////////////////////
removeBreadcrumbItem(index: number): void {
    this.objetsFinancements.splice(index, 1);
    const manuallyAddedIndex = this.manuallyAddedIndices.indexOf(index);
    if (manuallyAddedIndex > -1) {
      this.manuallyAddedIndices.splice(manuallyAddedIndex, 1);
    }
    if (this.selectedObjetIndex >= index) {
      this.selectedObjetIndex = Math.max(this.selectedObjetIndex - 1, 0);
    }
    this.applyBusinessRules(this.extractedInitialFinancement, this.selectedObjetIndex); // Recalculer les règles métier après suppression
  }
je veux adapter la deuxieme methode 
