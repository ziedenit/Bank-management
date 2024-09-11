private restoreAlignementResultFromObject(index: number): void {
    const currentObject = this.extractedInitialFinancement.objetFinancement[index];

    // Si l'objet courant n'existe pas ou n'a pas encore d'alignement, quitter la méthode
    if (!currentObject || !currentObject.alignement) {
        this.resetAlignementResults();
        return;
    }

    // Restaurer les résultats d'alignement depuis l'objet de financement
    this.alignementContext = currentObject.alignement;
    this.alignementResultText = currentObject.alignementResultText || '';
    this.eligibiliteDpeMessage = currentObject.eligibiliteDpeMessage || '';

    // Restaurer l'état UI pour afficher les résultats d'alignement
    this.DpeResults = currentObject.DpeResults || false;
    this.elementResults = currentObject.elementResults || false;
    this.showBlocResult = currentObject.showBlocResult || false;
}
