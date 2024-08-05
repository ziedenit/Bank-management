updateCurrentObjetData() {
    const currentObjet = this.objetsFinancements[this.selectedObjetIndex];
    currentObjet.bien.prixBien = this.prixAquisitionBien;
    currentObjet.bien.dateDepotPc = this.dateDepot;
    currentObjet.bien.eligibleDpe = this.selectedType;
    currentObjet.bien.etatBien = this.selectedNatBatiment;
    currentObjet.bien.montantFinanceLCL = this.montantLclFinance;
    currentObjet.bien.partLCL = this.partLcl;
    currentObjet.bien.sirenDiagnostiqueur = this.SirenDPE;
    currentObjet.bien.codeNormeThermique = this.normeThermique;
    // Add any other fields that need to be updated
}
