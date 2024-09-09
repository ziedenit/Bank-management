 private saveCurrentObjectValues(currentObject: ObjetFinancement)
.......
if (this.isDpeChecked) {
			currentObject.piecesJustificatives.push({
            typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
            dpeActuel: this.selectedOptionJustif === "DPE",
            numeroDpe: this.numeroDpeAdeme
          });
        }    
        if (this.isNormeThermiqueChecked) {
			currentObject.piecesJustificatives.push({ typePiece: "Norme thermique" });
        }
        if (this.isDateDepotChecked) {
			currentObject.piecesJustificatives.push({ typePiece: "Permis de construire" });
        }
Argument of type '{ typePiece: string; dpeActuel: boolean; numeroDpe: string; }' is not assignable to parameter of type 'Piece'.
  Type '{ typePiece: string; dpeActuel: boolean; numeroDpe: string; }' is missing the following properties from type 'Piece': id, origineCreation, dateCreation, origineModification, and 4 more.
