private restoreAlignementResultFromObject(index: number): void {
    const currentObjet = this.extractedInitialFinancement.objetFinancement[index];

    if (!currentObjet) return;

    // Restaurer les résultats d'alignement depuis l'objet de financement
    this.alignementContext = currentObjet.alignement;
    this.alignementResultText = currentObjet.alignementResultText;
    this.eligibiliteDpeMessage = currentObjet.eligibiliteDpeMessage;

    // Restaurer l'état UI pour le bloc de résultats
    this.showBlocResult = currentObjet.showBlocResult;
    this.DpeResults = currentObjet.DpeResults;
    this.elementResults = currentObjet.elementResults;
}
