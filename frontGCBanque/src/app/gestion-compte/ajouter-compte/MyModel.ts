checkAndHighlightRequiredField(condition, elementId) {
		console.log(this.isfirstDebranchement)
    if (condition && ! this.isfirstDebranchement) {
        this.champObligatoire = true;
        this.donneeObligatoire = 'Donnée obligatoire';
        document.getElementById(elementId).style.border = "1px solid red";
    } else {
        document.getElementById(elementId).style.removeProperty('border');
    }}
