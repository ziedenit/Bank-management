removeBreadcrumbItem(index: number): void {
  // Affiche la boîte de dialogue de confirmation et enregistre l'index
  this.showConfirmDialog = true;
  this.deleteIndex = index;
}

confirmDelete(confirm: boolean): void {
  if (confirm && this.deleteIndex !== null) {
    // Si l'utilisateur confirme, supprimez l'objet de financement
    this.objetsFinancements.splice(this.deleteIndex, 1);
    
    // Recalculer les règles métier après la suppression
    if (this.selectedObjetIndex >= this.deleteIndex) {
      this.selectedObjetIndex = Math.max(this.selectedObjetIndex - 1, 0);
    }
    
    // Appliquer les règles métier après la suppression
    this.applyBusinessRules(this.extractedInitialFinancement, this.selectedObjetIndex);
    
    // Réactiver le bouton d'ajout si nécessaire
    if (this.objetsFinancements.length >= 1) {
      this.ajoutFinancementDisabled = false;
    }
    
    // Mettre à jour la liste des objets dans l'objet de financement principal
    this.extractedInitialFinancement.objetFinancement = this.objetsFinancements;
  }
  // Fermer la boîte de dialogue de confirmation et réinitialiser les variables
  this.showConfirmDialog = false;
  this.deleteIndex = null;
}
