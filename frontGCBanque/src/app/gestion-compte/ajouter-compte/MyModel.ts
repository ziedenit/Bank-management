private setObjetFinancementProperties(objetFinancement: any): void {
    if (!objetFinancement || !objetFinancement.bien) return;
    
    switch (objetFinancement.codeObjetFinancement) {
        case "02":
            this.objetFinance = "Acquisition de bâtiment";
            break;
        case "03":
            this.objetFinance = "Rénovation de bâtiment";
            this.depExist = true;
            break;
        default:
            this.objetFinance = "";
            break;
    }

    const bien = objetFinancement.bien;

    if (bien.eligibleDpe && this.eligibleDpeMapping[bien.eligibleDpe]) {
        this.selectedType = this.eligibleDpeMapping[bien.eligibleDpe].type;
        this.hideFieldForm = this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm;
    } else {
        this.selectedType = null;
        this.hideFieldForm = false;
    }

    this.selectedNatBatiment = bien.etatBien ? this.etatBienMapping[bien.etatBien] : null;
    this.codeBatimentSelected = bien.codeBatiment ? this.codeBatimentMapping[bien.codeBatiment] : null;
    this.partLcl = bien.partLCL || 0;
    this.montantLclFinance = bien.montantFinanceLCL || 0;
    this.prixAquisitionBien = bien.prixBien || 0;

    this.dateDepot = bien.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
    this.normeThermique = bien.codeNormeThermique ? this.codeNormeThermiqueMapping[bien.codeNormeThermique] : null;
    this.SirenDPE = bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur ? bien.dpeActuel.sirenDiagnostiqueur : null;
    this.numeroDpeAdeme = bien.dpeActuel && bien.dpeActuel.numeroDpe ? bien.dpeActuel.numeroDpe : null;

    if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
        this.DpeResults = true;
        this.alignementResultText = this.alignementMapping[objetFinancement.alignement.topAlignement];
    } else {
        this.DpeResults = false;
        this.alignementResultText = "";
    }
}
  if (!currentObjet) {
        console.error("currentObjet est indéfini");
        return;
    }
