// Ajout d'une pièce de type DPE ou Compromis de vente
if (this.isDpeChecked) {
    // Vérifier si une pièce de type DPE ou Compromis de vente existe déjà
    const existingDpe = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'DPE' || piece.typePiece === 'Compromis de vente');
    
    if (!existingDpe) {
        currentObject.piecesJustificatives.push({
            typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
            dpeActuel: this.selectedOptionJustif === "DPE",
            numeroDpe: this.numeroDpeAdeme,
            id: undefined,
            origineCreation: '',
            dateCreation: undefined,
            origineModification: '',
            dateModification: undefined,
            idPiece: '',
            referenceGed: '',
            sousTypePiece: ''
        });
    }
}

// Ajout d'une pièce de type Norme thermique
if (this.isNormeThermiqueChecked) {
    // Vérifier si une pièce de type "Norme thermique" existe déjà
    const existingNormeThermique = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
    
    if (!existingNormeThermique) {
        currentObject.piecesJustificatives.push({
            typePiece: "Norme thermique",
            id: undefined,
            origineCreation: '',
            dateCreation: undefined,
            origineModification: '',
            dateModification: undefined,
            idPiece: '',
            referenceGed: '',
            sousTypePiece: '',
            numeroDpe: '',
            dpeActuel: false
        });
        console.log("isNormeThermiqueChecked");
    }
}

// Ajout d'une pièce de type Permis de construire
if (this.isDateDepotChecked) {
    // Vérifier si une pièce de type "Permis de construire" existe déjà
    const existingPermisDeConstruire = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
    
    if (!existingPermisDeConstruire) {
        currentObject.piecesJustificatives.push({
            typePiece: "Permis de construire",
            id: undefined,
            origineCreation: '',
            dateCreation: undefined,
            origineModification: '',
            dateModification: undefined,
            idPiece: '',
            referenceGed: '',
            sousTypePiece: '',
            numeroDpe: '',
            dpeActuel: false
        });
    }
}
