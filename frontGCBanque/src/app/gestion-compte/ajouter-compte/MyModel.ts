core.js:5980  ERROR TypeError: Cannot read properties of null (reading 'style')
    at push.0JfT.MultiOfdComponent.checkAndHighlightRequiredField (multi-ofd.component.ts:553:43)
    at push.0JfT.MultiOfdComponent.checkRequiredFields (multi-ofd.component.ts:513:10)
    at push.0JfT.MultiOfdComponent.onBreadcrumbClick (multi-ofd.component.ts:1143:13)
    at MultiOfdComponent_li_7_Template_a_click_1_listener (multi-ofd.component.html:17:42)
    at executeListenerWithErrorHandling (core.js:14994:16)
    at wrapListenerIn_markDirtyAndPreventDefault (core.js:15035:22)
    at HTMLAnchorElement.<anonymous> (dom_renderer.ts:66:34)
    at ZoneDelegate.invokeTask (zone.js:421:35)
    at Object.onInvokeTask (core.js:28289:33)
    at ZoneDelegate.invokeTask (zone.js:420:40)
  checkAndHighlightRequiredField(condition, elementId) {
	console.log("condition")
	console.log(condition)
	console.log("this.isfirstDebranchement")
	console.log(this.isfirstDebranchement)
	console.log("elementId")
	console.log(elementId)
    if (condition && ! this.isfirstDebranchement) {
        this.champObligatoire = true;
        this.donneeObligatoire = 'Donnée obligatoire';
        document.getElementById(elementId).style.border = "1px solid red";
    } else {
        document.getElementById(elementId).style.removeProperty('border');
    }}
   this.checkAndHighlightRequiredField(bien && (bien.numeroNomRue == null || bien.numeroNomRue == ""), "numeroNomRue");
    this.checkAndHighlightRequiredField(bien && (bien.codePostal == null || bien.codePostal == ""), "codePostal");
    this.checkAndHighlightRequiredField(bien && (bien.nomCommune == null || bien.nomCommune == ""), "ville");
    this.checkAndHighlightRequiredField(responseFinancement.objetFinancement[index]?.codeObjetFinancement == null, "selectedObjetFinancement");
	this.checkAndHighlightRequiredField(
		responseFinancement.objetFinancement[index] != null &&responseFinancement.objetFinancement[index].bien != null &&
		(responseFinancement.objetFinancement[index].bien.etatBien == "Neuf" ||responseFinancement.objetFinancement[index].bien.etatBien == "Ancien") &&
		responseFinancement.objetFinancement[index].bien.surfaceBien == null,
		"SurfaceDuBien"
	);
