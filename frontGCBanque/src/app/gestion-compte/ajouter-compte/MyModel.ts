checkAndHighlightRequiredField(condition, elementId) {
    console.log(this.isfirstDebranchement);
    const element = document.getElementById(elementId);
    
    if (element) {  // Vérifiez si l'élément existe
        if (condition && !this.isfirstDebranchement) {
            this.champObligatoire = true;
            this.donneeObligatoire = 'Donnée obligatoire';
            element.style.border = "1px solid red";
        } else {
            element.style.removeProperty('border');
        }
    } else {
        console.warn(`Element with id ${elementId} not found.`);
    }
}
