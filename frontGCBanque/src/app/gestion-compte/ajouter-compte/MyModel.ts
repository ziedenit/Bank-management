private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
    if (!currentObject || !currentObject.bien) return;

    const bien = currentObject.bien;
    const dpeActuel = bien.dpeActuel || new Dpe();
    
    // Sauvegarder toutes les valeurs actuelles du formulaire dans l'objet bien
    bien.partLCL = this.partLcl || null;
    bien.montantFinanceLCL = this.montantLclFinance || null;
    bien.prixBien = this.prixAquisitionBien || null;
    bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
    bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique);
    
    // DPE
    dpeActuel.sirenDiagnostiqueur = this.SirenDPE || null;
    dpeActuel.numeroDpe = this.numeroDpeAdeme || null;
    bien.dpeActuel = dpeActuel;

    // Sauvegarder les autres champs du formulaire dans bien
    bien.etatBien = this.getCodeEtatBien(this.selectedNatBatiment);
    bien.codeBatiment = this.getCodeEtatBatiment(this.codeBatimentSelected);
    bien.surfaceBien = this.formGroup.get('surfaceBien').value || null;
    bien.dpeActuel.estimationCep = this.formGroup.get('valeurCep').value || null;
    bien.dpeActuel.estimationGes = this.formGroup.get('valeurGes').value || null;
    bien.numeroNomRue = this.formGroup.get('numeroNomRue').value || null;
    bien.codePostal = this.formGroup.get('codePostal').value || null;
    bien.nomCommune = this.formGroup.get('ville').value || null;
    bien.dpeActuel.dateEtablissementDpe = this.formGroup.get('dateDiangnostique').value || null;
    bien.anneeConstruction = this.formGroup.get('anneeConstruction').value || null;
    bien.typeBatiment = this.formGroup.get('typeBatiment').value || null;
    bien.dpeActuel.classeCep = this.formGroup.get('lettreCEP').value || null;
    bien.dpeActuel.classeGes = this.formGroup.get('lettreGES').value || null;
    bien.typeEnergie = this.formGroup.get('energieType').value || null;

    // Vérifier et mettre à jour les pièces justificatives
    currentObject.piecesJustificatives = this.updatePiecesJustificatives(currentObject.piecesJustificatives);
}

private updatePiecesJustificatives(pieces: Piece[]): Piece[] {
    // Créer ou mettre à jour les pièces en fonction des cases cochées
    if (this.isDpeChecked) {
        this.addOrUpdatePiece(pieces, 'DPE', this.numeroDpeAdeme);
    } else {
        pieces = this.removePiece(pieces, 'DPE');
    }

    if (this.isDateDepotChecked) {
        this.addOrUpdatePiece(pieces, 'Permis de construire');
    } else {
        pieces = this.removePiece(pieces, 'Permis de construire');
    }

    if (this.isNormeThermiqueChecked) {
        this.addOrUpdatePiece(pieces, 'Norme thermique');
    } else {
        pieces = this.removePiece(pieces, 'Norme thermique');
    }

    return pieces;
}

private addOrUpdatePiece(pieces: Piece[], typePiece: string, numeroDpe?: string) {
    let piece = pieces.find(p => p.typePiece === typePiece);
    if (!piece) {
        piece = new Piece();
        piece.typePiece = typePiece;
        pieces.push(piece);
    }
    if (numeroDpe) {
        piece.numeroDpe = numeroDpe;
    }
}

private removePiece(pieces: Piece[], typePiece: string): Piece[] {
    return pieces.filter(p => p.typePiece !== typePiece);
}
