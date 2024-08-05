ERROR TypeError: Cannot read properties of null (reading 'style')
    at push.hG0Z.FilArianeComponent.checkAndHighlightRequiredField (fil-ariane.component.ts:434:43)
    at push.hG0Z.FilArianeComponent.checkRequiredFields (fil-ariane.component.ts:388:10)
    at push.hG0Z.FilArianeComponent.onBreadcrumbClick (fil-ariane.component.ts:1010:8)
    at FilArianeComponent_ol_6_li_1_Template_a_click_1_listener (fil-ariane.component.html:17:42)
    at executeListenerWithErrorHandling (core.js:14994:16)
    at wrapListenerIn_markDirtyAndPreventDefault (core.js:15035:22)
    at HTMLAnchorElement.<anonymous> (dom_renderer.ts:66:34)
    at ZoneDelegate.invokeTask (zone.js:421:35)
    at Object.onInvokeTask (core.js:28289:33)
    at ZoneDelegate.invokeTask (zone.js:420:40)
private checkRequiredFields(responseFinancement: any): void {
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
        this.checkAndHighlightRequiredField(dpeActuel.estimationCep == null, "ValeurCEP");
        this.checkAndHighlightRequiredField(dpeActuel.estimationGes == null, "ValeurGES");
        this.checkAndHighlightRequiredField(bien.anneeConstruction == null, "anneeConstruction");
    }
    if (bien?.etatBien == "Neuf") {
        this.checkAndHighlightRequiredField(bien.dateDepotPc == null, "dateDepot");
		this.checkAndHighlightRequiredField(bien.dpeActuel.numeroDpe != null || bien.dpeActuel.numeroDpe !="" && bien.dpeActuel.sirenDiagnostiqueur == null, "SirenDPE");
    }
    this.checkAndHighlightRequiredField(bien && (bien.numeroNomRue == null || bien.numeroNomRue == ""), "numeroNomRue");
    this.checkAndHighlightRequiredField(bien && (bien.codePostal == null || bien.codePostal == ""), "codePostal");
    this.checkAndHighlightRequiredField(bien && (bien.nomCommune == null || bien.nomCommune == ""), "ville");
    this.checkAndHighlightRequiredField(responseFinancement.objetFinancement[0]?.codeObjetFinancement == null, "selectedObjetFinancement");
	this.checkAndHighlightRequiredField(
		responseFinancement.objetFinancement[0] != null &&
		responseFinancement.objetFinancement[0].bien != null &&
		(responseFinancement.objetFinancement[0].bien.etatBien == "Neuf" ||
			responseFinancement.objetFinancement[0].bien.etatBien == "Ancien") &&
		responseFinancement.objetFinancement[0].bien.surfaceBien == null,
		"SurfaceDuBien"
	);
}
