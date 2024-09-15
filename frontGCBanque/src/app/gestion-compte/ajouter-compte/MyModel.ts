if (this.isfirstDebranchement) {
        // Si c'est le premier débranchement, ne pas appliquer la validation (pas de bordure rouge)
        return;
    }
private setObjetFinancementData(objetFinancement: ObjetFinancement): void {
    this.idObjetFinancement = objetFinancement.idObjetFinancement;
    this.familleObjet = objetFinancement.codeFamilleObjet;
    this.typeObjetFinancement = objetFinancement.codeObjetFinancement;
    
    // Assurez-vous que `isfirstDebranchement` est initialisé correctement
    this.isfirstDebranchement = objetFinancement.firstDisconnectionOfd ?? true; // Par défaut à true si non défini
}
