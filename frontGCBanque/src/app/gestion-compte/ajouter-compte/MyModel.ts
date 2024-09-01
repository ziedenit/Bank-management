checkAndHighlightRequiredField(condition, elementId) {
    console.log("condition");
    console.log(condition);
    console.log("this.isfirstDebranchement");
    console.log(this.isfirstDebranchement);
    console.log("elementId");
    console.log(elementId);

    const element = document.getElementById(elementId);
    if (element) {
        if (condition && !this.isfirstDebranchement) {
            this.champObligatoire = true;
            this.donneeObligatoire = 'Donnée obligatoire';
            element.style.border = "1px solid red";
        } else {
            element.style.removeProperty('border');
        }
    } else {
        console.error(`Element not found: ${elementId}`);
    }
}
