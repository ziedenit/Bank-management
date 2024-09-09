private saveCurrentObjectValues(currentObject: ObjetFinancement) {
    if (this.isDpeChecked) {
        const newPiece = new Piece();
        newPiece.typePiece = this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente";
        newPiece.dpeActuel = this.selectedOptionJustif === "DPE";
        newPiece.numeroDpe = this.numeroDpeAdeme;
        currentObject.piecesJustificatives.push(newPiece);
    }

    if (this.isNormeThermiqueChecked) {
        const newPiece = new Piece();
        newPiece.typePiece = "Norme thermique";
        currentObject.piecesJustificatives.push(newPiece);
    }

    if (this.isDateDepotChecked) {
        const newPiece = new Piece();
        newPiece.typePiece = "Permis de construire";
        currentObject.piecesJustificatives.push(newPiece);
    }
}
