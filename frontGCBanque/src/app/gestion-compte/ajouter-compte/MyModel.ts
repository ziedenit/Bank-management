onBreadcrumbClick(index: number ) {
			this.selectedObjetIndex=index;
			 // Appliquer les regles metier sur l'element selectionné du fil Ariane 
			this.mapFinancementData(this.extractedInitialFinancement,index);
			this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
			this.checkRequiredFields(this.extractedInitialFinancement.objetFinancement[index]);
			this.traiterPiecesJustificatives(this.extractedInitialFinancement,index);
			this.setFinancementDataOnScreen(this.extractedInitialFinancement,index);
			this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien); 
			this.depExist=true; 
		  }

isfirstDebranchement:Boolean
private mapFinancementData(responseFinancement: any , index:number): void {
	this.idObjetFinancement = responseFinancement.objetFinancement[index].idObjetFinancement;
	this.idRepers=responseFinancement.intervenant.idReper;
	this.codeApplicatifOrigine=responseFinancement.codeApplicatifOrigine;
	this.familleObjet=responseFinancement.objetFinancement[index].codeFamilleObjet;
	this.typeObjetFinancement=responseFinancement.objetFinancement[index].codeObjetFinancement;
	this.agenceCompte=responseFinancement.agenceCompte;		
	this.isfirstDebranchement = responseFinancement.objetFinancement[index].firstDisconnectionOfd;
	this.selectedFamilleObjet = this.familleObjet === "01" ? "option1" : this.familleObjet === "05" ? "option4" : "option0" ;
}
private setObjetFinancementProperties(objetFinancement: any): void {
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

	if (bien.eligibleDpe && this.eligibleDpeMapping[bien.eligibleDpe]) {
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
        this.alignementResultText = this.alignementMapping[objetFinancement.alignement.topAlignement];}
}
private setFinancementDataOnScreen(responseFinancement: any,index:number): void {
    const bien = responseFinancement.objetFinancement[index]?.bien;
    const dpeActuel = bien?.dpeActuel;
    if (dpeActuel) {
    this.dateReceptionDpe = dpeActuel.dateReceptionDpe;
    this.dateFinValiditeDpe = dpeActuel.dateFinValiditeDpe;
    this.depExist = true;
    }
}
private setupFormGroup(bien: Bien): void {

    if (!bien) return;
    this.formGroup = this.fb.group({
		numeroNomRue: [bien.numeroNomRue || null],
        codePostal: [bien.codePostal || null],
        ville: [bien.nomCommune || null],
        dateDiangnostique: [bien.dpeActuel?.dateEtablissementDpe?.toString().substring(0, 10) || null],
        anneeConstruction: [bien.anneeConstruction || null],
        typeBatiment: [bien.typeBatiment || null],
        lettreCEP: [bien.dpeActuel?.classeCep || null],
        lettreGES: [bien.dpeActuel?.classeGes || null],
        surfaceBien: [bien.surfaceBien || null],
        valeurCep: [bien.dpeActuel?.estimationCep || null],
        valeurGes: [bien.dpeActuel?.estimationGes || null],
		energieType:[bien.typeEnergie || null]
    });
}
ajouterObjetFinancement() {
	this.showDeleteIcon =true;
	this.showFileAriane = true;
	const nouvelObjet: ObjetFinancement = {
	  idObjetFinancement: "",
	  codeObjetFinancement: "",
	  quotePartObjet: null,
	  gainCEP: null,
	  dateFinTravaux: null,
	  bien: new Bien(),
	  dpeAvantTravaux: new Dpe(),
	  dpeApresTravaux: new Dpe(),
	  alignement: new Alignement(),
	  eligibilite: new Eligibilite(),
	  piecesJustificatives: [],
	  codeFamilleObjet: "",
	  garantie: [],
	 firstDisconnectionOfd: false,
	 
	};
   
	this.idGeneratorService.generateIdObjetFinancement().subscribe(
	  id => {
		nouvelObjet.idObjetFinancement = id;
		this.objetsFinancements.push(nouvelObjet);
		this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
		this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
	  },
	  error => {
		console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
	  }
	);
	
  }
     ci haut le code en cliquant sur un button ajouter je fait appel ajouterObjetFinancement et j'ajouter un objet (ObjetFinancement) dans extractedInitialFinancement
         
         export class ObjetFinancement {
	
    idObjetFinancement:string;
	codeObjetFinancement:string;// 02=Acquisition  03=Travaux
	quotePartObjet:number;
	gainCEP:number;
	dateFinTravaux: Date;
	bien:Bien;
	dpeAvantTravaux: Dpe;
	dpeApresTravaux: Dpe;
	alignement: Alignement;
    eligibilite: Eligibilite;
	piecesJustificatives : Piece [] ;
	codeFamilleObjet: string;	
	garantie: Garantie[]; 
	firstDisconnectionOfd:boolean;

}
je veux que chaque changement doit etre detecté si je remplie des champs dans ObjetFinancement et je click sur onBreadcrumbClick pour passer a un autre objet de la file les chagement soit sauvgarder dans l'objet que j'ai changé
export class Bien {
    idBien:string;
    codeBatiment:string;
    codeNormeThermique:string;
    typeBatiment:string;
    codePostal:string;
    nomCommune:string;
    adresseComplete:string;
    anneeConstruction:string;
    dateDepotPc:string;
    surfaceBien:number;
    bienFinanceLCL:boolean;
    dpeActuel:Dpe;
    etatBien:string;
    numeroVoie:string;
    nomRue:string;
    prixBien: number;
    montantFinanceLCL:number;
    partLCL:number;
    typeUsage:string;
    numeroNomRue:string;

    typeEnergie:string;
    batiment:string;
    escalier:string;
    etage: string;
    porte:string;

    typeVoie:string;
    codeDepartement:string;
    codeInseeCommune:string;
    numeroLot:string;
    periodeConstruction:string;
    coordonneeCartographiqueX:number;
    coordonneeCartographiqueY:number;
    dateDebutConstruction:Date;

    eligibleDpe:string;

}
je veux adapter le code ci haut merci
