ERROR TypeError: Cannot read properties of null (reading 'push')
    at push.0JfT.MultiOfdComponent.saveCurrentObjectValues (VM10 main.js:2051:48)
    at push.0JfT.MultiOfdComponent.showAlignement (VM10 main.js:1750:14)
    at MultiOfdComponent_Template_button_click_38_listener (VM10 main.js:2170:155)
    at executeListenerWithErrorHandling (VM9 vendor.js:70430:12)
    at wrapListenerIn_markDirtyAndPreventDefault (VM9 vendor.js:70470:18)
    at HTMLButtonElement.<anonymous> (VM9 vendor.js:112532:32)
    at ZoneDelegate.invokeTask (VM7 polyfills.js:1303:173)
    at Object.onInvokeTask (VM9 vendor.js:86706:25)
    at ZoneDelegate.invokeTask (VM7 polyfills.js:1303:56)
    at Zone.runTask (VM7 polyfills.js:1053:39)

private saveCurrentObjectValues(currentObject: ObjetFinancement): void {
		
        if (!currentObject || !currentObject.bien) return;
        const bien = currentObject.bien;
    // verification existance dpeActuel si non initilisation 
    if (!bien.dpeActuel) {
        bien.dpeActuel = new Dpe();
    } 
	//

		const dpeActuel =currentObject.bien.dpeActuel;
		currentObject.firstDisconnectionOfd=false;
        bien.partLCL = this.partLcl;
        bien.montantFinanceLCL = this.montantLclFinance;
        bien.prixBien = this.prixAquisitionBien;
        bien.dateDepotPc = this.dateDepot ? new Date(this.dateDepot).toISOString() : null;
        bien.codeNormeThermique = this.getCodeFromNormeThermique(this.normeThermique); 
        bien.dpeActuel.sirenDiagnostiqueur = this.SirenDPE;
        bien.dpeActuel.numeroDpe = this.numeroDpeAdeme;
		bien.etatBien=this.getCodeEtatBien(this.selectedNatBatiment)
	    bien.codeBatiment=this.getCodeEtatBatiment(this.codeBatimentSelected)
		bien.surfaceBien = this.formGroup.get('surfaceBien').value;
		bien.dpeActuel.estimationCep = this.formGroup.get('valeurCep').value;
		bien.dpeActuel.estimationGes = this.formGroup.get('valeurGes').value;
		bien.numeroNomRue = this.formGroup.get('numeroNomRue').value;
		bien.codePostal = this.formGroup.get('codePostal').value;
		bien.nomCommune = this.formGroup.get('ville').value;
		bien.dpeActuel.dateEtablissementDpe = this.formGroup.get('dateDiangnostique').value;
		bien.anneeConstruction = this.formGroup.get('anneeConstruction').value;
		bien.typeBatiment = this.formGroup.get('typeBatiment').value;
		bien.dpeActuel.classeCep = this.formGroup.get('lettreCEP').value;
		bien.dpeActuel.classeGes = this.formGroup.get('lettreGES').value;
		bien.typeEnergie = this.formGroup.get('energieType').value;
		
		
        if (this.isDpeChecked) {
			currentObject.piecesJustificatives.push({
				typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
				dpeActuel: this.selectedOptionJustif === "DPE",
				numeroDpe: this.numeroDpeAdeme,
				id: undefined,
				origineCreation: '',
				dateCreation: undefined,
				origineModification: '',
				dateModification: undefined,
				idPiece: '',
				referenceGed: '',
				sousTypePiece: ''
			});
        }    
        if (this.isNormeThermiqueChecked) {
			currentObject.piecesJustificatives.push({
				typePiece: "Norme thermique",
				id: undefined,
				origineCreation: '',
				dateCreation: undefined,
				origineModification: '',
				dateModification: undefined,
				idPiece: '',
				referenceGed: '',
				sousTypePiece: '',
				numeroDpe: '',
				dpeActuel: false
			});
		  console.log("isNormeThermiqueChecked")
        }
        if (this.isDateDepotChecked) {
			currentObject.piecesJustificatives.push({
				typePiece: "Permis de construire",
				id: undefined,
				origineCreation: '',
				dateCreation: undefined,
				origineModification: '',
				dateModification: undefined,
				idPiece: '',
				referenceGed: '',
				sousTypePiece: '',
				numeroDpe: '',
				dpeActuel: false
			});
        }

		console.log("this.isNormeThermiqueChecked")
		console.log(this.isNormeThermiqueChecked)
  
		console.log("this.isDateDepotChecked")
		console.log(this.isDateDepotChecked)
		

	
      }
export class Piece {

    id: any;
    origineCreation: string;
    dateCreation: Date;
    origineModification: string;
    dateModification: Date;
    idPiece: string;
    referenceGed: string;
    typePiece: string;
    sousTypePiece: string;
    numeroDpe: string;
    dpeActuel: boolean;   

    constructor() {
        this.id = 0;
        this.origineCreation = '';
        this.dateCreation = new Date(); // Initialise avec la date actuelle
        this.origineModification = '';
        this.dateModification = new Date(); // Initialise avec la date actuelle
        this.id= 0;
        this.origineCreation= ' ';
        this.dateCreation=  new Date();
        this.origineModification=' ';
        this.dateModification= new Date();
        this.idPiece= ' ';
        this.referenceGed= ' ';
        this.typePiece= ' ';
        this.sousTypePiece= ' ';
        this.numeroDpe= ' ';
        this.dpeActuel= false;   
    }


}
