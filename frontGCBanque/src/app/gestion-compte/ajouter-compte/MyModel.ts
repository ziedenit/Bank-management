private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
    if (!currentObject || !currentObject.bien) return;
    
    const bien = currentObject.bien;
    // Enregistrer l'état des pièces justificatives
    this.savePiecesJustificatives(currentObject);

    // Enregistrer les autres informations (prix, montant, etc.)
    bien.partLCL = this.partLcl;
    bien.montantFinanceLCL = this.montantLclFinance;
    bien.prixBien = this.prixAquisitionBien;
    bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;

    // Autres champs...
}

private savePiecesJustificatives(currentObject: ObjetFinancement): void {
    const pieces = currentObject.piecesJustificatives || [];

    // Gérer les pièces avec la méthode managePieceJustificative
    this.managePieceJustificative(pieces, 'DPE', this.isDpeChecked, this.numeroDpeAdeme);
    this.managePieceJustificative(pieces, 'Compromis de vente', this.isDpeChecked && this.selectedOptionJustif === 'Compromis de vente');
    this.managePieceJustificative(pieces, 'Norme thermique', this.isNormeThermiqueChecked);
    this.managePieceJustificative(pieces, 'Permis de construire', this.isDateDepotChecked);

    currentObject.piecesJustificatives = pieces;
}

private managePieceJustificative(pieces: Piece[], typePiece: string, isChecked: boolean, numeroDpe?: string): void {
    const existingPieceIndex = pieces.findIndex(piece => piece.typePiece === typePiece);
    if (isChecked) {
        if (existingPieceIndex === -1) {
            pieces.push({ typePiece, numeroDpe, id: null, dateCreation: new Date(), ... });
        }
    } else if (existingPieceIndex !== -1) {
        pieces.splice(existingPieceIndex, 1);
    }
}
//
