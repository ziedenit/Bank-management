private saveAlignementResultInObject(index: number): void {
    const currentObjet = this.extractedInitialFinancement.objetFinancement[index];

    if (!currentObjet) return;

    // Sauvegarder les résultats d'alignement dans l'objet de financement
    currentObjet.alignement = this.alignementContext;

    // Sauvegarder les autres données nécessaires pour le bloc de résultats
    currentObjet.alignementResultText = this.alignementResultText;
    currentObjet.eligibiliteDpeMessage = this.eligibiliteDpeMessage;

    // Si vous avez des indicateurs pour l'état du bloc de résultats, stockez-les aussi
    currentObjet.showBlocResult = this.showBlocResult;
    currentObjet.DpeResults = this.DpeResults;
    currentObjet.elementResults = this.elementResults;
}
