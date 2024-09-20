private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
    if (!currentObject || !currentObject.bien) return;

    const bien = currentObject.bien;

    // Traitement pour "part LCL"
    bien.partLCL = this.partLcl !== null && !isNaN(this.partLcl) ? this.partLcl : null;

    // Traitement pour "montant financé LCL"
    bien.montantFinanceLCL = this.montantLclFinance !== null && !isNaN(this.montantLclFinance) ? this.montantLclFinance : null;

    // Assurez-vous de bien faire la même chose pour les autres champs qui peuvent être touchés
    bien.prixBien = this.prixAquisitionBien !== null && !isNaN(this.prixAquisitionBien) ? this.prixAquisitionBien : null;

    // Continuez avec le reste des champs normalement
}
