private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
  // Vérifier si les pièces justificatives existent déjà
  const existingDpePiece = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'DPE');
  const existingCompromisPiece = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
  const existingNormeThermiquePiece = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
  const existingPermisPiece = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');

  // --------- Gestion de la pièce DPE ---------
  if (this.isDpeChecked) {
    // Si coché et n'existe pas, ajouter la pièce DPE
    if (!existingDpePiece) {
      currentObject.piecesJustificatives.push({
        typePiece: "DPE",
        numeroDpe: this.numeroDpeAdeme,
        id: null,  // ou valeur réelle si existante
        origineCreation: '',
        dateCreation: new Date(),
        origineModification: '',
        dateModification: new Date(),
        idPiece: '',
        referenceGed: '',
        sousTypePiece: ''
      });
    }
  } else {
    // Si décoché et existe, supprimer la pièce DPE
    if (existingDpePiece) {
      currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== 'DPE');
    }
  }

  // --------- Gestion de la pièce Compromis de vente ---------
  if (this.isDpeChecked && this.selectedOptionJustif === "Compromis de vente") {
    // Si coché et n'existe pas, ajouter la pièce Compromis de vente
    if (!existingCompromisPiece) {
      currentObject.piecesJustificatives.push({
        typePiece: "Compromis de vente",
        id: null,  // ou valeur réelle si existante
        origineCreation: '',
        dateCreation: new Date(),
        origineModification: '',
        dateModification: new Date(),
        idPiece: '',
        referenceGed: '',
        sousTypePiece: ''
      });
    }
  } else {
    // Si décoché et existe, supprimer la pièce Compromis de vente
    if (existingCompromisPiece) {
      currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== 'Compromis de vente');
    }
  }

  // --------- Gestion de la pièce Norme thermique ---------
  if (this.isNormeThermiqueChecked) {
    if (!existingNormeThermiquePiece) {
      currentObject.piecesJustificatives.push({
        typePiece: "Norme thermique",
        id: null,
        origineCreation: '',
        dateCreation: new Date(),
        origineModification: '',
        dateModification: new Date(),
        idPiece: '',
        referenceGed: '',
        sousTypePiece: '',
        numeroDpe: '',
        dpeActuel: false
      });
    }
  } else {
    if (existingNormeThermiquePiece) {
      currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== 'Norme thermique');
    }
  }

  // --------- Gestion de la pièce Permis de construire ---------
  if (this.isDateDepotChecked) {
    if (!existingPermisPiece) {
      currentObject.piecesJustificatives.push({
        typePiece: "Permis de construire",
        id: null,
        origineCreation: '',
        dateCreation: new Date(),
        origineModification: '',
        dateModification: new Date(),
        idPiece: '',
        referenceGed: '',
        sousTypePiece: '',
        numeroDpe: '',  // ou valeur réelle si nécessaire
        dpeActuel: false
      });
    }
  } else {
    if (existingPermisPiece) {
      currentObject.piecesJustificatives = currentObject.piecesJustificatives.filter(piece => piece.typePiece !== 'Permis de construire');
    }
  }

  console.log('Updated pieces justificatives:', currentObject.piecesJustificatives);
}
