	checkPiecesJustificatives(responseFinancement) {		
		if (responseFinancement.objetFinancement[0] != null && responseFinancement.objetFinancement[0].piecesJustificatives != null) {
			this.presenceJustifDPE = responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'DPE')
			|| responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
			this.presenceJustifDateDepotPC=responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
			this.presenceJustifNormeThermique=responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
		}
		if(this.presenceJustifDPE && responseFinancement.objetFinancement[0].bien.dpeActuel!=null){
		this.isDpe= responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'DPE');
		this.isCompromis=responseFinancement.objetFinancement[0].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
		
		if(this.isDpe){this.selectedOptionJustif='DPE'}
		if(this.isCompromis){this.selectedOptionJustif='Compromis de vente'}
		this.isDpeChecked=true
		}
		if(!this.presenceJustifDPE && responseFinancement.objetFinancement[0].bien.dpeActuel!=null  && responseFinancement.objetFinancement[0].bien.dpeActuel.numeroDpe!=null){this.errorDpeMessage='Justificatif DPE manquant'}	
		if(this.presenceJustifDateDepotPC)
		{this.isDateDepotChecked=true;  this.isNormeThermiqueChecked=true; 
		}
		if(!this.presenceJustifDateDepotPC &&responseFinancement.objetFinancement[0].bien.dateDepotPc!=null)
		{this.errorDateDepotMessage='Justificatif attestant de la date de dépôt du permis de construire manquant';}
		if(this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC){this.isNormeThermiqueChecked=true }
		if(!this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC && !this.errorDateDepotMessage 
			&&responseFinancement.objetFinancement[0].bien.codeNormeThermique!=null){this.errorNormeThermiqueMessage='Justificatif Norme thermique manquant'}
}
private checkRequiredFields(responseFinancement: Financement): void {
    const bien = responseFinancement.objetFinancement[0]?.bien;
    const dpeActuel = bien?.dpeActuel;
    this.checkAndHighlightRequiredField(bien && bien.etatBien == null, "natureBien");
    this.checkAndHighlightRequiredField(bien && bien.codeBatiment == null, "categorieBatiment");
    this.checkAndHighlightRequiredField(bien && bien.partLCL == null, "partLcl");
    this.checkAndHighlightRequiredField(bien && bien.prixBien == null, "prixAquisitionBien");
    this.checkAndHighlightRequiredField(bien && bien.montantFinanceLCL == null, "montantLclFinance");	
    if (bien?.etatBien == "Ancien" && dpeActuel) {
        this.checkAndHighlightRequiredField(dpeActuel.numeroDpe == null || dpeActuel.numeroDpe == "", "numeroDpeAdeme");
        this.checkAndHighlightRequiredField(dpeActuel.sirenDiagnostiqueur == null || (dpeActuel.numeroDpe != null && dpeActuel.sirenDiagnostiqueur == null), "SirenDPE");
        this.checkAndHighlightRequiredField(dpeActuel.classeCep == null || dpeActuel.classeCep == "", "LettreCEP");
        this.checkAndHighlightRequiredField(dpeActuel.classeGes == null || dpeActuel.classeGes == "", "LettreGES");
		this.checkAndHighlightRequiredField((dpeActuel.classeCep == null || dpeActuel.classeCep == "" ) && (this.hideFieldCEP), "LettreCEPlist");
        this.checkAndHighlightRequiredField((dpeActuel.classeGes == null || dpeActuel.classeGes == "") && this.hideFieldGES, "lettreGeslist");
        this.checkAndHighlightRequiredField(dpeActuel.estimationCep == null, "ValeurCEP");
        this.checkAndHighlightRequiredField(dpeActuel.estimationGes == null, "ValeurGES");
        this.checkAndHighlightRequiredField(bien.anneeConstruction == null, "anneeConstruction");
    }
    if (bien?.etatBien == "Neuf") {
        this.checkAndHighlightRequiredField(bien.dateDepotPc == null, "dateDepot");
		console.log ("popopopopopopopop", bien.dpeActuel.numeroDpe, bien.dpeActuel.sirenDiagnostiqueur)
		this.checkAndHighlightRequiredField(bien.dpeActuel.numeroDpe != null&& bien.dpeActuel.sirenDiagnostiqueur == null, "SirenDPE");
    }
    this.checkAndHighlightRequiredField(bien && (bien.numeroNomRue == null || bien.numeroNomRue == ""), "numeroNomRue");
    this.checkAndHighlightRequiredField(bien && (bien.codePostal == null || bien.codePostal == ""), "codePostal");
    this.checkAndHighlightRequiredField(bien && (bien.nomCommune == null || bien.nomCommune == ""), "ville");
    this.checkAndHighlightRequiredField(responseFinancement.objetFinancement[0]?.codeObjetFinancement == null, "selectedObjetFinancement");
	this.checkAndHighlightRequiredField(
		responseFinancement.objetFinancement[0] != null &&responseFinancement.objetFinancement[0].bien != null &&
		(responseFinancement.objetFinancement[0].bien.etatBien == "Neuf" ||responseFinancement.objetFinancement[0].bien.etatBien == "Ancien") &&
		responseFinancement.objetFinancement[0].bien.surfaceBien == null,
		"SurfaceDuBien"
	);
}
