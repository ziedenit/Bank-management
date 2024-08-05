private updateCurrentObjetData(): void {
    const currentObjet = this.objetsFinancements[this.selectedObjetIndex];

    if (!currentObjet) {
        console.error("currentObjet est indéfini");
        return;
    }

    if (!currentObjet.bien) {
        currentObjet.bien = {};
    }

    if (!currentObjet.bien.dpeActuel) {
        currentObjet.bien.dpeActuel = {};
    }

    // Mettre à jour les propriétés de currentObjet
    currentObjet.bien.eligibleDpe = this.selectedType;
    currentObjet.bien.etatBien = this.selectedNatBatiment;
    currentObjet.bien.codeBatiment = this.codeBatimentSelected;
    currentObjet.bien.partLCL = this.partLcl;
    currentObjet.bien.montantFinanceLCL = this.montantLclFinance;
    currentObjet.bien.prixBien = this.prixAquisitionBien;
    currentObjet.bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot) : null;
    currentObjet.bien.codeNormeThermique = this.normeThermique;
    currentObjet.bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
    currentObjet.bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;

    if (!currentObjet.alignement) {
        currentObjet.alignement = {};
    }

    currentObjet.alignement.topAlignement = this.DpeResults ? this.alignementResultText : null;

    // Ajoutez plus de vérifications ici si nécessaire pour d'autres propriétés
}
