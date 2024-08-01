
  ajouterObjetFinancement() {
	this.showFileAriane=true;
		const nouvelObjet = {
			idObjetFinancement:"",
			codeObjetFinancement:"",// 02=Acquisition  03=Travaux
			quotePartObjet:null,
			gainCEP:null,
			dateFinTravaux: null,
			bien:Bien,
			dpeAvantTravaux: Dpe,
			dpeApresTravaux: Dpe,
			alignement: Alignement,
			eligibilite: Eligibilite,
			piecesJustificatives : null,
			codeFamilleObjet: "",	
			garantie: null, 
			firstDisconnectionOfd:false,
		};
	
		this.objetsFinancements.push(nouvelObjet);
		this.extractedInitialFinancement.objetFinancement.push(this.objetsFinancements);
		this.selectedObjetIndex = this.objetsFinancements.length - 1; // Sélectionner le nouvel objet ajouté
	
	}
 onBreadcrumbClick(index: number , currentObjet : any) {
			this.selectedObjetIndex = index;
			this.depExist=true;
        this.mapFinancementData(currentObjet);
        this.setObjetFinancementProperties(this.extractedInitialFinancement.objetFinancement[index]);
		this.traiterPiecesJustificatives(this.extractedInitialFinancement);
        this.setFinancementDataOnScreen(this.extractedInitialFinancement);
        this.setupFormGroup(this.extractedInitialFinancement.objetFinancement[index].bien);
		this.checkRequiredFields(this.extractedInitialFinancement);
			console.log("l'objet selectionnée est ")
			console.log(this.objetsFinancements[index])
			console.log("la liste des objets actuel est de taille", this.objetsFinancements.length)
			console.log(this.objetsFinancements);
		
	
	
		  }
ngOnInit(): void {
	this.showFileAriane=false;
    this.id = this.route.snapshot.queryParams["idFinancement"];
    this.Url_Retour_Base64 = this.route.snapshot.queryParams["urlRetour"];
  
    if (this.Url_Retour_Base64) {this.Url_Retour_Utf8 = atob(this.Url_Retour_Base64);}
    this.multiObjetService.getListeObjetsFinancement(this.id).subscribe(objets => {
      this.objetsFinancements = objets;
	  console.log("la liste de objets initial est de taille ",this.objetsFinancements.length)
	  console.log(this.objetsFinancements.length)
    });
    this.financementService.getFinancementbyId(this.id).subscribe(responseFinancement => {
    this.extractedInitialFinancement=responseFinancement;
        this.mapFinancementData(responseFinancement);
        this.setObjetFinancementProperties(responseFinancement.objetFinancement[0]);
        this.checkRequiredFields(responseFinancement);
		this.traiterPiecesJustificatives(responseFinancement);
        this.setFinancementDataOnScreen(responseFinancement);
        this.setupFormGroup(responseFinancement.objetFinancement[0].bien);
		this.formGroup.get('numeroNomRue').valueChanges.subscribe(numeroNomRue=>
			{	this.searchAddress();});
		this.formGroup.get('codePostal').valueChanges.subscribe(codePostal=>
			{	this.searchAddress();});
		this.formGroup.get('ville').valueChanges.subscribe(ville=>
			{	this.searchAddress();});
      
     
    });
}
vous voyez ce code la dessus a chaque fois ou je fais appel a la contion ajouterObjetFinancement je veux ajouter un objet vide dans objetsFinancements recuperer dans le ngOnit on repectant ce model import { Alignement } from './alignement';
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
}
import { Alignement } from './alignement';
import { Bien } from './bien';
import { Eligibilite } from './eligibilite';
import {  Piece } from './piece';
export class Garantie {

 idGarantie:string;
 typeObjetGarantie:string;
 bien:Bien;
 topAlignement: Alignement;
 topEligibilite: Eligibilite;
 piecesJustificatives : Piece [] ;
 
}	

export class Alignement {
   topAlignement :string;
   topAlignementXtra:string; 
}



export class Eligibilite {
    topEligibilite :string;
   
 }
 import { Dpe } from './dpe';
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
 donc je veux initiliser un objet de type ObjetFinancement a vide a chaque fois que ajouterObjetFinancement est applique

