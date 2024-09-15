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
} par defaut il applique cette méthode en appelant checkRequiredFields dans le ng on init pour l'objet 0 et moi j'ai ajouté [ngClass]="{'field-error': partLcl == null || partLcl == 0}" apparament il applique par defaut lors du premier apel dans le ng on init meme en appelant la méthode checkAndHighlightRequiredField ca ne le supprime pas 
