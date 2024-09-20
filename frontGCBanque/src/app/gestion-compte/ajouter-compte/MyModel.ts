checkPiecesJustificatives(treatedFinancement: Financement, index: number): void {
    const currentObject = treatedFinancement.objetFinancement[index];

    if (!currentObject || !currentObject.piecesJustificatives) return;

    // Vérifier la présence des pièces justificatives et mettre à jour les champs correspondants
    this.presenceJustifDPE = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'DPE');
    this.presenceJustifDateDepotPC = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
    this.presenceJustifNormeThermique = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');

    // Mise à jour des cases à cocher en fonction de la présence des pièces
    this.isDpeChecked = this.presenceJustifDPE;
    this.isDateDepotChecked = this.presenceJustifDateDepotPC;
    this.isNormeThermiqueChecked = this.presenceJustifNormeThermique;

    // Gérer les messages d'erreur pour les pièces manquantes
    if (!this.presenceJustifDPE) {
        this.errorDpeMessage = 'Justificatif DPE manquant';
    }
    if (!this.presenceJustifDateDepotPC) {
        this.errorDateDepotMessage = 'Justificatif de dépôt du permis de construire manquant';
    }
    if (!this.presenceJustifNormeThermique) {
        this.errorNormeThermiqueMessage = 'Justificatif Norme thermique manquant';
    }
}
