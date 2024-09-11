private resetAlignementResults(): void {
    // Réinitialiser tous les résultats d'alignement à un état vide
    this.alignementContext = null;
    this.alignementResultText = '';
    this.eligibiliteDpeMessage = '';

    // Réinitialiser l'état UI
    this.DpeResults = false;
    this.elementResults = false;
    this.showBlocResult = false;
}
