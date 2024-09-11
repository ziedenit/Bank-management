import { Alignement } from './alignement';
import { Bien } from './bien';
import { Dpe } from './dpe';
import { Eligibilite } from './eligibilite';
import {  Piece } from './piece';
import {  Garantie } from './garantie';

export class ObjetFinancement {
	[x: string]: any;

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

import { Alignement } from './alignement';
import { Eligibilite } from './eligibilite';
import { Intervenant } from './intervenant';
import { ObjetFinancement } from './objetFinancement';


export class Financement {

idFinancement: string;
objetFinancement: ObjetFinancement[] ;
alignement: Alignement;
eligibilite: Eligibilite;

intervenant: Intervenant;
indicateurFinancementDedie:string;
indicateurNatureDurable:string;
typeRisqueClimatiqueAttenue:string;

codeApplicatifOrigine: string;
indicateurReprise: boolean;
statut: number ;
agenceCompte:string;
firstDisconnectionOfd:boolean;

}
export class Dpe {
          id  :  number ;
          origineCreation  : string;
          dateCreation  : Date  ;
          origineModification  : string  ;
          dateModification: Date  ;
          idDpe  : string  ;
          numeroDpe  :   string  ;
          estimationCep  : number ;
          classeCep  :  string    ;
          estimationGes  : number ;
          classeGes  :  string ;

          dateEtablissementDpe  : Date  ;
          dateReceptionDpe  : Date ;
          dateFinValiditeDpe  : Date;
          sirenDiagnostiqueur : string;
          
          etatBien:string;




          modelDpe:string;
          numeroDpeRemplace:string;
          versionDpe: string;
          methodeDpeApplique:string;
       

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
export class Justificatif {
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
  
}

onBreadcrumbClick(index: number ) {
		this.showBlocResult=true;
		// sauvgarde des données  propre à un objet selectionné  du fil Ariane 
		this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[this.selectedObjetIndex]);
	   this.selectedObjetIndex=index;
	  
	   // Appliquer les regles metier sur l'element selectionné du fil Ariane 
        this.setObjetFinancementData(this.extractedInitialFinancement.objetFinancement[index]);
       this.checkRequiredFields(this.extractedInitialFinancement,index);
	   this.checkPiecesJustificatives(this.extractedInitialFinancement,this.selectedObjetIndex);
        this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
		
		   this.depExist=true; 
			console.log("Contenance du financement actuel")
			console.log(this.extractedInitialFinancement)
			
		  }
		  removeBreadcrumbItem(index: number): void {
			// Affiche le pop-up de confirmation
			this.showConfirmDialog = true;
			this.deleteIndex = index;
		  }
		  confirmDelete(confirm: boolean): void {
			if (confirm && this.deleteIndex !== null) {
			  // Supprimer l'élément si l'utilisateur a confirmé
			  this.objetsFinancements.splice(this.deleteIndex, 1);
			  if (this.objetsFinancements.length >= 1) {
				this.ajoutFinancementDisabled = false;
			  }
			  this.extractedInitialFinancement.objetFinancement = this.objetsFinancements;
			}
			// Réinitialise les variables
			this.showConfirmDialog = false;
			this.deleteIndex = null;
		  }
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
		
		if (!currentObject.piecesJustificatives) {
			currentObject.piecesJustificatives = [];
		}
        // Ajout d'une pièce de type DPE ou Compromis de vente
if (this.isDpeChecked) {
	console.log("this.isDpeCheckedTrue")
	console.log(this.isDpeChecked)
    // Vérifier si une pièce de type DPE ou Compromis de vente existe déjà
    const existingDpe = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'DPE' || piece.typePiece === 'Compromis de vente');
    
    if (!existingDpe) {
        currentObject.piecesJustificatives.push({
            typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
            dpeActuel: this.selectedOptionJustif === "DPE",
            numeroDpe: this.numeroDpeAdeme,
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: ''
        });
    }

	

}
else

	{
		console.log("this.isDpeCheckedfalse")
	    console.log(this.isDpeChecked)
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Document DPE")
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="DPE")
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Compromis de vente")

	}

// Ajout d'une pièce de type Norme thermique
if (this.isNormeThermiqueChecked) {
    // Vérifier si une pièce de type "Norme thermique" existe déjà
    const existingNormeThermique = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
    
    if (!existingNormeThermique) {
        currentObject.piecesJustificatives.push({
            typePiece: "Norme thermique",
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: '',
            numeroDpe: '',
            dpeActuel: false
        });
    }	
}
else
	{
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Norme thermique")
	}
// Ajout d'une pièce de type Permis de construire
if (this.isDateDepotChecked) {
    // Vérifier si une pièce de type "Permis de construire" existe déjà
    const existingPermisDeConstruire = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
    
    if (!existingPermisDeConstruire) {
        currentObject.piecesJustificatives.push({
            typePiece: "Permis de construire",
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: '',
            numeroDpe: '',
            dpeActuel: false
        });
    }

	

}
else
	{
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Permis de construire")
	}

	
console.log("currentObject.piecesJustificatives")
console.log(currentObject.piecesJustificatives)
	
      }
ajouterObjetFinancement() {
	this.isDateDepotChecked=false;
	   this.isNormeThermiqueChecked=false;
	   this.isDpeChecked=false;
	this.showBlocResult=false;
    this.showDeleteIcon =true;
    this.showFileAriane = true;
    const nouvelObjet: ObjetFinancement = {
		idObjetFinancement: null,
		codeObjetFinancement: "02",
		quotePartObjet: null,
		gainCEP: null,
		dateFinTravaux: null,
		bien: new Bien(),
		dpeAvantTravaux: new Dpe(),
		dpeApresTravaux: new Dpe(),
		alignement: Alignement.createDefault(),
		eligibilite: new Eligibilite(),
		codeFamilleObjet: "01",
		garantie: [],
		firstDisconnectionOfd: true,
		piecesJustificatives:[],
	};
	
	
    this.idGeneratorService.generateIdObjetFinancement().subscribe(
      id => {
      nouvelObjet.idObjetFinancement = id;
      this.objetsFinancements.push(nouvelObjet);
	  console.log("nouveau objet initilisé et cree lors de click sur le button")
	  console.log(nouvelObjet)
	 this.ajoutFinancementDisabled=true;
      this.extractedInitialFinancement.objetFinancement=this.objetsFinancements;
      this.manuallyAddedIndices.push(this.objetsFinancements.length - 1);
	  this.newIndex=this.objetsFinancements.length - 1;
      console.log("le financement apres recupération et ajout des objets")
      console.log(this.extractedInitialFinancement)
	
      },
      error => {
      console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
	  this.ajoutFinancementDisabled=false;
      }
	  
    );
	console.log("Financement apres ajout des objets")
	console.log(this.extractedInitialFinancement)
    
    }
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
		
		if (!currentObject.piecesJustificatives) {
			currentObject.piecesJustificatives = [];
		}
        // Ajout d'une pièce de type DPE ou Compromis de vente
if (this.isDpeChecked) {
	console.log("this.isDpeCheckedTrue")
	console.log(this.isDpeChecked)
    // Vérifier si une pièce de type DPE ou Compromis de vente existe déjà
    const existingDpe = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'DPE' || piece.typePiece === 'Compromis de vente');
    
    if (!existingDpe) {
        currentObject.piecesJustificatives.push({
            typePiece: this.selectedOptionJustif === "DPE" ? "DPE" : "Compromis de vente",
            dpeActuel: this.selectedOptionJustif === "DPE",
            numeroDpe: this.numeroDpeAdeme,
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: ''
        });
    }

	

}
else

	{
		console.log("this.isDpeCheckedfalse")
	    console.log(this.isDpeChecked)
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Document DPE")
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="DPE")
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Compromis de vente")

	}

// Ajout d'une pièce de type Norme thermique
if (this.isNormeThermiqueChecked) {
    // Vérifier si une pièce de type "Norme thermique" existe déjà
    const existingNormeThermique = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
    
    if (!existingNormeThermique) {
        currentObject.piecesJustificatives.push({
            typePiece: "Norme thermique",
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: '',
            numeroDpe: '',
            dpeActuel: false
        });
    }	
}
else
	{
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Norme thermique")
	}
// Ajout d'une pièce de type Permis de construire
if (this.isDateDepotChecked) {
    // Vérifier si une pièce de type "Permis de construire" existe déjà
    const existingPermisDeConstruire = currentObject.piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
    
    if (!existingPermisDeConstruire) {
        currentObject.piecesJustificatives.push({
            typePiece: "Permis de construire",
            id: null,
            origineCreation: '',
            dateCreation: new Date(),
            origineModification: '',
            dateModification: new Date(),
            idPiece: '',
            referenceGed: '',
            sousTypePiece: '',
            numeroDpe: '',
            dpeActuel: false
        });
    }

	

}
else
	{
		currentObject.piecesJustificatives=currentObject.piecesJustificatives.filter(piece=>piece.typePiece!=="Permis de construire")
	}

	
console.log("currentObject.piecesJustificatives")
console.log(currentObject.piecesJustificatives)
	
      }
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
    if (dpeActuel) {
    this.dateReceptionDpe = dpeActuel.dateReceptionDpe;
    this.dateFinValiditeDpe = dpeActuel.dateFinValiditeDpe;
    this.depExist = true;
    if(dpeActuel.classeCep==null || dpeActuel.classeCep==""){this.hideFieldCEP=true}
	if(dpeActuel.classeGes==null || dpeActuel.classeGes=="" ){this.hideFieldGES=true}	
}
if (bien.etatBien) {
    this.selectedNatBatiment = this.etatBienMapping[bien.etatBien];
    this.updateFieldValue(this.selectedNatBatimentSubject, this.selectedNatBatiment);
	console.log("etatBien");
  }
  if (bien.codeBatiment) {
    this.codeBatimentSelected = this.codeBatimentMapping[bien.codeBatiment];
    this.updateFieldValue(this.codeBatimentSelectedSubject, this.codeBatimentSelected);
	console.log("codeBatiment");
  }

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
  
  if (bien.codeNormeThermique) {
    this.normeThermique = this.codeNormeThermiqueMapping[bien.codeNormeThermique];
    this.updateFieldValue(this.normeThermiqueSubject, this.normeThermique);
	console.log("codeNormeThermique");
  }
  if (bien.dpeActuel && bien.dpeActuel.sirenDiagnostiqueur) {
    this.SirenDPE = bien.dpeActuel.sirenDiagnostiqueur;
    this.updateFieldValue(this.SirenDPESubject, this.SirenDPE);
	console.log("sirenDiagnostiqueur");
  }
  this.numeroDpeAdeme = bien.dpeActuel?.numeroDpe;
  this.updateFieldValue(this.numeroDpeAdemeSubject, this.numeroDpeAdeme);
  console.log("numeroDpeAdeme");

}
private checkRequiredFields(responseFinancement: Financement, index:number): void {
    const bien = responseFinancement.objetFinancement[index]?.bien;
    const dpeActuel = bien?.dpeActuel;
    this.checkAndHighlightRequiredField(bien && bien.etatBien == null, "natureBien");
    this.checkAndHighlightRequiredField(bien && bien.codeBatiment == null, "categorieBatiment");
    this.checkAndHighlightRequiredField(bien && bien.partLCL == null, "partLcl");
    this.checkAndHighlightRequiredField(bien && bien.prixBien == null, "prixAquisitionBien");
    this.checkAndHighlightRequiredField(bien && bien.montantFinanceLCL == null, "montantLclFinance");	
    if (bien?.etatBien == "Ancien" && dpeActuel) {
        this.checkAndHighlightRequiredField(dpeActuel.numeroDpe == null || dpeActuel.numeroDpe == "", "numeroDpeAdeme");
        this.checkAndHighlightRequiredField(dpeActuel.sirenDiagnostiqueur == null || (dpeActuel.numeroDpe != null && dpeActuel.sirenDiagnostiqueur == null), "SirenDPE");
        this.checkAndHighlightRequiredField(dpeActuel.classeCep == null || dpeActuel.classeCep == "", "LettreCEP");
        this.checkAndHighlightRequiredField(dpeActuel.classeGes == null || dpeActuel.classeGes == "", "LettreGES");
		this.checkAndHighlightRequiredField((dpeActuel.classeCep == null || dpeActuel.classeCep == "" ) && (this.hideFieldCEP), "LettreCEPlist");
        this.checkAndHighlightRequiredField((dpeActuel.classeGes == null || dpeActuel.classeGes == "") && this.hideFieldGES, "lettreGeslist");
        this.checkAndHighlightRequiredField(dpeActuel.estimationCep == null, "ValeurCEP");
        this.checkAndHighlightRequiredField(dpeActuel.estimationGes == null, "ValeurGES");
        this.checkAndHighlightRequiredField(bien.anneeConstruction == null, "anneeConstruction");
    }
    if (bien?.etatBien == "Neuf") {
        this.checkAndHighlightRequiredField(bien.dateDepotPc == null, "dateDepot");
		console.log ("popopopopopopopop", bien.dpeActuel.numeroDpe, bien.dpeActuel.sirenDiagnostiqueur)
		this.checkAndHighlightRequiredField(bien.dpeActuel.numeroDpe != null&& bien.dpeActuel.sirenDiagnostiqueur == null, "SirenDPE");
    }
    this.checkAndHighlightRequiredField(bien && (bien.numeroNomRue == null || bien.numeroNomRue == ""), "numeroNomRue");
    this.checkAndHighlightRequiredField(bien && (bien.codePostal == null || bien.codePostal == ""), "codePostal");
    this.checkAndHighlightRequiredField(bien && (bien.nomCommune == null || bien.nomCommune == ""), "ville");
    console.log("responseFinancement.objetFinancement[index]")
	console.log(responseFinancement.objetFinancement[index])
	this.checkAndHighlightRequiredField(
		responseFinancement.objetFinancement[index] != null &&responseFinancement.objetFinancement[index].bien != null &&
		(responseFinancement.objetFinancement[index].bien.etatBien == "Neuf" ||responseFinancement.objetFinancement[index].bien.etatBien == "Ancien") &&
		responseFinancement.objetFinancement[index].bien.surfaceBien == null,
		"SurfaceDuBien"
	);
}
checkPiecesJustificatives(treatedFinancement:Financement,index:number) {		
		if (treatedFinancement.objetFinancement[index] != null && treatedFinancement.objetFinancement[index].piecesJustificatives != null) {
			this.presenceJustifDPE = treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'DPE')
			|| treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
			this.presenceJustifDateDepotPC=treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Permis de construire');
			this.presenceJustifNormeThermique=treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Norme thermique');
		}
		if(this.presenceJustifDPE && treatedFinancement.objetFinancement[index].bien.dpeActuel.numeroDpe!=null && treatedFinancement.objetFinancement[index].bien.dpeActuel.numeroDpe!=""){
		this.isDpe= treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'DPE');
		this.isCompromis=treatedFinancement.objetFinancement[index].piecesJustificatives.some(piece => piece.typePiece === 'Compromis de vente');
		console.log("regles PJ dpe et compromis",this.isDpe,this.isCompromis)
		//ajouter un moyen pour forcer le passage de l'index
		if(this.isDpe){this.selectedOptionJustif='DPE'}
		if(this.isCompromis){this.selectedOptionJustif='Compromis de vente'}
		this.isDpeChecked=true
		}
		if(!this.presenceJustifDPE && treatedFinancement.objetFinancement[index].bien.dpeActuel!=null  && treatedFinancement.objetFinancement[index].bien.dpeActuel.numeroDpe!=""){this.errorDpeMessage='Justificatif DPE manquant'}	
		if(this.presenceJustifDateDepotPC)
		{this.isDateDepotChecked=true; this.isNormeThermiqueChecked=true 
		}
		if(!this.presenceJustifDateDepotPC &&treatedFinancement.objetFinancement[index].bien.dateDepotPc!=null)
		{this.errorDateDepotMessage='Justificatif attestant de la date de dépôt du permis de construire manquant';}
		if(this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC){this.isNormeThermiqueChecked=true }
		if(!this.presenceJustifNormeThermique && !this.presenceJustifDateDepotPC && !this.errorDateDepotMessage 
			&&treatedFinancement.objetFinancement[index].bien.codeNormeThermique!=null){this.errorNormeThermiqueMessage='Justificatif Norme thermique manquant'}
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
showAlignement(index:number): void {
	// save les modif sur l'objet avant de calculer l'alignement
	console.log("this.extractedInitialFinancement.objetFinancement[index]",index)
			console.log(this.extractedInitialFinancement.objetFinancement[index],index)
	this.prepareLigneContext();
			this.checkFormFieldsFormGroup();
			this.isValid = this.sirenValidator.verifySiren(this.SirenDPE);
			this.DpeResults = true;
			this.elementResults = true;		
			
			
			forkJoin([
				this.engineService.alignement(this.ligneContext),
				this.engineService.alignementXtra(this.ligneContextXtra)            
			]).subscribe(([aligne, aligneXtra]) => {    
				this.alignementResultText = this.alignementMapping[aligne];
				this.alignementResult = aligne;
				this.alignementXtraResult = aligneXtra;
				this.alignementContext= this.xtraRepriseService.calculXtra(aligne,aligneXtra);
				console.log("this.alignementResult,alignementXtraResult")
			console.log(this.alignementContext,this.alignementResult,this.alignementXtraResult)
			this.extractedInitialFinancement.objetFinancement[index].alignement=this.alignementContext;

			});

			
			console.log("this.alignementContext")
			console.log(this.alignementContext)
		
			this.errorDpeMessage = this.checkFileDpeInserted();
			this.errorNormeThermiqueMessage = this.checkNormeThermique();
			this.errorDateDepotMessage = this.checkFileDateDepotInserted();
			this.evaluatedIndex.push(index);
			const allManuallyAddedAreEvaluated = this.manuallyAddedIndices.every(manualIndex => this.evaluatedIndex.includes(manualIndex));
			const isManuallyAddedEmpty = this.manuallyAddedIndices.length === 0;
			if ((index == this.newIndex) || (index == 0 && (allManuallyAddedAreEvaluated || isManuallyAddedEmpty))) {
				this.ajoutFinancementDisabled = false;
			}
			console.log("this.extractedInitialFinancement.objetFinancement[index]",index)
			console.log(this.extractedInitialFinancement.objetFinancement[index],index)
			this.saveCurrentObjectValues(this.extractedInitialFinancement.objetFinancement[index]);
			console.log("this.extractedInitialFinancement.objetFinancement apres fin calcul")
			console.log(this.extractedInitialFinancement.objetFinancement)

			
			
		
			 
}

j'ai ce code dans mon composant actuel angular et j'ai des probleme sur les methodes onBreadcrumbClick et les méthode saveCurrentObjectValues , showAlignement
je veux que lorsque je click sur un objet de la file ariane je sauvgarde tous et je ne perds par et aussi en appelant la méthode showAlignement je veux que this.extractedInitialFinancement doit comporter tous jours les données apres n'importe quel modif et quel scénario clicker sur un element basculer d'un element a un autre ajouter a nouveau ... je stabliser toute la logique jespere que ta compris 
