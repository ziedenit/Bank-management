private setObjetFinancementData(objetFinancement: ObjetFinancement): void {
	this.idObjetFinancement = objetFinancement.idObjetFinancement;
	this.familleObjet=objetFinancement.codeFamilleObjet;
	this.typeObjetFinancement=objetFinancement.codeObjetFinancement;
	this.isfirstDebranchement = objetFinancement.firstDisconnectionOfd;
	if(this.isfirstDebranchement)
	{
		this.ajoutFinancementDisabled=true;
	}
	this.selectedFamilleObjet = this.familleObjet === "01" ? "option1" : this.familleObjet === "05" ? "option4" : "option0" ;

	switch (objetFinancement.codeObjetFinancement) {
		case "02":
			this.objetFinance = "Acquisition de bâtiment";
			break;
		case "03":
			this.objetFinance = "Rénovation de bâtiment";
			this.depExist = true;
			break;
		default:
			break;
	}
    if (!objetFinancement || !objetFinancement.bien) return;
    const bien = objetFinancement.bien;
	if (bien.eligibleDpe) {
        this.selectedType = this.eligibleDpeMapping[bien.eligibleDpe].type;
        this.hideFieldForm = this.eligibleDpeMapping[bien.eligibleDpe].hideFieldForm;}
	if (bien.etatBien) {this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];}
    if (bien.codeBatiment) {this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];}
    this.partLcl = bien?.partLCL;
    this.montantLclFinance = bien?.montantFinanceLCL;
	this.prixAquisitionBien = bien?.prixBien;
	this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
    if (bien.codeNormeThermique) {this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];}
    if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) { this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;}
    this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
	if (objetFinancement.alignement && objetFinancement.alignement.topAlignement) {
        this.DpeResults = true;
        this.alignementResultText = this.alignementMappingReprise[objetFinancement.alignement.topAlignement][objetFinancement.alignement.xtra275TopAlignement] ;}	
	const dpeActuel = bien?.dpeActuel;
    if (dpeActuel && dpeActuel.numeroDpe!=null) {
    this.dateReceptionDpe = dpeActuel.dateReceptionDpe;
    this.dateFinValiditeDpe = dpeActuel.dateFinValiditeDpe;
    this.depExist = true;
    if(dpeActuel.classeCep==null || dpeActuel.classeCep==""){this.hideFieldCEP=true}
	if(dpeActuel.classeGes==null || dpeActuel.classeGes=="" ){this.hideFieldGES=true}	
}

    this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];
    this.updateFieldValue(this.selectedNatBatimentSubject, this.selectedNatBatiment);
	console.log("etatBien");
  

    this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];
    this.updateFieldValue(this.codeBatimentSelectedSubject, this.codeBatimentSelected);
	console.log("codeBatiment");
 

  this.partLcl = bien?.partLCL;
  this.updateFieldValue(this.partLclSubject, this.partLcl);
  console.log("partLCL");
  
  this.montantLclFinance = bien?.montantFinanceLCL;
  this.updateFieldValue(this.montantLclFinanceSubject, this.montantLclFinance);
  console.log("montantFinanceLCL");
  
  this.prixAquisitionBien = bien?.prixBien;
  this.updateFieldValue(this.prixAquisitionBienSubject, this.prixAquisitionBien);
  console.log("prixBien");
  
  this.dateDepot = bien?.dateDepotPc ? formatDate(bien.dateDepotPc, 'yyyy-MM-dd', "en-US") : undefined;
  this.updateFieldValue(this.dateDepotSubject, this.dateDepot);
  console.log("datedepotpc");
  
  
    this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];
    this.updateFieldValue(this.normeThermiqueSubject, this.normeThermique);
	console.log("codeNormeThermique");
  
	if(bien.dpeActuel!=null&&bien.dpeActuel.sirenDiagnostiqueur!=null)
	{this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;
		this.updateFieldValue(this.SirenDPESubject, this.SirenDPE);
		console.log("sirenDiagnostiqueur");}
		else
		{
			this.updateFieldValue(this.SirenDPESubject, " ");
		}
		
		
 
  this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
  this.updateFieldValue(this.numeroDpeAdemeSubject, this.numeroDpeAdeme);
  console.log("numeroDpeAdeme");

}
