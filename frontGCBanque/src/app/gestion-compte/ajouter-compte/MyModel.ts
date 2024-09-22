saveCurrentAlignment(index: number) {
    const currentAlignement = this.extractedInitialFinancement.objetFinancement[index].alignement;
    if (!currentAlignement.resultAlignText) {
        this.extractedInitialFinancement.objetFinancement[index].alignement.resultAlignText = this.alignementResultText;
    }
}
